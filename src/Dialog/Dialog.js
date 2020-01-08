import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Dialog extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    onClick: PropTypes.func,
    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    duration: PropTypes.number,

    maskAttribute: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
    animation: 'fade'
  }
  constructor(props) {
    super(props);
  }
  /* shouldComponentUpdate = (nextProps) => { // 因为是容器,不能使用此方法,不然会影响内部元素的更新
    if (this.props.show === nextProps.show) {
      return false;
    }
    return true;
  } */
  componentDidMount = () => {
  }
  // 点击dialog主体
  onClick = (e) => {
    e.stopPropagation()
  }
  render() {
    const {
      portal,
      show,
      onClick,
      animation,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      duration,

      maskAttribute = {},

      children,
      ...others
    } = this.props;
    // 构建动画
    let animationClassName = '';
    switch (animation) {
      case 'slideLeft':
        animationClassName = 'popup-animation right-middle';
        break;
      case 'slideRight':
        animationClassName = 'popup-animation left-middle';
        break;
      case 'slideUp':
        animationClassName = 'popup-animation bottom-center';
        break;
      case 'slideDown':
        animationClassName = 'popup-animation top-center';
        break;
      case 'zoom':
        animationClassName = 'popup-animation middle';
        break;
      case 'fade':
        animationClassName = 'popup-animation middle';
        break;
      default:
        animationClassName = 'popup-animation middle';
    }
    // 动画时长
    let durationStyle = {};
    if (typeof duration === 'number') {
      durationStyle = {
        WebkitTransitionDuration: duration + 'ms'
      }
    }
    return createPortal(
      <div
        ref={el => {this.$el = el;}}
        {...maskAttribute}
        className={`mask dialog-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, maskAttribute.style || {})}
      >
        <div
          {...others}
          className={`dialog${animationClassName ? ' ' + animationClassName : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
          onClick={onClick ? onClick : this.onClick}
          data-animation={animation}
        >
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root') || document.body
    );
  }
}
