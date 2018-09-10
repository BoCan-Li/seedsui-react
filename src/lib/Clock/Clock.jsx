import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Clock extends Component {
  static propTypes = {
    time: PropTypes.string, // hh:mm
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  getHourDeg = (hour) => {
    return hour * 30
  }
  getMinuteDeg = (minute) => {
    return minute * 6
  }
  render() {
    const {time, style, className, onClick} = this.props;
    let hour = '00';
    let minute = '00';
    if (/\d{2}:\d{2}/.test(time)) {
      hour = time.split(':')[0];
      minute = time.split(':')[0];
    }
    return (
      <div ref={el => {this.$el = el;}} className={`clock${className ? ' ' + className : ''}`} style={style} onClick={onClick}>
        <div ref={el => {this.$hour = el;}} className="clock-hour" style={{WebkitTransform: 'rotate(' + this.getHourDeg(hour) + 'deg)'}}></div>
        <div ref={el => {this.$minute = el;}} className="clock-minute" style={{WebkitTransform: 'rotate(' + this.getMinuteDeg(minute) + 'deg)'}}></div>
        <div class="clock-origin"></div>
      </div>
    );
  }
}
