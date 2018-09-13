'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Badge = function (_Component) {
  (0, _inherits3.default)(Badge, _Component);

  function Badge(props) {
    (0, _classCallCheck3.default)(this, Badge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Badge.__proto__ || (0, _getPrototypeOf2.default)(Badge)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Badge, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          limit = _props.limit,
          ellipsis = _props.ellipsis;
      // 标题

      var caption = children;
      // 自动宽度,当大于两位时变宽
      var autoWidthClass = '';
      if (children && (typeof children === 'string' || typeof children === 'number')) {
        // 数字大于99,则显示99+
        if (!isNaN(children)) {
          caption = children.length > limit ? '99999'.substring(0, limit) + ellipsis : children;
        }
        // 数字大于2位以及2位以上,显示最大宽度
        autoWidthClass = children.length >= 2 ? 'badge-max-width' : '';
      }
      return _react2.default.createElement(
        'span',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'badge' + (autoWidthClass ? ' ' + autoWidthClass : '') + (className ? ' ' + className : ''), style: style },
        caption
      );
    }
  }]);
  return Badge;
}(_react.Component);

Badge.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.node,
  limit: _propTypes2.default.number,
  ellipsis: _propTypes2.default.string
};
Badge.defaultProps = {
  children: '0',
  limit: 2,
  ellipsis: '+'
};
exports.default = Badge;
module.exports = exports['default'];