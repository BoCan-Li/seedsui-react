import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Peg extends Component {
  static propTypes = {
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {...others} = this.props;
    return (
      <i ref={el => {this.$el = el;}} {...others} className={`peg${others.className ? ' ' + others.className: ''}`}></i>
    );
  }
}
