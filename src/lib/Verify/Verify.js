import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputVerify from './../InputVerify';
import Bridge from './../Bridge';
import ApiAxios from './../ApiAxios';

export default class Verify extends Component {
  static propTypes = {
    autoSent: PropTypes.bool, // 自动发送
    url: PropTypes.string,
    params: PropTypes.object,
    syncData: PropTypes.func, // '错误信息', 'value', {result: object, status: 'send_fail | send_ok | sent_ok | sent_fail', op: 'click | input | timeover'}
    beforeSent: PropTypes.func, // 如果返回字符串,将弹出信息,并不发短信
    sentDisabled: PropTypes.bool, // 是否禁用发送验证码
    sentSecond: PropTypes.number,
    sentCaption: PropTypes.string,
    maxLength: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ])
  };
  static defaultProps = {
    url: '/login/sendLoginSmsVerifyCode.action',
    sentSecond: 60,
    sentCaption: '发送验证码',
    maxLength: 6,
    placeholder: '验证码',
    clear: true
  }
  constructor (props) {
    super(props);
    this.state = {
      second: props.sentSecond || 60,
      caption: props.sentCaption || '发送验证码'
    }
  }
  componentDidMount = () => {
    if (this.props.autoSent) this.onClickSent()
  }
  status = ''
  onValiChange = (value) => {
    const {syncData} = this.props;
    if (syncData) syncData('', value, {result: null, status: this.status, op: 'input'});
  }
  onClickSent = () => {
    const {url, params, syncData, beforeSent} = this.props;
    const input = this.$el.$input;
    // 倒计时中,阻止继续
    if (this.state.second !== this.props.sentSecond) {
      Bridge.showToast(this.state.second + '秒后重试', {mask: false});
      if (syncData) {
        this.status = 'send_fail';
        syncData(this.state.second + '秒后重试', input.value, {result: null, status: this.status, op: 'click'});
      }
      return;
    }
    // 发送前回调不为空,阻止继续
    if (beforeSent) {
      const beforeSentMsg = beforeSent();
      if (beforeSentMsg) {
        Bridge.showToast(beforeSentMsg, {mask: false});
        return;
      }
    }
    // 开始发送
    if (syncData) {
      this.status = 'send_ok';
      syncData('', input.value, {result: null, status: this.status, op: 'click'});
    }
    ApiAxios.get(url, {data: params}).then(result => {
      if (result.code === '1') {
        this.countdown();
        if (syncData) {
          this.status = 'sent_ok';
          syncData('', input.value, {result: result, status: this.status, op: 'click'});
        }
      } else {
        if (syncData) {
          this.status = 'sent_fail';
          syncData(result.message, input.value, {result: result, status: this.status, op: 'click'})
        }
        Bridge.showToast(result.message, {mask: false});
      }
    }).catch(() => {
      const errMsg = '短信发送异常, 请稍后再试';
      if (syncData) {
        this.status = 'sent_fail';
        syncData(errMsg, input.value, {result: null, status: this.status, op: 'click'});
      }
      Bridge.showToast(errMsg, {mask: false});
    });
  }
  countdown = () => {
    const {syncData} = this.props;
    let interval = setInterval(() => {
      this.setState({
        second: this.state.second - 1,
        caption: (this.state.second - 1) + '秒后重试'
      });
      if (this.state.second - 1 <= 0) {
        window.clearInterval(interval);
        this.setState({
          second: this.props.sentSecond || 60,
          caption: this.props.sentCaption || '发送验证码'
        });
        if (syncData) {
          this.status = '';
          syncData('', this.$el.$input.value, {result: null, status: this.status, op: 'timeover'});
        }
      }
    }, 1000);
  }
  render() {
    const {caption} = this.state;
    const {autoSent, url, params, syncData, beforeSent, sentDisabled, sentSecond, sentCaption, maxLength, placeholder, clear, ...others} = this.props;
    return (
      <InputVerify ref={(el) => {this.$el = el;}} clear={clear} onChange={this.onValiChange} placeholder={placeholder} maxLength={maxLength} sentCaption={caption} sentDisabled={sentDisabled} onClickSent={this.onClickSent} {...others}/>
    );
  }
}
