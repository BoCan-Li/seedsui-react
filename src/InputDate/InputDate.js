// require PrototypeDate.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerDate from './../PickerDate';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class InputDate extends Component {
  static propTypes = {
    // Input
    min: PropTypes.string, // YYYY-MM-DD
    max: PropTypes.string, // YYYY-MM-DD

    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,

    // Picker
    type: PropTypes.string, // 'date | month | time | datetime'
    valueForKey: PropTypes.string,
    pickerProps: PropTypes.object
  }
  static defaultProps = {
    type: 'date'
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
  // 日期纠正
  correctDate = (val) => {
    let text = val;
    const {type, min, max, onError} = this.props;
    const selectDate = text.toDate();
    const value = this.$input.value;
    const e = this.$picker && this.$picker.instance ? this.$picker.instance : {};
    e.target = this.$input;
    if (min && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(min) || /^[0-9]{2}:[0-9]{2}$/.test(min))) {
      if (type === 'date' && selectDate.compareDate(min.toDate()) === -1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value});
          return false;
        }
        text = min;
      } else if (type === 'month' && selectDate.compareMonth(min.toDate()) === -1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value});
          return false;
        }
        text = min;
      } else if (type === 'time' && selectDate.compareTime(min.toDate()) === -1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value});
          return false;
        }
        text = min;
      } else if (type === 'datetime' && selectDate.compareDateTime(min.toDate()) === -1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value});
          return false;
        }
        text = min;
      }
    }
    if (max && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(max) || /^[0-9]{2}:[0-9]{2}$/.test(max))) {
      if (type === 'date' && selectDate.compareDate(max.toDate()) === 1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value});
          return false;
        }
        text = max;
      } else if (type === 'month' && selectDate.compareMonth(max.toDate()) === 1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value});
          return false;
        }
        text = max;
      } else if (type === 'time' && selectDate.compareTime(max.toDate()) === 1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value});
          return false;
        }
        text = max;
      } else if (type === 'datetime' && selectDate.compareDateTime(max.toDate()) === 1) {
        if (onError) {
          onError(e, {msg: (window._seeds_lang['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value});
          return false;
        }
        text = max;
      }
    }
    return text;
  }
  // 点击文本框
  onClickInput = (e, value) => {
    const {
      onClick
    } = this.props;
    if (onClick) onClick(e, value);
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
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      e.target = this.$input;
      pickerProps.submitAttribute.onClick(e);
      return;
    }
    // 赋值
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = this.correctDate(e.activeText); // 如果发生错误的话, 将返回false
    if (value === false) return;
    const options = e.activeOptions;
    if (!valueBindProp) this.$input.value = value;
    if (onChange) {
      e.target = this.$input;
      onChange(e, value, options);
    }
    // 隐藏框
    this.setState({
      show: !this.state.show
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
      min,
      max,

      onClick,
      onChange,
      onError,

      type,
      valueForKey,
      pickerProps = {},
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClickInput}/>,
      <PickerDate
        key="pickerdate"
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
