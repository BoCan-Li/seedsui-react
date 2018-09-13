'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = function (_Component) {
  (0, _inherits3.default)(Toast, _Component);

  function Toast(props) {
    (0, _classCallCheck3.default)(this, Toast);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call(this, props));

    _this.componentDidMount = function () {};

    return _this;
  }

  (0, _createClass3.default)(Toast, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          duration = _props.duration,
          show = _props.show,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style,
          icon = _props.icon,
          iconSrc = _props.iconSrc,
          iconStyle = _props.iconStyle,
          iconClassName = _props.iconClassName,
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          captionClassName = _props.captionClassName;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask toast-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, maskStyle) },
        _react2.default.createElement(
          'div',
          { className: 'toast' + (className ? ' ' + className : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, style) },
          _react2.default.createElement(
            'div',
            { className: 'toast-wrapper' },
            (iconSrc || iconClassName) && _react2.default.createElement(_Icon2.default, { className: 'toast-icon' + (iconClassName ? ' ' + iconClassName : ''), src: iconSrc ? iconSrc : '', style: iconStyle }),
            icon,
            caption && _react2.default.createElement(
              'span',
              { className: 'toast-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
              caption
            )
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Toast;
}(_react.Component);

Toast.propTypes = {
  portal: _propTypes2.default.object,
  show: _propTypes2.default.bool,

  duration: _propTypes2.default.number,

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  caption: _propTypes2.default.node,
  captionStyle: _propTypes2.default.object,
  captionClassName: _propTypes2.default.string,

  icon: _propTypes2.default.node,
  iconSrc: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,
  iconClassName: _propTypes2.default.string
};
Toast.defaultProps = {};
exports.default = Toast;
module.exports = exports['default'];