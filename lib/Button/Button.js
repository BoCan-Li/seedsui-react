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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button(props) {
    (0, _classCallCheck3.default)(this, Button);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, props));

    _this.getArgs = function (e) {
      var args = _this.props.args;
      if (args !== undefined) {
        if (typeof args === 'string' && args === '$event') {
          args = e;
        } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
          args[args.indexOf('$event')] = e;
        }
      } else {
        args = e;
      }
      return args;
    };

    _this.onClick = function (e) {
      if (_this.props.onClick) _this.props.onClick(_this.getArgs(e));
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Button, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          args = _props.args,
          className = _props.className,
          style = _props.style,
          disabled = _props.disabled,
          children = _props.children,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'className', 'style', 'disabled', 'children', 'onClick']);

      return _react2.default.createElement(
        'a',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'button' + (className ? ' ' + className : ''), disabled: disabled, style: style, onClick: this.onClick }, others),
        children
      );
    }
  }]);
  return Button;
}(_react.Component);

Button.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,

  children: _propTypes2.default.node
};
Button.defaultProps = {};
exports.default = Button;
module.exports = exports['default'];