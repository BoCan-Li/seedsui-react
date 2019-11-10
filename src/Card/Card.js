import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
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
      <div ref={el => {this.$el = el;}} {...others} className={'card' + (others.className ? ' ' + others.className : '')}>
        {children}
      </div>
    );
  }
}
