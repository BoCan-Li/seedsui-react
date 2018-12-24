import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumBox from './../NumBox';
import NumBoxPop from './../NumBoxPop';

export default class NumBoxPopPointer extends Component {
  static propTypes = {
    args: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object,
    // numbox
    numboxClassName: PropTypes.string,
    numboxStyle: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    digits: PropTypes.oneOfType([
      PropTypes.bool,
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
    disabled: PropTypes.bool,
    // unit
    unitClassName: PropTypes.string,
    unitStyle: PropTypes.object,
    unit: PropTypes.string,
    // events
    onChange: PropTypes.func
  };

  static defaultProps = {
    numboxClassName: 'sm',
    unitStyle: {
      fontSize: '13px',
      marginLeft: '8px'
    }
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
    const {
      args,
      className, style,
      numboxClassName, numboxStyle, value, disabled, min, max, digits,
      unitClassName, unitStyle, unit,
      onChange,
      ...others
    } = this.props;
    const {show} = this.state;
    return (
      <div style={Object.assign({position: 'relative'}, style)} className={className}>
        <NumBox
          args={args}
          className={numboxClassName}
          style={numboxStyle}
          value={value}
          disabled={disabled}
          readOnly
          min={min}
          max={max}
          digits={digits}
          onChange={onChange}
          onClickInput={this.onClickNumBox}
        />
        <span style={unitStyle} className={unitClassName}>{unit || ''}</span>
        <NumBoxPop
          args={args}
          show={show}
          value={value}
          min={min}
          max={max}
          digits={digits}
          onClickCancel={this.onClickCancel}
          onClickSubmit={this.onClickSubmit}
          {...others}
        />
      </div>
    );
  }
}
