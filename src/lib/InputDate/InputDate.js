// require PrototypeDate.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerDate from './../PickerDate';

export default class InputDate extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    valueForKey: PropTypes.string,
    split: PropTypes.string,
    type: PropTypes.string, // 'date | month | time | datetime'
    min: PropTypes.string, // yyyy-MM-dd
    max: PropTypes.string, // yyyy-MM-dd
    pickerStyle: PropTypes.bool,
    pickerClassName: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func
  }
  static defaultProps = {
    split: '-',
    type: 'date',
    error: {
      currentName: '',
      compareName: ''
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (value, args) => {
    if (this.props.onClick) this.props.onClick(value, args);
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (e) => {
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = this.correctDate(e.activeText);
    if (!value) return;
    const options = e.activeOptions;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(value, options, this.props.args);
    }
  }
  onClickCancel = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClickMask = () => {
    this.setState({
      show: !this.state.show
    });
  }
  // 日期纠正
  correctDate = (value) => {
    let text = value;
    const {type, min, max, onError} = this.props;
    const selectDate = text.toDate();
    const current = this.$input.value;
    const error = this.props.error;
    if (min && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(min) || /^[0-9]{2}:[0-9]{2}$/.test(min))) {
      if (type === 'date' && selectDate.compareDate(min.toDate()) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      } else if (type === 'month' && selectDate.compareMonth(min.toDate()) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      } else if (type === 'time' && selectDate.compareTime(min.toDate()) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      } else if (type === 'datetime' && selectDate.compareDateTime(min.toDate()) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      }
    }
    if (max && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(max) || /^[0-9]{2}:[0-9]{2}$/.test(max))) {
      if (type === 'date' && selectDate.compareDate(max.toDate()) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      } else if (type === 'month' && selectDate.compareMonth(max.toDate()) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      } else if (type === 'time' && selectDate.compareTime(max.toDate()) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      } else if (type === 'datetime' && selectDate.compareDateTime(max.toDate()) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      }
    }
    return text;
  }
  render() {
    const {valueForKey, split, min, max, type, pickerStyle, pickerClassName, onClick, onChange, onError, ...others} = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClick}/>,
      <PickerDate
        valueForKey={valueForKey}
        split={split}
        type={type}
        value={this.$input ? this.$input.value : this.props.value} key="pickerdate"
        show={this.state.show}
        style={pickerStyle} className={pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
