import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Range extends Component {
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
    this.state = {
      instance: null
    }
  }
  componentDidMount () {
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onChange = (e) => {
    if (this.props.disabled) return;
    this.hide(e);
    if (this.props.onChange) {
      this.props.onChange(this.$input.value, this.getArgs(e));
    }
  }
  show = (e) => {
    const input = e.target;
    const tooltip = e.target.previousElementSibling;
    this.showTooltip(tooltip, input);
  }
  hide = (e) => {
    const tooltip = e.target.previousElementSibling;
    tooltip.style.visibility = 'hidden';
  }
  // 显示tooltip
	showTooltip = (tooltip, input) => {
		//当前值所占百分比
		var percent = ((input.value - input.min) / (input.max - input.min)).toFixed(2)

		//距左的位置
		var dragRange = input.clientWidth * percent
		var offsetLeft = input.offsetLeft + dragRange - 10
		//var currentOffsetLeft=offsetLeft-input.parentNode.offsetLeft

		//滑块内部的实际位置
		var currentBallLeft = 28 * percent

		//当前值的位置-滑块的位置=小球正中间的位置
		var left = offsetLeft - currentBallLeft
		tooltip.innerHTML = input.value
    tooltip.style.visibility = 'visible';
    tooltip.style.left = left + 'px';
	}
  render() {
    const {style, className, value, min, max, step} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`range${className ? ' ' + className : ''}`} style={style}>
        <div className="range-tooltip">{value}</div>
        <input ref={el => {this.$input = el;}} type="range" className="range-input" min={min} max={max} step={step} defaultValue={value} onTouchMove={this.show} onTouchEnd={this.onChange}/>
      </div>
    );
  }
}
