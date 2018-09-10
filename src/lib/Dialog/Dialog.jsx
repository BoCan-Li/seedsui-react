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
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(this.getArgs(e));
    e.stopPropagation();
  }
  onClickDialog = (e) => {
    e.stopPropagation();
  }
  render() {
    const {
      duration, show,
      maskClassName, maskStyle,
      className, style, animation,
      children
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
      <div ref={el => {this.$el = el;}} className={`mask dialog-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)} onClick={this.onClickMask}>
        <div className={`dialog${transformOrigin ? ' ' + transformOrigin : ''}${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)} data-animation={animation} onClick={this.onClickDialog}>
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
