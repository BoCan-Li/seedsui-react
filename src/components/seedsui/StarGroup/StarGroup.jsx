import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from './../Star';

export default class StarGroup extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    star: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    // args: PropTypes.array
  }
  static defaultProps = {
    args: null,
    min: 0,
    max: 5
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
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
    const {max, star, className, style} = this.props;
    const stars = [];
    for (var i = 1; i <= max; i++) {
      stars.push(i);
    }
    return (
      <div className={`stargroup${className ? ' ' + className : ''}`} style={style}>
        {stars.map((num) => (
          <Star onClick={(e) => {this.onChange(e, num);}} key={num} active={num <= star ? true : false}/>
        ))}
      </div>
    );
  }
}
