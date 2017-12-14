import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import 'utils/math.js';
export default class NumBase extends Component {
  static propTypes = {
    // global
    style: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    // events
    onError: PropTypes.func,
    onChange: PropTypes.func,
    // number
    integer: PropTypes.number,
    digits: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    args: PropTypes.array,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    // global
    type: 'text',
    // number
    min: 0,
    args: []
  }
  constructor(props) {
    super(props);
    this.state = {
      minusDisabled: false,
      plusDisabled: false,
      disabled: props.disabled
    };
  }
  // Methods
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    this.validator(value);
  };
  onClick = (e) => {
    var target = e.target;
    var value = target.value;
    if (value.toString() === '0') {
      if (this.props.onChange) this.props.onChange('', ...this.props.args);
    }
  };
  onInput = (e) => {
    var target = e.target;
    var value = this.correctNum(target.value.toString());
    if (this.props.onChange) this.props.onChange(value, ...this.props.args);
  };
  onClickMinus = () => {
    const value = Math.Calc.subtract(this.props.value, 1);
    this.validator(value);
  };
  onClickPlus = () => {
    if (this.props.value < 0) {
      if (this.props.onChange) this.props.onChange(0, ...this.props.args);
    }
    const value = Math.Calc.add(this.props.value, 1);
    this.validator(value);
  };
  validator = (num) => {
    this.disableNum(num);
  };
  disableNum = (num) => {
    var stateNum = num;
    if (this.props.min >= this.props.max && num ) {
      stateNum = this.props.min;
      this.setState({disabled: true});
      this.setState({minusDisabled: true});
      this.setState({plusDisabled: true});
    } else if (num === '' || num <= this.props.min) {
      stateNum = this.props.min;
      this.setState({minusDisabled: true});
      this.setState({plusDisabled: false});
    } else if (this.props.max && num >= this.props.max) {
      stateNum = this.props.max;
      this.setState({minusDisabled: false});
      this.setState({plusDisabled: true});
    } else {
      stateNum = num;
      this.setState({minusDisabled: false});
      this.setState({plusDisabled: false});
    }
    if (this.props.onChange) this.props.onChange(stateNum.toString(), ...this.props.args);
  };
  correctNum = (numstr) => {
    if (numstr === '') return '';
    var value = '';
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
        if (this.onError) this.props.onError('整数位不能超过' + this.integer + '位');
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
}
