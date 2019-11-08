import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Popover extends Component {
  static propTypes = {
    args: PropTypes.any,
    portal: PropTypes.object,
    show: PropTypes.bool,

    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    isClickMaskHide: PropTypes.bool,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    onClickMask: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
    isClickMaskHide: true,
    animation: 'zoom'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(Object.getArgs(e, this.props.args));
    e.stopPropagation();
  }
  render() {
    const {
      show,
      maskClassName, maskStyle,
      className, style, animation,
      children,
    } = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`mask popover-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={maskStyle} onClick={this.onClickMask}>
        <div style={style} className={`popover${className ? ' ' + className : ''}${show ? ' active' : ''}`} data-animation={animation}>
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root') || document.body
    );
  }
}
