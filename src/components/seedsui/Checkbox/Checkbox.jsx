import React, { Component, PropTypes } from 'react';

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
  constructor(props) {
    super(props);
  }
  render() {
    const { name, style, className, value, checked, onChange } = this.props;
    return (
      <input type="checkbox" className={`checkbox ${className}`} style={style} name={name} value={value} onChange={onChange} checked={checked}/>
    );
  }
}
