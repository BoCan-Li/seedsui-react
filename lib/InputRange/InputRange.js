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

var Range = function (_Component) {
  (0, _inherits3.default)(Range, _Component);

  function Range(props) {
    (0, _classCallCheck3.default)(this, Range);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Range.__proto__ || (0, _getPrototypeOf2.default)(Range)).call(this, props));

    _this.getArgs = function (e) {
      var args = _this.props.args;
      if (args !== undefined) {
        if (typeof args === 'string' && args === '$event') {
          args = e;
        } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
          args[args.indexOf('$event')] = e;
        }
      } else {
        args = e;
      }
      return args;
    };

    _this.onTouchStart = function (e) {
      e.stopPropagation();
    };

    _this.onTouchMove = function (e) {
      _this.showTooltip(_this.$tooltip, _this.$input);
      e.stopPropagation();
    };

    _this.onTouchEnd = function (e) {
      _this.onChange(e);
      e.stopPropagation();
    };

    _this.onChange = function (e) {
      if (_this.props.disabled) return;
      _this.$tooltip.style.visibility = 'hidden';
      if (_this.props.onChange) {
        _this.props.onChange(_this.$input.value, _this.getArgs(e));
      }
    };

    _this.showTooltip = function (tooltip, input) {
      //当前值所占百分比
      var percent = ((input.value - input.min) / (input.max - input.min)).toFixed(2);

      //距左的位置
      var dragRange = input.clientWidth * percent;
      var offsetLeft = input.offsetLeft + dragRange - 10;
      //var currentOffsetLeft=offsetLeft-input.parentNode.offsetLeft

      //滑块内部的实际位置
      var currentBallLeft = 28 * percent;

      //当前值的位置-滑块的位置=小球正中间的位置
      var left = offsetLeft - currentBallLeft;
      tooltip.innerHTML = input.value;
      tooltip.style.visibility = 'visible';
      tooltip.style.left = left + 'px';
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(Range, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
    // 显示tooltip

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          value = _props.value,
          min = _props.min,
          max = _props.max,
          step = _props.step;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'range' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              _this2.$tooltip = el;
            }, className: 'range-tooltip' },
          value
        ),
        _react2.default.createElement('input', { ref: function ref(el) {
            _this2.$input = el;
          }, type: 'range', className: 'range-input', min: min, max: max, step: step, defaultValue: value, onTouchStart: this.onTouchStart, onChange: this.onTouchMove, onTouchEnd: this.onTouchEnd, onMouseUp: this.onTouchEnd })
      );
    }
  }]);
  return Range;
}(_react.Component);

Range.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  step: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};
Range.defaultProps = {
  value: '0',
  min: '0',
  max: '100',
  step: '1'
};
exports.default = Range;
module.exports = exports['default'];