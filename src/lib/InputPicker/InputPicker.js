import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Picker from './../Picker';

export default class InputPicker extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    list: PropTypes.array, // [{key: '', value: ''}]
    pickerStyle: PropTypes.bool,
    pickerClassName: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
  }
  static defaultProps = {
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
    const value = e.activeOptions[0].value;
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(value, e.activeOptions[0], this.props.args);
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
    const {valueForKey, list, pickerStyle, pickerClassName, onClick, onChange, ...others} = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>,
      <Picker
        list={list} valueForKey={valueForKey} value={this.$input ? this.$input.value : this.props.value} key="picker"
        show={this.state.show}
        style={pickerStyle} className={pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
