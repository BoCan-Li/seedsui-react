import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';
import Close from './../Close/Close.jsx';

export default class InputText extends Component {
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
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    onClickLicon: PropTypes.func,
    onClickRicon: PropTypes.func,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
  }
  static defaultProps = {
    args: null,
    value: '',
    readOnly: false,
    disabled: false
  }
  constructor(props) {
    super(props);
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
  onChange = (e) => {
    var target = e.target;
    var value = target.value;
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
    }
  }
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    if (this.props.onBlur) {
      this.props.onBlur(value, this.getArgs(e));
    }
  }
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) this.props.onClear();
    if (this.props.onChange) {
      this.props.onChange('', this.getArgs(e));
    }
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, maxLength, value, placeholder, name, readOnly, disabled, onClick,
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="text" value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onChange={this.onChange} onClick={onClick} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="text" defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onChange={this.onChange} onClick={onClick} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
  }
  render() {
    const {
      className, style,
      liconClassName, onClickLicon,
      value,
      riconClassName, onClickRicon,
      clearClassName, clearIconClassName, onClear
    } = this.props;
    let DOM = null;
    if (!liconClassName && !riconClassName && !onClear) {
      DOM = this.getInputDOM();
    } else {
      DOM = (<div className={`attribute${className ? ' ' + className : ''}`} style={style}>
        {liconClassName && <Icon className={`color-placeholder ${liconClassName}`} onClick={() => {if (onClickLicon) onClickLicon(this.$input.value);}}/>}
        {this.getInputDOM()}
        {onClear && <Close onClick={this.onClear} className={`${clearClassName ? clearClassName : ''} ${value.length === 0 ? 'hide' : ''}`} iconClassName={clearIconClassName}/>}
        {riconClassName && <Icon className={`color-placeholder ${riconClassName}`} onClick={() => {if (onClickRicon) onClickRicon(this.$input.value);}}/>}
      </div>);
    }
    return DOM;
  }
}
