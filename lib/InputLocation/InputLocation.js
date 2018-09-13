'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _InputText = require('./../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputLocation = function (_Component) {
  (0, _inherits3.default)(InputLocation, _Component);

  function InputLocation(props) {
    (0, _classCallCheck3.default)(this, InputLocation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputLocation.__proto__ || (0, _getPrototypeOf2.default)(InputLocation)).call(this, props));

    _this.onClick = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onClick = _this$props.onClick;

      var locationingText = '定位中...';
      if (onClick) onClick(_this.refs.$ComponentInputText.getArgs(e));
      if (_this.$input.value === locationingText) return;
      // 定位中...
      if (!_this.props.valueBindProp) _this.$input.value = locationingText;
      _Bridge2.default.getLocation({
        onSuccess: function onSuccess(data) {
          _Bridge2.default.getAddress({
            latitude: data.latitude,
            longitude: data.longitude,
            type: 'gcj02',
            onSuccess: function onSuccess(addrs) {
              // 赋值
              if (!_this.props.valueBindProp) _this.$input.value = addrs.address;
              if (onChange) onChange(addrs.address, _this.refs.$ComponentInputText.getArgs(e));
            },
            onError: function onError(err) {
              // 赋值
              if (!_this.props.valueBindProp) _this.$input.value = '';
              if (onChange) onChange('', _this.refs.$ComponentInputText.getArgs(e));
              // 提示获取地址失败
              _Bridge2.default.showToast(err.msg, { mask: false });
            }
          });
        },
        onError: function onError(err) {
          // 赋值
          if (!_this.props.valueBindProp) _this.$input.value = '';
          if (onChange) onChange('', _this.refs.$ComponentInputText.getArgs(e));
          // 提示定位失败
          _Bridge2.default.showToast(err.msg, { mask: false });
        }
      });
    };

    return _this;
  }

  (0, _createClass3.default)(InputLocation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_InputText2.default, (0, _extends3.default)({ ref: '$ComponentInputText' }, this.props, { readOnly: true, onClick: this.onClick }));
    }
  }]);
  return InputLocation;
}(_react.Component);

exports.default = InputLocation;
module.exports = exports['default'];