import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Group extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  static defaultProps = {
    className: 'border-tb'
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
      <div ref={el => {this.$el = el;}} {...others} className={'group' + (others.className ? ' ' + others.className : '')}>
        {children}
      </div>
    );
  }
}
