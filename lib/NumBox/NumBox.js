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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require PrototypeMath.js, 用于解决加减法精度丢失的问题
var NumBox = function (_Component) {
  (0, _inherits3.default)(NumBox, _Component);

  function NumBox(props) {
    (0, _classCallCheck3.default)(this, NumBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBox.__proto__ || (0, _getPrototypeOf2.default)(NumBox)).call(this, props));

    _this.onBlur = function (e) {
      var _this$props = _this.props,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled,
          required = _this$props.required,
          min = _this$props.min,
          onChange = _this$props.onChange,
          onBlur = _this$props.onBlur;

      if (readOnly || disabled) {
        return;
      }
      // 失去焦点时只校验非空、最小值
      var value = Math.Calc.correctNumber(_this.props.value, { required: required, min: min });
      if (onChange && '' + value !== '' + _this.props.value) onChange(value, Object.getArgs(e, _this.props.args));
      if (onBlur) onBlur(value, Object.getArgs(e, _this.props.args));
    };

    _this.onFocus = function (e) {
      var _this$props2 = _this.props,
          readOnly = _this$props2.readOnly,
          disabled = _this$props2.disabled,
          onFocus = _this$props2.onFocus;

      if (readOnly || disabled) {
        e.target.blur();
        return;
      }
      if (onFocus) onFocus(_this.props.value, Object.getArgs(e, _this.props.args));
    };

    _this.autoFocus = function () {
      if (_this.props.disabled || _this.props.readOnly || !_this.$input) return;
      _this.$input.focus();
      if (_this.props.autoSelect) _this.$input.select();
      // 修复兼容ios12的bug, 与全局的回弹并不冲突, 这里主要解决点击加减号时获取焦点, 不回弹的问题
      var iosExp = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
      if (iosExp && iosExp[1] && iosExp[1] > '12') {
        // 兼容输入法把页面顶上去, 不回弹的问题
        if (window.inputToggleTimeout) {
          window.clearTimeout(window.inputToggleTimeout);
        }
        if (!_this.$input.getAttribute('ios-bug-blur')) {
          _this.$input.setAttribute('ios-bug-blur', '1');
          _this.$input.addEventListener('blur', function () {
            window.inputToggleTimeout = window.setTimeout(function () {
              document.getElementById('root').scrollIntoView();
            }, 100);
          }, false);
        }
      }
    };

    _this.onClickInput = function (e) {
      var value = e.target.value;
      if (value - 0 === 0) {
        e.target.value = '';
      }
      if (_this.props.onClickInput) _this.props.onClickInput(value, Object.getArgs(e, _this.props.args));
    };

    _this.onChange = function (e) {
      if (e.target.validity.badInput) {
        e.target.value = '';
      }
      // 输入时只校验最大值、小数点、最大长度、返回错误
      var _this$props3 = _this.props,
          max = _this$props3.max,
          digits = _this$props3.digits,
          maxLength = _this$props3.maxLength,
          onError = _this$props3.onError;

      var value = Math.Calc.correctNumber(e.target.value, { max: max, digits: digits, maxLength: maxLength, onError: onError });
      if (_this.props.onChange) _this.props.onChange(value, Object.getArgs(e, _this.props.args));
    };

    _this.onClickMinus = function (e) {
      var value = Math.Calc.correctNumber(Math.Calc.subtract(_this.$input.value, 1), _this.props);
      // Callback
      if (_this.props.onChange) _this.props.onChange(value, Object.getArgs(e, _this.props.args));
      if (_this.props.onClickMinus) _this.props.onClickMinus(value, Object.getArgs(e, _this.props.args));
      _this.autoFocus();
    };

    _this.onClickPlus = function (e) {
      var value = Math.Calc.correctNumber(Math.Calc.add(_this.$input.value, 1), _this.props);
      // Callback
      if (_this.props.onChange) _this.props.onChange(value, Object.getArgs(e, _this.props.args));
      if (_this.props.onClickPlus) _this.props.onClickPlus(value, Object.getArgs(e, _this.props.args));
      _this.autoFocus();
    };

    _this.onClick = function (e) {
      e.stopPropagation();
      var _this$props4 = _this.props,
          clear = _this$props4.clear,
          onClick = _this$props4.onClick,
          onClickLicon = _this$props4.onClickLicon,
          onClickRicon = _this$props4.onClickRicon;

      if (_this.props.disabled) return;
      var target = e.target;
      if (clear && target.classList.contains('clearicon')) {
        _this.onClear(e);
      }
      if (onClickLicon && target.classList.contains('licon')) {
        onClickLicon(_this.$input.value, Object.getArgs(e, _this.props.args));
        return;
      }
      if (onClickRicon && target.classList.contains('ricon')) {
        onClickLicon(_this.$input.value, Object.getArgs(e, _this.props.args));
        return;
      }
      if (target.classList.contains('numbox-input')) {
        _this.onClickInput(e);
        return;
      }
      if (target.classList.contains('numbox-button-plus-flag')) {
        _this.onClickPlus(e);
        return;
      }
      if (target.classList.contains('numbox-button-minus-flag')) {
        _this.onClickMinus(e);
        return;
      }
      if (onClick) onClick(_this.$input.value, Object.getArgs(e, _this.props.args));
    };

    _this.onClear = function (e) {
      _this.autoFocus();
      // 赋值
      if (_this.props.clear && typeof _this.props.clear === 'function') _this.props.clear('', Object.getArgs(e, _this.props.args));
      if (_this.props.onChange) {
        _this.props.onChange('', Object.getArgs(e, _this.props.args));
      }
      e.stopPropagation();
    };

    _this.getInputDOM = function () {
      var _this$props5 = _this.props,
          args = _this$props5.args,
          style = _this$props5.style,
          className = _this$props5.className,
          disabled = _this$props5.disabled,
          onClick = _this$props5.onClick,
          plusStyle = _this$props5.plusStyle,
          plusClassName = _this$props5.plusClassName,
          minusStyle = _this$props5.minusStyle,
          minusClassName = _this$props5.minusClassName,
          onClickMinus = _this$props5.onClickMinus,
          onClickPlus = _this$props5.onClickPlus,
          licon = _this$props5.licon,
          onClickLicon = _this$props5.onClickLicon,
          ricon = _this$props5.ricon,
          onClickRicon = _this$props5.onClickRicon,
          clear = _this$props5.clear,
          clearClassName = _this$props5.clearClassName,
          clearStyle = _this$props5.clearStyle,
          inputStyle = _this$props5.inputStyle,
          inputClassName = _this$props5.inputClassName,
          value = _this$props5.value,
          placeholder = _this$props5.placeholder,
          maxLength = _this$props5.maxLength,
          readOnly = _this$props5.readOnly,
          onClickInput = _this$props5.onClickInput,
          onChange = _this$props5.onChange,
          onError = _this$props5.onError,
          onBlur = _this$props5.onBlur,
          onFocus = _this$props5.onFocus,
          digits = _this$props5.digits,
          max = _this$props5.max,
          min = _this$props5.min,
          autoFocus = _this$props5.autoFocus,
          autoSelect = _this$props5.autoSelect,
          others = (0, _objectWithoutProperties3.default)(_this$props5, ['args', 'style', 'className', 'disabled', 'onClick', 'plusStyle', 'plusClassName', 'minusStyle', 'minusClassName', 'onClickMinus', 'onClickPlus', 'licon', 'onClickLicon', 'ricon', 'onClickRicon', 'clear', 'clearClassName', 'clearStyle', 'inputStyle', 'inputClassName', 'value', 'placeholder', 'maxLength', 'readOnly', 'onClickInput', 'onChange', 'onError', 'onBlur', 'onFocus', 'digits', 'max', 'min', 'autoFocus', 'autoSelect']);

      return _react2.default.createElement('input', (0, _extends3.default)({
        ref: function ref(el) {
          _this.$input = el;
        },
        type: 'number',
        value: value,
        min: min,
        max: max,
        disabled: disabled,
        readOnly: readOnly,
        placeholder: placeholder,
        onChange: _this.onChange,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        className: 'numbox-input' + (inputClassName ? ' ' + inputClassName : ''),
        style: inputStyle
      }, others));
    };

    return _this;
  }

  (0, _createClass3.default)(NumBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.autoFocus();
      }
    }
    // 失去焦点

    // 获取焦点

    // 点击加减号清除时获取焦点

    // 点击文本框, 逢0清空

    // 修改值

    // 点击减

    // 点击加

    // 点击容器

    // 点击清除

    // render

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          min = _props.min,
          max = _props.max,
          value = _props.value,
          style = _props.style,
          className = _props.className,
          disabled = _props.disabled,
          plusStyle = _props.plusStyle,
          plusClassName = _props.plusClassName,
          minusStyle = _props.minusStyle,
          minusClassName = _props.minusClassName,
          licon = _props.licon,
          ricon = _props.ricon,
          clear = _props.clear,
          clearClassName = _props.clearClassName,
          clearStyle = _props.clearStyle;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, disabled: min >= max || disabled, style: style, className: 'numbox' + (className ? ' ' + className : ''), onClick: this.onClick },
        _react2.default.createElement('input', {
          ref: function ref(el) {
            _this2.$minus = el;
          },
          type: 'button',
          className: 'numbox-button numbox-button-minus-flag' + (plusClassName ? ' ' + plusClassName : ''),
          style: plusStyle,
          value: '-',
          disabled: !isNaN(min) ? min - value >= 0 : false
        }),
        licon && licon,
        this.getInputDOM(),
        clear && value && _react2.default.createElement('i', { className: 'icon clearicon' + (clearClassName ? ' ' + clearClassName : ''), style: clearStyle, onClick: this.onClear }),
        ricon && ricon,
        _react2.default.createElement('input', {
          ref: function ref(el) {
            _this2.$plus = el;
          },
          type: 'button',
          className: 'numbox-button numbox-button-plus-flag' + (minusClassName ? ' ' + minusClassName : ''),
          style: minusStyle, value: '+',
          disabled: !isNaN(max) ? max - value <= 0 : false
        })
      );
    }
  }]);
  return NumBox;
}(_react.Component);

NumBox.propTypes = {
  args: _propTypes2.default.any,
  // 容器
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  // 加减号
  plusStyle: _propTypes2.default.object,
  plusClassName: _propTypes2.default.string,
  minusStyle: _propTypes2.default.object,
  minusClassName: _propTypes2.default.string,
  // 文本框
  inputStyle: _propTypes2.default.object,
  inputClassName: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  placeholder: _propTypes2.default.string,
  name: _propTypes2.default.string,
  maxLength: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  // 自动获取焦点
  autoFocus: _propTypes2.default.bool,
  autoSelect: _propTypes2.default.bool,
  // 左右图标
  licon: _propTypes2.default.node,
  onClickLicon: _propTypes2.default.func,
  ricon: _propTypes2.default.node,
  onClickRicon: _propTypes2.default.func,
  // 清除按键
  clear: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  clearClassName: _propTypes2.default.string,
  clearStyle: _propTypes2.default.object,
  // events
  onClick: _propTypes2.default.func,
  onClickMinus: _propTypes2.default.func,
  onClickPlus: _propTypes2.default.func,
  onClickInput: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
NumBox.defaultProps = {
  maxLength: '16',
  clearClassName: 'ricon close-icon-clear size18'
};
exports.default = NumBox;
module.exports = exports['default'];