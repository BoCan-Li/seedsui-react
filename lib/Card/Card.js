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

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card(props) {
    (0, _classCallCheck3.default)(this, Card);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call(this, props));

    _this.onClick = function (e) {
      if (_this.props.onClick) _this.props.onClick(Object.getArgs(e, _this.props.args));
    };

    return _this;
  }

  (0, _createClass3.default)(Card, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          args = _props.args,
          children = _props.children,
          className = _props.className,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'children', 'className', 'onClick']);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'card' + (className ? ' ' + className : ''), onClick: this.onClick }, others),
        children
      );
    }
  }]);
  return Card;
}(_react.Component);

Card.propTypes = {
  args: _propTypes2.default.any,

  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func
};
exports.default = Card;
module.exports = exports['default'];