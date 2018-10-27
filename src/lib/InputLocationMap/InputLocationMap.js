import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

export default class InputGoods extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (value, args) => {
    const {valueBindProp, onChange, onClick} = this.props;
    if (onClick) onClick(value, args);
    Bridge.getGoods({
      onSuccess: (data) => {
        // 赋值
        if (!valueBindProp) this.$input.value = data.name;
        if (onChange) onChange(data.name, data, args)
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
    const {onChange, onClick, ...others} = this.props;
    return <InputText ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>;
  }
}
