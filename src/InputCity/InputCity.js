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
    this.$el = null;
    this.$input = null;
    if (this.refs.$ComponentInputText && this.refs.$ComponentInputText.$el && this.refs.$ComponentInputText.$input) {
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
    }
    this.$picker = this.refs.$ComponentPicker;
  }
  // 点击文本框
  onClickInput = (...parameter) => {
    const {
      onClick
    } = this.props;
    if (onClick) onClick(...parameter);
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    });
  }
  // 点击遮罩
  onClickMask = (e) => {
    const {
      pickerProps = {}
    } = this.props;
    if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
      e.target = this.$input;
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
      onChange,
      pickerProps = {}
    } = this.props;
    // 获取值
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = e.activeText;
    const options = e.activeOptions;
    // 确定按钮回调
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      e.target = this.$input;
      pickerProps.submitAttribute.onClick(e, value, options);
      return;
    }
    // 赋值
    if (onChange) {
      e.target = this.$input;
      onChange(e, value, options);
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
      e.target = this.$input;
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
      // Input
      onClick,
      onChange,

      // Picker
      valueForKey,
      type,
      pickerProps = {},
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClickInput}/>,
      <PickerCity
        key="pickercity"
        ref="$ComponentPicker"
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
