// require PrototypeDate.js和PrototypeString.js
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerDate from './../PickerDate';
import Context from '../Context/instance.js';

export default class InputDate extends Component {
  static contextType = Context;
  static propTypes = {
    // Input
    min: PropTypes.string, // YYYY-MM-DD
    max: PropTypes.string, // YYYY-MM-DD

    onClick: PropTypes.func,
    onChange: PropTypes.func,
    fail: PropTypes.func,

    // Picker
    type: PropTypes.string, // 'date | month | time | datetime'
    valueForKey: PropTypes.string,
    pickerProps: PropTypes.object
  }
  static defaultProps = {
    type: 'date'
  }
  constructor(props, context) {
    super(props, context);
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
      this.$ComponentInputText = this.refs.$ComponentInputText;
    }
    this.$picker = this.refs.$ComponentPicker;
  }
  // 日期纠正
  correctDate = (val) => {
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {type, min, max, fail, pickerProps = {}} = this.props;
    const split = pickerProps.split || '-';
    const timeSplit = pickerProps.timeSplit || ':';
    let text = val;
    const selectDate = text.toDate(split, timeSplit);
    const value = this.$input.value;
    const e = this.$picker && this.$picker.instance ? this.$picker.instance : {};
    e.target = this.$input;
    if (min && (min.isDateTime(split, timeSplit) || min.isDate(split) || min.isMonth(split) || min.isTime(timeSplit))) {
      if (type === 'date' && selectDate.compareDate(min.toDate(split, timeSplit)) === -1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value, event: e});
          return false;
        }
        text = min;
      } else if (type === 'month' && selectDate.compareMonth(min.toDate(split, timeSplit)) === -1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value, event: e});
          return false;
        }
        text = min;
      } else if (type === 'time' && selectDate.compareTime(min.toDate(split, timeSplit)) === -1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value, event: e});
          return false;
        }
        text = min;
      } else if (type === 'datetime' && selectDate.compareDateTime(min.toDate(split, timeSplit)) === -1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_less_than'] || '不能小于') + min, select: text, min: min, value: value, event: e});
          return false;
        }
        text = min;
      }
    }
    if (max && (max.isDateTime(split, timeSplit) || max.isDate(split) || max.isMonth(split) || max.isTime(timeSplit))) {
      if (type === 'date' && selectDate.compareDate(max.toDate(split, timeSplit)) === 1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value, event: e});
          return false;
        }
        text = max;
      } else if (type === 'month' && selectDate.compareMonth(max.toDate(split, timeSplit)) === 1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value, event: e});
          return false;
        }
        text = max;
      } else if (type === 'time' && selectDate.compareTime(max.toDate(split, timeSplit)) === 1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value, event: e});
          return false;
        }
        text = max;
      } else if (type === 'datetime' && selectDate.compareDateTime(max.toDate(split, timeSplit)) === 1) {
        if (fail) {
          fail({errMsg: (locale['hint_cannot_be_greater_than'] || '不能大于') + max, select: text, max: max, value: value, event: e});
          return false;
        }
        text = max;
      }
    }
    return text;
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
  onClickSubmit = (e, value, options) => {
    const {
      onChange,
      pickerProps = {}
    } = this.props;
    // 获取值
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    value = this.correctDate(value); // 如果发生错误的话, 将返回false
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
      fail,

      type,
      valueForKey,
      pickerProps = {},
      ...others
    } = this.props;
    return <Fragment>
      <InputText ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClickInput}/>
      <PickerDate
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
    </Fragment>;
  }
}
