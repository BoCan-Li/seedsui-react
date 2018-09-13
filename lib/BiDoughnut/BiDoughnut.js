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

var BiDoughnut = function (_Component) {
  (0, _inherits3.default)(BiDoughnut, _Component);

  function BiDoughnut(props, context) {
    (0, _classCallCheck3.default)(this, BiDoughnut);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BiDoughnut.__proto__ || (0, _getPrototypeOf2.default)(BiDoughnut)).call(this, props, context));

    _this.getDuration = function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          rotate = _this$props.rotate;

      var correctRotate = rotate > 360 ? 360 : rotate;
      var duration1 = duration / 360;
      var durationRotate = duration1 * correctRotate;
      var durationLeft = 0;
      var durationRight = durationRotate;
      if (correctRotate > 180) {
        durationRight = duration1 * 180;
        durationLeft = duration1 * (correctRotate - 180);
      }
      return {
        durationRotate: durationRotate,
        delayLeft: durationRight,
        durationLeft: durationLeft,
        durationRight: durationRight
      };
    };

    _this.getRotate = function () {
      var rotate = _this.props.rotate;

      var rotateLeft = -135; // 左circle旋转角度
      var rotateRight = -135 + rotate; // 右circle旋转角度
      if (rotate > 180) {
        rotateRight = 45;
        rotateLeft = -135 + (rotate - 180);
      }
      return {
        rotateLeft: rotateLeft,
        rotateRight: rotateRight
      };
    };

    _this.aniRotate = function () {
      // 时长与延时
      var duration = _this.getDuration();
      var durationLeft = duration.durationLeft;
      var delayLeft = duration.delayLeft;
      var durationRight = duration.durationRight;
      // 旋转
      var rotate = _this.getRotate();
      var rotateLeft = rotate.rotateLeft;
      var rotateRight = rotate.rotateRight;
      setTimeout(function () {
        if (_this.$elLeftCircle) {
          _this.$elLeftCircle.style.WebkitTransitionDuration = durationLeft + 'ms';
          _this.$elLeftCircle.style.WebkitTransitionDelay = delayLeft + 'ms';
        }
        if (_this.$elRightCircle) {
          _this.$elRightCircle.style.WebkitTransitionDuration = durationRight + 'ms';
        }
        if (_this.$elLeftCircle) {
          _this.$elLeftCircle.style.WebkitTransform = 'rotate(' + rotateLeft + 'deg)';
        }
        if (_this.$elRightCircle) {
          _this.$elRightCircle.style.WebkitTransform = 'rotate(' + rotateRight + 'deg)';
        }
      }, _this.props.delay);
    };

    return _this;
  }
  // 只有延迟100毫秒动画才会生效


  (0, _createClass3.default)(BiDoughnut, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          lineWidth = _props.lineWidth,
          size = _props.size,
          className = _props.className,
          children = _props.children,
          childrenClassName = _props.childrenClassName,
          childrenStyle = _props.childrenStyle;
      // 动画旋转

      this.aniRotate();
      return _react2.default.createElement(
        'div',
        { className: 'bi-doughtut ' + className, style: { width: size + 'px', height: size + 'px' } },
        _react2.default.createElement(
          'div',
          { className: 'bi-doughtut-wrapper left' },
          _react2.default.createElement('div', { ref: function ref(el) {
              _this2.$elLeftCircle = el;
            }, className: 'bi-doughtut-circle left', style: { borderWidth: lineWidth + 'px', width: size - lineWidth * 2 + 'px', height: size - lineWidth * 2 + 'px' } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'bi-doughtut-wrapper right' },
          _react2.default.createElement('div', { ref: function ref(el) {
              _this2.$elRightCircle = el;
            }, className: 'bi-doughtut-circle right', style: { borderWidth: lineWidth + 'px', width: size - lineWidth * 2 + 'px', height: size - lineWidth * 2 + 'px' } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'bi-doughtut-label' + (childrenClassName ? ' ' + childrenClassName : ''), style: childrenStyle },
          children
        )
      );
    }
  }]);
  return BiDoughnut;
}(_react.Component);

BiDoughnut.propTypes = {
  lineWidth: _propTypes2.default.number, // 边框宽度
  size: _propTypes2.default.number, // 大小,px
  duration: _propTypes2.default.number, // 时长
  rotate: _propTypes2.default.number, // 最大360
  delay: _propTypes2.default.number, // 延时

  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  childrenClassName: _propTypes2.default.string,
  childrenStyle: _propTypes2.default.object
};
BiDoughnut.defaultProps = {
  lineWidth: 3,
  size: 50,
  duration: 1000,
  rotate: 0,
  delay: 100,
  className: 'disabled'
};
exports.default = BiDoughnut;
module.exports = exports['default'];