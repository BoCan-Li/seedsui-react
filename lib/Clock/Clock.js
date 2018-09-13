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

var Clock = function (_Component) {
  (0, _inherits3.default)(Clock, _Component);

  function Clock(props) {
    (0, _classCallCheck3.default)(this, Clock);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Clock.__proto__ || (0, _getPrototypeOf2.default)(Clock)).call(this, props));

    _this.getHourDeg = function (hour) {
      return hour * 30;
    };

    _this.getMinuteDeg = function (minute) {
      return minute * 6;
    };

    return _this;
  }

  (0, _createClass3.default)(Clock, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          time = _props.time,
          style = _props.style,
          className = _props.className,
          onClick = _props.onClick;

      var hour = '00';
      var minute = '00';
      if (/\d{2}:\d{2}/.test(time)) {
        hour = time.split(':')[0];
        minute = time.split(':')[0];
      }
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'clock' + (className ? ' ' + className : ''), style: style, onClick: onClick },
        _react2.default.createElement('div', { ref: function ref(el) {
            _this2.$hour = el;
          }, className: 'clock-hour', style: { WebkitTransform: 'rotate(' + this.getHourDeg(hour) + 'deg)' } }),
        _react2.default.createElement('div', { ref: function ref(el) {
            _this2.$minute = el;
          }, className: 'clock-minute', style: { WebkitTransform: 'rotate(' + this.getMinuteDeg(minute) + 'deg)' } }),
        _react2.default.createElement('div', { 'class': 'clock-origin' })
      );
    }
  }]);
  return Clock;
}(_react.Component);

Clock.propTypes = {
  time: _propTypes2.default.string, // hh:mm
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
exports.default = Clock;
module.exports = exports['default'];