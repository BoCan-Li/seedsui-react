import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
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
      <header ref={el => {this.$el = el;}} {...others} className={`header${others.className ? ' ' + others.className : ''}`}>
        {children}
      </header>
    );
  }
}
