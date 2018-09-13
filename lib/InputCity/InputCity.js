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

var _PickerCity = require('./../PickerCity');

var _PickerCity2 = _interopRequireDefault(_PickerCity);

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
      var value = e.activeText;
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
  }, {
    key: 'render',
    value: function render() {
      return [_react2.default.createElement(_InputText2.default, (0, _extends3.default)({ key: 'input', ref: '$ComponentInputText' }, this.props, { type: 'text', readOnly: true, onClick: this.onClick })), _react2.default.createElement(_PickerCity2.default, {
        type: this.props.type || 'area' // 'area' | 'city'
        , value: this.$input ? this.$input.value : this.props.value, key: 'pickercity',
        show: this.state.show,
        style: this.props.pickerStyle, className: this.props.pickerClassName,
        onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel, onClickMask: this.onClickMask
      })];
    }
  }]);
  return InputPicker;
}(_react.Component);

InputPicker.defaultProps = {
  error: {
    currentName: '',
    compareName: ''
  }
};
exports.default = InputPicker;
module.exports = exports['default'];