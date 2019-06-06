'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('./../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputWaiqin = function (_Component) {
  (0, _inherits3.default)(InputWaiqin, _Component);

  function InputWaiqin(props) {
    (0, _classCallCheck3.default)(this, InputWaiqin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputWaiqin.__proto__ || (0, _getPrototypeOf2.default)(InputWaiqin)).call(this, props));

    _this.onClick = function (value, args) {
      var _this$props = _this.props,
          valueBindProp = _this$props.valueBindProp,
          chooseType = _this$props.chooseType,
          chooseParams = _this$props.chooseParams,
          onClick = _this$props.onClick,
          onChange = _this$props.onChange;

      if (onClick) onClick(value, args);
      if (chooseType === 'getCustomer') {
        _Bridge2.default.getCustomer((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getCustomerMore') {
        _Bridge2.default.getCustomerMore((0, _extends3.default)({
          selectedIds: _this.$input.getAttribute('data-selected-id') || ''
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              var id = [];
              var _name = [];
              options.forEach(function (item) {
                id.push(item.id);
                _name.push(item.name);
              });
              _this.$input.value = _name.join(',');
              _this.$input.setAttribute('data-selected-id', id.join(','));
            }
            if (onChange) onChange(name, options, args);
          }
        }));
      } else if (chooseType === 'getCustomerType') {
        _Bridge2.default.getCustomerType((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getCustomerArea') {
        _Bridge2.default.getCustomerArea((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getCustomerAreaMore') {
        _Bridge2.default.getCustomerAreaMore((0, _extends3.default)({
          selectedIds: _this.$input.getAttribute('data-selected-id') || ''
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              var id = [];
              var _name2 = [];
              options.forEach(function (item) {
                id.push(item.id);
                _name2.push(item.name);
              });
              _this.$input.value = _name2.join(',');
              _this.$input.setAttribute('data-selected-id', id.join(','));
            }
            if (onChange) onChange(name, options, args);
          }
        }));
      } else if (chooseType === 'getDepartment') {
        _Bridge2.default.getDepartment((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getDepartmentMore') {
        _Bridge2.default.getDepartmentMore((0, _extends3.default)({
          selectedIds: _this.$input.getAttribute('data-selected-id') || ''
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              var id = [];
              var _name3 = [];
              options.forEach(function (item) {
                id.push(item.id);
                _name3.push(item.name);
              });
              _this.$input.value = _name3.join(',');
              _this.$input.setAttribute('data-selected-id', id.join(','));
            }
            if (onChange) onChange(name, options, args);
          }
        }));
      } else if (chooseType === 'getContact') {
        _Bridge2.default.getContact((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getContactMore') {
        _Bridge2.default.getContactMore((0, _extends3.default)({
          selectedIds: _this.$input.getAttribute('data-selected-id') || ''
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              var id = [];
              var _name4 = [];
              options.forEach(function (item) {
                id.push(item.id);
                _name4.push(item.name);
              });
              _this.$input.value = _name4.join(',');
              _this.$input.setAttribute('data-selected-id', id.join(','));
            }
            if (onChange) onChange(name, options, args);
          }
        }));
      } else if (chooseType === 'getGoods') {
        _Bridge2.default.getGoods((0, _extends3.default)({
          id: _this.$input.getAttribute('data-selected-id') || '',
          name: value
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.name;
              _this.$input.setAttribute('data-selected-id', options.id);
            }
            if (onChange) onChange(options.name, options, args);
          }
        }));
      } else if (chooseType === 'getLocationMap') {
        _Bridge2.default.getLocationMap((0, _extends3.default)({
          latlng: _this.$input.getAttribute('data-selected-id') || ''
        }, chooseParams, {
          success: function success(options) {
            if (!valueBindProp) {
              _this.$input.value = options.address;
              _this.$input.setAttribute('data-selected-id', options.latitude + ',' + options.longitude);
            }
            if (onChange) onChange(options.address, options, args);
          }
        }));
      }
    };

    return _this;
  }

  (0, _createClass3.default)(InputWaiqin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          chooseType = _props.chooseType,
          chooseParams = _props.chooseParams,
          valueForKey = _props.valueForKey,
          onChange = _props.onChange,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['chooseType', 'chooseParams', 'valueForKey', 'onChange', 'onClick']);

      return _react2.default.createElement(_InputText2.default, (0, _extends3.default)({ ref: '$ComponentInputText', 'data-selected-id': valueForKey }, others, { readOnly: true, onClick: this.onClick }));
    }
  }]);
  return InputWaiqin;
}(_react.Component);

InputWaiqin.propTypes = {
  valueBindProp: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  valueForKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  chooseType: _propTypes2.default.string, // getCustomer|getCustomerMore|getCustomerType|getCustomerArea|getCustomerAreaMore|getDepartment|getDepartmentMore|getContact|getContactMore|getGoods
  chooseParams: _propTypes2.default.object,
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
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};
InputWaiqin.defaultProps = {
  chooseType: 'getCustomer',
  chooseParams: {}
};
exports.default = InputWaiqin;
module.exports = exports['default'];