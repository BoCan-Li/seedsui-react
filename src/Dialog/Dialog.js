import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Dialog extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    duration: PropTypes.number,
    isClickMaskHide: PropTypes.bool,
    onClickMask: PropTypes.func,
    onShowed: PropTypes.func,
    onHid: PropTypes.func,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,

    className: PropTypes.string,
    style: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
    args: null,
    isClickMaskHide: false,
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
  componentDidUpdate = (prevProps) => {
  }
  componentDidMount = () => {
  }
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(Object.getArgs(e, this.props.args));
    e.stopPropagation();
  }
  onClickDialog = (e) => {
    e.stopPropagation();
  }
  render() {
    const {
      portal, args,
      maskClassName, maskStyle, isClickMaskHide, onClickMask, onShowed, onHid,
      duration, show,
      className, style, animation,
      children,
      ...others
    } = this.props;
    let transformOrigin = 'middle';
    switch (animation) {
      case 'slideLeft':
        transformOrigin = 'right-middle';
        break;
      case 'slideRight':
        transformOrigin = 'left-middle';
        break;
      case 'slideUp':
        transformOrigin = 'bottom-center';
        break;
      case 'slideDown':
        transformOrigin = 'top-center';
        break;
      case 'zoom':
        transformOrigin = 'middle';
        break;
      case 'fade':
        transformOrigin = 'middle';
        break;
      default:
        transformOrigin = 'middle';
    }
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask dialog-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)} onClick={this.onClickMask} {...others}>
        <div className={`dialog${transformOrigin ? ' ' + transformOrigin : ''}${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)} data-animation={animation} onClick={this.onClickDialog}>
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}