import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { style, className, children } = this.props;
    return (
      <section ref={(el) => {this.$el = el}} className={'page' + (className ? ' ' + className : '')} style={style}>
        { children }
      </section>
    );
  }
}
