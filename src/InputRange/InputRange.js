import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';

export default class InputRange extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    step: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    disabled: PropTypes.bool,
    inputAttribute: PropTypes.object,
    tooltipAttribute: PropTypes.object,
    onChange: PropTypes.func
  }
  static defaultProps = {
    value: '0',
    min: '0',
    max: '100',
    step: '1'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.instance = new Instance(this.$el,{
      onChange: this.onChange(e)
    });
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e, this.$input.value);
    }
  }
  render() {
    const {
      value,
      min,
      max,
      step,
      disabled,
      inputAttribute = {},
      tooltipAttribute = {},
      onChange,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`range${others.className ? ' ' + others.className : ''}`}>
        <input ref={el => {this.$input = el;}} {...inputAttribute} disabled={disabled} type="range" className={`range-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`} min={min} max={max} step={step} defaultValue={value}/>
        <div ref={el => {this.$tooltip = el;}} {...tooltipAttribute} className={`range-tooltip${tooltipAttribute.className ? ' ' + tooltipAttribute.className : ''}`}>{value}</div>
      </div>
    );
  }
}
