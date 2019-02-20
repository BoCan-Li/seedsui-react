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

var Alert = function (_Component) {
  (0, _inherits3.default)(Alert, _Component);

  function Alert(props) {
    (0, _classCallCheck3.default)(this, Alert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call(this, props));

    _this.componentDidMount = function () {};

    _this.onClickMask = function (e) {
      if (_this.props.onClickMask) _this.props.onClickMask(Object.getArgs(e, _this.props.args));
      e.stopPropagation();
    };

    _this.onClickCancel = function (e) {
      if (_this.props.onClickCancel) _this.props.onClickCancel(Object.getArgs(e, _this.props.args));
      e.stopPropagation();
    };

    _this.onClickSubmit = function (e) {
      if (_this.props.onClickSubmit) _this.props.onClickSubmit(Object.getArgs(e, _this.props.args));
      e.stopPropagation();
    };

    return _this;
  }

  (0, _createClass3.default)(Alert, [{
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
          caption = _props.caption,
          captionStyle = _props.captionStyle,
          captionClassName = _props.captionClassName,
          contentStyle = _props.contentStyle,
          contentClassName = _props.contentClassName,
          icon = _props.icon,
          iconSrc = _props.iconSrc,
          iconStyle = _props.iconStyle,
          iconClassName = _props.iconClassName,
          children = _props.children,
          submitCaption = _props.submitCaption,
          submitStyle = _props.submitStyle,
          submitClassName = _props.submitClassName,
          onClickSubmit = _props.onClickSubmit,
          disabled = _props.disabled,
          cancelCaption = _props.cancelCaption,
          cancelStyle = _props.cancelStyle,
          cancelClassName = _props.cancelClassName,
          onClickCancel = _props.onClickCancel;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask alert-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, maskStyle), onClick: this.onClickMask },
        _react2.default.createElement(
          'div',
          { className: 'alert' + (className ? ' ' + className : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, style), 'data-animation': 'zoom' },
          caption && _react2.default.createElement(
            'h1',
            { className: captionClassName, style: captionStyle },
            caption
          ),
          _react2.default.createElement(
            'div',
            { className: 'alert-content' + (contentClassName ? ' ' + contentClassName : ''), style: contentStyle },
            (iconSrc || iconClassName) && _react2.default.createElement(_Icon2.default, { className: 'alert-content-icon' + (iconClassName ? ' ' + iconClassName : ''), src: iconSrc ? iconSrc : '', style: iconStyle }),
            icon,
            children
          ),
          _react2.default.createElement(
            'div',
            { className: 'alert-handler' },
            onClickCancel && _react2.default.createElement(
              'a',
              { className: 'alert-cancel button lg' + (cancelClassName ? ' ' + cancelClassName : ''), style: cancelStyle, onClick: this.onClickCancel },
              cancelCaption
            ),
            onClickSubmit && _react2.default.createElement(
              'a',
              { className: 'alert-submit button lg' + (submitClassName ? ' ' + submitClassName : ''), style: submitStyle, onClick: this.onClickSubmit, disabled: disabled },
              submitCaption
            )
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Alert;
}(_react.Component);

Alert.propTypes = {
  portal: _propTypes2.default.object,
  args: _propTypes2.default.any,
  show: _propTypes2.default.bool,

  duration: _propTypes2.default.number,

  maskStyle: _propTypes2.default.object,
  maskClassName: _propTypes2.default.string,
  onClickMask: _propTypes2.default.func,

  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  caption: _propTypes2.default.node,
  captionStyle: _propTypes2.default.object,
  captionClassName: _propTypes2.default.string,

  icon: _propTypes2.default.node,
  iconSrc: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,
  iconClassName: _propTypes2.default.string,

  contentStyle: _propTypes2.default.object,
  contentClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,

  submitStyle: _propTypes2.default.object,
  submitClassName: _propTypes2.default.string,
  submitCaption: _propTypes2.default.node,
  disabled: _propTypes2.default.bool,
  onClickSubmit: _propTypes2.default.func,

  cancelStyle: _propTypes2.default.object,
  cancelClassName: _propTypes2.default.string,
  cancelCaption: _propTypes2.default.node,
  onClickCancel: _propTypes2.default.func
};
Alert.defaultProps = {
  submitCaption: '确定',
  cancelCaption: '取消'
};
exports.default = Alert;
module.exports = exports['default'];