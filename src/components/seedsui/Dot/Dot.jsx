import React, { Component, PropTypes } from 'react';

export default class Dot extends Component {
  static propTypes = {
    className: PropTypes.bool,
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
      <i className={`dot ${className}`} style={Object.assign(style, size ? {width: size, height: size} : {})}></i>
    );
  }
}
