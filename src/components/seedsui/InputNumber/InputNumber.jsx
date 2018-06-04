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
    maxLength: PropTypes.number,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
    // rule设置
    max: PropTypes.number,
    min: PropTypes.number,
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
  }
  static defaultProps = {
    args: null,
    value: '',
    readOnly: false,
    disabled: false,
    digits: false
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
  // 矫正数字
  correctNum = (argNumstr) => {
    var num = Number(argNumstr);
    if (isNaN(num)) return '';
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
    if (this.props.digits !== false) {
      if (String(num).indexOf('.') >= 0) value = Math.Calc.toDigits(num, this.props.digits);
    }
    // 最大长度限制
    if (this.props.maxLength && value && value.length > this.props.maxLength) {
      value = value.slice(0, this.props.maxLength);
    }
    return '' + value;
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
  }
  // !valueBindProp
  onInput = (e) => {
    var target = e.target;
    var value = this.correctNum(target.value.toString());
    target.value = value;
  };
  onBlur = (e) => {
    var target = e.target;
    var value = e.target.value;
    target.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
      this.updatePropValue();
    }
    if (this.props.onBlur) this.props.onBlur(value, this.getArgs(e));
  };
  updatePropValue = () => {
    if (this.props.valueBindProp) return;
    this.updateFlag = 1;
  }
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) {
      this.props.onClear(this.getArgs(e));
    }
    if (this.props.onChange) {
      this.props.onChange('', this.getArgs(e));
    }
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, maxLength, value, placeholder, name, readOnly, disabled,
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="number" value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onInput={this.onInput} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
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
