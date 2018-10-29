import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

export default class InputCustomer extends Component {
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
    multiple: PropTypes.bool,
    chooseParams: PropTypes.object,
    // chooseParams:
    // tradeType: PropTypes.string, // 1客户 2经销商 3门店,默认1
    // hiddenAdd: PropTypes.bool, // 是否显示添加按钮, 默认false
    // dmsType: PropTypes.string, // dms类型
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    chooseParams: {}
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (value, args) => {
    const {valueBindProp, value, valueForKey, multiple, chooseParams, onChange} = this.props;
    if (!multiple) {
      Bridge.getCustomer({
        id: valueForKey,
        name: value,
        ...chooseParams,
        onSuccess: (options) => {
          if (!valueBindProp) this.$input.value = value;
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else {
      Bridge.getCustomerMore({
        selectedIds: valueForKey,
        ...chooseParams,
        onSuccess: (options) => {
          if (!valueBindProp) this.$input.value = value;
          if (onChange) onChange(options.map((item) => {
            return item.name
          }).join(','), options, args);
        }
      });
    }
  }
  render() {
    const {onChange, onClick, ...others} = this.props;
    return <InputText ref="$ComponentInputText" {...others} readOnly onClick={this.onClick}/>;
  }
}
