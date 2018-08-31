import React, { Component } from 'react';
import InputText from './../InputText';
import SelectPicker from './../SelectPicker';

export default class InputSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  getValue = (options) => {
    if (!this.props.multiple) return options[0].value;
    const value = options.map((item) => {
      return item.value;
    });
    return value.join(',');
  }
  getOptions = (options) => {
    return this.props.multiple ? options : options[0]
  }
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (e) => {
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = this.getValue(e.activeOptions);
    var options = this.getOptions(e.activeOptions);
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
  render() {
    return [
      <InputText key="input" ref="$ComponentInputText" {...this.props} readOnly onClick={this.onClick}/>,
      <SelectPicker
        list={this.props.list} value={this.$input ? this.$input.value : this.props.value} key="picker"
        show={this.state.show}
        multiple={this.props.multiple}
        style={this.props.pickerStyle} className={this.props.pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
