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

var Peg = function (_Component) {
  (0, _inherits3.default)(Peg, _Component);

  function Peg(props) {
    (0, _classCallCheck3.default)(this, Peg);
    return (0, _possibleConstructorReturn3.default)(this, (Peg.__proto__ || (0, _getPrototypeOf2.default)(Peg)).call(this, props));
  }

  (0, _createClass3.default)(Peg, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          iconClassName = _props.iconClassName,
          className = _props.className,
          style = _props.style,
          children = _props.children;

      var newClassName = '';
      switch (type) {
        case 'line':
          newClassName = 'sticker-line';
          break;
        default:
          newClassName = 'sticker';
      }
      return _react2.default.createElement(
        'span',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: '' + newClassName + (iconClassName ? ' sticker-icon' : '') + (className ? ' ' + className : ''), style: style },
        iconClassName && _react2.default.createElement('span', { 'class': 'size12 ' + iconClassName }),
        children && _react2.default.createElement(
          'span',
          null,
          children
        )
      );
    }
  }]);
  return Peg;
}(_react.Component);

Peg.propTypes = {
  type: _propTypes2.default.string, // line
  iconClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.node
};
Peg.defaultProps = {
  className: 'top right'
};
exports.default = Peg;
module.exports = exports['default'];