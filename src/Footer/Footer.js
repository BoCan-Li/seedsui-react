import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  static propTypes = {
    children: PropTypes.node
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
      <footer ref={el => {this.$el = el;}} {...others} className={`footer${others.className ? ' ' + others.className : ''}`}>
        {children}
      </footer>
    );
  }
}
