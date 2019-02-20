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

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputRange = function (_Component) {
  (0, _inherits3.default)(InputRange, _Component);

  function InputRange(props) {
    (0, _classCallCheck3.default)(this, InputRange);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputRange.__proto__ || (0, _getPrototypeOf2.default)(InputRange)).call(this, props));

    _this.onChange = function (e) {
      if (_this.props.onChange) {
        _this.props.onChange(_this.$input.value, Object.getArgs(e, _this.props.args));
      }
    };

    return _this;
  }

  (0, _createClass3.default)(InputRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var instance = new _instance2.default(this.$el);
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          disabled = _props.disabled,
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
        _react2.default.createElement('input', { disabled: disabled, ref: function ref(el) {
            _this2.$input = el;
          }, type: 'range', className: 'range-input', min: min, max: max, step: step, defaultValue: value }),
        _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              _this2.$tooltip = el;
            }, className: 'range-tooltip' },
          value
        )
      );
    }
  }]);
  return InputRange;
}(_react.Component);

InputRange.propTypes = {
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
InputRange.defaultProps = {
  value: '0',
  min: '0',
  max: '100',
  step: '1'
};
exports.default = InputRange;
module.exports = exports['default'];