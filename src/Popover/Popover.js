import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Popover extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    onClick: PropTypes.func,
    maskAttribute: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    animation: 'zoom'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  // 点击popover主体
  onClick = (e) => {
    e.stopPropagation()
  }
  render() {
    const {
      portal,
      show,
      animation,
      onClick,
      maskAttribute = {},
      children,
      ...others
    } = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} {...maskAttribute} className={`mask popover-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}>
        <div {...others} className={`popover${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`} data-animation={animation} onClick={onClick ? onClick : this.onClick}>
          {children && children}
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    );
  }
}
