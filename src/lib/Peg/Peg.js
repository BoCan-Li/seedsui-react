import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Peg extends Component {
  static propTypes = {
    className: PropTypes.string
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {className, ...others} = this.props;
    return (
      <i ref={el => {this.$el = el;}} className={`peg${className ? ' ' + className: ''}`} {...others}></i>
    );
  }
}
