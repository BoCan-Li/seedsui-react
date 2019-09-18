import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance';

export default class InputRange extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
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
    const instance = new Instance(this.$el);
    this.instance = instance;
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(this.$input.value, Object.getArgs(e, this.props.args));
    }
  }
  render() {
    const {disabled, style, className, value, min, max, step} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`range${className ? ' ' + className : ''}`} style={style}>
        <input disabled={disabled} ref={el => {this.$input = el;}} type="range" className="range-input" min={min} max={max} step={step} defaultValue={value}/>
        <div ref={el => {this.$tooltip = el;}} className="range-tooltip">{value}</div>
      </div>
    );
  }
}
