import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputNumber from './../InputNumber';

export default class InputVerify extends Component {
  static propTypes = {
    sentDisabled: PropTypes.bool,
    sentCaption: PropTypes.string,
    onClickSent: PropTypes.func
  }
  static defaultProps = {
    sentCaption: '发送验证码'
  }
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
    const {digits = 0, sentDisabled, sentCaption, onClickSent, ...others} = this.props;
    return <InputNumber ref="$ComponentInputText" {...others} type="number" digits={digits} rcaption={[<span className="splitter" key="rsentsplitter"></span>,<a onClick={this.onClickSent} disabled={sentDisabled} className="button primary outline" style={{border: 0}} key="rsentbutton">{sentCaption}</a>]}/>;
  }
}
