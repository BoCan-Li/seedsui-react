'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
        _this.props.onClick(e, _this.props.list[index], Number(index));
        e.stopPropagation();
      }
    };

    _this.getTabbarStyle = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          className = _this$props.className,
          style = _this$props.style;

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
      var _this$props2 = _this.props,
          className = _this$props2.className,
          tiled = _this$props2.tiled;

      return 'tabbar animated' + (className ? ' ' + className : ' tabbar-line-width60') + (tiled ? ' tabbar-tiled' : '');
    };

    _this.getIconDOM = function (icon, iconActive, isActive) {
      if (isActive) {
        return iconActive ? iconActive : icon;
      }
      return icon;
    };

    _this.getTabsDOM = function () {
      var _this$props3 = _this.props,
          list = _this$props3.list,
          activeIndex = _this$props3.activeIndex,
          captionClassName = _this$props3.captionClassName,
          captionStyle = _this$props3.captionStyle,
          sndCaptionClassName = _this$props3.sndCaptionClassName,
          sndCaptionStyle = _this$props3.sndCaptionStyle;
      // tabStyle高度

      var tabStyle = {};
      if (_this.props.style && _this.props.style.height) {
        tabStyle = {
          height: _this.props.style.height
        };
      }
      // 遍历
      return list.map(function (item, index) {
        var icon = item.icon,
            iconActive = item.iconActive,
            ricon = item.ricon,
            riconActive = item.riconActive,
            name = item.name,
            caption = item.caption,
            sndcaption = item.sndcaption,
            active = item.active,
            _item$attributes = item.attributes,
            attributes = _item$attributes === undefined ? {} : _item$attributes,
            _item$style = item.style,
            style = _item$style === undefined ? {} : _item$style;

        var isActive = active || activeIndex === index;
        var liconDOM = null;
        if (icon) {
          liconDOM = _this.getIconDOM(icon, iconActive, isActive);
        }
        var riconDOM = null;
        if (ricon) {
          riconDOM = _this.getIconDOM(ricon, riconActive, isActive);
        }
        return _react2.default.createElement(
          'li',
          (0, _extends3.default)({ className: 'tab' + (isActive ? ' active' : ''), style: (0, _assign2.default)(tabStyle, style || {}), 'data-index': index, key: index }, attributes),
          liconDOM && liconDOM,
          _react2.default.createElement(
            'div',
            { className: 'tab-content' },
            _react2.default.createElement(
              'div',
              { className: 'tab-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
              caption || name
            ),
            sndcaption && _react2.default.createElement(
              'div',
              { className: 'tab-sndcaption' + (sndCaptionClassName ? ' ' + sndCaptionClassName : ''), style: sndCaptionStyle },
              sndcaption
            )
          ),
          riconDOM && riconDOM
        );
      });
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
      // 获取tabbar的ClassName
      var tabbarClassName = this.getTabbarClassName();
      // 获取tabs的DOM
      var tabsDOM = this.getTabsDOM();

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
  //     icon: node,
  //     iconActive: node,
  //     ricon: node,
  //     riconActive: node,

  //     name: string, // 与caption完全相同, 允许传入name或者caption
  //     caption: string,
  //     sndcaption: string,
  //     active: bool,

  //     attributes: object // tab属性
  //   }
  // ]
  exceptOnClickActive: true,
  className: 'tabbar-line tabbar-line-width70 border-b',
  activeIndex: 0
};
exports.default = Tabbar;
module.exports = exports['default'];