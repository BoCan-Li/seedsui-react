'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _instance = require('./instance.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Counter = function (_Component) {
  (0, _inherits3.default)(Counter, _Component);

  function Counter(props) {
    (0, _classCallCheck3.default)(this, Counter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Counter.__proto__ || (0, _getPrototypeOf2.default)(Counter)).call(this, props));

    _this.componentDidMount = function () {
      var instance = new _instance.Counter(_this.$el);
      if (_this.props.autoplay) {
        instance.play();
      }
      _this.instance = instance;
    };

    _this.play = function () {
      if (_this.instance) {
        _this.instance.play();
      }
    };

    return _this;
  }

  (0, _createClass3.default)(Counter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          duration = _props.duration,
          from = _props.from,
          to = _props.to,
          suffix = _props.suffix,
          autoplay = _props.autoplay,
          others = (0, _objectWithoutProperties3.default)(_props, ['style', 'className', 'duration', 'from', 'to', 'suffix', 'autoplay']);

      return _react2.default.createElement(
        'span',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'counter' + (className ? ' ' + className : ''), style: style, 'data-duration': duration, 'data-from': from, 'data-to': to, 'data-suffix': suffix }, others),
        '1'
      );
    }
  }]);
  return Counter;
}(_react.Component);

Counter.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  duration: _propTypes2.default.number,
  from: _propTypes2.default.number,
  to: _propTypes2.default.number,
  suffix: _propTypes2.default.string, // 后缀
  autoplay: _propTypes2.default.bool // 是否自动播放
};
Counter.defaultProps = {
  duration: 5000,
  from: 0,
  to: 10,
  autoplay: true
};
exports.default = Counter;
module.exports = exports['default'];