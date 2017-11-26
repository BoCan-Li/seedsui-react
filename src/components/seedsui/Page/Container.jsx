import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Container extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }

  render() {
    const { style, className } = this.props;
    return (
      <article className={'container' + (className ? ' ' + className : '')} style={style}>
        { this.props.children }
      </article>
    );
  }
}
