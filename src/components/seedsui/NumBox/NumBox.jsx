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
    integer: PropTypes.number,
    digits: PropTypes.number,
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
  onChange = (e) => {
    var target = e.target;
    var value = this.correctNum(target.value.toString());
    if (this.props.maxLength && value && value.length > this.props.maxLength) value = value.slice(0, this.props.maxLength);
    // 赋值
    if (!this.props.valueBindProp) target.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
    }
  };
  onClickMinus = (e) => {
    let value = Math.Calc.subtract(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
    }
  };
  onClickPlus = (e) => {
    let value = Math.Calc.add(this.$input.value, 1);
    if (value < this.props.min) value = this.props.min;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) {
      this.props.onChange('' + value, this.getArgs(e));
    }
  };
  correctNum = (numstr) => {
    if (numstr === '') return '';
    var value = '';
    // 判断是否超出限制
    const {max, min} = this.props;
    if (max && numstr > max) {
      // callback onError
      if (this.props.onError) this.props.onError('最大不能超过' + max);
      return '' + max;
    }
    if (min && numstr < min) {
      // callback onError
      if (this.props.onError) this.props.onError('最小不能小于' + min);
      return '' + min;
    }
    // 判断整数位数
    if (this.props.integer) {
      var integerVal = '';
      var decimalVal = '';
      if (numstr.indexOf('.') > 0) {
        integerVal = numstr.split('.')[0];
        decimalVal = '.' + numstr.split('.')[1];
      } else {
        integerVal = numstr;
      }
      if (integerVal.length > this.integer) {
        // callback onError
        if (this.props.onError) this.props.onError('整数位不能超过' + this.integer + '位');
        return (integerVal.substring(0, this.integer) + decimalVal);
      }
    }
    if (this.props.digits) {
      // 如果输入的内容不是一个数字，则转为数字
      if (!/^(0|([1-9][0-9]*))(\.[0-9]*)?$/.test(numstr)) {
        console.log('不是一个正数');
        value = numstr.match(/(0|([1-9][0-9]*))(\.[0-9]+)?/)[0];
        // callback onError
        if (this.props.onError) this.props.onError('必须要输入一个正数');
      } else {
        value = numstr;
      }
      // 如果小数位超过限制，则截掉多余位数
      if (this.props.digits) {
        const match = value.match(/\.[0-9]*/);
        if (match && match[0] && match[0].length - 1 > this.props.digits) {
          var digitsMatch = new RegExp('[0-9]+\\.[0-9]{1,' + this.props.digits + '}');
          value = value.match(digitsMatch)[0];
          // callback onError
          if (this.props.onError) this.props.onError('小数位最多不能超过' + this.props.digits + '位');
        }
      }
    } else {
      // 如果输入的不是一个正整数，则转为正整数
      if (!/^[1-9]{1,}[0-9]*$/.test(numstr)) {
        const result = numstr.match(/[1-9]{1,}[0-9]*/);
        value = result ? result[0] : this.props.min;
        // callback onError
        if (this.props.onError) this.props.onError('必须要输入正整数');
      } else {
        value = numstr;
      }
    }
    return value;
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
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} min={min} max={max} maxLength={maxLength} readOnly={readOnly} placeholder={placeholder} name={name} onChange={this.onChange} onClick={this.onClick} className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
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
