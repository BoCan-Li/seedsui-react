import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BiDoughnut extends Component {
  static propTypes = {
    lineWidth: PropTypes.number, // 边框宽度
    size: PropTypes.number, // 大小,px
    duration: PropTypes.number, // 时长
    rotate: PropTypes.number, // 最大360
    delay: PropTypes.number, // 延时

    className: PropTypes.string,

    children: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object
  };

  static defaultProps = {
    lineWidth: 3,
    size: 50,
    duration: 1000,
    rotate: 0,
    delay: 100,
    className: 'disabled'
  }

  constructor(props, context) {
    super(props, context);
  }
  getDuration = () => {
    const {duration, rotate} = this.props;
    const correctRotate = rotate > 360 ? 360 : rotate
    const duration1 = duration / 360;
    const durationRotate = duration1 * correctRotate;
    let durationLeft = 0;
    let durationRight = durationRotate;
    if (correctRotate > 180) {
      durationRight = duration1 * 180;
      durationLeft = duration1 * (correctRotate - 180);
    }
    return {
      durationRotate: durationRotate,
      delayLeft: durationRight,
      durationLeft: durationLeft,
      durationRight: durationRight
    }
  }
  getRotate = () => {
    const {rotate} = this.props;
    let rotateLeft = -135; // 左circle旋转角度
    let rotateRight = -135 + rotate; // 右circle旋转角度
    if (rotate > 180) {
      rotateRight = 45;
      rotateLeft = -135 + (rotate - 180);
    }
    return {
      rotateLeft,
      rotateRight
    }
  }
  // 只有延迟100毫秒动画才会生效
  aniRotate = () => {
    // 时长与延时
    const duration = this.getDuration();
    const durationLeft = duration.durationLeft;
    const delayLeft = duration.delayLeft;
    const durationRight = duration.durationRight;
    // 旋转
    const rotate = this.getRotate();
    let rotateLeft = rotate.rotateLeft;
    let rotateRight = rotate.rotateRight;
    setTimeout(() => {
      if (this.$elLeftCircle) {
        this.$elLeftCircle.style.WebkitTransitionDuration = `${durationLeft}ms`;
        this.$elLeftCircle.style.WebkitTransitionDelay = `${delayLeft}ms`;
      }
      if (this.$elRightCircle) {
        this.$elRightCircle.style.WebkitTransitionDuration = `${durationRight}ms`;
      }
      if (this.$elLeftCircle) {
        this.$elLeftCircle.style.WebkitTransform = `rotate(${rotateLeft}deg)`;
      }
      if (this.$elRightCircle) {
        this.$elRightCircle.style.WebkitTransform = `rotate(${rotateRight}deg)`;
      }
    }, this.props.delay);
  }
  render() {
    const {
      lineWidth, size,
      className,
      children, captionClassName, captionStyle
    } = this.props;
    // 动画旋转
    this.aniRotate();
    return (
      <div className={`bi-doughtut ${className}`} style={{width: `${size}px`, height: `${size}px`}}>
        <div className="bi-doughtut-wrapper left">
          <div ref={(el) => {this.$elLeftCircle = el;}} className="bi-doughtut-circle left" style={{borderWidth: `${lineWidth}px`, width: `${size - (lineWidth * 2)}px`, height: `${size - (lineWidth * 2)}px`}}></div>
        </div>
        <div className="bi-doughtut-wrapper right">
          <div ref={(el) => {this.$elRightCircle = el;}} className="bi-doughtut-circle right" style={{borderWidth: `${lineWidth}px`, width: `${size - (lineWidth * 2)}px`, height: `${size - (lineWidth * 2)}px`}}></div>
        </div>
        <div className={`bi-doughtut-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{children}</div>
      </div>
    );
  }
}
