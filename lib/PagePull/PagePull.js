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

var _Page = require('./../Page');

var _Page2 = _interopRequireDefault(_Page);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PagePull = function (_Component) {
  (0, _inherits3.default)(PagePull, _Component);

  function PagePull(props, context) {
    (0, _classCallCheck3.default)(this, PagePull);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PagePull.__proto__ || (0, _getPrototypeOf2.default)(PagePull)).call(this, props, context));

    _this.componentDidMount = function () {
      var instance = new _instance2.default(_this.$el, {
        isDrag: true,
        sides: {
          left: _this.$sideLeft || null,
          right: _this.$sideRight || null
        },
        onStart: function onStart(e) {
          console.log("开始显示");
        },
        onShowed: function onShowed(e) {
          console.log("显示结束");
        },
        onHid: function onHid(e) {
          console.log("隐藏结束");
        }
      });
      _this.setState({
        instance: instance
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(PagePull, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          sideLeft = _props.sideLeft,
          sideRight = _props.sideRight,
          children = _props.children,
          transition = _props.transition;

      return _react2.default.createElement(
        'div',
        { className: 'aside-page', ref: function ref(el) {
            _this2.$el = el;
          } },
        _react2.default.createElement(
          'div',
          { className: 'aside-wrapper' },
          _react2.default.createElement(
            _Page2.default,
            null,
            children
          ),
          sideLeft && _react2.default.createElement(
            'aside',
            { className: 'aside-left', 'data-transition': transition, ref: function ref(el) {
                _this2.$sideLeft = el;
              } },
            sideLeft
          ),
          sideRight && _react2.default.createElement(
            'aside',
            { className: 'aside-left', 'data-transition': transition, ref: function ref(el) {
                _this2.$sideRight = el;
              } },
            sideRight
          )
        )
      );
    }
  }]);
  return PagePull;
}(_react.Component);

PagePull.propTypes = {
  sideLeft: _propTypes2.default.node, // 左侧边栏
  sideRight: _propTypes2.default.node, // 右侧边栏
  children: _propTypes2.default.node, // 主体内容
  transition: _propTypes2.default.string // 过渡动画, overlay | push
};
PagePull.defaultProps = {
  transition: 'push'
};
exports.default = PagePull;
module.exports = exports['default'];