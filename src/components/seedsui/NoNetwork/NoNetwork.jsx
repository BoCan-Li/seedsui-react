import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notice from './../Notice';
import Device from './../utils/device.js';
export default class NoNetwork extends Component {
  static propTypes = {
    caption: PropTypes.string,
    sndcaption: PropTypes.string
  }
  static defaultProps = {
    caption: '网络状态不佳',
    sndcaption: '请尝试开关飞行模式后再试'
  }
  constructor(props) {
    super(props);
    this.state = {
      isOnLine: Device.isOnLine
    }
    Device.onLine((isOnLine) => {
      this.setState({
        isOnLine
      });
    });
  }
  render() {
    const {isOnLine} = this.state;
    const {caption, sndcaption} = this.props;
    return (
      isOnLine ? null :<Notice iconClassName="icon-no-network" caption={caption} sndcaption={sndcaption}/>
    );
  }
}
