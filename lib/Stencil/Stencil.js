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

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stencil = function (_Component) {
  (0, _inherits3.default)(Stencil, _Component);

  function Stencil(props) {
    (0, _classCallCheck3.default)(this, Stencil);
    return (0, _possibleConstructorReturn3.default)(this, (Stencil.__proto__ || (0, _getPrototypeOf2.default)(Stencil)).call(this, props));
  }

  (0, _createClass3.default)(Stencil, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          others = (0, _objectWithoutProperties3.default)(_props, ['className']);

      return (0, _reactDom.createPortal)(_react2.default.createElement('div', (0, _extends3.default)({ ref: function ref(el) {
          _this2.$el = el;
        }, className: 'stencil' + (className ? ' ' + className : '') }, others)), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Stencil;
}(_react.Component);

Stencil.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Stencil.defaultProps = {
  className: 'stencil-list'
};
exports.default = Stencil;
module.exports = exports['default'];