import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BiGauge extends Component {
  static propTypes = {
    duration: PropTypes.number, // 时长
    rotate: PropTypes.number, // 最大270
    delay: PropTypes.number, // 延时

    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object
  };

  static defaultProps = {
    duration: 1000,
    rotate: 0,
    delay: 100,
  }

  constructor(props, context) {
    super(props, context);
  }
  getDuration = () => {
    const {duration, rotate} = this.props;
    return duration / 270 * rotate;
  }
  getRotate = () => {
    const {rotate} = this.props;
    return rotate > 270 ? 270 : rotate;
  }
  getBgLvl = () => {
    const {rotate} = this.props;
    const lvl = Math.round(rotate / 27)
    return lvl > 10 ? 10 : 1;
  }
  // 只有延迟100毫秒动画才会生效
  aniRotate = () => {
    // 时长
    const duration = this.getDuration();
    // 旋转
    const rotate = this.getRotate();
    // 背景
    const bgLvl = 'bg' + this.getBgLvl();
    setTimeout(() => {
      if (this.$el) {
        this.$el.style.WebkitAnimationDuration = `${duration}ms`;
        this.$el.classList.add(bgLvl);
      }
      if (this.$elPointer) {
        this.$elPointer.style.WebkitTransitionDuration = `${duration}ms`;
        this.$elPointer.style.WebkitTransform = `rotate(${rotate}deg)`;
      }
    }, this.props.delay);
  }
  render() {
    const {
      className, style,
      children, captionClassName, captionStyle
    } = this.props;
    // 动画旋转
    this.aniRotate();
    return (
      <div ref={(el) => {this.$el = el;}} className={`bi-gauge-box${className ? ' ' + className : ''}`} style={style}>
        <div className="bi-gauge">
          <div ref={(el) => {this.$elPointer = el;}} className="bi-gauge-pointer"></div>
          <div className={`bi-gauge-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
