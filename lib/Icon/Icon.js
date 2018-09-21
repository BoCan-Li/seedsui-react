'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Badge = require('./../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _Close = require('./../Close');

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function (_Component) {
  (0, _inherits3.default)(Icon, _Component);

  function Icon(props) {
    (0, _classCallCheck3.default)(this, Icon);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Icon, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          base = _props.base,
          baseClassName = _props.baseClassName,
          className = _props.className,
          style = _props.style,
          defaultImgClassName = _props.defaultImgClassName,
          defaultImgStyle = _props.defaultImgStyle,
          src = _props.src,
          lazyLoad = _props.lazyLoad,
          children = _props.children,
          badgeCaption = _props.badgeCaption,
          badgeClassName = _props.badgeClassName,
          badgeStyle = _props.badgeStyle,
          badgeLimit = _props.badgeLimit,
          badgeEllipsis = _props.badgeEllipsis,
          closeClassName = _props.closeClassName,
          closeStyle = _props.closeStyle,
          onClickClose = _props.onClickClose,
          others = (0, _objectWithoutProperties3.default)(_props, ['base', 'baseClassName', 'className', 'style', 'defaultImgClassName', 'defaultImgStyle', 'src', 'lazyLoad', 'children', 'badgeCaption', 'badgeClassName', 'badgeStyle', 'badgeLimit', 'badgeEllipsis', 'closeClassName', 'closeStyle', 'onClickClose']);

      if (base === 'pureImg') {
        if (lazyLoad && src) {
          return _react2.default.createElement('img', { alt: '', className: 'icon-img ' + defaultImgClassName, style: defaultImgStyle, 'data-load-src': src });
        }
        if (!lazyLoad && src) {
          return _react2.default.createElement('img', { alt: '', className: 'icon-img ' + defaultImgClassName, style: defaultImgStyle, src: src });
        }
        return null;
      }
      if (base === 'pureIcon') {
        if (lazyLoad && src) {
          return _react2.default.createElement('span', { className: 'icon-full ' + defaultImgClassName, style: defaultImgStyle, 'data-load-src': src });
        }
        if (!lazyLoad && src) {
          return _react2.default.createElement('span', { className: 'icon-full ' + defaultImgClassName, style: (0, _assign2.default)({ backgroundImage: 'url(' + src + ')' }, defaultImgStyle) });
        }
        return null;
      }
      return _react2.default.createElement(
        'span',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: '' + baseClassName + (className ? ' ' + className : ''), style: style }, others),
        base === 'icon' && lazyLoad && src && _react2.default.createElement('span', { className: 'icon-full ' + defaultImgClassName, style: defaultImgStyle, 'data-load-src': src }),
        base === 'icon' && !lazyLoad && src && _react2.default.createElement('span', { className: 'icon-full ' + defaultImgClassName, style: (0, _assign2.default)({ backgroundImage: 'url(' + src + ')' }, defaultImgStyle) }),
        base === 'img' && lazyLoad && src && _react2.default.createElement('img', { alt: '', className: 'icon-img ' + defaultImgClassName, style: defaultImgStyle, 'data-load-src': src }),
        base === 'img' && !lazyLoad && src && _react2.default.createElement('img', { alt: '', className: 'icon-img ' + defaultImgClassName, style: defaultImgStyle, src: src }),
        children,
        badgeCaption && badgeCaption !== '0' && _react2.default.createElement(
          _Badge2.default,
          { className: badgeClassName, style: badgeStyle, limit: badgeLimit, ellipsis: badgeEllipsis },
          badgeCaption
        ),
        onClickClose && _react2.default.createElement(_Close2.default, { onClick: onClickClose, className: '' + (closeClassName ? ' ' + closeClassName : '') })
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.propTypes = {
  base: _propTypes2.default.string, // img | pureImg | icon | pureIcon
  baseClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  lazyLoad: _propTypes2.default.bool,

  defaultImgClassName: _propTypes2.default.string,
  defaultImgStyle: _propTypes2.default.object,
  src: _propTypes2.default.string,

  badgeCaption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  badgeClassName: _propTypes2.default.string,
  badgeStyle: _propTypes2.default.object,
  badgeLimit: _propTypes2.default.number,
  badgeEllipsis: _propTypes2.default.string,

  onClickClose: _propTypes2.default.func,
  closeClassName: _propTypes2.default.string,
  closeStyle: _propTypes2.default.object,

  children: _propTypes2.default.node
};
Icon.defaultProps = {
  base: 'icon',
  baseClassName: 'icon',
  defaultImgClassName: 'bg-no-img',
  lazyLoad: false
};
exports.default = Icon;
module.exports = exports['default'];