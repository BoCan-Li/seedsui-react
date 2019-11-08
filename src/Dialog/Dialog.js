import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Dialog extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,

    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade

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

      animation,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade

      maskAttribute = {},

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
      <div ref={el => {this.$el = el;}} {...maskAttribute} className={`mask dialog-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}>
        <div {...others} className={`dialog${transformOrigin ? ' ' + transformOrigin : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`} onClick={others.onClick ? others.onClick : this.onClick} data-animation={animation}>
          {children && children}
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
