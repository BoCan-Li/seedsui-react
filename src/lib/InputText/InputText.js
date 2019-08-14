import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends Component {
  static propTypes = {
    type: PropTypes.string, // 类型: text, number, tel, password
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    pre: PropTypes.bool, // 自动扩充功能
    // 容器
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    // 文本框
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([ // 日期或者数字框
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,

    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onClickInput: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    // 左右图标
    licon: PropTypes.node,
    onClickLicon: PropTypes.func, // 点击样式包含licon触发
    ricon: PropTypes.node,
    onClickRicon: PropTypes.func, // 点击样式包含ricon触发
    // 清除按键
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    clearClassName: PropTypes.string,
    clearStyle: PropTypes.object,
    // 右侧内容
    rcaption: PropTypes.node
  }
  static defaultProps = {
    type: 'text',
    value: '',
    readOnly: false,
    disabled: false,
    clearClassName: 'ricon close-icon-clear size18'
  }
  constructor(props) {
    super(props);
    this.state = {
      showClear: props.value && props.clear // 用于非valueBindProp
    }
  }
  
  // 点击容器
  onClick = (e) => {
    e.stopPropagation();
    const {onClick, onClickInput, onClickLicon, onClickRicon} = this.props;
    if (this.props.disabled) return;
    var target = e.target;
    if (target.classList.contains('clearicon')) {
      this.onClear(e);
    } else if (target.classList.contains('licon')) {
      if (onClickLicon) onClickLicon(this.$input.value, Object.getArgs(e, this.props.args));
    } else if (target.classList.contains('ricon')) {
      if (onClickRicon) onClickRicon(this.$input.value, Object.getArgs(e, this.props.args));
    } else if (target.classList.contains('input-text')) {
      if (onClick) onClick(this.$input.value, Object.getArgs(e, this.props.args));
      if (onClickInput) onClickInput(this.$input.value, Object.getArgs(e, this.props.args));
    } else {
      if (onClick) onClick(this.$input.value, Object.getArgs(e, this.props.args));
    }
  }
  // 自动扩充功能
  preAutoSize = () => {
    this.$input.style.height = this.$pre.clientHeight + 'px';
  }
  // 文本框事件
  onChange = (e) => {
    var target = e.target;
    var value = target.value;
    const {
      pre, valueBindProp, type, onChange, maxLength
    } = this.props;
    // 自动扩充功能
    if (pre) {
      this.$pre.children[0].innerText = value;
      this.preAutoSize();
    }
    // 最大长度
    if (maxLength && value && value.length > maxLength) {
      value = value.substring(0, maxLength)
    }
    // 输入时只校验最大值、小数点、最大长度、返回错误
    if (type === 'number') {
      const {max, digits, onError} = this.props;
      value = Math.Calc.correctNumber(e.target.value, {max, digits, maxLength, onError});
    }
    // onChange
    if (type !== 'text') { // 能输入中文的文本框,如果放开ios中文输入法会把拼音落进去
      if (!valueBindProp) target.value = value;
    }
    if (onChange) onChange(value, Object.getArgs(e, this.props.args));
    this.updateShowClear();
  }
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    const {valueBindProp, min, type, onBlur, onChange} = this.props;
    if (type === 'number') {
      // 失去焦点时只校验非空、最小值
      value = Math.Calc.correctNumber(value, {min});
      if (!valueBindProp) target.value = value;
      if (onChange) onChange(value, Object.getArgs(e, this.props.args));
    }
    if (onBlur) onBlur(value, Object.getArgs(e, this.props.args));
  }
  onFocus = (e) => {
    var target = e.target;
    var value = target.value;
    const {onFocus, readOnly} = this.props;
    if (onFocus) {
      onFocus(value, Object.getArgs(e, this.props.args));
      e.stopPropagation();
    }
    if (readOnly) {
      target.blur();
    }
  }
  // 点击清除
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.clear && typeof this.props.clear === 'function') this.props.clear('', Object.getArgs(e, this.props.args));
    if (this.props.onChange) {
      this.props.onChange('', Object.getArgs(e, this.props.args));
    }
    // 自动扩充功能
    if (this.props.pre) {
      this.preAutoSize();
    }
    e.stopPropagation();
    this.updateShowClear();
  }
  getInputDOM = () => {
    const {
      args, style, className, onClick, onChange, onClickInput, onBlur, onFocus,
      max, min, digits,
      licon, onClickLicon,
      ricon, onClickRicon,
      clear, clearClassName, clearStyle,
      rcaption, // 为others不多属性
      pre, // 自动伸缩文本框
      type,
      valueBindProp,
      autoFocus, inputClassName, inputStyle, maxLength, value, placeholder, readOnly, disabled,
      ...others
    } = this.props;
    // pre类型
    if (pre) {
      // pre的左右padding
      let preLeft = 0;
      let preRight = 0;
      if (inputStyle) {
        if (inputStyle.padding) {
          const paddingValues = inputStyle.padding.split(' ');
          if (paddingValues.length === 1) {
            preLeft = paddingValues[0];
            preRight = paddingValues[0];
          } else if (paddingValues.length === 2) {
            preLeft = paddingValues[1];
            preRight = paddingValues[1];
          } else if (paddingValues.length === 4) {
            preLeft = paddingValues[1];
            preRight = paddingValues[3];
          }
        } else if (inputStyle.paddingLeft || inputStyle.paddingRight) {
          preLeft = inputStyle.paddingLeft || '0';
          preRight = inputStyle.paddingRight || '0';
        }
      }
      return (<div className={`input-pre-box${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}>
        {valueBindProp && <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} {...others}></textarea>}
        {!valueBindProp && <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} {...others}></textarea>}
        <pre ref={(el) => {this.$pre = el;}} style={{left: preLeft, right: preRight}}><span>{value}</span></pre>
      </div>);
    }
    // textarea类型
    if (type === 'textarea') {
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      if (valueBindProp) {
        return <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}></textarea>;
      }
      return <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}></textarea>;
    }
    // 其它类型
    if (valueBindProp) { // 如果值绑定属性,则只有通过父组件的prop来改变值
      return <input max={max} min={min} autoFocus={autoFocus} ref={(el) => {this.$input = el;}} type={type} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}/>;
    }
    return <input max={max} min={min} autoFocus={autoFocus} ref={(el) => {this.$input = el;}} type={type} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}/>;
  }
  updateShowClear = () => {
    const {clear, valueBindProp} = this.props;
    if (valueBindProp) return;
    let showClear = false;
    if (clear) {
      if (this.$input && this.$input.value) {
        showClear = true;
      } else {
        showClear = false;
      }
    }
    this.setState({
      showClear: showClear
    });
  }
  render() {
    const {
      value, valueBindProp,
      className, style,
      licon,
      ricon,
      clear, clearClassName, clearStyle,
      rcaption
    } = this.props;
    // 支持valueBindProp和非valueBindProp两种模式的清空按钮控制
    let showClear = false;
    if (value) {
      showClear = true;
    } else {
      showClear = false;
    }
    let isShowClear = valueBindProp ? showClear : this.state.showClear;
    return (<div ref={(el) => {this.$el = el;}} className={`input-text-box${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        {licon && licon}
        {this.getInputDOM()}
        {clear && <i className={`icon clearicon ${isShowClear ? '' : 'hide'}${clearClassName ? ' ' + clearClassName : ''}`} style={clearStyle}></i>}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>);
  }
}
