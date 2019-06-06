import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from './../InputText';
import Bridge from './../Bridge';

export default class InputWaiqin extends Component {
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
    chooseType: PropTypes.string, // getCustomer|getCustomerMore|getCustomerType|getCustomerArea|getCustomerAreaMore|getDepartment|getDepartmentMore|getContact|getContactMore|getGoods
    chooseParams: PropTypes.object,
    // 【getCustomer与getCustomerMore 的 chooseParams】:
    // tradeType: PropTypes.string, // 1客户 2经销商 3门店,默认1
    // hiddenAdd: PropTypes.bool, // 是否显示添加按钮, 默认false
    // dms_type: PropTypes.string, // dms类型

    // 【getCustomerType】

    // 【getCustomerArea与getCustomerAreaMore】:

    // 【getDepartment与getDepartmentMore】:

    // 【getContact与getContactMore 的 chooseParams】:
    // aclType: PropTypes.string, // 0只能看到下属 不传或者其他的参数为全部人员,默认为空

    // 【getGoods】

    // 【getLocationMap 的 chooseParams】:
    // editable: PropTypes.string, // 是否可以标记位置, 1可标记
    // latlng: PropTypes.string // 经纬度, 只在editable为0时生效
    // title: PropTypes.string // 标题, 可不传
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    chooseType: 'getCustomer',
    chooseParams: {}
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.$input = this.refs.$ComponentInputText.$input;
  }
  onClick = (value, args) => {
    const {valueBindProp, chooseType, chooseParams, onClick, onChange} = this.props;
    if (onClick) onClick(value, args);
    if (chooseType === 'getCustomer') {
      Bridge.getCustomer({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getCustomerMore') {
      Bridge.getCustomerMore({
        selectedIds: this.$input.getAttribute('data-selected-id') || '',
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            let id = [];
            let name = [];
            options.forEach((item) => {
              id.push(item.id);
              name.push(item.name);
            });
            this.$input.value = name.join(',');
            this.$input.setAttribute('data-selected-id', id.join(','));
          }
          if (onChange) onChange(name, options, args);
        }
      });
    } else if (chooseType === 'getCustomerType') {
      Bridge.getCustomerType({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getCustomerArea') {
      Bridge.getCustomerArea({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getCustomerAreaMore') {
      Bridge.getCustomerAreaMore({
        selectedIds: this.$input.getAttribute('data-selected-id') || '',
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            let id = [];
            let name = [];
            options.forEach((item) => {
              id.push(item.id);
              name.push(item.name);
            });
            this.$input.value = name.join(',');
            this.$input.setAttribute('data-selected-id', id.join(','));
          }
          if (onChange) onChange(name, options, args);
        }
      });
    } else if (chooseType === 'getDepartment') {
      Bridge.getDepartment({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getDepartmentMore') {
      Bridge.getDepartmentMore({
        selectedIds: this.$input.getAttribute('data-selected-id') || '',
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            let id = [];
            let name = [];
            options.forEach((item) => {
              id.push(item.id);
              name.push(item.name);
            });
            this.$input.value = name.join(',');
            this.$input.setAttribute('data-selected-id', id.join(','));
          }
          if (onChange) onChange(name, options, args);
        }
      });
    } else if (chooseType === 'getContact') {
      Bridge.getContact({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getContactMore') {
      Bridge.getContactMore({
        selectedIds: this.$input.getAttribute('data-selected-id') || '',
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            let id = [];
            let name = [];
            options.forEach((item) => {
              id.push(item.id);
              name.push(item.name);
            });
            this.$input.value = name.join(',');
            this.$input.setAttribute('data-selected-id', id.join(','));
          }
          if (onChange) onChange(name, options, args);
        }
      });
    } else if (chooseType === 'getGoods') {
      Bridge.getGoods({
        id: this.$input.getAttribute('data-selected-id') || '',
        name: value,
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.name;
            this.$input.setAttribute('data-selected-id', options.id);
          }
          if (onChange) onChange(options.name, options, args);
        }
      });
    } else if (chooseType === 'getLocationMap') {
      Bridge.getLocationMap({
        latlng: this.$input.getAttribute('data-selected-id') || '',
        ...chooseParams,
        success: (options) => {
          if (!valueBindProp) {
            this.$input.value = options.address;
            this.$input.setAttribute('data-selected-id', options.latitude + ',' + options.longitude);
          }
          if (onChange) onChange(options.address, options, args);
        }
      });
    }
  }
  render() {
    const {chooseType, chooseParams, // 为others不多属性
    valueForKey, onChange, onClick, ...others} = this.props;
    return <InputText ref="$ComponentInputText" data-selected-id={valueForKey} {...others} readOnly onClick={this.onClick}/>;
  }
}
