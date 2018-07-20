import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './dialog.js';

export default class Dialog extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    position: PropTypes.string,
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
    this.state = {
      instance: null
    };
  }
  /* shouldComponentUpdate = (nextProps) => { // 因为是容器,不能使用此方法,不然会影响内部元素的更新
    if (this.props.show === nextProps.show) {
      return false;
    }
    return true;
  } */
  componentDidUpdate = (prevProps) => {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.state.instance.show();
      } else if (!this.props.show) {
        this.state.instance.hide();
      }
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return;
    const {args, duration, isClickMaskHide, onClickMask, onShowed, onHid} = this.props;
    const instance = new Instance({
      mask: this.$el,
      args,
      duration: duration,
      isClickMaskHide,
      onClickMask: onClickMask || null,
      onShowed: onShowed || null,
      onHid: onHid || null
    });
    if (this.props.show) instance.show();
    this.setState({
      instance
    });
  }
  render() {
    const {
      maskClassName, maskStyle,
      className, style, animation,
      children
    } = this.props;
    let position = this.props.position;
    if (!position) {
      switch (animation) {
        case 'slideLeft':
          position = 'right';
          break;
        case 'slideRight':
          position = 'left';
          break;
        case 'slideUp':
          position = 'bottom';
          break;
        case 'slideDown':
          position = 'top';
          break;
        case 'zoom':
          position = 'middle';
          break;
        case 'fade':
          position = 'middle';
          break;
        default:
        position = 'middle';
      }
    }
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask dialog-mask${maskClassName ? ' ' + maskClassName : ''}`} style={maskStyle}>
        <div style={style} className={`dialog${position ? ' ' + position : ''}${className ? ' ' + className : ''}`} data-animation={animation}>
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
