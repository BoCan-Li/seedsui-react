import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from './../Star';

export default class StarGroup extends Component {
  static propTypes = {
    args: PropTypes.any,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
  }
  static defaultProps = {
    args: null,
    value: 0,
    min: 0,
    max: 5
  }
  constructor(props) {
    super(props);
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
  onChange (e, argNum) {
    const {min, onChange, onError} = this.props;
    let num = argNum;
    if (num < min) {
      if (onError) {
        onError(`最小不能小于${min}颗星`);
      } else {
        num = min;
      }
    }
    if (onChange) onChange(num, this.getArgs(e));
  }
  render() {
    const {max, min, value, className, style} = this.props;
    const stars = [];
    for (var i = 1; i <= max; i++) {
      stars.push(i);
    }
    let current = value
    if (current < min) current = min
    return (
      <div className={`input-star${className ? ' ' + className : ''}`} style={style}>
        {stars.map((index) => (
          <Star onClick={(e) => {this.onChange(e, index);}} key={index} className={index <= current ? 'active' : ''}/>
        ))}
      </div>
    );
  }
}
