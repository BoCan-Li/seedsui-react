import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerSelect from './../PickerSelect';

export default class InputSelect extends Component {
  static propTypes = {
    // Input
    onClick: PropTypes.func,
    onChange: PropTypes.func,

    // Picker
    multiple: PropTypes.bool,
    list: PropTypes.array, // [{key: '', value: ''}]
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    pickerProps: PropTypes.object
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
    this.$el = null;
    this.$input = null;
    if (this.refs.$ComponentInputText && this.refs.$ComponentInputText.$el && this.refs.$ComponentInputText.$input) {
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
    }
    this.$picker = this.refs.$ComponentPicker;
  }
  // 构建值
  buildValue = (options) => {
    if (!this.props.multiple) return options[0].value;
    const value = options.map((item) => {
      return item.value;
    });
    const {
      pickerProps =  {}
    } = this.props;
    return value.join(pickerProps.split || ',');
  }
  // 构建选中项
  buildOptions = (options) => {
    return this.props.multiple ? options : options[0]
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
      valueBindProp,
      onChange,
      pickerProps = {}
    } = this.props;
    // 获取值
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = this.buildValue(e.activeOptions);
    const options = this.buildOptions(e.activeOptions);
    // 确定按钮回调
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      e.target = this.$input;
      pickerProps.submitAttribute.onClick(e, value, options);
      return;
    }
    // 赋值
    if (!valueBindProp) this.$input.value = value;
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
    const {
      // Input
      onClick,
      onChange,

      // Picker
      multiple,
      list,
      valueForKey,
      pickerProps = {},
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} readOnly onClick={this.onClickInput}/>,
      <PickerSelect
        key="picker"
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
        list={list}
        valueForKey={valueForKey}
        value={this.$input ? this.$input.value : this.props.value} 
        show={pickerProps.show === undefined ? this.state.show : pickerProps.show}
        multiple={multiple}
      />
    ];
  }
}
