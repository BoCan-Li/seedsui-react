import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Container extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onScroll: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    children: PropTypes.node,
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount () {
    const {onScroll, onTouchStart, onTouchMove, onTouchEnd} = this.props;
    const touchTarget = this.$el;
    if (onTouchStart) {
      touchTarget['addEventListener']('touchstart', onTouchStart, false)
    }
    if (onTouchStart) {
      touchTarget['addEventListener']('touchmove', onTouchMove, false)
    }
    if (onTouchEnd) {
      touchTarget['addEventListener']('touchend', onTouchEnd, false)
      touchTarget['addEventListener']('touchcancel', onTouchEnd, false)
    }
    if (onScroll) {
      touchTarget['addEventListener']('scroll', onScroll, false)
    }
  }
  render() {
    const {style, className, children} = this.props;
    return (
      <article ref={el => {this.$el = el;}} className={'container' + (className ? ' ' + className : '')} style={style}>
        {children}
      </article>
    );
  }
}
