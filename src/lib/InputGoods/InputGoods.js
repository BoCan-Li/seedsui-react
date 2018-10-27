import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

export default class InputLocationMap extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    locationingText: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    locationingText: '定位中...'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (value, args) => {
    const {valueBindProp, locationingText, onChange, onClick} = this.props;
    if (onClick) onClick(value, args);
    if (this.$input.value === locationingText) return;
    // 定位中...
    if (!valueBindProp) {
      this.$input.value = locationingText;
    }
    Bridge.getLocationMap({
      onSuccess: (data) => {
        // 赋值
        if (!valueBindProp) this.$input.value = data.address;
        if (onChange) onChange(data.address, args)
      },
      onError: (err) => {
        // 赋值
        if (!valueBindProp) this.$input.value = '';
        if (onChange) onChange('', args)
        // 提示定位失败
        Bridge.showToast(err.msg, {mask: false});
      }
    });
  }
  render() {
    const {locationingText, onChange, onClick, ...others} = this.props;
    return <InputText ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>;
  }
}
