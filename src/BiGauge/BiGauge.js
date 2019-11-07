import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BiGauge extends Component {
  static propTypes = {
    duration: PropTypes.number, // 时长
    rotate: PropTypes.number, // 最大270
    delay: PropTypes.number, // 延时
    
    captionAttribute: PropTypes.object,
    children: PropTypes.node,
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
      duration,
      rotate,
      delay,
      captionAttribute = {},
      children,
      ...others
    } = this.props;
    // 动画旋转
    this.aniRotate();
    return (
      <div ref={(el) => {this.$el = el;}} {...others} className={`bi-gauge-box${others.className ? ' ' + others.className : ''}`}>
        <div className="bi-gauge">
          <div ref={(el) => {this.$elPointer = el;}} className="bi-gauge-pointer"></div>
          <div {...captionAttribute} className={`bi-gauge-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
