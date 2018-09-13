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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuTree = function (_Component) {
  (0, _inherits3.default)(MenuTree, _Component);

  function MenuTree(props) {
    (0, _classCallCheck3.default)(this, MenuTree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuTree.__proto__ || (0, _getPrototypeOf2.default)(MenuTree)).call(this, props));

    _this.shouldComponentUpdate = function (nextProps) {
      if (_this.props.list.length === nextProps.list.length) {
        return false;
      }
      return true;
    };

    _this.componentDidUpdate = function (prevProps) {
      _this.state.instance.setActiveId(_this.props.activeId);
      _this.state.instance.setData(_this.props.list);
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          activeId = _this$props.activeId;

      if (_this.state.instance) return;
      var instance = new _instance2.default(_this.$el, {
        data: list,
        activeId: activeId,
        onClick: _this.onClick
      });
      _this.setState({
        instance: instance
      });
    };

    _this.onClick = function (item, isActived, isExtand, hasChildren) {
      if (_this.props.onClick) _this.props.onClick(item, isActived, isExtand, hasChildren);
    };

    _this.state = {
      instance: null
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
          style = _props.style;

      return _react2.default.createElement('ul', { ref: function ref(el) {
          _this2.$el = el;
        }, className: 'menutree' + (className ? ' ' + className : ''), style: style });
    }
  }]);
  return MenuTree;
}(_react.Component);

MenuTree.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  activeId: _propTypes2.default.string, // 默认选中项的id
  onClick: _propTypes2.default.func,

  list: _propTypes2.default.array };
MenuTree.defaultProps = {};
exports.default = MenuTree;
module.exports = exports['default'];