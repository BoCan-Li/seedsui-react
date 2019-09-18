import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import SelectPicker from './../SelectPicker';

export default class InputSelect extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    valueForKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    split: PropTypes.string,
    list: PropTypes.array, // [{key: '', value: ''}]
    multiple: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,

    // Picker
    pickerStyle: PropTypes.object,
    pickerClassName: PropTypes.string,
    pickerMaskStyle: PropTypes.object,
    pickerMaskClassName: PropTypes.string,
    // 自定义Picker事件
    pickerShow: PropTypes.bool,
    onClickSubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickMask: PropTypes.func
  }
  static defaultProps = {
    split: ','
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  componentDidMount () {
    this.$el = this.refs.$ComponentInputText.$el;
    this.$input = this.refs.$ComponentInputText.$input;
  }
  getValue = (options) => {
    if (!this.props.multiple) return options[0].value;
    const value = options.map((item) => {
      return item.value;
    });
    return value.join(this.props.split || ',');
  }
  getOptions = (options) => {
    return this.props.multiple ? options : options[0]
  }
  onClick = (value, args) => {
    if (this.props.onClick) this.props.onClick(value, args);
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (selected) => {
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    if (this.props.onClickSubmit) {
      this.props.onClickSubmit(selected);
      return;
    }
    const value = this.getValue(selected);
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(value, selected, this.props.args);
    }
  }
  onClickCancel = (e) => {
    if (this.props.onClickCancel) {
      this.props.onClickCancel(e);
      return;
    }
    this.setState({
      show: !this.state.show
    });
  }
  onClickMask = (e) => {
    if (this.props.onClickMask) {
      this.props.onClickMask(e);
      return;
    }
    this.setState({
      show: !this.state.show
    });
  }
  render() {
    const {
      valueForKey, split, list, multiple, onClick, onChange,
      pickerStyle, pickerClassName, pickerMaskStyle, pickerMaskClassName, pickerShow, onClickSubmit, onClickCancel, onClickMask, // 自定义Picker事件
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>,
      <SelectPicker
        list={list} valueForKey={valueForKey} value={this.$input ? this.$input.value : this.props.value} key="picker"
        split={split}
        show={pickerShow === undefined ? this.state.show : pickerShow}
        multiple={multiple}
        maskStyle={pickerMaskStyle} maskClassName={pickerMaskClassName}
        style={pickerStyle} className={pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
