import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerCity from './../PickerCity';

export default class InputCity extends Component {
  static propTypes = {
    // Input
    onClick: PropTypes.func,
    onChange: PropTypes.func,

    // Picker
    valueForKey: PropTypes.string,
    type: PropTypes.string, // 'district' | 'city'
    pickerProps: PropTypes.object
  }
  static defaultProps = {
    type: 'district'
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  static defaultProps = {
  }
  componentDidMount () {
    this.$el = this.refs.$ComponentInputText.$el;
    this.$input = this.refs.$ComponentInputText.$input;
  }
  // 点击文本框
  onClickInput = (value, args) => {
    if (this.props.onClick) this.props.onClick(value, args);
    this.setState({
      show: !this.state.show
    });
  }
  // 点击遮罩
  onClickMask = (e) => {
    const {
      pickerProps = {}
    } = this.props;
    if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
      pickerProps.maskAttribute.onClick(e);
      return;
    }
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    });
  }
  // 点击确定按钮
  onClickSubmit = (e) => {
    const {
      valueBindProp,
      onChange,
      pickerProps = {}
    } = this.props;
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      pickerProps.submitAttribute.onClick(e);
      return;
    }
    // 赋值
    const value = e.activeText;
    const options = e.activeOptions;
    if (!valueBindProp) this.$input.value = value;
    if (onChange) {
      onChange(value, options, Object.getArgs(e, this.props.args));
    }
    // 隐藏框
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    });
  }
  // 点击取消按钮
  onClickCancel = (e) => {
    const {
      pickerProps = {}
    } = this.props;
    if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
      pickerProps.cancelAttribute.onClick(e);
      return;
    }
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    });
  }
  render() {
    let {
      onClick,
      onChange,

      // Picker
      valueForKey,
      type, // 'district' | 'city'
      pickerProps,
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClickInput}/>,
      <PickerCity
        key="pickercity"
        {...pickerProps}
        maskAttribute={{
          ...pickerProps.maskAttribute,
          onClick: this.onClickMask
        }}
        submitAttribute={{
          ...pickerProps.submitAttribute,
          onClick: this.onClickSubmit
        }}
        cancelAttribute={{
          ...pickerProps.cancelAttribute,
          onClick: this.onClickCancel
        }}
        valueForKey={valueForKey}
        type={type}
        value={this.$input ? this.$input.value : this.props.value}
        show={pickerProps.show === undefined ? this.state.show : pickerProps.show}
      />
    ];
  }
}
