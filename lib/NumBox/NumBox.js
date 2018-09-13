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

var NumBox = function (_Component) {
  (0, _inherits3.default)(NumBox, _Component);

  function NumBox(props) {
    (0, _classCallCheck3.default)(this, NumBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBox.__proto__ || (0, _getPrototypeOf2.default)(NumBox)).call(this, props));

    _this.componentDidUpdate = function () {
      // 如果prop的value和文本框里的值不一致
      if (_this.$input) {
        if (_this.$input.value !== _this.props.value) {
          _this.$input.value = _this.props.value;
          // 更新disabled
          _this.updateDisabled();
        }
      }
    };

    _this.updateDisabled = function () {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max,
          value = _this$props.value;

      if (_this.$input) value = _this.$input.value;
      if (!value) return;
      if (value <= min) {
        _this.$minus.disabled = true;
      } else {
        _this.$minus.disabled = false;
      }
      if (value >= max) {
        _this.$plus.disabled = true;
      } else {
        _this.$plus.disabled = false;
      }
    };

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

    _this.onFocus = function (e) {
      var target = _this.$input || e.target;
      var value = target.value;
      if (!value || value === '0') {
        // 赋值
        target.value = '';
      }
    };

    _this.onInput = function (e) {
      var target = e.target;
      var value = target.value.toString();
      // 如果value有值不为空,则矫正数值
      if (value) {
        value = _this.correctNum(value);
      }
      target.value = value;
      // 更新disabled
      _this.updateDisabled();
    };

    _this.onBlur = function (e) {
      var target = e.target;
      var value = e.target.value;
      if (!value) value = _this.correctNum(value);
      target.value = value;
      // Callback
      if (_this.props.value !== value) {
        if (_this.props.onChange) _this.props.onChange(value, _this.getArgs(e));
      }
      // 更新disabled
      _this.updateDisabled();
    };

    _this.onClickMinus = function (e) {
      var value = Math.Calc.subtract(_this.$input.value, 1);
      if (value < _this.props.min) value = _this.props.min;
      if (value > _this.props.max) value = _this.props.max;
      // 赋值
      _this.$input.value = value;
      // Callback
      if (_this.props.onChange) {
        _this.props.onChange('' + value, _this.getArgs(e));
      }
      // 更新disabled
      _this.updateDisabled();
      if (_this.props.changeFocus) _this.$input.focus();
    };

    _this.onClickPlus = function (e) {
      var value = Math.Calc.add(_this.$input.value, 1);
      if (value < _this.props.min) value = _this.props.min;
      if (value > _this.props.max) value = _this.props.max;
      // 赋值
      _this.$input.value = value;
      // Callback
      if (_this.props.onChange) {
        _this.props.onChange('' + value, _this.getArgs(e));
      }
      // 更新disabled
      _this.updateDisabled();
      if (_this.props.changeFocus) _this.$input.focus();
    };

    _this.correctNum = function (argNumstr) {
      if (!argNumstr || isNaN(argNumstr)) {
        return '' + _this.props.min;
      }
      var num = Number(argNumstr);
      // 判断是否超出限制
      var _this$props2 = _this.props,
          max = _this$props2.max,
          min = _this$props2.min;

      if (!isNaN(max) && num > max) {
        // callback onError
        if (_this.props.onError) _this.props.onError('最大不能超过' + max);
        return '' + max;
      }
      if (!isNaN(min) && num < min) {
        // callback onError
        if (_this.props.onError) _this.props.onError('最小不能小于' + min);
        return '' + min;
      }
      var value = argNumstr;
      // 截取小数位数
      if (_this.props.digits) {
        if (String(num).indexOf('.') >= 0) value = Math.Calc.toDigits(num, _this.props.digits);
        // 整数
      } else {
        value = Math.floor(num);
      }
      // 最大长度限制
      if (_this.props.maxLength && value && value.length > _this.props.maxLength) {
        value = value.slice(0, _this.props.maxLength);
      }
      return '' + value;
    };

    _this.getInputDOM = function () {
      var _this$props3 = _this.props,
          inputClassName = _this$props3.inputClassName,
          inputStyle = _this$props3.inputStyle,
          value = _this$props3.value,
          max = _this$props3.max,
          min = _this$props3.min,
          maxLength = _this$props3.maxLength,
          placeholder = _this$props3.placeholder,
          name = _this$props3.name,
          readOnly = _this$props3.readOnly,
          onClickInput = _this$props3.onClickInput;

      return _react2.default.createElement('input', { ref: function ref(el) {
          _this.$input = el;
        }, type: 'number', defaultValue: value, min: min, max: max, maxLength: maxLength, readOnly: readOnly, placeholder: placeholder, name: name, onInput: _this.onInput, onBlur: _this.onBlur, onFocus: _this.onFocus, onClick: onClickInput, className: 'numbox-input' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(NumBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateDisabled();
    }
    // shouldComponentUpdate (nextProps) {
    //   if(nextProps.value === this.props.value){
    //     return false
    //   }
    //   return true;
    // }

    // Methods

    // 点击减

    // 点击加

    // 矫正数字

    // render

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          min = _props.min,
          max = _props.max,
          style = _props.style,
          className = _props.className,
          disabled = _props.disabled,
          onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, disabled: min >= max || disabled, style: style, className: 'numbox bordered ' + (className ? className : ''), onClick: onClick },
        _react2.default.createElement('input', { ref: function ref(el) {
            _this2.$minus = el;
          }, type: 'button', className: 'numbox-button', value: '-', onClick: this.onClickMinus }),
        this.getInputDOM(),
        _react2.default.createElement('input', { ref: function ref(el) {
            _this2.$plus = el;
          }, type: 'button', className: 'numbox-button', value: '+', onClick: this.onClickPlus })
      );
    }
  }]);
  return NumBox;
}(_react.Component);

NumBox.propTypes = {
  args: _propTypes2.default.any,
  changeFocus: _propTypes2.default.bool, // 点击加减时激活
  // 容器
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  // 文本框
  inputStyle: _propTypes2.default.object,
  inputClassName: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  name: _propTypes2.default.string,
  type: _propTypes2.default.string,
  maxLength: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  // events
  onClick: _propTypes2.default.func,
  onClickMinus: _propTypes2.default.func,
  onClickPlus: _propTypes2.default.func,
  onClickInput: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  // rule设置
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  max: _propTypes2.default.number,
  min: _propTypes2.default.number
};
NumBox.defaultProps = {
  args: null,
  maxLength: '8',
  min: 0,
  max: 99999999,
  value: '0',
  readOnly: false
};
exports.default = NumBox;
module.exports = exports['default'];