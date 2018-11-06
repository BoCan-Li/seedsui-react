'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputText = require('./../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _PickerDate = require('./../PickerDate');

var _PickerDate2 = _interopRequireDefault(_PickerDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require PrototypeDate.js
var InputDate = function (_Component) {
  (0, _inherits3.default)(InputDate, _Component);

  function InputDate(props) {
    (0, _classCallCheck3.default)(this, InputDate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputDate.__proto__ || (0, _getPrototypeOf2.default)(InputDate)).call(this, props));

    _this.onClick = function (value, args) {
      if (_this.props.onClick) _this.props.onClick(value, args);
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
        _this.props.onChange(value, options, _this.props.args);
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

      var selectDate = text.toDate();
      var current = _this.$input.value;
      var error = _this.props.error;
      if (min && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(min) || /^[0-9]{2}:[0-9]{2}$/.test(min))) {
        if (type === 'date' && selectDate.compareDate(min.toDate()) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        } else if (type === 'month' && selectDate.compareMonth(min.toDate()) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        } else if (type === 'time' && selectDate.compareTime(min.toDate()) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        } else if (type === 'datetime' && selectDate.compareDateTime(min.toDate()) === -1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能小于' + min, select: text, min: min, current: current }, error));
            return false;
          }
          text = min;
        }
      }
      if (max && (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(max) || /^[0-9]{2}:[0-9]{2}$/.test(max))) {
        if (type === 'date' && selectDate.compareDate(max.toDate()) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        } else if (type === 'month' && selectDate.compareMonth(max.toDate()) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        } else if (type === 'time' && selectDate.compareTime(max.toDate()) === 1) {
          if (onError) {
            onError((0, _extends3.default)({ msg: '不能大于' + max, select: text, max: max, current: current }, error));
            return false;
          }
          text = max;
        } else if (type === 'datetime' && selectDate.compareDateTime(max.toDate()) === 1) {
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

  (0, _createClass3.default)(InputDate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
    // 日期纠正

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          split = _props.split,
          min = _props.min,
          max = _props.max,
          type = _props.type,
          pickerStyle = _props.pickerStyle,
          pickerClassName = _props.pickerClassName,
          onClick = _props.onClick,
          onChange = _props.onChange,
          onError = _props.onError,
          others = (0, _objectWithoutProperties3.default)(_props, ['split', 'min', 'max', 'type', 'pickerStyle', 'pickerClassName', 'onClick', 'onChange', 'onError']);

      return [_react2.default.createElement(_InputText2.default, (0, _extends3.default)({ key: 'input', ref: '$ComponentInputText' }, others, { type: 'text', readOnly: true, onClick: this.onClick })), _react2.default.createElement(_PickerDate2.default, {
        split: split,
        type: type,
        value: this.$input ? this.$input.value : this.props.value, key: 'pickerdate',
        show: this.state.show,
        style: pickerStyle, className: pickerClassName,
        onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel, onClickMask: this.onClickMask
      })];
    }
  }]);
  return InputDate;
}(_react.Component);

InputDate.propTypes = {
  valueBindProp: _propTypes2.default.bool,
  split: _propTypes2.default.string,
  type: _propTypes2.default.string, // 'date | month | time | datetime'
  min: _propTypes2.default.string, // yyyy-MM-dd
  max: _propTypes2.default.string, // yyyy-MM-dd
  pickerStyle: _propTypes2.default.bool,
  pickerClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
InputDate.defaultProps = {
  split: '-',
  type: 'date',
  error: {
    currentName: '',
    compareName: ''
  }
};
exports.default = InputDate;
module.exports = exports['default'];