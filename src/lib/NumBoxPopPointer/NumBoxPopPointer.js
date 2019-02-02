import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumBox from './../NumBox';
import NumBoxPop from './../NumBoxPop';

export default class NumBoxPopPointer extends Component {
  static propTypes = {
    args: PropTypes.any,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    // numbox
    className: PropTypes.string,
    style: PropTypes.object,
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
    className: 'sm',
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
      containerClassName, containerStyle,
      className, style, value, disabled, min, max, digits,
      unitClassName, unitStyle, unit,
      onChange,
      ...others
    } = this.props;
    const {show} = this.state;
    return (
      <div style={Object.assign({position: 'relative'}, containerStyle)} className={containerClassName}>
        <NumBox
          args={args}
          className={className}
          style={style}
          value={value}
          disabled={disabled}
          readOnly
          min={min}
          max={max}
          digits={digits}
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
