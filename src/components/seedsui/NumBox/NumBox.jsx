import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class NumBox extends Component {
  static propTypes = {
    args: PropTypes.any,
    // 容器
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
    this.state = {}
  }
  componentDidMount () {
    this.updateDisabled();
  }
  shouldComponentUpdate (nextProps) {
    if(nextProps.value === this.props.value){
      return false
    }
    return true;
  }
  componentDidUpdate = () => {
    // 如果prop的value和文本框里的值不一致
    if (this.$input) {
      if (this.$input.value !== this.props.value) {
        console.log('值变了')
        this.$input.value = this.props.value;
        // 更新disabled
        this.updateDisabled();
      }
    }
  }
  updateDisabled = () => {
    let {min, max, value} = this.props;
    if (this.$input) value = this.$input.value;
    if (!value) return;
    if (value <= min) {
      this.$minus.disabled = true;
    } else {
      this.$minus.disabled = false;
    }
    if (value >= max) {
      this.$plus.disabled = true;
    } else {
      this.$plus.disabled = false;
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
  onFocus = (e) => {
    var target = e.target;
    var value = target.value;
    if (!value || value === '0') {
      // 赋值
      target.value = '';
    }
  };
  onInput = (e) => {
    var target = e.target;
    var value = target.value.toString();
    // 如果value有值不为空,则矫正数值
    if (value) {
      value = this.correctNum(value);
    }
    target.value = value;
    // 更新disabled
    this.updateDisabled();
  };
  onBlur = (e) => {
    var target = e.target;
    var value = e.target.value;
    if (!value) value = this.correctNum(value);
    target.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
    }
    // 更新disabled
    this.updateDisabled();
  };
  // 点击减
  onClickMinus = (e) => {
    let value = Math.Calc.subtract(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    if (value > this.props.max) value = this.props.max;
    // 赋值
    this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
    }
    // 更新disabled
    this.updateDisabled();
    this.$input.focus();
  };
  // 点击加
  onClickPlus = (e) => {
    let value = Math.Calc.add(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    if (value > this.props.max) value = this.props.max;
    // 赋值
    this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
    }
    // 更新disabled
    this.updateDisabled();
    this.$input.focus();
  };
  // 矫正数字
  correctNum = (argNumstr) => {
    if (!argNumstr || isNaN(argNumstr)) {
      return '' + this.props.min;
    }
    var num = Number(argNumstr);
    // 判断是否超出限制
    const {max, min} = this.props;
    if (!isNaN(max) && num > max) {
      // callback onError
      if (this.props.onError) this.props.onError('最大不能超过' + max);
      return '' + max;
    }
    if (!isNaN(min) && num < min) {
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
      inputClassName, inputStyle, value, max, min, maxLength, placeholder, name, readOnly,
    } = this.props;
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} min={min} max={max} maxLength={maxLength} readOnly={readOnly} placeholder={placeholder} name={name} onInput={this.onInput} onBlur={this.onBlur} onFocus={this.onFocus} className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
  }
  render() {
    const {min, max, value, style, className, disabled, onClick} = this.props;
    return (
      <div disabled={(min >= max && value) || disabled} style={style} className={`numbox bordered ${className ? className : ''}`} onClick={onClick}>
        <input ref={(el) => {this.$minus = el;}} type="button" className="numbox-button" value="-" onClick={this.onClickMinus} />
        {this.getInputDOM()}
        <input ref={(el) => {this.$plus = el;}} type="button" className="numbox-button" value="+" onClick={this.onClickPlus} />
      </div>
    );
  }
}
