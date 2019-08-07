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

var InputText = function (_Component) {
  (0, _inherits3.default)(InputText, _Component);

  function InputText(props) {
    (0, _classCallCheck3.default)(this, InputText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputText.__proto__ || (0, _getPrototypeOf2.default)(InputText)).call(this, props));

    _this.onClick = function (e) {
      e.stopPropagation();
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onClickInput = _this$props.onClickInput,
          onClickLicon = _this$props.onClickLicon,
          onClickRicon = _this$props.onClickRicon;

      if (_this.props.disabled) return;
      var target = e.target;
      if (target.classList.contains('clearicon')) {
        _this.onClear(e);
      } else if (target.classList.contains('licon')) {
        if (onClickLicon) onClickLicon(_this.$input.value, Object.getArgs(e, _this.props.args));
      } else if (target.classList.contains('ricon')) {
        if (onClickRicon) onClickRicon(_this.$input.value, Object.getArgs(e, _this.props.args));
      } else if (target.classList.contains('input-text')) {
        if (onClick) onClick(_this.$input.value, Object.getArgs(e, _this.props.args));
        if (onClickInput) onClickInput(_this.$input.value, Object.getArgs(e, _this.props.args));
      } else {
        if (onClick) onClick(_this.$input.value, Object.getArgs(e, _this.props.args));
      }
    };

    _this.preAutoSize = function () {
      _this.$input.style.height = _this.$pre.clientHeight + 'px';
    };

    _this.onChange = function (e) {
      var target = e.target;
      var value = target.value;
      var _this$props2 = _this.props,
          pre = _this$props2.pre,
          valueBindProp = _this$props2.valueBindProp,
          type = _this$props2.type,
          onChange = _this$props2.onChange,
          maxLength = _this$props2.maxLength;
      // 自动扩充功能

      if (pre) {
        _this.$pre.children[0].innerText = value;
        _this.preAutoSize();
      }
      // 最大长度
      if (maxLength && value && value.length > maxLength) {
        value = value.substring(0, maxLength);
      }
      // 输入时只校验最大值、小数点、最大长度、返回错误
      if (type === 'number') {
        var _this$props3 = _this.props,
            max = _this$props3.max,
            digits = _this$props3.digits,
            onError = _this$props3.onError;

        value = Math.Calc.correctNumber(e.target.value, { max: max, digits: digits, maxLength: maxLength, onError: onError });
      }
      // onChange
      if (type !== 'text') {
        // 能输入中文的文本框,如果放开ios中文输入法会把拼音落进去
        if (!valueBindProp) target.value = value;
      }
      if (onChange) onChange(value, Object.getArgs(e, _this.props.args));
      _this.updateShowClear();
    };

    _this.onBlur = function (e) {
      var target = e.target;
      var value = target.value;
      var _this$props4 = _this.props,
          valueBindProp = _this$props4.valueBindProp,
          min = _this$props4.min,
          type = _this$props4.type,
          onBlur = _this$props4.onBlur,
          onChange = _this$props4.onChange;

      if (type === 'number') {
        // 失去焦点时只校验非空、最小值
        value = Math.Calc.correctNumber(value, { min: min });
        if (!valueBindProp) target.value = value;
        if (onChange) onChange(value, Object.getArgs(e, _this.props.args));
      }
      if (onBlur) onBlur(value, Object.getArgs(e, _this.props.args));
    };

    _this.onFocus = function (e) {
      var target = e.target;
      var value = target.value;
      var _this$props5 = _this.props,
          onFocus = _this$props5.onFocus,
          readOnly = _this$props5.readOnly;

      if (onFocus) {
        onFocus(value, Object.getArgs(e, _this.props.args));
        e.stopPropagation();
      }
      if (readOnly) {
        target.blur();
      }
    };

    _this.onClear = function (e) {
      _this.$input.focus();
      // 赋值
      if (!_this.props.valueBindProp) _this.$input.value = '';
      if (_this.props.clear && typeof _this.props.clear === 'function') _this.props.clear('', Object.getArgs(e, _this.props.args));
      if (_this.props.onChange) {
        _this.props.onChange('', Object.getArgs(e, _this.props.args));
      }
      // 自动扩充功能
      if (_this.props.pre) {
        _this.preAutoSize();
      }
      e.stopPropagation();
      _this.updateShowClear();
    };

    _this.getInputDOM = function () {
      var _this$props6 = _this.props,
          args = _this$props6.args,
          style = _this$props6.style,
          className = _this$props6.className,
          onClick = _this$props6.onClick,
          onChange = _this$props6.onChange,
          onClickInput = _this$props6.onClickInput,
          onBlur = _this$props6.onBlur,
          onFocus = _this$props6.onFocus,
          max = _this$props6.max,
          min = _this$props6.min,
          digits = _this$props6.digits,
          licon = _this$props6.licon,
          onClickLicon = _this$props6.onClickLicon,
          ricon = _this$props6.ricon,
          onClickRicon = _this$props6.onClickRicon,
          clear = _this$props6.clear,
          clearClassName = _this$props6.clearClassName,
          clearStyle = _this$props6.clearStyle,
          rcaption = _this$props6.rcaption,
          pre = _this$props6.pre,
          type = _this$props6.type,
          valueBindProp = _this$props6.valueBindProp,
          autoFocus = _this$props6.autoFocus,
          inputClassName = _this$props6.inputClassName,
          inputStyle = _this$props6.inputStyle,
          maxLength = _this$props6.maxLength,
          value = _this$props6.value,
          placeholder = _this$props6.placeholder,
          readOnly = _this$props6.readOnly,
          disabled = _this$props6.disabled,
          others = (0, _objectWithoutProperties3.default)(_this$props6, ['args', 'style', 'className', 'onClick', 'onChange', 'onClickInput', 'onBlur', 'onFocus', 'max', 'min', 'digits', 'licon', 'onClickLicon', 'ricon', 'onClickRicon', 'clear', 'clearClassName', 'clearStyle', 'rcaption', 'pre', 'type', 'valueBindProp', 'autoFocus', 'inputClassName', 'inputStyle', 'maxLength', 'value', 'placeholder', 'readOnly', 'disabled']);
      // pre类型

      if (pre) {
        // pre的左右padding
        var preLeft = 0;
        var preRight = 0;
        if (inputStyle) {
          if (inputStyle.padding) {
            var paddingValues = inputStyle.padding.split(' ');
            if (paddingValues.length === 1) {
              preLeft = paddingValues[0];
              preRight = paddingValues[0];
            } else if (paddingValues.length === 2) {
              preLeft = paddingValues[1];
              preRight = paddingValues[1];
            } else if (paddingValues.length === 4) {
              preLeft = paddingValues[1];
              preRight = paddingValues[3];
            }
          } else if (inputStyle.paddingLeft || inputStyle.paddingRight) {
            preLeft = inputStyle.paddingLeft || '0';
            preRight = inputStyle.paddingRight || '0';
          }
        }
        return _react2.default.createElement(
          'div',
          { className: 'input-pre-box' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle },
          valueBindProp && _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
              _this.$input = el;
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }, others)),
          !valueBindProp && _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
              _this.$input = el;
            }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }, others)),
          _react2.default.createElement(
            'pre',
            { ref: function ref(el) {
                _this.$pre = el;
              }, style: { left: preLeft, right: preRight } },
            _react2.default.createElement(
              'span',
              null,
              value
            )
          )
        );
      }
      // textarea类型
      if (type === 'textarea') {
        // 如果值绑定属性,则只有通过父组件的prop来改变值
        if (valueBindProp) {
          return _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
              _this.$input = el;
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
        }
        return _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
            _this.$input = el;
          }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
      }
      // 其它类型
      var inputType = type;
      switch (type) {
        case 'phone':
          inputType = 'tel';
          break;
        default:
          inputType = type;
      }
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      if (valueBindProp) {
        return _react2.default.createElement('input', (0, _extends3.default)({ max: max, min: min, autoFocus: autoFocus, ref: function ref(el) {
            _this.$input = el;
          }, type: inputType, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
      }
      return _react2.default.createElement('input', (0, _extends3.default)({ max: max, min: min, autoFocus: autoFocus, ref: function ref(el) {
          _this.$input = el;
        }, type: inputType, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
    };

    _this.updateShowClear = function () {
      var _this$props7 = _this.props,
          clear = _this$props7.clear,
          valueBindProp = _this$props7.valueBindProp;

      if (valueBindProp) return;
      var showClear = false;
      if (clear) {
        if (_this.$input && _this.$input.value) {
          showClear = true;
        } else {
          showClear = false;
        }
      }
      _this.setState({
        showClear: showClear
      });
    };

    _this.state = {
      showClear: props.value && props.clear // 用于非valueBindProp
    };
    return _this;
  }

  // 点击容器

  // 自动扩充功能

  // 文本框事件

  // 点击清除


  (0, _createClass3.default)(InputText, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          valueBindProp = _props.valueBindProp,
          className = _props.className,
          style = _props.style,
          licon = _props.licon,
          ricon = _props.ricon,
          clear = _props.clear,
          clearClassName = _props.clearClassName,
          clearStyle = _props.clearStyle,
          rcaption = _props.rcaption;
      // 支持valueBindProp和非valueBindProp两种模式的清空按钮控制

      var showClear = false;
      if (value) {
        showClear = true;
      } else {
        showClear = false;
      }
      var isShowClear = valueBindProp ? showClear : this.state.showClear;
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'input-text-box' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        licon && licon,
        this.getInputDOM(),
        clear && _react2.default.createElement('i', { className: 'icon clearicon ' + (isShowClear ? '' : 'hide') + (clearClassName ? ' ' + clearClassName : ''), style: clearStyle }),
        ricon && ricon,
        rcaption && rcaption
      );
    }
  }]);
  return InputText;
}(_react.Component);

InputText.propTypes = {
  type: _propTypes2.default.string, // 类型: text, number, phone, password
  valueBindProp: _propTypes2.default.bool, // 值是否绑定属性
  pre: _propTypes2.default.bool, // 自动扩充功能
  // 容器
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  // 文本框
  autoFocus: _propTypes2.default.bool,
  maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([// 日期或者数字框
  _propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,

  inputStyle: _propTypes2.default.object,
  inputClassName: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onClickInput: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  // 左右图标
  licon: _propTypes2.default.node,
  onClickLicon: _propTypes2.default.func, // 点击样式包含licon触发
  ricon: _propTypes2.default.node,
  onClickRicon: _propTypes2.default.func, // 点击样式包含ricon触发
  // 清除按键
  clear: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  clearClassName: _propTypes2.default.string,
  clearStyle: _propTypes2.default.object,
  // 右侧内容
  rcaption: _propTypes2.default.node
};
InputText.defaultProps = {
  type: 'text',
  value: '',
  readOnly: false,
  disabled: false,
  clearClassName: 'ricon close-icon-clear size18'
};
exports.default = InputText;
module.exports = exports['default'];