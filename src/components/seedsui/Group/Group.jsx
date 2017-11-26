import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  render() {
    const { children, style, className } = this.props;
    return (
      <div className={'group' + (className ? ' ' + className : '')} style={style}>
        {children}
      </div>
    );
  }
}
