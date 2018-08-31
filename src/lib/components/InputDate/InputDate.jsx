import React, { Component } from 'react';
import InputText from './../InputText';
import PickerDate from './../PickerDate';

export default class InputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  static defaultProps = {
    type: 'date',
    error: {
      currentName: '',
      compareName: ''
    }
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = () => {
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
      this.props.onChange(value, options, this.refs.$ComponentInputText.getArgs());
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
    console.log(onError);
    const selectDate = new Date(text);
    const current = this.$input.value;
    const error = this.props.error;
    if (min && (min.isDate() || min.isTime())) {
      if (type === 'date' && selectDate.compareDate(min) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      }
      if (type === 'month' && selectDate.compareMonth(min) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      }
      if (type === 'time' && selectDate.compareTime(min) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      }
      if (type === 'datetime' && selectDate.compareDateTime(min) === -1) {
        if (onError) {
          onError({msg: '不能小于' + min, select: text, min: min, current: current, ...error});
          return false;
        }
        text = min;
      }
    }
    if (max && (max.isDate() || max.isTime())) {
      if (type === 'date' && selectDate.compareDate(max) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      }
      if (type === 'month' && selectDate.compareMonth(max) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      }
      if (type === 'time' && selectDate.compareTime(max) === 1) {
        if (onError) {
          onError({msg: '不能大于' + max, select: text, max: max, current: current, ...error});
          return false;
        }
        text = max;
      }
      if (type === 'datetime' && selectDate.compareDateTime(max) === 1) {
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
    return [
      <InputText key="input" ref="$ComponentInputText" {...this.props} type="text" readOnly onClick={this.onClick}/>,
      <PickerDate
        type={this.props.type || 'date'} // 'date','month','time','datetime'
        value={this.$input ? this.$input.value : this.props.value} key="pickerdate"
        show={this.state.show}
        style={this.props.pickerStyle} className={this.props.pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
