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
    pickerStyle: PropTypes.bool,
    pickerClassName: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
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
  onClickSubmit = (e) => {
    if (!this.$input) this.$input = this.refs.$ComponentInputText.$input;
    const value = this.getValue(e.activeOptions);
    var options = this.getOptions(e.activeOptions);
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
    const {valueForKey, split, list, multiple, pickerStyle, pickerClassName, onClick, onChange, ...others} = this.props;
    return [
      <InputText key="input" ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>,
      <SelectPicker
        list={list} valueForKey={valueForKey} value={this.$input ? this.$input.value : this.props.value} key="picker"
        split={split}
        show={this.state.show}
        multiple={multiple}
        style={pickerStyle} className={pickerClassName}
        onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask}
      />
    ];
  }
}
