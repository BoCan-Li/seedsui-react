import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class InputLocation extends Component {
  static propTypes = {
    locationingText: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    locationingText: window._seeds_lang['location'] || '定位中...'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$el = null;
    this.$input = null;
    if (this.refs.$ComponentInputText && this.refs.$ComponentInputText.$el && this.refs.$ComponentInputText.$input) {
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }
  onClick = (event, value) => {
    const {
      valueBindProp,
      locationingText,
      onChange,
      onClick
    } = this.props;
    var e = event.nativeEvent;
    if (onClick) onClick(e, value);
    if (this.$input.value === locationingText) return;
    // 定位中...
    if (!valueBindProp) {
      this.$input.value = locationingText;
    }
    Bridge.getLocation({
      type: 'gcj02',
      success: (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (!valueBindProp) this.$input.value = data.address;
          if (onChange) onChange(e, data.address, data);
          return;
        }
        Bridge.getAddress({ // 只支持gcj02
          latitude: data.latitude,
          longitude: data.longitude,
          success: (addrs) => {
            // 赋值
            if (!valueBindProp) this.$input.value = addrs.address;
            if (onChange) onChange(e, addrs.address, data);
          },
          fail: (res) => {
            // 赋值
            if (!valueBindProp) this.$input.value = '';
            if (onChange) onChange(e, '', data)
            // 提示获取地址失败
            Bridge.showToast(res.errMsg, {mask: false});
          }
        });
      },
      fail: (res) => {
        // 赋值
        if (!valueBindProp) this.$input.value = '';
        if (onChange) onChange(e, '', null)
        // 提示定位失败
        Bridge.showToast(res.errMsg, {mask: false});
      }
    });
  }
  render() {
    const {
      locationingText,
      onChange,
      onClick,
      ...others
    } = this.props;
    return <InputText ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>;
  }
}
