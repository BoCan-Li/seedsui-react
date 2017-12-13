import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Dialog extends Component {
  static propTypes = {
    style: PropTypes.object,
    show: PropTypes.bool,
    position: PropTypes.string,
    animation: PropTypes.string,
    isClickMaskHide: PropTypes.bool,
    onClick: PropTypes.func,
    onClickMask: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    onShowed: PropTypes.func,
    onHid: PropTypes.func,
    children: PropTypes.node
  }
  static defaultProps = {
    style: {},
    isClickMaskHide: false,
    animation: 'fade',
    position: 'middle'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { children, show, style, position, animation, onClick, onClickMask } = this.props;
    return (
      show && <div onClick={onClickMask} className={'mask active'}>
        <div onClick={(e) => {e.stopPropagation(); if (onClick) onClick(e);}} style={style} className={'dialog active' + (position ? ' ' + position : '')} data-animation={animation}>
          {children && children}
        </div>
      </div>
    );
  }
}
