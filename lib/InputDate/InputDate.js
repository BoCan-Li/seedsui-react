'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _InputText = require('./../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _PickerDate = require('./../PickerDate');

var _PickerDate2 = _interopRequireDefault(_PickerDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPicker = function (_Component) {
  (0, _inherits3.default)(InputPicker, _Component);

  function InputPicker(props) {
    (0, _classCallCheck3.default)(this, InputPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputPicker.__proto__ || (0, _getPrototypeOf2.default)(InputPicker)).call(this, props));

    _this.onClick = function () {
      _this.setState({
        show: !_this.state.show
      });
    };

    _this.onClickSubmit = function (e) {
      if (!_this.$input) _this.$input = _this.refs.$ComponentInputText.$input;
      var value = _this.correctDate(e.activeText);
      if (!value) return;
      var options = e.activeOptions;
      // 赋值
      if (!_this.props.valueBindProp) _this.$input.value = value;
      _this.setState({
        show: !_this.state.show
      });
      if (_this.props.onChange) {
        _this.props.onChange(value, options, _this.refs.$ComponentInputText.getArgs());
      }
    };

    _this.onClickCancel = function () {
      _this.setState({
        show: !_this.state.show
      });
    };

    _this.onClickMask = function () {
      _this.setState({
        show: !_this.state.show
      });
    };

    _this.correctDate = function (value) {
      var text = value;
      var _this$props = _this.props,
          type = _this$props.type,
          min = _this$props.min,
          max = _this$props.max,
          onError = _this$props.onError;

      console.log(onError);
      var selectDate = new Date(text);
      var current = _this.$input.value;
      var error = _this.props.error;
      if (min && (min.isDate() || min.isTime())) {
        if (type === 'date' && selectDate.compareDate(min) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        }
        if (type === 'month' && selectDate.compareMonth(min) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        }
        if (type === 'time' && selectDate.compareTime(min) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        }
        if (type === 'datetime' && selectDate.compareDateTime(min) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        }
      }
      if (max && (max.isDate() || max.isTime())) {
        if (type === 'date' && selectDate.compareDate(max) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        }
        if (type === 'month' && selectDate.compareMonth(max) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        }
        if (type === 'time' && selectDate.compareTime(max) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        }
        if (type === 'datetime' && selectDate.compareDateTime(max) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        }
      }
      return text;
    };

    _this.state = {
      show: false
    };
    return _this;
  }

  (0, _createClass3.default)(InputPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
    // 日期纠正

  }, {
    key: 'render',
    value: function render() {
      return [_react2.default.createElement(_InputText2.default, (0, _extends3.default)({ key: 'input', ref: '$ComponentInputText' }, this.props, { type: 'text', readOnly: true, onClick: this.onClick })), _react2.default.createElement(_PickerDate2.default, {
        type: this.props.type || 'date' // 'date','month','time','datetime'
        , value: this.$input ? this.$input.value : this.props.value, key: 'pickerdate',
        show: this.state.show,
        style: this.props.pickerStyle, className: this.props.pickerClassName,
        onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel, onClickMask: this.onClickMask
      })];
    }
  }]);
  return InputPicker;
}(_react.Component);

InputPicker.defaultProps = {
  type: 'date',
  error: {
    currentName: '',
    compareName: ''
  }
};
exports.default = InputPicker;
module.exports = exports['default'];