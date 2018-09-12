import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dot extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.string
  }
  static defaultProps = {
    style: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { className, style, size } = this.props;
    return (
      <i ref={el => {this.$el = el;}} className={`dot${className ? ' ' + className : ''}`} style={Object.assign(style, size ? {width: size, height: size} : {})}></i>
    );
  }
}
