'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Device = require('./../Device.js');

var _Device2 = _interopRequireDefault(_Device);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Titlebar = function (_Component) {
  (0, _inherits3.default)(Titlebar, _Component);

  function Titlebar(props) {
    (0, _classCallCheck3.default)(this, Titlebar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Titlebar.__proto__ || (0, _getPrototypeOf2.default)(Titlebar)).call(this, props));

    _this.onClickBack = function () {
      var onClickBack = _this.props.onClickBack;
      // 如果有onClickBack的props,则优先执行props的方法

      if (onClickBack) {
        onClickBack();
        return;
      }
      // 否则走默认的返回
      _Bridge2.default.back();
    };

    _this.getButtonsDOM = function (arr) {
      return arr.map(function (item, index) {
        if (item === '$back') {
          item = {
            className: _this.props.backClassName || null,
            style: _this.props.backStyle || null,
            icon: _this.props.backIcon || null,
            iconClassName: _this.props.backIconClassName || null,
            iconStyle: _this.props.backIconStyle || {},
            caption: _this.props.backCaption || null,
            onClick: _this.onClickBack
          };
        }
        return _react2.default.createElement(
          'a',
          { key: index, disabled: item.disabled, onClick: function onClick() {
              if (item.onClick) item.onClick(item.args || '');
            }, className: 'titlebar-button button' + (item.className ? ' ' + item.className : ' bar'), style: item.style },
          (item.iconSrc || item.iconClassName) && _react2.default.createElement('span', { className: 'icon' + (item.iconClassName ? ' ' + item.iconClassName : ''), style: (0, _assign2.default)(item.iconSrc ? { backgroundImage: 'url(' + item.iconSrc + ')' } : {}, item.iconStyle) }),
          item.icon && item.icon,
          item.caption && _react2.default.createElement(
            'span',
            null,
            item.caption
          )
        );
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Titlebar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          showUrlTitle = _props.showUrlTitle,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          children = _props.children,
          onClickCaption = _props.onClickCaption,
          lButtons = _props.lButtons,
          rButtons = _props.rButtons,
          backIconClassName = _props.backIconClassName,
          backIconStyle = _props.backIconStyle,
          backClassName = _props.backClassName,
          backStyle = _props.backStyle,
          backCaption = _props.backCaption,
          onClickBack = _props.onClickBack,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'showUrlTitle', 'caption', 'captionClassName', 'captionStyle', 'children', 'onClickCaption', 'lButtons', 'rButtons', 'backIconClassName', 'backIconStyle', 'backClassName', 'backStyle', 'backCaption', 'onClickBack']);

      var lButtonsDOM = null;
      if (Array.isArray(lButtons)) {
        lButtonsDOM = this.getButtonsDOM(lButtons);
      }
      var rButtonsDOM = null;
      if (Array.isArray(rButtons)) {
        rButtonsDOM = this.getButtonsDOM(rButtons);
      }
      // 设置显示标题
      var title = _Device2.default.getUrlParameter('titlebar', location.search);
      if (showUrlTitle && title) {
        caption = _react2.default.createElement(
          'h1',
          { className: 'titlebar-caption nowrap text-center' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle, onClick: onClickCaption },
          decodeURIComponent(title)
        );
      } else if (typeof caption === 'string') {
        caption = _react2.default.createElement(
          'h1',
          { className: 'titlebar-caption nowrap text-center' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle, onClick: onClickCaption },
          caption
        );
      }
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'titlebar' + (className ? ' ' + className : '') }, others),
        _react2.default.createElement(
          'div',
          { className: 'titlebar-left' },
          lButtonsDOM
        ),
        caption,
        children,
        _react2.default.createElement(
          'div',
          { className: 'titlebar-right' },
          rButtonsDOM
        )
      );
    }
  }]);
  return Titlebar;
}(_react.Component);

Titlebar.propTypes = {
  className: _propTypes2.default.string,

  showUrlTitle: _propTypes2.default.bool, // 标题是否显示url中的titlebar
  caption: _propTypes2.default.node,
  // 以下三个属性, 只有caption为string类型或者显示地址栏标题时才有用
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object,
  onClickCaption: _propTypes2.default.func,

  lButtons: _propTypes2.default.array, // [{className: string, style: object, iconClassName: string, icon: node, caption: string}]
  rButtons: _propTypes2.default.array,
  backClassName: _propTypes2.default.string,
  backStyle: _propTypes2.default.object,
  backIcon: _propTypes2.default.node,
  backIconClassName: _propTypes2.default.string,
  backIconStyle: _propTypes2.default.object,
  backCaption: _propTypes2.default.string,
  onClickBack: _propTypes2.default.func,
  children: _propTypes2.default.node
};
Titlebar.defaultProps = {
  showUrlTitle: true,
  lButtons: ['$back'],
  className: 'border-b',
  backIconClassName: 'shape-arrow-left'
};
exports.default = Titlebar;
module.exports = exports['default'];