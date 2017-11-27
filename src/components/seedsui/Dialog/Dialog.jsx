import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from './dialog.js';

export default class Dragrefresh extends Component {
  static propTypes = {
    style: PropTypes.object,
    position: PropTypes.string,
    animation: PropTypes.func,
    children: PropTypes.node,
    isClickMaskHide: PropTypes.bool,
    onClick: PropTypes.func,
    onClickMask: PropTypes.func,
    onTransitionEnd: PropTypes.func,
    onShowed: PropTypes.func,
    onHid: PropTypes.func
  }
  static defaultProps = {
    isClickMaskHide: true,
    animation: 'fade',
    position: ''
  }
  componentDidMount = () => {
    var instance = new Dialog({
      mask: this.mask,
      isClickMaskHide: this.props.isClickMaskHide,
      animation: this.props.animation,
      position: this.props.position,
      onClick: this.props.onClick,
      onClickMask: this.props.onClickMask,
      onTransitionEnd: this.props.onTransitionEnd,
      onShowed: this.props.onShowed,
      onHid: this.props.onHid
    });
    this.state = {
      instance: instance
    };
  }
  render() {
    const { style, position, animation } = this.props;
    return (
      <div className="mask" ref={(ref) => this.mask = ref}>
        <div style={style} className={'dialog' + (position ? ' ' + position : '')} data-animation={animation}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
