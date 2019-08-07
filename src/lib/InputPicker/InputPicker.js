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
  onClick = (value, args) => {
    if (this.props.onClick) this.props.onClick(value, args);
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (e) => {
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    if (this.props.onClickSubmit) {
      this.props.onClickSubmit(e);
      return;
    }
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
      valueForKey, list, onClick, onChange,
      pickerStyle, pickerClassName, pickerMaskStyle, pickerMaskClassName, pickerShow, onClickSubmit, onClickCancel, onClickMask, // 自定义Picker事件
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>,
      <Picker
        list={list} valueForKey={valueForKey} value={this.$input ? this.$input.value : this.props.value} key="picker"
        show={pickerShow === undefined ? this.state.show : pickerShow}
        style={pickerStyle} className={pickerClassName}
        maskStyle={pickerMaskStyle} maskClassName={pickerMaskClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
