import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumBoxPop from './../NumBoxPop';

const UnitStyle = {
  fontSize: '13px',
  marginLeft: '8px'
};

export default class NumBoxPopPointer extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    // numbox
    numboxClassName: PropTypes.string,
    numboxStyle: PropTypes.object,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    unit: PropTypes.string,
    // events
    onChange: PropTypes.func,
    // rule设置
    min: PropTypes.number,
    max: PropTypes.number,
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ])
  };

  static defaultProps = {
    args: null,
    min: 0,
    max: 99999,
    numboxClassName: 'sm'
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
    if (!value) return;
    // 赋值
    this.$input.value = value;
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
    this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  onClickPlus = (e) => {
    const value = Math.Calc.add(this.$input.value, 1);
    // 赋值
    this.$input.value = value;
    // Callback
    if (this.props.onChange) this.props.onChange(value, this.getArgs(e));
  };
  getInputDOM = () => {
    const {
      value, placeholder, min, max
    } = this.props;
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} min={min} max={max} readOnly placeholder={placeholder} onClick={this.onClickNumBox} className={`numbox-input`} disabled={min >= max}/>;
  }
  render() {
    const {className, style, numboxClassName, numboxStyle, min, max, digits, unit, value, disabled, args} = this.props;
    const {show} = this.state;
    // 减按钮禁用
    let minusDisabled = false;
    minusDisabled = this.$input ? this.$input.value <= min : value <= min;
    // 加按钮禁用
    let plusDisabled = false;
    plusDisabled = this.$input ? this.$input.value >= max : value >= max;
    return (
      <div style={Object.assign({position: 'relative'}, style)} className={className}>
        <div disabled={disabled} className={`numbox bordered${numboxClassName ? ' ' + numboxClassName : ''}`} style={numboxStyle}>
          <input type="button" className="numbox-button" disabled={minusDisabled} value="-" onClick={this.onClickMinus}/>
          {this.getInputDOM()}
          <input type="button" className="numbox-button" disabled={plusDisabled} value="+" onClick={this.onClickPlus}/>
        </div>
        <span style={UnitStyle}>{unit || ''}</span>
        <NumBoxPop show={show} args={args} value={this.$input ? this.$input.value : value.toString()} digits={digits} min={min} max={max} onClickCancel={this.onClickCancel} onClickSubmit={this.onClickSubmit}/>
      </div>
    );
  }
}
