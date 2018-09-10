import React, { Component } from 'react';
import InputText from './../InputText';

export default class InputPre extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  render() {
    return <InputText ref="$ComponentInputText" {...this.props} pre/>;
  }
}
