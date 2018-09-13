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

var _aside = require('./aside.js');

var _aside2 = _interopRequireDefault(_aside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Aside = function (_Component) {
  (0, _inherits3.default)(Aside, _Component);

  function Aside(props, context) {
    (0, _classCallCheck3.default)(this, Aside);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Aside.__proto__ || (0, _getPrototypeOf2.default)(Aside)).call(this, props, context));

    _this.componentDidMount = function () {
      if (_this.state.instance || _this.props.list.length === 0 && !_this.props.children) return;
      var instance = new _aside2.default(_this.$el, {
        sides: {
          left: _this.$leftEl || null,
          right: _this.$rightEl || null
        }
      });
      _this.setState({
        instance: instance
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Aside, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          leftAside = _props.leftAside,
          rightAside = _props.rightAside,
          children = _props.children,
          transition = _props.transition;

      return children ? _react2.default.createElement(
        'div',
        { 'class': 'aside-page', ref: function ref(el) {
            _this2.$el = el;
          } },
        _react2.default.createElement(
          'div',
          { 'class': 'aside-wrapper' },
          children,
          _react2.default.createElement(
            'aside',
            { 'class': 'aside', ref: function ref(el) {
                _this2.$leftEl = el;
              }, 'data-transition': { transition: transition } },
            leftAside
          ),
          _react2.default.createElement(
            'aside',
            { 'class': 'aside', ref: function ref(el) {
                _this2.$rightEl = el;
              }, 'data-transition': { transition: transition } },
            rightAside
          )
        )
      ) : null;
    }
  }]);
  return Aside;
}(_react.Component);

Aside.propTypes = {
  leftAside: _propTypes2.default.node, // 左侧边栏
  rightAside: _propTypes2.default.node, // 右侧边栏
  children: _propTypes2.default.node, // 主体内容
  transition: _propTypes2.default.string // 过渡动画, overlay | push
};
Aside.defaultProps = {
  transition: 'push'
};
exports.default = Aside;
module.exports = exports['default'];