import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';
import Context from '../Context/instance.js';

export default class InputLocation extends Component {
  static contextType = Context;
  static propTypes = {
    locationingValue: PropTypes.string,
    failedValue: PropTypes.string,
    readOnly: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      status: '1'
    }
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
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {
      readOnly = true,
      onChange,
      onClick
    } = this.props;
    // 正在定位不允许操作
    const {
      status
    } = this.state;
    if (status === '-1') {
      return;
    }

    // 非只读状态下, 点击错误面板, 允许手动输入位置
    if (!readOnly && status === '0') {
      this.setState({
        status: '1'
      })
      return;
    }

    var e = event.nativeEvent;
    if (onClick) onClick(e, value);
    // 如果非只读, 则仅允许点击图标定位
    if (!readOnly && !e.target.classList.contains('input-location-icon')) {
      return;
    }
    // 定位中...
    this.setState({
      status: '-1'
    })
    Bridge.getLocation({
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (onChange) {
            onChange(e, data.address, data);
            this.setState({
              status: '1'
            })
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
          this.setState({
            status: '1'
          })
        } else {
          this.setState({
            status: '0'
          })
        }
      },
      fail: (res) => {
        // 赋值
        if (onChange) onChange(e, '', null)
        this.setState({
          status: '0'
        })
        // 提示定位失败
        // Bridge.showToast(res.errMsg, {mask: false});
      }
    });
  }
  render() {
    // 全局配置
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {
      locationingValue = locale['location'] || '定位中...',
      failedValue = locale['hint_location_failed'] || '定位失败, 请检查定位权限是否开启',
      readOnly = true,
      onClick,
      onChange,
      ...others
    } = this.props;
    // 定位状态, 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
    const {
      status
    } = this.state;
    let statusDOM = null;
    if (status === '-1') {
      statusDOM = <div className="input-text input-location">{locationingValue}</div>
    } else if (status === '0') {
      statusDOM = <div className="input-text input-location-error">{failedValue}</div>;
    }
    return <InputText
      ref="$ComponentInputText"
      riconAttribute={{className: `input-location-icon size24${status === '-1' ? ' input-location-icon-active' : ''}`}}
      inputAttribute={{className: statusDOM ? 'hide-important' : ''}} // 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
      readOnly={readOnly}
      onClick={this.onClick}
      onChange={onChange}
      children={statusDOM}
      {...others}
    />;
  }
}
