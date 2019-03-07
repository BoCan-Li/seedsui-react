import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import PickerCity from './../PickerCity';

export default class InputCity extends Component {
  static propTypes = {
    data: PropTypes.array,
    dataKeyPropertyName: PropTypes.string,
    dataValuePropertyName: PropTypes.string,
    dataChildPropertyName: PropTypes.string,

    valueBindProp: PropTypes.bool,
    valueForKey: PropTypes.string,
    split: PropTypes.string,
    type: PropTypes.string, // 'district' | 'city'
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
    split: '-',
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
      data, dataKeyPropertyName, dataValuePropertyName, dataChildPropertyName,
      valueForKey, split, type, onClick, onChange,
      pickerStyle, pickerClassName, pickerMaskStyle, pickerMaskClassName, pickerShow, onClickSubmit, onClickCancel, onClickMask, // 自定义Picker事件
      ...others
    } = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} type="text" readOnly onClick={this.onClick}/>,
      <PickerCity
        data={data}
        dataChildPropertyName={dataChildPropertyName}
        dataKeyPropertyName={dataKeyPropertyName}
        dataValuePropertyName={dataValuePropertyName}
        valueForKey={valueForKey}
        split={split}
        type={type}
        value={this.$input ? this.$input.value : this.props.value} key="pickercity"
        show={pickerShow === undefined ? this.state.show : pickerShow}
        style={pickerStyle} className={pickerClassName}
        maskStyle={pickerMaskStyle} maskClassName={pickerMaskClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
