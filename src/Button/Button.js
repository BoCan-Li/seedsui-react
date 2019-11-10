import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      children,
      ...others
    } = this.props;
    return (
      <a ref={el => {this.$el = el;}} {...others} className={'button' + (others.className ? ' ' + others.className : '')}>
        {children}
      </a>
    );
  }
}
