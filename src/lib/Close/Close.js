import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Close extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    className: 'close-icon close-icon-clear size18'
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const {className, style, ...others} = this.props;
    return (
      <span ref={el => {this.$el = el;}} className={`icon${className ? ' ' + className : ''}`} style={style} {...others}></span>
    );
  }
}
