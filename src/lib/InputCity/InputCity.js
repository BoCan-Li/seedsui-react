import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerCity from './../PickerCity';

export default class InputCity extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    valueForKey: PropTypes.string,
    split: PropTypes.string,
    type: PropTypes.string, // 'area' | 'city'
    pickerStyle: PropTypes.bool,
    pickerClassName: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    split: '-',
    type: 'area'
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  static defaultProps = {
    error: {
      currentName: '',
      compareName: ''
    }
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
    const value = e.activeText;
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
  render() {
    const {valueForKey, split, type, pickerStyle, pickerClassName, onClick, onChange, ...others} = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClick}/>,
      <PickerCity
        valueForKey={valueForKey}
        split={split}
        type={type}
        value={this.$input ? this.$input.value : this.props.value} key="pickercity"
        show={this.state.show}
        style={pickerStyle} className={pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
