import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  render() {
    const { style, className } = this.props;
    return (
      <section className={'page' + (className ? ' ' + className : '')} style={style}>
        { this.props.children }
      </section>
    );
  }
}
