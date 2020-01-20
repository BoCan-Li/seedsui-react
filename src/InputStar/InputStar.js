import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from './../Star';

export default class InputStar extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    onError: PropTypes.func // ({e, {errMsg: '错误信息', select: '当前选中', min: '最小值', value: '矫正后的值'}})
  }
  static defaultProps = {
    value: 0,
    min: 0,
    max: 5
  }
  constructor(props, context) {
    super(props, context);
  }
  onChange (e, argNum) {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    const {value, min, onChange, onError} = this.props;
    let num = argNum;
    if (num < min) {
      if (onError) {
        onError(e, {
          errMsg: `${locale['hint_cannot_be_less_than'] || '不能小于'}${min}${locale['star'] || '颗星'}`,
          select: num,
          min: min,
          value: min
        });
      }
      num = min;
    }
    if (onChange) onChange(e, num);
  }
  render() {
    const {
      max,
      min,
      value,
      onChange,
      onError,
      ...others
    } = this.props;
    const stars = [];
    for (var i = 1; i <= max; i++) {
      stars.push(i);
    }
    let current = value
    if (current < min) current = min
    return (
      <div {...others} className={`input-star${others.className ? ' ' + others.className : ''}`}>
        {stars.map((index) => (
          <Star onClick={(e) => {this.onChange(e, index);}} key={index} className={index <= current ? 'active' : ''}/>
        ))}
      </div>
    );
  }
}
