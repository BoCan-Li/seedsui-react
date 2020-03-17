import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

export default class InputLocation extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    locationingValue: PropTypes.string,
    failedValue: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount () {
    this.$el = null;
    this.$input = null;
    if (this.refs.$ComponentInputText && this.refs.$ComponentInputText.$el && this.refs.$ComponentInputText.$input) {
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
      this.$ComponentInputText = this.refs.$ComponentInputText;
    }
  }
  onClick = (event, value) => {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    const {
      locationingValue = locale['location'] || '定位中...',
      failedValue = locale['hint_location_failed'] || '定位失败, 请检查定位权限是否开启',
      onChange,
      onClick
    } = this.props;
    var e = event.nativeEvent;
    if (onClick) onClick(e, value);
    if (this.$input.value === locationingValue) return;
    // 定位中...
    this.$input.value = locationingValue;
    Bridge.getLocation({
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (onChange) {
            onChange(e, data.address, data);
            this.$input.value = data.address;
          }
          return;
        }
        const result = await Bridge.getAddress({ // 只支持gcj02
          latitude: data.latitude,
          longitude: data.longitude
        });
        const address = result && result.address ? result.address : ''
        if (onChange) onChange(e, address, result);
        if (address) {
          this.$input.value = address
        } else {
          this.$input.value = failedValue
        }
      },
      fail: (res) => {
        // 赋值
        if (onChange) onChange(e, '', null)
        this.$input.value = failedValue;
        // 提示定位失败
        // Bridge.showToast(res.errMsg, {mask: false});
      }
    });
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    const {
      locationingValue = locale['location'] || '定位中...',
      failedValue = locale['hint_location_failed'] || '定位失败, 请检查定位权限是否开启',
      onChange,
      onClick,
      ...others
    } = this.props;
    return <InputText ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>;
  }
}
