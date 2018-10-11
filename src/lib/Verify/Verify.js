import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputVerify from './../InputVerify';
import Bridge from './../Bridge';
import ApiAxios from './../ApiAxios';

export default class Verify extends Component {
  static propTypes = {
    autoSent: PropTypes.bool, // 自动发送
    url: PropTypes.string,
    params: PropTypes.object, // 登录时用{clientType: 'appId', mobile: '138xxxxxx'},
    sentDisabled: PropTypes.bool, // 是否禁用发送验证码
    syncData: PropTypes.func, // 'error', 'verifycode', {data: 'data', op: 'input | sms | resume'}
    beforeSent: PropTypes.func,
    second: PropTypes.number
  };
  static defaultProps = {
    url: '/login/sendLoginSmsVerifyCode.action',
    second: 60
  }
  constructor (props) {
    super(props);
    this.state = {
      data: null, // 服务端返回的data
      verifycode: '',
      interval: null,
      second: props.second || 60,
      sentCaption: '发送验证码',
      sentDisabled: false
    }
  }
  componentDidMount = () => {
    if (this.props.autoSent) this.onClickSent()
  }
  onValiChange = (value) => {
    this.setState({
      verifycode: value
    });
    // this.validateSubmit(this.state.username, value);
    const {syncData} = this.props;
    if (syncData) syncData('', value, {data: this.state.data, op: 'input'});
  }
  onClickSent = () => {
    const {url, params, syncData, beforeSent} = this.props;
    if (beforeSent) {
      const beforeSentMsg = beforeSent();
      if (beforeSentMsg) {
        Bridge.showToast(beforeSentMsg, {mask: false});
        return;
      }
    }
    this.setState({
      sentDisabled: true
    });
    ApiAxios.get(url, params).then(result => {
      if (result.code === '1') {
        this.setState({
          data: result.data
        });
        this.countdown();
        if (syncData) syncData('', this.state.verifycode, {data: result.data, op: 'sms'});
      } else {
        this.setState({
          sentDisabled: false,
          data: null
        });
        if (syncData) syncData(result.message, this.state.verifycode, {data: null, op: 'sms'})
        Bridge.showToast(result.message, {mask: false});
      }
    }).catch(() => {
      this.setState({
        sentDisabled: false,
        data: null
      });
      const errMsg = '短信发送异常, 请稍后再试';
      if (syncData) syncData(errMsg, this.state.verifycode, {data: null, op: 'sms'});
      Bridge.showToast(errMsg, {mask: false});
    });
  }
  countdown = () => {
    const {syncData} = this.props;
    let interval = setInterval(() => {
      this.setState({
        second: this.state.second - 1,
        sentCaption: (this.state.second - 1) + '秒后重试',
        sentDisabled: true
      });
      if (this.state.second - 1 <= 0) {
        window.clearInterval(interval);
        this.setState({
          second: this.props.second || 60,
          interval: null,
          sentCaption: '发送验证码'
        });
        if (syncData) syncData('', this.state.verifycode, {data: this.state.data, op: 'resume'});
        // if (this.validateUserName(this.state.username)) {
        //   this.setState({
        //     sentDisabled: true
        //   });
        // }
      }
    }, 1000);
    this.setState({
      interval: true
    });
  }
  render() {
    const {verifycode, sentCaption} = this.state;
    const {autoSent, url, params, sentDisabled, syncData, beforeSent, maxLength = '6', placeholder = '验证码', ...others} = this.props;
    return (
      <InputVerify clear onChange={this.onValiChange} value={verifycode} placeholder={placeholder} maxLength={maxLength} sentCaption={sentCaption} sentDisabled={sentDisabled || this.state.sentDisabled} onClickSent={this.onClickSent} {...others}/>
    );
  }
}
