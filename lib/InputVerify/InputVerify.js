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
      var _props = this.props,
          type = _props.type,
          sentDisabled = _props.sentDisabled,
          sentCaption = _props.sentCaption,
          onClickSent = _props.onClickSent,
          others = (0, _objectWithoutProperties3.default)(_props, ['type', 'sentDisabled', 'sentCaption', 'onClickSent']);

      return _react2.default.createElement(_InputText2.default, (0, _extends3.default)({ ref: '$ComponentInputText' }, others, { type: type, rcaption: [_react2.default.createElement('span', { className: 'splitter', key: 'rsentsplitter' }), _react2.default.createElement(
          'a',
          { onClick: this.onClickSent, disabled: sentDisabled, className: 'button primary outline', style: { border: 0 }, key: 'rsentbutton' },
          sentCaption
        )] }));
    }
  }]);
  return InputVerify;
}(_react.Component);

InputVerify.propTypes = {
  type: _propTypes2.default.string, // 类型: text, number, phone, password
  sentDisabled: _propTypes2.default.bool,
  sentCaption: _propTypes2.default.string,
  onClickSent: _propTypes2.default.func
};
InputVerify.defaultProps = {
  type: 'number',
  sentCaption: '发送验证码'
};
exports.default = InputVerify;
module.exports = exports['default'];