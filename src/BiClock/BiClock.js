import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BiClock extends Component {
  static propTypes = {
    style: PropTypes.object,
    lineWidth: PropTypes.number, // 边框宽度
    size: PropTypes.number, // 大小,px
    time: PropTypes.string, // hh:mm
    duration: PropTypes.number, // 时长
    delay: PropTypes.number // 延时
  }
  static defaultProps = {
    lineWidth: 2,
    size: 50,
    duration: 500,
    delay: 0
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
  aniRotate = () => {
    const {time, duration} = this.props;
    let hour = '00';
    let minute = '00';
    if (/\d{2}:\d{2}/.test(time)) {
      hour = time.split(':')[0];
      minute = time.split(':')[1];
    }
    setTimeout(() => {
      if (this.$hour) {
        this.$hour.style.WebkitTransitionDuration = `${duration}ms`;
        this.$hour.style.WebkitTransform = `rotate(${this.getHourDeg(hour)}deg)`;
      }
      if (this.$minute) {
        this.$minute.style.WebkitTransitionDuration = `${duration}ms`;
        this.$minute.style.WebkitTransform = `rotate(${this.getMinuteDeg(minute)}deg)`;
      }
    }, this.props.delay);
  }
  render() {
    const {
      style,
      lineWidth,
      size,
      time,
      duration,
      delay,
      ...others
    } = this.props;
    // 动画旋转
    this.aniRotate();
    return (
      <div {...others} ref={el => {this.$el = el;}} className={`bi-clock${others.className ? ' ' + others.className : ''}`} style={Object.assign({width: `${size}px`, height: `${size}px`, borderWidth: `${lineWidth}px`}, style || {})}>
        <div ref={el => {this.$hour = el;}} className="bi-clock-hour" style={{width: `${lineWidth}px`}}></div>
        <div ref={el => {this.$minute = el;}} className="bi-clock-minute" style={{width: `${lineWidth}px`}}></div>
        <div className="bi-clock-origin" style={{width: `${lineWidth + 1}px`, height: `${lineWidth + 1}px`}}></div>
      </div>
    );
  }
}
