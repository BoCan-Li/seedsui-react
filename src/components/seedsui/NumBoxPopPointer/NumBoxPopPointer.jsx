import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumBoxPop from './../NumBoxPop/NumBoxPop.jsx';

const UnitStyle = {
  fontSize: '13px',
  marginLeft: '8px'
};

export default class NumBoxPopPointer extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 文本框
    style: PropTypes.object,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    unit: PropTypes.string,
    // events
    onChange: PropTypes.func,
    // rule设置
    min: PropTypes.number,
    max: PropTypes.number,
    digits: PropTypes.number,
  };

  static defaultProps = {
    args: null,
    min: 0,
    max: 99999
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event')) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClickCancel = () => {
    this.setState({show: false});
  }
  onClickSubmit = (value, args) => {
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, args);
    // 隐藏
    this.setState({
      show: false
    });
  }
  onChange = (value) => {
    this.setState({value: value});
  }
  onClickNumBox = () => {
    this.setState({
      show: true
    });
  }
  onClickMinus = (e) => {
    const value = Math.Calc.subtract(this.$input.value, 1);
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  onClickPlus = (e) => {
    const value = Math.Calc.add(this.$input.value, 1);
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  getInputDOM = () => {
    const {
      valueBindProp, value, placeholder, min, max
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="number" value={value} min={min} max={max} readOnly placeholder={placeholder} onClick={this.onClickNumBox} className={`numbox-input`} disabled={min >= max}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} min={min} max={max} readOnly placeholder={placeholder} onClick={this.onClickNumBox} className={`numbox-input`} disabled={min >= max}/>;
  }
  render() {
    const {style, min, max, digits, unit, value, disabled, args} = this.props;
    const {show} = this.state;
    return (
      <div style={Object.assign({position: 'relative'}, style)}>
        <div disabled={disabled} className={`numbox sm bordered`}>
          <input type="button" className="numbox-button" disabled={this.$input ? this.$input.value <= min : value <= min} value="-" onClick={this.onClickMinus}/>
          {this.getInputDOM()}
          <input type="button" className="numbox-button" disabled={this.$input ? this.$input.value >= max : value >= max} value="+" onClick={this.onClickPlus}/>
        </div>
        <span style={UnitStyle}>{unit || ''}</span>
        <NumBoxPop valueBindProp show={show} args={args} value={this.$input ? this.$input.value : value.toString()} digits={digits} min={min} max={max} onClickCancel={this.onClickCancel} onClickSubmit={this.onClickSubmit}/>
      </div>
    );
  }
}