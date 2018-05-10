import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bridge from './../utils/bridge';
import Icon from './../Icon/Icon.jsx';
import Close from './../Close/Close.jsx';

export default class InputLocation extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 容器
    // args: PropTypes.array,
    style: PropTypes.object,
    className: PropTypes.string,
    // 文本框
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
  }
  static defaultProps = {
    args: null,
    value: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: '定位中...'
    };
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event')) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClick = (e) => {
    const {onChange, onClick} = this.props;
    if (onClick) onClick(this.getArgs(e));
    if (this.state.value === this.state.loading) return;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = this.state.loading;
    // 订货客户端获取地址
    if (bridge.platform === 'dinghuo') {
      bridge.getLocation({
        onSuccess: (data) => {
          // 赋值
          if (!this.props.valueBindProp) this.$input.value = data.address;
          if (onChange) onChange(data.address, this.getArgs(e))
        }
      });
      return;
    }
    bridge.getLocation({
      onSuccess: (data) => {
        bridge.getAddress({
          latitude: data.latitude,
          longitude: data.longitude,
          type: 'gcj02',
          onSuccess: (addrs) => {
            // 赋值
            if (!this.props.valueBindProp) this.$input.value = addrs.address;
            if (onChange) onChange(addrs.address, this.getArgs(e))
          },
          onError: (res) => {
            if (res.code === 'timeout') {
              this.setState({
                loading: '定位超时,请点击重试'
              });
            }
          }
        });
      }
    });
  }
  onClear = (e) => {
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) this.props.onClear(this.getArgs(e));
    if (this.props.onChange) {
      this.props.onChange('', this.getArgs(e));
    }
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, value, placeholder, name, disabled
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="text" value={value} readOnly disabled={disabled} placeholder={placeholder} name={name} onClick={this.onClick} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="text" defaultValue={value} readOnly disabled={disabled} placeholder={placeholder} name={name} onClick={this.onClick} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} />;
  }
  render() {
    const {
      className, style,
      liconClassName,
      value,
      riconClassName,
      clearClassName, clearIconClassName, onClear
    } = this.props;
    let DOM = null;
    if (!liconClassName && !riconClassName && !onClear) {
      DOM = this.getInputDOM();
    } else {
      DOM = (<div className={`attribute${className ? ' ' + className : ''}`} style={style}>
        {liconClassName && <Icon className={`color-placeholder ${liconClassName}`}/>}
        {this.getInputDOM()}
        {onClear && <Close onClick={this.onClear} className={`${clearClassName ? clearClassName : ''} ${value.length === 0 ? 'hide' : ''}`} iconClassName={clearIconClassName}/>}
        {riconClassName && <Icon className={`color-placeholder ${riconClassName}`}/>}
      </div>);
    }
    return DOM;
  }
}
