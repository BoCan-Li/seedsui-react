import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dot extends Component {
  static propTypes = {
    style: PropTypes.object,
    size: PropTypes.string
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      style,
      size,
      ...others
    } = this.props;
    return (
      <i ref={el => {this.$el = el;}} {...others} className={`dot${others.className ? ' ' + others.className : ''}`} style={Object.assign(size ? {width: size, height: size} : {}, style || {})}></i>
    );
  }
}
