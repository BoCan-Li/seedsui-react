import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumBox from './../NumBox';
import NumBoxPop from './../NumBoxPop';

const UnitStyle = {
  fontSize: '13px',
  marginLeft: '8px'
};

export default class NumBoxPopPointer extends Component {
  static propTypes = {
    args: PropTypes.any,
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
  onClickCancel = () => {
    this.setState({show: false});
  }
  onClickSubmit = (value, args) => {
    if (!value) return;
    // Callback
    if (this.props.onChange) this.props.onChange(value, args);
    // 隐藏
    this.setState({
      show: false
    });
  }
  onClickNumBox = () => {
    this.setState({
      show: true
    });
  }
  render() {
    const {className, style, numboxClassName, numboxStyle, value, min, max, digits, unit, disabled, args, onChange} = this.props;
    const {show} = this.state;
    return (
      <div style={Object.assign({position: 'relative'}, style)} className={className}>
        <NumBox className={numboxClassName} args={args} style={numboxStyle} value={value} disabled={disabled} readOnly min={min} max={max} onChange={onChange} onClickInput={this.onClickNumBox}/>
        <span style={UnitStyle}>{unit || ''}</span>
        <NumBoxPop show={show} args={args} value={this.$input ? this.$input.value : value.toString()} digits={digits} min={min} max={max} onClickCancel={this.onClickCancel} onClickSubmit={this.onClickSubmit}/>
      </div>
    );
  }
}
