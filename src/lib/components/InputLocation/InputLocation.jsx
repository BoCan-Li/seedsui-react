import React, { Component } from 'react';
import InputText from './../InputText';
import bridge from './../../bridge';

export default class InputLocation extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (e) => {
    const {onChange, onClick} = this.props;
    const locationingText = '定位中...';
    if (onClick) onClick(this.refs.$ComponentInputText.getArgs(e));
    if (this.$input.value === locationingText) return;
    // 定位中...
    if (!this.props.valueBindProp) this.$input.value = locationingText;
    bridge.getLocation({
      onSuccess: (data) => {
        bridge.getAddress({
          latitude: data.latitude,
          longitude: data.longitude,
          type: 'gcj02',
          onSuccess: (addrs) => {
            // 赋值
            if (!this.props.valueBindProp) this.$input.value = addrs.address;
            if (onChange) onChange(addrs.address, this.refs.$ComponentInputText.getArgs(e))
          },
          onError: (err) => {
            // 赋值
            if (!this.props.valueBindProp) this.$input.value = '';
            if (onChange) onChange('', this.refs.$ComponentInputText.getArgs(e))
            // 提示获取地址失败
            bridge.showToast(err.msg, {mask: false});
          }
        });
      },
      onError: (err) => {
        // 赋值
        if (!this.props.valueBindProp) this.$input.value = '';
        if (onChange) onChange('', this.refs.$ComponentInputText.getArgs(e))
        // 提示定位失败
        bridge.showToast(err.msg, {mask: false});
      }
    });
  }
  render() {
    return <InputText ref="$ComponentInputText" {...this.props} readOnly onClick={this.onClick}/>;
  }
}
