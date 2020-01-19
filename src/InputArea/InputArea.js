import React, { Component } from 'react';
import InputText from './../InputText';

export default class InputArea extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$el = this.refs.$ComponentInputText.$el;
    this.$input = this.refs.$ComponentInputText.$input;
    this.$ComponentInputText = this.refs.$ComponentInputText;
  }
  render() {
    return <InputText ref="$ComponentInputText" {...this.props} type="textarea"/>;
  }
}
