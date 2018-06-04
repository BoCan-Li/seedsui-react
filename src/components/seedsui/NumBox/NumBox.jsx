import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class NumBox extends Component {
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
    type: PropTypes.string,
    maxLength: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    // events
    onClick: PropTypes.func,
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
    args: null,
    maxLength: '8',
    min: 0,
    max: 99999999,
    value: '0',
    readOnly: false
  }
  constructor(props) {
    super(props);
  }
  updateFlag = 0 // 在!valueBindProp时值变化的标识,例如修改、加、减操作时
  componentDidUpdate = () => {
    // 在!valueBindProp时,需要更新value时,便更新value
    if (this.updateFlag) {
      this.updateFlag = 0;
      if (this.$input) this.$input.value = this.props.value;
    }
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
  // Methods
  onClick = (e) => {
    var target = e.target;
    var value = target.value;
    if (Number(value) === 0) {
      // 赋值
      if (!this.props.valueBindProp) target.value = '';
      // Callback
      if (this.props.onChange) {
        this.props.onChange('', this.getArgs(e));
      }
    }
  };
  // valueBindProp
  onChange = (e) => {
    var target = e.target;
    // target.validity.badInput
    var value = this.correctNum(target.value.toString());
    // 赋值
    if (!this.props.valueBindProp) target.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
    }
  };
  // !valueBindProp
  onInput = (e) => {
    var target = e.target;
    var value = this.correctNum(target.value.toString());
    target.value = value;
  };
  onBlur = (e) => {
    var target = e.target;
    var value = e.target.value;
    if (!value) value = '0';
    target.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
      this.updatePropValue();
    }
  };
  updatePropValue = () => {
    if (this.props.valueBindProp) return;
    this.updateFlag = 1;
  }
  // 点击减
  onClickMinus = (e) => {
    let value = Math.Calc.subtract(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    if (value > this.props.max) value = this.props.max;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
      this.updatePropValue();
    }
  };
  // 点击加
  onClickPlus = (e) => {
    let value = Math.Calc.add(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    if (value > this.props.max) value = this.props.max;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
      this.updatePropValue();
    }
  };
  // 矫正数字
  correctNum = (argNumstr) => {
    var num = Number(argNumstr);
    if (isNaN(num)) return '';
    // 判断是否超出限制
    const {max, min} = this.props;
    if (max && num > max) {
      // callback onError
      if (this.props.onError) this.props.onError('最大不能超过' + max);
      return '' + max;
    }
    if (min && num < min) {
      // callback onError
      if (this.props.onError) this.props.onError('最小不能小于' + min);
      return '' + min;
    }
    var value = argNumstr;
    // 截取小数位数
    if (this.props.digits) {
      if (String(num).indexOf('.') >= 0) value = Math.Calc.toDigits(num, this.props.digits);
    // 整数
    } else {
      value = Math.floor(num);
    }
    // 最大长度限制
    if (this.props.maxLength && value && value.length > this.props.maxLength) {
      value = value.slice(0, this.props.maxLength);
    }
    return '' + value;
  };
  // render
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, value, max, min, maxLength, placeholder, name, readOnly,
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="number" value={value} min={min} max={max} maxLength={maxLength} readOnly={readOnly} placeholder={placeholder} name={name} onChange={this.onChange} onClick={this.onClick} className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} min={min} max={max} maxLength={maxLength} readOnly={readOnly} placeholder={placeholder} name={name} onInput={this.onInput} onBlur={this.onBlur} onClick={this.onClick} className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
  }
  render() {
    const {min, max, value, style, className, disabled, onClick} = this.props;
    return (
      <div disabled={(min >= max && value) || disabled} style={style} className={`numbox bordered ${className ? className : ''}`} onClick={onClick}>
        <input type="button" className="numbox-button" disabled={value <= min} value="-" onClick={this.onClickMinus} />
        {this.getInputDOM()}
        <input type="button" className="numbox-button" disabled={value >= max} value="+" onClick={this.onClickPlus} />
      </div>
    );
  }
}
