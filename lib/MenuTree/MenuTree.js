'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuTree = function (_Component) {
  (0, _inherits3.default)(MenuTree, _Component);

  function MenuTree(props) {
    (0, _classCallCheck3.default)(this, MenuTree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuTree.__proto__ || (0, _getPrototypeOf2.default)(MenuTree)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if ((0, _stringify2.default)(prevProps.list) !== (0, _stringify2.default)(_this.props.list)) {
        if (_this.props.list && _this.props.list.length) {
          _this.instance.setSelectedId(_this.props.selectedId);
          var list = Object.clone(_this.props.list);
          if ((0, _stringify2.default)(list).indexOf('"children"') === -1) {
            list = list.deepTree();
          }
          _this.instance.setData(list);
        } else {
          _this.instance.setData([]);
        }
      }
    };

    _this.componentDidMount = function () {
      if (_this.instance) return;
      var list = Object.clone(_this.props.list);
      if ((0, _stringify2.default)(list).indexOf('"children"') === -1) {
        list = list.deepTree();
      }
      var instance = new _instance2.default(_this.$el, {
        data: list,
        selectedId: _this.props.selectedId,
        onClick: _this.onClick // (item, isActive, isExtend: true展开 | false收缩)
      });
      _this.instance = instance;
    };

    _this.onClick = function (s, item, isActived, isExtend) {
      // childrenCount
      var childrenCount = item.children && item.children.length ? item.children.length : 0;

      if (_this.props.onClick) _this.props.onClick(s, item, isActived, isExtend, childrenCount);
    };

    return _this;
  }
  /* list: [{
    id: '',
    caption: '',
    active: false,
    children
  }] */


  (0, _createClass3.default)(MenuTree, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          selectedId = _props.selectedId,
          onClick = _props.onClick,
          list = _props.list,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'selectedId', 'onClick', 'list']);

      return _react2.default.createElement('ul', (0, _extends3.default)({ ref: function ref(el) {
          _this2.$el = el;
        }, className: 'menutree' + (className ? ' ' + className : '') }, others));
    }
  }]);
  return MenuTree;
}(_react.Component); // require PrototypeArray.js


MenuTree.propTypes = {
  className: _propTypes2.default.string,
  selectedId: _propTypes2.default.string, // 默认选中项的id
  onClick: _propTypes2.default.func,

  list: _propTypes2.default.array };
MenuTree.defaultProps = {};
exports.default = MenuTree;
module.exports = exports['default'];