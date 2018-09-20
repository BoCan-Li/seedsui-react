'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
        drag: true,
        transition: _this.props.transition || 'push',
        onShowedLeft: _this.props.onShowedLeft,
        onShowedRight: _this.props.onShowedRight
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
          lSide = _props.lSide,
          lSideStyle = _props.lSideStyle,
          lSideClassName = _props.lSideClassName,
          rSide = _props.rSide,
          rSideStyle = _props.rSideStyle,
          rSideClassName = _props.rSideClassName,
          children = _props.children,
          transition = _props.transition,
          others = (0, _objectWithoutProperties3.default)(_props, ['lSide', 'lSideStyle', 'lSideClassName', 'rSide', 'rSideStyle', 'rSideClassName', 'children', 'transition']);

      return _react2.default.createElement(
        'div',
        { className: 'page-pull', ref: function ref(el) {
            _this2.$el = el;
          } },
        _react2.default.createElement(
          _Page2.default,
          others,
          children,
          _react2.default.createElement('div', { className: 'mask' })
        ),
        lSide && _react2.default.createElement(
          'aside',
          { className: 'page-side-left' + (lSideClassName ? ' ' + lSideClassName : ''), style: lSideStyle, 'data-transition': transition, ref: function ref(el) {
              _this2.$lSide = el;
            } },
          lSide
        ),
        rSide && _react2.default.createElement(
          'aside',
          { className: 'page-side-right' + (rSideClassName ? ' ' + rSideClassName : ''), style: rSideStyle, 'data-transition': transition, ref: function ref(el) {
              _this2.$rSide = el;
            } },
          rSide
        )
      );
    }
  }]);
  return PagePull;
}(_react.Component);

PagePull.propTypes = {
  // Page
  children: _propTypes2.default.node,
  // Side 侧边栏
  drag: _propTypes2.default.bool,
  lSide: _propTypes2.default.node, // 左侧边栏
  lSideStyle: _propTypes2.default.object,
  lSideClassName: _propTypes2.default.string,
  rSide: _propTypes2.default.node, // 右侧边栏
  rSideStyle: _propTypes2.default.object,
  rSideClassName: _propTypes2.default.string,
  transition: _propTypes2.default.string, // 过渡动画, push | reveal
  onShowedLeft: _propTypes2.default.func,
  onShowedRight: _propTypes2.default.func
};
PagePull.defaultProps = {
  drag: true,
  transition: 'push'
};
exports.default = PagePull;
module.exports = exports['default'];