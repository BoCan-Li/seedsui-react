import React, { Component } from 'react';
import InputNumber from './../InputNumber';

export default class InputVerify extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClickSent = (e) => {
    const target = e.currentTarget.parentNode.querySelector('input[type=number]');
    target.focus();
    if (this.props.onClickSent) this.props.onClickSent();
  }
  render() {
    return <InputNumber ref="$ComponentInputText" {...this.props} type="number" digits={0} rcaption={[<span className="rsent-splitter" key="rsentsplitter">|</span>,<a onClick={this.onClickSent} disabled={this.props.sentDisabled} className="rsent-button" key="rsentbutton">{this.props.sentCaption || '发送验证码'}</a>]}/>;
  }
}
