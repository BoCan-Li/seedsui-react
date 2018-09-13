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

var Ticket = function (_Component) {
  (0, _inherits3.default)(Ticket, _Component);

  function Ticket(props) {
    (0, _classCallCheck3.default)(this, Ticket);
    return (0, _possibleConstructorReturn3.default)(this, (Ticket.__proto__ || (0, _getPrototypeOf2.default)(Ticket)).call(this, props));
  }

  (0, _createClass3.default)(Ticket, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          legend = _props.legend,
          legendStyle = _props.legendStyle,
          legendClassName = _props.legendClassName,
          children = _props.children,
          containerStyle = _props.containerStyle,
          containerClassName = _props.containerClassName,
          onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        { className: 'ticket' + (className ? ' ' + className : ''), style: style, onClick: onClick },
        _react2.default.createElement(
          'div',
          { className: 'ticket-legend' + (legendClassName ? ' ' + legendClassName : ''), style: legendStyle },
          legend
        ),
        _react2.default.createElement(
          'div',
          { className: 'ticket-container' + (containerClassName ? ' ' + containerClassName : ''), style: containerStyle },
          children
        )
      );
    }
  }]);
  return Ticket;
}(_react.Component);

Ticket.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  legendStyle: _propTypes2.default.object,
  legendClassName: _propTypes2.default.string,
  legend: _propTypes2.default.node,
  containerStyle: _propTypes2.default.object,
  containerClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func
};
exports.default = Ticket;
module.exports = exports['default'];