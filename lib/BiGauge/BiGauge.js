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

var BiGauge = function (_Component) {
  (0, _inherits3.default)(BiGauge, _Component);

  function BiGauge(props, context) {
    (0, _classCallCheck3.default)(this, BiGauge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BiGauge.__proto__ || (0, _getPrototypeOf2.default)(BiGauge)).call(this, props, context));

    _this.getDuration = function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          rotate = _this$props.rotate;

      return duration / 270 * rotate;
    };

    _this.getRotate = function () {
      var rotate = _this.props.rotate;

      return rotate > 270 ? 270 : rotate;
    };

    _this.getBgLvl = function () {
      var rotate = _this.props.rotate;

      var lvl = Math.round(rotate / 27);
      return lvl > 10 ? 10 : 1;
    };

    _this.aniRotate = function () {
      // 时长
      var duration = _this.getDuration();
      // 旋转
      var rotate = _this.getRotate();
      // 背景
      var bgLvl = 'bg' + _this.getBgLvl();
      setTimeout(function () {
        if (_this.$el) {
          _this.$el.style.WebkitAnimationDuration = duration + 'ms';
          _this.$el.classList.add(bgLvl);
        }
        if (_this.$elPointer) {
          _this.$elPointer.style.WebkitTransitionDuration = duration + 'ms';
          _this.$elPointer.style.WebkitTransform = 'rotate(' + rotate + 'deg)';
        }
      }, _this.props.delay);
    };

    return _this;
  }
  // 只有延迟100毫秒动画才会生效


  (0, _createClass3.default)(BiGauge, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          childrenClassName = _props.childrenClassName,
          childrenStyle = _props.childrenStyle;
      // 动画旋转

      this.aniRotate();
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'bi-gauge-box' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'div',
          { className: 'bi-gauge' },
          _react2.default.createElement('div', { ref: function ref(el) {
              _this2.$elPointer = el;
            }, className: 'bi-gauge-pointer' }),
          _react2.default.createElement(
            'div',
            { className: 'bi-gauge-text' + (childrenClassName ? ' ' + childrenClassName : ''), style: childrenStyle },
            children
          )
        )
      );
    }
  }]);
  return BiGauge;
}(_react.Component);

BiGauge.propTypes = {
  duration: _propTypes2.default.number, // 时长
  rotate: _propTypes2.default.number, // 最大360
  delay: _propTypes2.default.number, // 延时

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.node,
  childrenClassName: _propTypes2.default.string,
  childrenStyle: _propTypes2.default.object
};
BiGauge.defaultProps = {
  duration: 1000,
  rotate: 0,
  delay: 100
};
exports.default = BiGauge;
module.exports = exports['default'];