'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _Tabbar = require('./../Tabbar');

var _Tabbar2 = _interopRequireDefault(_Tabbar);

var _Dialog = require('./../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _MenuTiled = require('./../MenuTiled');

var _MenuTiled2 = _interopRequireDefault(_MenuTiled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_Component) {
  (0, _inherits3.default)(Dropdown, _Component);

  function Dropdown(props) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      // 如果数据长度不一样,或者上次没有data,此次有data,则刷新
      if (prevProps.list.length !== _this.props.list.length || prevProps.list[0] && !prevProps.list[0].data && _this.props.list[0].data) {
        _this.refresh();
        // 如果选中项有变化也要刷新
      } else if (_this.props.list.some(function (item, i) {
        return item.id !== prevProps.list[i].id;
      })) {
        _this.refresh();
      }
    };

    _this.componentDidMount = function () {
      // 计算距离头部
      var top = _this.props.top;
      if (!top) {
        top = _this.$tabbar.$el.offsetTop + 40;
      }
      _this.setState({
        top: top
      });
      // 更新数据
      _this.refresh();
    };

    _this.refresh = function () {
      // tabbar 和 MenuTiled
      var tabbar = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(_this.props.list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          tabbar.push({
            id: item.id,
            caption: item.caption,
            riconClassName: 'shape-triangle-down'
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ;
      _this.setState({
        tabbar: tabbar
      });
    };

    _this.onClickTab = function (item, index) {
      // 设置弹框的数据
      _this.setState({
        activeMenuId: _this.state.tabbar[index].id,
        menus: _this.props.list[index].data
      });
      if (_this.state.tabbarActiveIndex >= 0) {
        _this.setState({
          tabbarActiveIndex: -1,
          dialogShow: false
        });
      } else {
        _this.setState({
          tabbarActiveIndex: index,
          dialogShow: true
        });
      }
    };

    _this.onClickMask = function () {
      _this.setState({
        tabbarActiveIndex: -1,
        dialogShow: false
      });
    };

    _this.onClickMenu = function (item) {
      if (item.children && item.children.length > 0) return;
      var tabbar = _this.state.tabbar;
      var activeIndex = _this.state.tabbarActiveIndex;
      // 如果选中的标题是全部,则显示原始标题,例如:点击分类,选择全部,则应当显示分类
      if (item.id === _this.props.list[activeIndex].id) {
        tabbar[activeIndex].id = _this.props.list[activeIndex].id;
        tabbar[activeIndex].caption = _this.props.list[activeIndex].caption;
        // 设置选中的标题显示在tabbar上
      } else {
        tabbar[activeIndex].id = item.id;
        tabbar[activeIndex].caption = item.caption;
      }
      _this.setState({
        tabbar: tabbar,
        tabbarActiveIndex: -1,
        dialogShow: false
      });
      // 触发onChange事件
      if (_this.props.onChange) _this.props.onChange(tabbar);
    };

    _this.state = {
      tabbarActiveIndex: -1,
      tabbar: [],
      activeMenuId: '',
      menus: [],
      top: 0,
      dialogShow: false
    };
    return _this;
  }

  (0, _createClass3.default)(Dropdown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var DOM = [_react2.default.createElement(_Tabbar2.default, { key: 'tabbar', ref: function ref(el) {
          _this2.$tabbar = el;
        }, exceptOnClickActive: false, list: this.state.tabbar, onClick: this.onClickTab, activeIndex: this.state.tabbarActiveIndex, className: 'tabbar-dropdown tabbar-tiled border-b' })];
      DOM.push(_react2.default.createElement(
        _Dialog2.default,
        { key: 'dialog', portal: this.props.portal, onClickMask: this.onClickMask, animation: 'slideDown', style: { width: '100%' }, maskStyle: { top: this.state.top + 'px' }, show: this.state.dialogShow },
        _react2.default.createElement(_MenuTiled2.default, { list: this.state.menus, activeId: this.state.activeMenuId, onClick: this.onClickMenu })
      ));
      return DOM;
    }
  }]);
  return Dropdown;
}(_react.Component);

Dropdown.propTypes = {
  portal: _propTypes2.default.object, // 传送到DOM
  top: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  list: _propTypes2.default.array // [{caption: '分类', data: [{id: '1',caption: '测试数据1',children:[]}]}]
};
Dropdown.defaultProps = {
  list: []
};
exports.default = Dropdown;
module.exports = exports['default'];