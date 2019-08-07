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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPhone = function (_Component) {
  (0, _inherits3.default)(InputPhone, _Component);

  function InputPhone(props) {
    (0, _classCallCheck3.default)(this, InputPhone);
    return (0, _possibleConstructorReturn3.default)(this, (InputPhone.__proto__ || (0, _getPrototypeOf2.default)(InputPhone)).call(this, props));
  }

  (0, _createClass3.default)(InputPhone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_InputText2.default, (0, _extends3.default)({ ref: '$ComponentInputText' }, this.props, { type: 'phone', maxLength: this.props.maxLength || 11 }));
    }
  }]);
  return InputPhone;
}(_react.Component);

exports.default = InputPhone;
module.exports = exports['default'];