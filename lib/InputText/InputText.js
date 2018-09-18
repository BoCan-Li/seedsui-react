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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Close = require('./../Close');

var _Close2 = _interopRequireDefault(_Close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputText = function (_Component) {
  (0, _inherits3.default)(InputText, _Component);

  function InputText(props) {
    (0, _classCallCheck3.default)(this, InputText);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputText.__proto__ || (0, _getPrototypeOf2.default)(InputText)).call(this, props));

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

    _this.onClick = function (e) {
      if (_this.props.disabled) return;
      if (_this.props.onClick) {
        var target = e.currentTarget.querySelector('input');
        var value = target.value;
        _this.props.onClick(value, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.correctPhone = function (value) {
      var val = value;
      // 如果输入的不是一个正整数，则转为正整数
      if (isNaN(value)) {
        var result = value.match(/[0-9]{1,}/);
        if (result) val = result[0];else val = '';
        // callback onError
        if (_this.props.onError) _this.props.onError({ msg: '必须要输入数字哦' });
      }
      return val;
    };

    _this.correctNumber = function (value) {
      if (value === '') return '';
      var num = Number(value);
      if (isNaN(num)) return '';
      // 判断是否超出限制
      var _this$props = _this.props,
          max = _this$props.max,
          min = _this$props.min;

      if (!isNaN(max) && num > max) {
        // callback onError
        if (_this.props.onError) _this.props.onError({ msg: '最大不能超过' + max });
        return '' + max;
      }
      if (!isNaN(min) && num < min) {
        // callback onError
        if (_this.props.onError) _this.props.onError({ msg: '最小不能小于' + min });
        return '' + min;
      }
      var val = value;
      // 截取小数位数
      if (_this.props.digits !== false) {
        if (String(num).indexOf('.') >= 0) val = Math.Calc.toDigits(num, _this.props.digits);
      }
      // 最大长度限制
      if (_this.props.maxLength && val && val.length > _this.props.maxLength) {
        val = val.slice(0, _this.props.maxLength);
      }
      return '' + val;
    };

    _this.preAutoSize = function () {
      _this.$input.style.height = _this.$pre.clientHeight + 'px';
    };

    _this.onChange = function (e) {
      var target = e.target;
      var value = target.value;
      var _this$props2 = _this.props,
          type = _this$props2.type,
          onChange = _this$props2.onChange;
      // 自动扩充功能

      if (_this.props.pre) {
        _this.$pre.children[0].innerText = value;
        _this.preAutoSize();
      }
      // 手机组件
      if (type === 'phone') {
        value = _this.correctPhone(value);
        if (!_this.props.valueBindProp) target.value = value;
        if (onChange) onChange(value, _this.getArgs(e));
        return;
      }
      // 数字组件
      if (type === 'number') {
        // target.validity.badInput
        value = _this.correctNumber(value.toString());
        if (!_this.props.valueBindProp) target.value = value;
        if (onChange) onChange(value, _this.getArgs(e));
      }
      // 文本框组件
      if (onChange) onChange(value, _this.getArgs(e));
    };

    _this.onClickInput = function (e) {
      var target = e.target;
      var value = target.value;
      if (_this.props.onClick) {
        _this.props.onClick(value, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onBlur = function (e) {
      var target = e.target;
      var value = target.value;
      if (_this.props.onBlur) {
        _this.props.onBlur(value, _this.getArgs(e));
      }
    };

    _this.onFocus = function (e) {
      var target = e.target;
      var value = target.value;
      if (_this.props.onFocus) {
        _this.props.onFocus(value, _this.getArgs(e));
        e.stopPropagation();
      }
      if (_this.props.readOnly) {
        target.blur();
      }
    };

    _this.onClear = function (e) {
      _this.$input.focus();
      // 赋值
      if (!_this.props.valueBindProp) _this.$input.value = '';
      if (_this.props.clear && typeof _this.props.clear !== 'boolean') _this.props.clear();
      if (_this.props.onChange) {
        _this.props.onChange('', _this.getArgs(e));
      }
      // 自动扩充功能
      if (_this.props.pre) {
        _this.preAutoSize();
      }
      e.stopPropagation();
    };

    _this.onClickLicon = function (e) {
      if (_this.props.onClickLicon) {
        _this.props.onClickLicon(_this.$input.value, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickRicon = function (e) {
      if (_this.props.onClickRicon) {
        _this.props.onClickRicon(_this.$input.value, _this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.getInputDOM = function () {
      var _this$props3 = _this.props,
          pre = _this$props3.pre,
          type = _this$props3.type,
          valueBindProp = _this$props3.valueBindProp,
          inputClassName = _this$props3.inputClassName,
          inputStyle = _this$props3.inputStyle,
          maxLength = _this$props3.maxLength,
          value = _this$props3.value,
          placeholder = _this$props3.placeholder,
          name = _this$props3.name,
          readOnly = _this$props3.readOnly,
          disabled = _this$props3.disabled;
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
          valueBindProp && _react2.default.createElement('textarea', { ref: function ref(el) {
              _this.$input = el;
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }),
          !valueBindProp && _react2.default.createElement('textarea', { ref: function ref(el) {
              _this.$input = el;
            }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }),
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
          return _react2.default.createElement('textarea', { ref: function ref(el) {
              _this.$input = el;
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onClick: _this.onClickInput, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle });
        }
        return _react2.default.createElement('textarea', { ref: function ref(el) {
            _this.$input = el;
          }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onInput: _this.onChange, onClick: _this.onClickInput, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle });
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
        return _react2.default.createElement('input', { ref: function ref(el) {
            _this.$input = el;
          }, type: inputType, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onClick: _this.onClickInput, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle });
      }
      return _react2.default.createElement('input', { ref: function ref(el) {
          _this.$input = el;
        }, type: inputType, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onInput: _this.onChange, onClick: _this.onClickInput, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle });
    };

    _this.state = {};
    return _this;
  }
  // 点击容器

  // 手机号码纠正

  // 数字框纠正

  // 自动扩充功能

  // 文本框事件

  // 点击清除

  // 点击左右图标


  (0, _createClass3.default)(InputText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          liconClassName = _props.liconClassName,
          value = _props.value,
          clearClassName = _props.clearClassName,
          clearIconClassName = _props.clearIconClassName,
          clear = _props.clear,
          riconClassName = _props.riconClassName,
          rcaption = _props.rcaption;

      return _react2.default.createElement(
        'div',
        { className: 'attribute' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        liconClassName && _react2.default.createElement(_Icon2.default, { className: 'color-placeholder ' + liconClassName, onClick: this.onClickLicon }),
        this.getInputDOM(),
        clear && _react2.default.createElement(_Close2.default, { onClick: this.onClear, className: (clearClassName ? clearClassName : '') + ' ' + (value.length === 0 ? 'hide' : ''), iconClassName: clearIconClassName }),
        riconClassName && _react2.default.createElement(_Icon2.default, { className: 'color-placeholder ' + riconClassName, onClick: this.onClickRicon }),
        rcaption && rcaption
      );
    }
  }]);
  return InputText;
}(_react.Component);

InputText.propTypes = {
  type: _propTypes2.default.string, // 类型: text, password
  valueBindProp: _propTypes2.default.bool, // 值是否绑定属性
  pre: _propTypes2.default.bool, // 自动扩充功能
  // 容器
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  // 文本框
  name: _propTypes2.default.string,
  maxLength: _propTypes2.default.string,
  max: _propTypes2.default.oneOfType([// 日期或者数字框
  _propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,

  inputStyle: _propTypes2.default.object,
  inputClassName: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onClickInput: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  // 左右图标
  liconClassName: _propTypes2.default.string,
  riconClassName: _propTypes2.default.string,
  onClickLicon: _propTypes2.default.func,
  onClickRicon: _propTypes2.default.func,
  // 清除按键
  clearClassName: _propTypes2.default.string,
  clearIconClassName: _propTypes2.default.string,
  clear: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  // 右侧内容
  rcaption: _propTypes2.default.node
};
InputText.defaultProps = {
  type: 'text',
  args: null,
  value: '',
  readOnly: false,
  disabled: false,
  digits: false
};
exports.default = InputText;
module.exports = exports['default'];