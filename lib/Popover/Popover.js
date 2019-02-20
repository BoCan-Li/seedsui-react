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

var Popover = function (_Component) {
  (0, _inherits3.default)(Popover, _Component);

  function Popover(props) {
    (0, _classCallCheck3.default)(this, Popover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Popover.__proto__ || (0, _getPrototypeOf2.default)(Popover)).call(this, props));

    _this.componentDidMount = function () {};

    _this.onClickMask = function (e) {
      if (_this.props.onClickMask) _this.props.onClickMask(Object.getArgs(e, _this.props.args));
      e.stopPropagation();
    };

    return _this;
  }

  (0, _createClass3.default)(Popover, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style,
          animation = _props.animation,
          children = _props.children;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask popover-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: maskStyle, onClick: this.onClickMask },
        _react2.default.createElement(
          'div',
          { style: style, className: 'popover' + (className ? ' ' + className : '') + (show ? ' active' : ''), 'data-animation': animation },
          children && children
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Popover;
}(_react.Component);

Popover.propTypes = {
  args: _propTypes2.default.any,
  portal: _propTypes2.default.object,
  show: _propTypes2.default.bool,

  animation: _propTypes2.default.string, // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  isClickMaskHide: _propTypes2.default.bool,

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,
  onClickMask: _propTypes2.default.func,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  children: _propTypes2.default.node
};
Popover.defaultProps = {
  isClickMaskHide: true,
  animation: 'zoom'
};
exports.default = Popover;
module.exports = exports['default'];