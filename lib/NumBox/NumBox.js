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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Close = require('./../Close');

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require PrototypeMath.js, 用于解决加减法精度丢失的问题
var NumBox = function (_Component) {
  (0, _inherits3.default)(NumBox, _Component);

  function NumBox(props) {
    (0, _classCallCheck3.default)(this, NumBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBox.__proto__ || (0, _getPrototypeOf2.default)(NumBox)).call(this, props));

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

    _this.onBlur = function (e) {
      var _this$props = _this.props,
          required = _this$props.required,
          min = _this$props.min,
          onChange = _this$props.onChange,
          onBlur = _this$props.onBlur;

      var value = Math.Calc.correctNumberBlur(_this.props.value, { required: required, min: min });
      if (onChange) onChange(value, _this.getArgs(e));
      if (onBlur) onBlur(value, _this.getArgs(e));
    };

    _this.onFocus = function (e) {
      var onFocus = _this.props.onFocus;

      if (onFocus) onFocus(_this.props.value, _this.getArgs(e));
    };

    _this.onClickInput = function (e) {
      var value = e.target.value;
      if (value - 0 === 0) {
        e.target.value = '';
      }
      if (_this.props.onClickInput) _this.props.onClickInput(value, _this.getArgs(e));
    };

    _this.onChange = function (e) {
      if (e.target.validity.badInput) {
        e.target.value = '';
      }
      var value = Math.Calc.correctNumber(e.target.value, _this.props);
      if (_this.props.onChange) _this.props.onChange(value, _this.getArgs(e));
    };

    _this.onClickMinus = function (e) {
      var value = Math.Calc.correctNumber(Math.Calc.subtract(_this.$input.value, 1), _this.props);
      // Callback
      if (_this.props.onChange) _this.props.onChange(value, _this.getArgs(e));
      if (_this.props.onClickMinus) _this.props.onClickMinus(value, _this.getArgs(e));
      _this.$input.focus();
    };

    _this.onClickPlus = function (e) {
      var value = Math.Calc.correctNumber(Math.Calc.add(_this.$input.value, 1), _this.props);
      // Callback
      if (_this.props.onChange) _this.props.onChange(value, _this.getArgs(e));
      if (_this.props.onClickPlus) _this.props.onClickPlus(value, _this.getArgs(e));
      _this.$input.focus();
    };

    _this.onClick = function (e) {
      e.stopPropagation();
      var _this$props2 = _this.props,
          clear = _this$props2.clear,
          onClick = _this$props2.onClick,
          onClickLicon = _this$props2.onClickLicon,
          onClickRicon = _this$props2.onClickRicon;

      if (_this.props.disabled) return;
      var target = e.target;
      if (clear && target.classList.contains('clearicon')) {
        _this.onClear(e);
      }
      if (onClickLicon && target.classList.contains('licon')) {
        onClickLicon(_this.$input.value, _this.getArgs(e));
        return;
      }
      if (onClickRicon && target.classList.contains('ricon')) {
        onClickLicon(_this.$input.value, _this.getArgs(e));
        return;
      }
      if (target.classList.contains('input-text')) {
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
      if (onClick) onClick(_this.$input.value, _this.getArgs(e));
    };

    _this.onClear = function (e) {
      _this.$input.focus();
      // 赋值
      if (_this.props.clear && typeof _this.props.clear === 'function') _this.props.clear('', _this.getArgs(e));
      if (_this.props.onChange) {
        _this.props.onChange('', _this.getArgs(e));
      }
      e.stopPropagation();
    };

    _this.getInputDOM = function () {
      var _this$props3 = _this.props,
          args = _this$props3.args,
          style = _this$props3.style,
          className = _this$props3.className,
          disabled = _this$props3.disabled,
          plusStyle = _this$props3.plusStyle,
          plusClassName = _this$props3.plusClassName,
          minusStyle = _this$props3.minusStyle,
          minusClassName = _this$props3.minusClassName,
          licon = _this$props3.licon,
          liconSrc = _this$props3.liconSrc,
          liconClassName = _this$props3.liconClassName,
          liconStyle = _this$props3.liconStyle,
          onClickLicon = _this$props3.onClickLicon,
          liconLazyLoad = _this$props3.liconLazyLoad,
          ricon = _this$props3.ricon,
          riconSrc = _this$props3.riconSrc,
          riconClassName = _this$props3.riconClassName,
          riconStyle = _this$props3.riconStyle,
          onClickRicon = _this$props3.onClickRicon,
          riconLazyLoad = _this$props3.riconLazyLoad,
          clear = _this$props3.clear,
          clearClassName = _this$props3.clearClassName,
          clearStyle = _this$props3.clearStyle,
          inputStyle = _this$props3.inputStyle,
          inputClassName = _this$props3.inputClassName,
          value = _this$props3.value,
          placeholder = _this$props3.placeholder,
          maxLength = _this$props3.maxLength,
          readOnly = _this$props3.readOnly,
          onClick = _this$props3.onClick,
          onClickMinus = _this$props3.onClickMinus,
          onClickPlus = _this$props3.onClickPlus,
          onClickInput = _this$props3.onClickInput,
          onChange = _this$props3.onChange,
          onError = _this$props3.onError,
          digits = _this$props3.digits,
          max = _this$props3.max,
          min = _this$props3.min,
          others = (0, _objectWithoutProperties3.default)(_this$props3, ['args', 'style', 'className', 'disabled', 'plusStyle', 'plusClassName', 'minusStyle', 'minusClassName', 'licon', 'liconSrc', 'liconClassName', 'liconStyle', 'onClickLicon', 'liconLazyLoad', 'ricon', 'riconSrc', 'riconClassName', 'riconStyle', 'onClickRicon', 'riconLazyLoad', 'clear', 'clearClassName', 'clearStyle', 'inputStyle', 'inputClassName', 'value', 'placeholder', 'maxLength', 'readOnly', 'onClick', 'onClickMinus', 'onClickPlus', 'onClickInput', 'onChange', 'onError', 'digits', 'max', 'min']);

      return _react2.default.createElement('input', (0, _extends3.default)({
        ref: function ref(el) {
          _this.$input = el;
        },
        type: 'number',
        value: value,
        min: min,
        max: max,
        readOnly: readOnly,
        placeholder: placeholder,
        onChange: _this.onChange,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        onClick: _this.onClickInput,
        className: 'numbox-input' + (inputClassName ? ' ' + inputClassName : ''),
        style: inputStyle
      }, others));
    };

    return _this;
  }

  (0, _createClass3.default)(NumBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var required = this.props.required;

      var value = this.props.value;
      if (required) {
        // 必填项,必须有值
        if (value === '') value = this.props.min || '0';
      }
      value = Math.Calc.correctNumber(value, this.props);
      if (this.props.onChange) this.props.onChange(value, this.getArgs());
    }
    // 失去焦点

    // 获取焦点

    // 点击文本框, 逢0清空

    // Methods

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
          liconSrc = _props.liconSrc,
          liconClassName = _props.liconClassName,
          liconStyle = _props.liconStyle,
          liconLazyLoad = _props.liconLazyLoad,
          ricon = _props.ricon,
          riconSrc = _props.riconSrc,
          riconClassName = _props.riconClassName,
          riconStyle = _props.riconStyle,
          riconLazyLoad = _props.riconLazyLoad,
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
          value: '-'
          // onClick={this.onClickMinus}
          , disabled: !isNaN(min) ? min - value >= 0 : false
        }),
        (liconSrc || liconClassName) && _react2.default.createElement(_Icon2.default, { lazyLoad: liconLazyLoad, className: 'licon' + (liconClassName ? ' ' + liconClassName : ''), src: liconSrc, style: liconStyle }),
        licon && licon,
        this.getInputDOM(),
        clear && value && _react2.default.createElement(_Close2.default, { className: 'clearicon' + (clearClassName ? ' ' + clearClassName : ''), style: clearStyle, onClick: this.onClear }),
        (riconSrc || riconClassName) && _react2.default.createElement(_Icon2.default, { lazyLoad: riconLazyLoad, className: 'ricon size16' + (riconClassName ? ' ' + riconClassName : ''), src: riconSrc, style: riconStyle }),
        ricon && ricon,
        _react2.default.createElement('input', {
          ref: function ref(el) {
            _this2.$plus = el;
          },
          type: 'button',
          className: 'numbox-button numbox-button-plus-flag' + (minusClassName ? ' ' + minusClassName : ''),
          style: minusStyle, value: '+'
          // onClick={this.onClickPlus}
          , disabled: !isNaN(max) ? max - value <= 0 : false
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
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  placeholder: _propTypes2.default.string,
  name: _propTypes2.default.string,
  maxLength: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  // 左右图标
  licon: _propTypes2.default.node,
  liconSrc: _propTypes2.default.string,
  liconClassName: _propTypes2.default.string,
  liconStyle: _propTypes2.default.object,
  onClickLicon: _propTypes2.default.func,
  liconLazyLoad: _propTypes2.default.bool,

  ricon: _propTypes2.default.node,
  riconSrc: _propTypes2.default.string,
  riconClassName: _propTypes2.default.string,
  riconStyle: _propTypes2.default.object,
  onClickRicon: _propTypes2.default.func,
  riconLazyLoad: _propTypes2.default.bool,
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
  required: true,
  maxLength: '16',
  readOnly: false,
  clearClassName: 'ricon close-icon-clear size18'
};
exports.default = NumBox;
module.exports = exports['default'];