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

var _InputNumber = require('./../InputNumber');

var _InputNumber2 = _interopRequireDefault(_InputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputVerify = function (_Component) {
  (0, _inherits3.default)(InputVerify, _Component);

  function InputVerify(props) {
    (0, _classCallCheck3.default)(this, InputVerify);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputVerify.__proto__ || (0, _getPrototypeOf2.default)(InputVerify)).call(this, props));

    _this.onClickSent = function (e) {
      var target = e.currentTarget.parentNode.querySelector('input[type=number]');
      target.focus();
      if (_this.props.onClickSent) _this.props.onClickSent();
    };

    return _this;
  }

  (0, _createClass3.default)(InputVerify, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_InputNumber2.default, (0, _extends3.default)({ ref: '$ComponentInputText' }, this.props, { type: 'number', digits: 0, rcaption: [_react2.default.createElement('span', { className: 'splitter', key: 'rsentsplitter' }), _react2.default.createElement(
          'a',
          { onClick: this.onClickSent, disabled: this.props.sentDisabled, className: 'button primary outline', style: { border: 0 }, key: 'rsentbutton' },
          this.props.sentCaption || '发送验证码'
        )] }));
    }
  }]);
  return InputVerify;
}(_react.Component);

exports.default = InputVerify;
module.exports = exports['default'];