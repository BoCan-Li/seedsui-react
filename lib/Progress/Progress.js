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

var _Counter = require('./../Counter');

var _Counter2 = _interopRequireDefault(_Counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = function (_Component) {
  (0, _inherits3.default)(Progress, _Component);

  function Progress(props) {
    (0, _classCallCheck3.default)(this, Progress);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || (0, _getPrototypeOf2.default)(Progress)).call(this, props));

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          percentage = _this$props.percentage,
          max = _this$props.max,
          min = _this$props.min,
          value = _this$props.value;
      // 计算百分比

      var barPercentage = 0;
      if (percentage) {
        barPercentage = percentage;
      } else if (max && value) {
        barPercentage = value / (max - min) * 100;
      }
      _this.$bar.style.width = barPercentage + '%';
    };

    _this.onClick = function () {};

    return _this;
  }

  (0, _createClass3.default)(Progress, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          barStyle = _props.barStyle,
          barClassName = _props.barClassName,
          percentage = _props.percentage,
          max = _props.max,
          min = _props.min,
          value = _props.value,
          showPercentage = _props.showPercentage;

      // 计算百分比

      var barPercentage = 0;
      if (percentage) {
        barPercentage = percentage;
      } else if (max && value) {
        barPercentage = value / (max - min) * 100;
      }

      return _react2.default.createElement(
        'div',
        { className: 'progress' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'span',
          { ref: function ref(el) {
              _this2.$bar = el;
            }, className: 'progress-bar' + (barClassName ? ' ' + barClassName : ''), style: barStyle },
          showPercentage && _react2.default.createElement(_Counter2.default, { duration: 1000, to: barPercentage, from: 0, suffix: '%', style: { fontSize: '12px', marginRight: '4px' } }),
          !showPercentage && _react2.default.createElement(_Counter2.default, { duration: 1000, to: Number(value), from: min, suffix: '/' + max, style: { fontSize: '12px', marginRight: '4px' } })
        )
      );
    }
  }]);
  return Progress;
}(_react.Component);

Progress.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  barStyle: _propTypes2.default.object,
  barClassName: _propTypes2.default.string,

  percentage: _propTypes2.default.number,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  value: _propTypes2.default.string,
  showPercentage: _propTypes2.default.bool
};
Progress.defaultProps = {
  showPercentage: true,
  max: 0,
  min: 0,
  value: '0'
};
exports.default = Progress;
module.exports = exports['default'];