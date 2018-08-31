import React, { Component } from 'react';
import InputText from './../InputText';
import Picker from './../Picker';

export default class InputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
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
    const value = e.activeOptions[0].value;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(value, e.activeOptions[0], this.refs.$ComponentInputText.getArgs());
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
      <Picker
        list={this.props.list} value={this.$input ? this.$input.value : this.props.value} key="picker"
        show={this.state.show}
        style={this.props.pickerStyle} className={this.props.pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
