import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    animation: PropTypes.string,
    onScroll: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    children: PropTypes.node
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
    const {animation, style, className, children} = this.props;
    return (
      <section ref={(el) => {this.$el = el}} className={'page' + (className ? ' ' + className : '')} data-animation={animation} style={style}>
        {children}
      </section>
    );
  }
}
