// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class NumBox extends Component {
  static propTypes = {
    args: PropTypes.any,
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
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    // events
    onClick: PropTypes.func,
    onClickMinus: PropTypes.func,
    onClickPlus: PropTypes.func,
    onClickInput: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
  }
  static defaultProps = {
    required: true,
    maxLength: '16',
    readOnly: false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    const {required} = this.props;
    var value = this.props.value;
    if (required) { // 必填项,必须有值
      if (value === '') value = this.props.min || '0';
    }
    value = this.correctNum(value);
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
  // 失去焦点
  onBlur = (e) => {
    const {required} = this.props;
    var value = this.props.value;
    if (value === '' && required) {
      value = this.props.min || '0';
      this.props.onChange(value, this.getArgs(e));
    }
    e.target.value = value;
  };
  // 获取焦点
  onFocus = (e) => {
    // if (!e) return;
    // var target = e.target;
    // var value = target.value;
    // if (value - 0 === 0) {
    //   target.value = '';
    // }
  };
  // 点击文本框, 逢0清空
  onClickInput = (e) => {
    var value = e.target.value;
    if (value - 0 === 0) {
      e.target.value = '';
    }
    if (this.props.onClickInput) this.props.onClickInput(value, this.getArgs(e));
  }
  // Methods
  onChange = (e) => {
    if (e.target.validity.badInput) {
      e.target.value = '';
    }
    var value = this.correctNum(e.target.value);
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  // 点击减
  onClickMinus = (e) => {
    let value = this.correctNum(Math.Calc.subtract(this.$input.value, 1));
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
    if (this.props.onClickMinus) this.props.onClickMinus(value, this.getArgs(e));
    this.$input.focus();
  };
  // 点击加
  onClickPlus = (e) => {
    let value = this.correctNum(Math.Calc.add(this.$input.value, 1));
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
    if (this.props.onClickPlus) this.props.onClickPlus(value, this.getArgs(e));
    this.$input.focus();
  };
  // 矫正数字
  correctNum = (argNumstr) => {
    const {max, min, digits, maxLength} = this.props;
    if (argNumstr === '' || isNaN(argNumstr) || min - max >= 0) {
      return '';
    }
    var value = argNumstr.toString();
    // 最大值
    if (!isNaN(max) && value - max >= 0) {
      // callback onError
      if (this.props.onError) this.props.onError({msg: '最大不能超过' + max});
      return '' + max;
    }
    // 最小值
    if (!isNaN(min) && value - min <= 0) {
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
    return Number(value);
  };
  // render
  getInputDOM = () => {
    const {
      args,
      style, className, disabled,
      inputStyle, inputClassName, value, placeholder, maxLength, readOnly,
      onClick, onClickMinus, onClickPlus, onClickInput, onChange, onError,
      digits, max, min,
      ...others
    } = this.props;
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
      onClick={this.onClickInput}
      className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`}
      style={inputStyle}
      {...others}
    />;
  }
  render() {
    const {min, max, value, style, className, disabled, onClick} = this.props;
    return (
      <div ref={el => {this.$el = el;}} disabled={(min >= max) || disabled} style={style} className={`numbox bordered${className ? ' ' + className : ''}`} onClick={onClick}>
        <input ref={(el) => {this.$minus = el;}} type="button" className="numbox-button" value="-" onClick={this.onClickMinus} disabled={!isNaN(min) ? min - value >= 0 : false}/>
        {this.getInputDOM()}
        <input ref={(el) => {this.$plus = el;}} type="button" className="numbox-button" value="+" onClick={this.onClickPlus} disabled={!isNaN(max) ? max - value <= 0 : false}/>
      </div>
    );
  }
}
