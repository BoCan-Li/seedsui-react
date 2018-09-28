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

var BiClock = function (_Component) {
  (0, _inherits3.default)(BiClock, _Component);

  function BiClock(props) {
    (0, _classCallCheck3.default)(this, BiClock);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BiClock.__proto__ || (0, _getPrototypeOf2.default)(BiClock)).call(this, props));

    _this.getHourDeg = function (hour) {
      return hour * 30;
    };

    _this.getMinuteDeg = function (minute) {
      return minute * 6;
    };

    _this.aniRotate = function () {
      var _this$props = _this.props,
          time = _this$props.time,
          duration = _this$props.duration;

      var hour = '00';
      var minute = '00';
      if (/\d{2}:\d{2}/.test(time)) {
        hour = time.split(':')[0];
        minute = time.split(':')[1];
      }
      setTimeout(function () {
        if (_this.$hour) {
          _this.$hour.style.WebkitTransitionDuration = duration + 'ms';
          _this.$hour.style.WebkitTransform = 'rotate(' + _this.getHourDeg(hour) + 'deg)';
        }
        if (_this.$minute) {
          _this.$minute.style.WebkitTransitionDuration = duration + 'ms';
          _this.$minute.style.WebkitTransform = 'rotate(' + _this.getMinuteDeg(minute) + 'deg)';
        }
      }, _this.props.delay);
    };

    return _this;
  }

  (0, _createClass3.default)(BiClock, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          lineWidth = _props.lineWidth,
          size = _props.size,
          className = _props.className;
      // 动画旋转

      this.aniRotate();
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'bi-clock' + (className ? ' ' + className : ''), style: { width: size + 'px', height: size + 'px', borderWidth: lineWidth + 'px' } },
        _react2.default.createElement('div', { ref: function ref(el) {
            _this2.$hour = el;
          }, className: 'bi-clock-hour', style: { width: lineWidth + 'px' } }),
        _react2.default.createElement('div', { ref: function ref(el) {
            _this2.$minute = el;
          }, className: 'bi-clock-minute', style: { width: lineWidth + 'px' } }),
        _react2.default.createElement('div', { className: 'bi-clock-origin', style: { width: lineWidth + 1 + 'px', height: lineWidth + 1 + 'px' } })
      );
    }
  }]);
  return BiClock;
}(_react.Component);

BiClock.propTypes = {
  lineWidth: _propTypes2.default.number, // 边框宽度
  size: _propTypes2.default.number, // 大小,px
  time: _propTypes2.default.string, // hh:mm
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  duration: _propTypes2.default.number, // 时长
  delay: _propTypes2.default.number // 延时
};
BiClock.defaultProps = {
  lineWidth: 2,
  size: 50,
  duration: 500,
  delay: 0
};
exports.default = BiClock;
module.exports = exports['default'];