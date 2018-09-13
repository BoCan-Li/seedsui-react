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

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = function (_Component) {
  (0, _inherits3.default)(Dialog, _Component);

  function Dialog(props) {
    (0, _classCallCheck3.default)(this, Dialog);
    return (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));
  }

  (0, _createClass3.default)(Dialog, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return (0, _reactDom.createPortal)(_react2.default.createElement('div', { ref: function ref(el) {
          _this2.$el = el;
        }, className: 'stencil' + (className ? ' ' + className : ''), style: style }), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Dialog.defaultProps = {
  className: 'stencil-list'
};
exports.default = Dialog;
module.exports = exports['default'];