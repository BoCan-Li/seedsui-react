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

var Mark = function (_Component) {
  (0, _inherits3.default)(Mark, _Component);

  function Mark(props) {
    (0, _classCallCheck3.default)(this, Mark);
    return (0, _possibleConstructorReturn3.default)(this, (Mark.__proto__ || (0, _getPrototypeOf2.default)(Mark)).call(this, props));
  }

  (0, _createClass3.default)(Mark, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          onClick = _props.onClick;

      return children ? _react2.default.createElement(
        'span',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mark ' + className, style: style, onClick: onClick },
        children
      ) : null;
    }
  }]);
  return Mark;
}(_react.Component);

Mark.propTypes = {
  className: _propTypes2.default.string, // info/success/cancel/warn/disable/primary
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.node
};
Mark.defaultProps = {
  className: 'info'
};
exports.default = Mark;
module.exports = exports['default'];