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
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    // unit
    unit: PropTypes.string,
    // events
    onChange: PropTypes.func
  };

  static defaultProps = {
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
    const {
      args,
      className, style,
      numboxClassName, numboxStyle, value, disabled, min, max,
      unit,
      onChange,
      ...others
    } = this.props;
    const {show} = this.state;
    return (
      <div style={Object.assign({position: 'relative'}, style)} className={className}>
        <NumBox valueBindProp className={numboxClassName} args={args} style={numboxStyle} value={value} disabled={disabled} readOnly min={min} max={max} onChange={onChange} onClickInput={this.onClickNumBox}/>
        <span style={UnitStyle}>{unit || ''}</span>
        <NumBoxPop show={show} args={args} value={this.$input ? this.$input.value : value.toString()} min={min} max={max} onClickCancel={this.onClickCancel} onClickSubmit={this.onClickSubmit}  {...others}/>
      </div>
    );
  }
}
