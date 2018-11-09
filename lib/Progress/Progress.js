'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _Counter = require('./../Counter');

var _Counter2 = _interopRequireDefault(_Counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = function (_Component) {
  (0, _inherits3.default)(Progress, _Component);

  function Progress(props) {
    (0, _classCallCheck3.default)(this, Progress);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || (0, _getPrototypeOf2.default)(Progress)).call(this, props));

    _this.componentDidMount = function () {};

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
          captionStyle = _props.captionStyle,
          captionClassName = _props.captionClassName,
          percentage = _props.percentage,
          max = _props.max,
          min = _props.min,
          value = _props.value,
          showPercentage = _props.showPercentage,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['style', 'className', 'barStyle', 'barClassName', 'captionStyle', 'captionClassName', 'percentage', 'max', 'min', 'value', 'showPercentage', 'children']);

      // 计算百分比

      var barPercentage = 0;
      var textPercentage = 0;
      if (!isNaN(percentage)) {
        barPercentage = textPercentage = percentage;
      } else if (!isNaN(max) && !isNaN(value)) {
        barPercentage = textPercentage = value / (max - min) * 100;
      }
      if (barPercentage > 100) {
        barPercentage = 100;
      } else if (barPercentage < 0) {
        barPercentage = 0;
      }
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'progress' + (className ? ' ' + className : ''), style: style }, others),
        _react2.default.createElement(
          'span',
          { ref: function ref(el) {
              _this2.$bar = el;
            }, className: 'progress-bar' + (barClassName ? ' ' + barClassName : ''), style: (0, _assign2.default)({}, barStyle, { width: barPercentage + '%' }) },
          showPercentage && _react2.default.createElement(_Counter2.default, { duration: 1000, to: textPercentage, from: 0, suffix: '%', className: 'progress-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle }),
          !showPercentage && _react2.default.createElement(_Counter2.default, { duration: 1000, to: Number(value), from: min, suffix: '/' + max, className: 'progress-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle })
        ),
        children
      );
    }
  }]);
  return Progress;
}(_react.Component);

Progress.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  barStyle: _propTypes2.default.object,
  barClassName: _propTypes2.default.string,

  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object,

  percentage: _propTypes2.default.number,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  showPercentage: _propTypes2.default.bool,

  children: _propTypes2.default.node
};
Progress.defaultProps = {
  showPercentage: true,
  max: 100,
  min: 0,
  value: 0
};
exports.default = Progress;
module.exports = exports['default'];