import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Checkbox extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    value: ''
  }
  render() {
    const { name, style, className, value, checked, onChange } = this.props;
    return (
      <input type="checkbox" className={`checkbox ${className}`} style={style} name={name} value={value} onChange={onChange} checked={checked}/>
    );
  }
}
