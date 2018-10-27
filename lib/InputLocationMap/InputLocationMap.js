'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var InputGoods = function (_Component) {
  (0, _inherits3.default)(InputGoods, _Component);

  function InputGoods(props) {
    (0, _classCallCheck3.default)(this, InputGoods);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputGoods.__proto__ || (0, _getPrototypeOf2.default)(InputGoods)).call(this, props));

    _this.onClick = function (value, args) {
      var _this$props = _this.props,
          valueBindProp = _this$props.valueBindProp,
          onChange = _this$props.onChange,
          onClick = _this$props.onClick;

      if (onClick) onClick(value, args);
      _Bridge2.default.getGoods({
        onSuccess: function onSuccess(data) {
          // 赋值
          if (!valueBindProp) _this.$input.value = data.name;
          if (onChange) onChange(data.name, data, args);
        },
        onError: function onError(err) {
          // 赋值
          if (!valueBindProp) _this.$input.value = '';
          if (onChange) onChange('', args);
          // 提示定位失败
          _Bridge2.default.showToast(err.msg, { mask: false });
        }
      });
    };

    return _this;
  }

  (0, _createClass3.default)(InputGoods, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onChange = _props.onChange,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['onChange', 'onClick']);

      return _react2.default.createElement(_InputText2.default, (0, _extends3.default)({ ref: '$ComponentInputText' }, others, { readOnly: true, onClick: this.onClick }));
    }
  }]);
  return InputGoods;
}(_react.Component);

InputGoods.propTypes = {
  valueBindProp: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};
InputGoods.defaultProps = {};
exports.default = InputGoods;
module.exports = exports['default'];