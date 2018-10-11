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
    syncData: PropTypes.func, // '错误信息', 'value', {result: object, status: 'input输入中 | send发送 | sent_ok发送成功 | sent_fail发送失败 | sent发送完成}'}
    beforeSent: PropTypes.func, // 如果返回字符串,将弹出信息,并不发短信
    sentDisabled: PropTypes.bool, // 是否禁用发送验证码
    sentSecond: PropTypes.number,
    sentCaption: PropTypes.string,
    maxLength: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string
  };
  static defaultProps = {
    url: '/login/sendLoginSmsVerifyCode.action',
    sentSecond: 60,
    sentCaption: '发送验证码',
    maxLength: 6,
    placeholder: '验证码'
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
  onValiChange = (value) => {
    const {syncData} = this.props;
    if (syncData) syncData('', value, {result: null, status: 'input'});
  }
  onClickSent = () => {
    if (this.state.second !== this.props.sentSecond) {
      Bridge.showToast(this.state.second + '秒后重试', {mask: false});
      return;
    }
    const {url, params, syncData, beforeSent} = this.props;
    if (beforeSent) {
      const beforeSentMsg = beforeSent();
      if (beforeSentMsg) {
        Bridge.showToast(beforeSentMsg, {mask: false});
        return;
      }
    }
    if (syncData) syncData('', this.$el.$input.value, {result: null, status: 'send'});
    ApiAxios.get(url, params).then(result => {
      if (result.code === '1') {
        this.countdown();
        if (syncData) syncData('', this.$el.$input.value, {result: result, status: 'sent_ok'});
      } else {
        if (syncData) syncData(result.message, this.$el.$input.value, {result: result, status: 'sent_fail'})
        Bridge.showToast(result.message, {mask: false});
      }
    }).catch(() => {
      const errMsg = '短信发送异常, 请稍后再试';
      if (syncData) syncData(errMsg, this.$el.$input.value, {data: null, status: 'sent_fail'});
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
        if (syncData) syncData('', this.$el.$input.value, {result: null, status: 'sent'});
      }
    }, 1000);
  }
  render() {
    const {caption} = this.state;
    const {autoSent, url, params, syncData, beforeSent, sentDisabled, sentSecond, sentCaption, maxLength, placeholder, ...others} = this.props;
    return (
      <InputVerify ref={(el) => {this.$el = el;}} clear onChange={this.onValiChange} placeholder={placeholder} maxLength={maxLength} sentCaption={caption} sentDisabled={sentDisabled} onClickSent={this.onClickSent} {...others}/>
    );
  }
}
