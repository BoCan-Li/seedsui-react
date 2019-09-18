import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Mark extends Component {
  static propTypes = {
    className: PropTypes.string, // 'info | success | cancel | warn | disable | primary | hint'
    children: PropTypes.node,
  }
  static defaultProps = {
    className: 'info'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {className, children, ...others} = this.props;
    return (
      children ? <span ref={el => {this.$el = el;}} className={`mark${className ? ' ' + className : ''}`} {...others}>{children}</span> : null
    );
  }
}
