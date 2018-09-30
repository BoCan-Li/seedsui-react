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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabbar = function (_Component) {
  (0, _inherits3.default)(Tabbar, _Component);

  function Tabbar(props) {
    (0, _classCallCheck3.default)(this, Tabbar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tabbar.__proto__ || (0, _getPrototypeOf2.default)(Tabbar)).call(this, props));

    _this.onClick = function (e) {
      var target = e.target;
      if (_this.props.exceptOnClickActive && target.classList.contains('active')) return;
      var index = target.getAttribute('data-index');
      if (!index) return;
      if (_this.props.onClick) {
        _this.props.onClick(_this.props.list[index], Number(index));
        e.stopPropagation();
      }
    };

    _this.getLIconDOM = function (item, isActive) {
      // iconStyle | iconClassName
      var iconStyle = {};
      var iconClassName = '';
      if (isActive && (item.iconActiveClassName || item.iconActiveStyle)) {
        if (item.iconActiveClassName) iconClassName = 'tab-icon ' + item.iconActiveClassName;
        if (item.iconActiveStyle) iconStyle = item.iconActiveStyle;
      } else {
        if (item.iconClassName) iconClassName = 'tab-icon ' + item.iconClassName;
        if (item.iconStyle) iconStyle = item.iconStyle;
      }
      // iconBadgeStyle | iconBadgeClassName | iconBadgeCaption
      var iconBadgeStyle = _this.props.iconBadgeStyle;
      if (item.iconBadgeStyle) {
        iconBadgeStyle = item.iconBadgeStyle;
      }
      var iconBadgeClassName = _this.props.iconBadgeClassName;
      if (item.iconBadgeClassName) {
        iconBadgeClassName = item.iconBadgeClassName;
      }
      var iconBadgeCaption = '';
      if (item.iconBadgeCaption) {
        iconBadgeCaption = item.iconBadgeCaption;
      }
      // DOM
      return _react2.default.createElement(_Icon2.default, { className: iconClassName, style: iconStyle, badgeCaption: iconBadgeCaption, badgeClassName: iconBadgeClassName, badgeStyle: iconBadgeStyle });
    };

    _this.getRIconDOM = function (item, isActive) {
      // riconStyle | riconClassName
      var riconStyle = {};
      var riconClassName = '';
      if (isActive && (item.iconActiveClassName || item.iconActiveStyle)) {
        if (item.iconActiveClassName) riconClassName = 'tab-icon ' + item.iconActiveClassName;
        if (item.iconActiveStyle) riconStyle = item.iconActiveStyle;
      } else {
        if (item.riconClassName) riconClassName = 'tab-icon ' + item.riconClassName;
        if (item.riconStyle) riconStyle = item.riconStyle;
      }
      // riconBadgeStyle | riconBadgeClassName | riconBadgeCaption
      var riconBadgeStyle = _this.props.riconBadgeStyle;
      if (item.riconBadgeStyle) {
        riconBadgeStyle = item.riconBadgeStyle;
      }
      var riconBadgeClassName = _this.props.riconBadgeClassName;
      if (item.riconBadgeClassName) {
        riconBadgeClassName = item.riconBadgeClassName;
      }
      var riconBadgeCaption = '';
      if (item.riconBadgeCaption) {
        riconBadgeCaption = item.riconBadgeCaption;
      }
      // DOM
      return _react2.default.createElement(_Icon2.default, { className: riconClassName, style: riconStyle, badgeCaption: riconBadgeCaption, badgeClassName: riconBadgeClassName, badgeStyle: riconBadgeStyle });
    };

    _this.getTabsDOM = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          activeIndex = _this$props.activeIndex,
          style = _this$props.style,
          captionClassName = _this$props.captionClassName,
          captionStyle = _this$props.captionStyle,
          sndCaptionClassName = _this$props.sndCaptionClassName,
          sndCaptionStyle = _this$props.sndCaptionStyle;
      // tabStyle高度

      var tabStyle = {};
      if (style && style.height) {
        tabStyle = {
          height: style.height
        };
      }
      // 遍历
      return list.map(function (item, index) {
        var isActive = item.active || activeIndex === index;
        var liconDOM = null;
        if (item.iconClassName) {
          liconDOM = _this.getLIconDOM(item, isActive);
        }
        var riconDOM = null;
        if (item.riconClassName) {
          riconDOM = _this.getRIconDOM(item, isActive);
        }
        return _react2.default.createElement(
          'li',
          { id: item.id, 'data-index': index, className: 'tab' + (isActive ? ' active' : ''), style: (0, _assign2.default)(tabStyle, item.style || {}), key: index },
          liconDOM && liconDOM,
          _react2.default.createElement(
            'div',
            { className: 'tab-content' },
            _react2.default.createElement(
              'div',
              { className: 'tab-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
              item.caption
            ),
            item.sndcaption && _react2.default.createElement(
              'div',
              { className: 'tab-sndcaption' + (sndCaptionClassName ? ' ' + sndCaptionClassName : ''), style: sndCaptionStyle },
              item.sndcaption
            )
          ),
          riconDOM && riconDOM
        );
      });
    };

    _this.getTabbarStyle = function () {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          className = _this$props2.className,
          style = _this$props2.style;

      var tabbarStyle = {};
      // 矩形tabbar应当有的总宽度
      if (className.hasClass('tabbar-rect')) {
        switch (list.length) {
          case 1:
            tabbarStyle = { width: '30%' };
            break;
          case 2:
            tabbarStyle = { width: '50%' };
            break;
          case 3:
            tabbarStyle = { width: '50%' };
            break;
          default:
            tabbarStyle = {};
        }
      }
      return (0, _assign2.default)({}, tabbarStyle, style);
    };

    _this.getTabbarClassName = function () {
      var _this$props3 = _this.props,
          className = _this$props3.className,
          tiled = _this$props3.tiled;

      return 'tabbar animated' + (className ? ' ' + className : ' tabbar-line-width60') + (tiled ? ' tabbar-tiled' : '');
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Tabbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var disabled = this.props.disabled;
      // 获取tabbar样式

      var tabbarStyle = this.getTabbarStyle();
      // 获取tabs的DOM
      var tabsDOM = this.getTabsDOM();
      // 获取tabbar的ClassName
      var tabbarClassName = this.getTabbarClassName();
      return _react2.default.createElement(
        'ul',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: tabbarClassName, disabled: disabled, style: tabbarStyle, onClick: this.onClick },
        tabsDOM
      );
    }
  }]);
  return Tabbar;
}(_react.Component);

Tabbar.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string, // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
  iconBadgeStyle: _propTypes2.default.object,
  iconBadgeClassName: _propTypes2.default.string,
  riconBadgeStyle: _propTypes2.default.object,
  riconBadgeClassName: _propTypes2.default.string,
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object,
  sndCaptionClassName: _propTypes2.default.string,
  sndCaptionStyle: _propTypes2.default.object,
  list: _propTypes2.default.array,
  tiled: _propTypes2.default.bool, // 宽度等分, 默认宽度弹性伸缩
  disabled: _propTypes2.default.bool,
  exceptOnClickActive: _propTypes2.default.bool, // 排除点击选中的菜单
  onClick: _propTypes2.default.func,
  activeIndex: _propTypes2.default.number
};
Tabbar.defaultProps = {
  list: [],
  // [
  //   {
  //     iconStyle: object,
  //     iconClassName: string,
  //     iconActiveStyle: object,
  //     iconActiveClassName: string,

  //     iconBadgeClassName: string,
  //     iconBadgeStyle: object,
  //     iconBadgeCaption: string,

  //     riconStyle: object,
  //     riconClassName: string,

  //     riconBadgeClassName: string,
  //     riconBadgeStyle: object,
  //     riconBadgeCaption: string,

  //     caption: string,
  //     sndcaption: string,
  //     active: bool,
  //     id: string
  //   }
  // ]
  exceptOnClickActive: true,
  className: 'tabbar-line tabbar-line-width70 border-b',
  activeIndex: 0
};
exports.default = Tabbar;
module.exports = exports['default'];