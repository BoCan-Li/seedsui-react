// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class NumBox extends Component {
  static propTypes = {
    args: PropTypes.any,
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 容器
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    // 文本框
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    // events
    onClick: PropTypes.func,
    onClickMinus: PropTypes.func,
    onClickPlus: PropTypes.func,
    onClickInput: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    // rule设置
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    max: PropTypes.number,
    min: PropTypes.number,
  }
  static defaultProps = {
    maxLength: '16',
    readOnly: false
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount () {
    const {valueBindProp} = this.props;
    var value = this.correctNum(this.props.value);
    if (!valueBindProp) this.$input.value = value;
    if (this.props.onChange) this.props.onChange(value, this.getArgs());
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  // Methods
  onChange = (e) => {
    const {valueBindProp} = this.props;
    var target = e.target;
    var value = this.correctNum(target.value);
    if (!valueBindProp) target.value = value;
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  // 获取焦点
  onFocus = (e) => {
    if (!e) return;
    var target = e.target;
    var value = target.value;
    if (value - 0 === 0) {
      target.value = '';
    }
  };
  // 失去焦点
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    target.value = this.correctNum(value);
  };
  // 点击减
  onClickMinus = (e) => {
    const {valueBindProp} = this.props;
    let value = this.correctNum(Math.Calc.subtract(this.$input.value, 1));
    console.log(value)
    // 赋值
    if (!valueBindProp) this.$input.value = '' + value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
    this.$input.focus();
  };
  // 点击加
  onClickPlus = (e) => {
    const {valueBindProp} = this.props;
    let value = this.correctNum(Math.Calc.add(this.$input.value, 1));
    // 赋值
    if (!valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
    this.$input.focus();
  };
  // 矫正数字
  correctNum = (argNumstr) => {
    const {max, min, digits, maxLength} = this.props;
    if (argNumstr === '' || isNaN(argNumstr) || min - max >= 0) {
      return '';
    }
    var value = argNumstr.toString();
    if (this.$minus) this.$minus.disabled = false;
    if (this.$plus) this.$plus.disabled = false;
    // 最大值
    if (!isNaN(max) && value - max >= 0) {
      if (this.$plus) this.$plus.disabled = true;
      // callback onError
      if (this.props.onError) this.props.onError({msg: '最大不能超过' + max});
      return '' + max;
    }
    // 最小值
    if (!isNaN(min) && value - min <= 0) {
      if (this.$minus) this.$minus.disabled = true;
      // callback onError
      if (this.props.onError) this.props.onError({msg: '最小不能小于' + min});
      return '' + min;
    }
    // 截取小数位数
    if (value.indexOf('.') !== -1 && !isNaN(digits) && digits - 0 >= 0 && digits.toString().indexOf('.') === -1) {
      if (digits - 0 === 0) { // 整数
        value = value.substring(0, value.indexOf('.'));
      } else { // 小数
        value = value.substring(0, value.indexOf('.') + Number(digits) + 1);
      }
    }
    // 最大长度限制
    if (maxLength && value && value.length > maxLength) {
      value = value.substring(0, maxLength);
    }
    return value;
  };
  // render
  getInputDOM = () => {
    const {
      args, valueBindProp,
      style, className, disabled,
      inputStyle, inputClassName, value, placeholder, maxLength, readOnly,
      onClick, onClickMinus, onClickPlus, onClickInput, onChange, onError,
      digits, max, min,
      ...others
    } = this.props;
    if (valueBindProp) {
      return <input
        ref={(el) => {this.$input = el;}}
        type="number"
        value={value}
        min={min}
        max={max}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={onClickInput}
        className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`}
        style={inputStyle}
        {...others}
      />;
    }
    return <input
      ref={(el) => {this.$input = el;}}
      type="number"
      defaultValue={value}
      min={min}
      max={max}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={this.onChange}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
      onClick={onClickInput}
      className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`}
      style={inputStyle}
      {...others}
    />;
  }
  render() {
    const {min, max, style, className, disabled, onClick} = this.props;
    return (
      <div ref={el => {this.$el = el;}} disabled={(min >= max) || disabled} style={style} className={`numbox bordered${className ? ' ' + className : ''}`} onClick={onClick}>
        <input ref={(el) => {this.$minus = el;}} type="button" className="numbox-button" value="-" onClick={this.onClickMinus} />
        {this.getInputDOM()}
        <input ref={(el) => {this.$plus = el;}} type="button" className="numbox-button" value="+" onClick={this.onClickPlus} />
      </div>
    );
  }
}
