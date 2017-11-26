import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    value: ''
  }
  render() {
    const { name, style, value, onClick } = this.props;
    return (
      <input type="radio" className="radio" style={style} name={name} value={value} onClick={onClick}/>
    );
  }
}
