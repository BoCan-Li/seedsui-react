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
        if (onClickLicon) onClickLicon(_this.$input.value, _this.getArgs(e));
      } else if (target.classList.contains('ricon')) {
        if (onClickRicon) onClickLicon(_this.$input.value, _this.getArgs(e));
      } else if (target.classList.contains('input-text')) {
        if (onClick) onClick(_this.$input.value, _this.getArgs(e));
        if (onClickInput) onClickInput(_this.$input.value, _this.getArgs(e));
      } else {
        if (onClick) onClick(_this.$input.value, _this.getArgs(e));
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
      var _this$props2 = _this.props,
          max = _this$props2.max,
          min = _this$props2.min,
          digits = _this$props2.digits;

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
      if (!isNaN(digits)) {
        if (String(num).indexOf('.') >= 0) {
          var numStr = String(num);
          val = numStr.substring(0, numStr.indexOf('.') + (Number(digits) === 0 ? 0 : digits + 1));
        }
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
      var _this$props3 = _this.props,
          valueBindProp = _this$props3.valueBindProp,
          type = _this$props3.type,
          onChange = _this$props3.onChange;
      // 自动扩充功能

      if (_this.props.pre) {
        _this.$pre.children[0].innerText = value;
        _this.preAutoSize();
      }
      // 手机组件
      if (type === 'phone') {
        value = _this.correctPhone(value);
        // 数字组件
      } else if (type === 'number') {
        // target.validity.badInput
        value = _this.correctNumber(value.toString());
      }
      // onChange
      if (type !== 'text') {
        // 能输入中文的文本框,如果放开ios中文输入法会把拼音落进去
        if (!valueBindProp) target.value = value;
      }
      if (onChange) onChange(value, _this.getArgs(e));
      // 是否显示小叉叉
      if (_this.props.clear && !_this.props.valueBindProp) {
        _this.setState({
          clearUpdate: false
        });
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
      // 是否显示小叉叉
      if (_this.props.clear && !_this.props.valueBindProp) {
        _this.setState({
          clearUpdate: false
        });
      }
      e.stopPropagation();
    };

    _this.getInputDOM = function () {
      var _this$props4 = _this.props,
          args = _this$props4.args,
          style = _this$props4.style,
          className = _this$props4.className,
          onClick = _this$props4.onClick,
          max = _this$props4.max,
          min = _this$props4.min,
          digits = _this$props4.digits,
          onChange = _this$props4.onChange,
          onClickInput = _this$props4.onClickInput,
          onBlur = _this$props4.onBlur,
          onFocus = _this$props4.onFocus,
          licon = _this$props4.licon,
          liconSrc = _this$props4.liconSrc,
          liconClassName = _this$props4.liconClassName,
          liconStyle = _this$props4.liconStyle,
          onClickLicon = _this$props4.onClickLicon,
          liconLazyLoad = _this$props4.liconLazyLoad,
          ricon = _this$props4.ricon,
          riconSrc = _this$props4.riconSrc,
          riconClassName = _this$props4.riconClassName,
          riconStyle = _this$props4.riconStyle,
          onClickRicon = _this$props4.onClickRicon,
          riconLazyLoad = _this$props4.riconLazyLoad,
          clear = _this$props4.clear,
          clearClassName = _this$props4.clearClassName,
          clearStyle = _this$props4.clearStyle,
          rcaption = _this$props4.rcaption,
          pre = _this$props4.pre,
          type = _this$props4.type,
          valueBindProp = _this$props4.valueBindProp,
          autoFocus = _this$props4.autoFocus,
          inputClassName = _this$props4.inputClassName,
          inputStyle = _this$props4.inputStyle,
          maxLength = _this$props4.maxLength,
          value = _this$props4.value,
          placeholder = _this$props4.placeholder,
          name = _this$props4.name,
          readOnly = _this$props4.readOnly,
          disabled = _this$props4.disabled,
          others = (0, _objectWithoutProperties3.default)(_this$props4, ['args', 'style', 'className', 'onClick', 'max', 'min', 'digits', 'onChange', 'onClickInput', 'onBlur', 'onFocus', 'licon', 'liconSrc', 'liconClassName', 'liconStyle', 'onClickLicon', 'liconLazyLoad', 'ricon', 'riconSrc', 'riconClassName', 'riconStyle', 'onClickRicon', 'riconLazyLoad', 'clear', 'clearClassName', 'clearStyle', 'rcaption', 'pre', 'type', 'valueBindProp', 'autoFocus', 'inputClassName', 'inputStyle', 'maxLength', 'value', 'placeholder', 'name', 'readOnly', 'disabled']);
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
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }, others)),
          !valueBindProp && _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
              _this.$input = el;
            }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, className: 'input-pre', placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus }, others)),
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
            }, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
        }
        return _react2.default.createElement('textarea', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
            _this.$input = el;
          }, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-area' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
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
        return _react2.default.createElement('input', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
            _this.$input = el;
          }, type: inputType, value: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
      }
      return _react2.default.createElement('input', (0, _extends3.default)({ autoFocus: autoFocus, ref: function ref(el) {
          _this.$input = el;
        }, type: inputType, defaultValue: value, maxLength: maxLength, readOnly: readOnly, disabled: disabled, placeholder: placeholder, name: name, onChange: _this.onChange, onBlur: _this.onBlur, onFocus: _this.onFocus, className: 'input-text' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle }, others));
    };

    _this.state = {
      clearUpdate: props.value && props.clear // 小叉叉DOM更新, !valueBindProp状态时不会更新DOM, 所以用state变态的方法触发更新DOM
    };
    return _this;
  }
  // 点击容器

  // 手机号码纠正

  // 数字框纠正

  // 自动扩充功能

  // 文本框事件

  // 点击清除


  (0, _createClass3.default)(InputText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          className = _props.className,
          style = _props.style,
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
          clearStyle = _props.clearStyle,
          rcaption = _props.rcaption;

      var isShowClear = this.state.clearUpdate;
      if (!this.props.valueBindProp) {
        if (this.$input) {
          if (this.$input.value.length && clear) isShowClear = true;
        }
      } else {
        if (value && clear) isShowClear = true;
      }
      return _react2.default.createElement(
        'div',
        { className: 'input-text-box' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        (liconSrc || liconClassName) && _react2.default.createElement(_Icon2.default, { lazyLoad: liconLazyLoad, className: 'licon' + (liconClassName ? ' ' + liconClassName : ''), src: liconSrc, style: liconStyle }),
        licon && licon,
        this.getInputDOM(),
        clear && _react2.default.createElement(_Close2.default, { className: 'clearicon ' + (isShowClear ? '' : 'hide') + (clearClassName ? ' ' + clearClassName : ''), style: clearStyle }),
        (riconSrc || riconClassName) && _react2.default.createElement(_Icon2.default, { lazyLoad: riconLazyLoad, className: 'ricon size16' + (riconClassName ? ' ' + riconClassName : ''), src: riconSrc, style: riconStyle }),
        ricon && ricon,
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
  autoFocus: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([// 日期或者数字框
  _propTypes2.default.string, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
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
  // 右侧内容
  rcaption: _propTypes2.default.node
};
InputText.defaultProps = {
  type: 'text',
  value: '',
  readOnly: false,
  disabled: false,
  digits: false,
  clearClassName: 'ricon close-icon-clear size18'
};
exports.default = InputText;
module.exports = exports['default'];