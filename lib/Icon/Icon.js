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

var _Badge = require('./../Badge');

var _Badge2 = _interopRequireDefault(_Badge);

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
          onClick = _props.onClick,
          style = _props.style,
          className = _props.className,
          src = _props.src,
          lazyLoad = _props.lazyLoad,
          children = _props.children,
          badgeCaption = _props.badgeCaption,
          badgeClassName = _props.badgeClassName,
          badgeStyle = _props.badgeStyle,
          badgeLimit = _props.badgeLimit,
          badgeEllipsis = _props.badgeEllipsis;

      var nodataIconClassName = '';
      var newStyle = style;
      // 懒人加载时,先显示一张默认的背景图,然后在子元素上显示在线图片
      if (lazyLoad && src) {
        newStyle = style;
        nodataIconClassName = 'bg-no-img';
      } else if (src) {
        nodataIconClassName = '';
        newStyle = (0, _assign2.default)({ backgroundImage: 'url(' + src + ')' }, style);
      }

      return _react2.default.createElement(
        'i',
        { ref: function ref(el) {
            _this2.$el = el;
          }, onClick: onClick, className: 'icon' + (nodataIconClassName ? ' ' + nodataIconClassName : '') + (className ? ' ' + className : ''), style: newStyle },
        lazyLoad && src && _react2.default.createElement('span', { className: 'icon-img', style: { backgroundImage: 'url(' + src + ')' } }),
        children,
        badgeCaption && badgeCaption !== '0' && _react2.default.createElement(
          _Badge2.default,
          { className: badgeClassName, style: badgeStyle, limit: badgeLimit, ellipsis: badgeEllipsis },
          badgeCaption
        )
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  src: _propTypes2.default.string,
  lazyLoad: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,

  badgeCaption: _propTypes2.default.string,
  badgeClassName: _propTypes2.default.string,
  badgeStyle: _propTypes2.default.object,
  badgeLimit: _propTypes2.default.number,
  badgeEllipsis: _propTypes2.default.string,

  children: _propTypes2.default.node
};
Icon.defaultProps = {
  lazyLoad: false
};
exports.default = Icon;
module.exports = exports['default'];