import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Peg extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {className, style} = this.props;
    return (
      <i ref={el => {this.$el = el;}} className={`peg${className ? ' ' + className: ''}`} style={style}></i>
    );
  }
}
