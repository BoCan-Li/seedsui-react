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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_Component) {
  (0, _inherits3.default)(Page, _Component);

  function Page(props) {
    (0, _classCallCheck3.default)(this, Page);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onScroll = _props.onScroll,
          onTouchStart = _props.onTouchStart,
          onTouchMove = _props.onTouchMove,
          onTouchEnd = _props.onTouchEnd;

      var touchTarget = this.$el;
      if (onTouchStart) {
        touchTarget['addEventListener']('touchstart', onTouchStart, false);
      }
      if (onTouchStart) {
        touchTarget['addEventListener']('touchmove', onTouchMove, false);
      }
      if (onTouchEnd) {
        touchTarget['addEventListener']('touchend', onTouchEnd, false);
        touchTarget['addEventListener']('touchcancel', onTouchEnd, false);
      }
      if (onScroll) {
        touchTarget['addEventListener']('scroll', onScroll, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          animation = _props2.animation,
          style = _props2.style,
          className = _props2.className,
          children = _props2.children;

      return _react2.default.createElement(
        'section',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'page' + (className ? ' ' + className : ''), 'data-animation': animation, style: style },
        children
      );
    }
  }]);
  return Page;
}(_react.Component);

Page.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  animation: _propTypes2.default.string,
  onScroll: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onTouchMove: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  children: _propTypes2.default.node
};
exports.default = Page;
module.exports = exports['default'];