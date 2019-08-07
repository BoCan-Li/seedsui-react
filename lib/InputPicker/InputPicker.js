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

var _InputText = require('./../InputText');

var _InputText2 = _interopRequireDefault(_InputText);

var _Picker = require('./../Picker');

var _Picker2 = _interopRequireDefault(_Picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPicker = function (_Component) {
  (0, _inherits3.default)(InputPicker, _Component);

  function InputPicker(props) {
    (0, _classCallCheck3.default)(this, InputPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputPicker.__proto__ || (0, _getPrototypeOf2.default)(InputPicker)).call(this, props));

    _this.onClick = function (value, args) {
      if (_this.props.onClick) _this.props.onClick(value, args);
      _this.setState({
        show: !_this.state.show
      });
    };

    _this.onClickSubmit = function (e) {
      if (!_this.$input) _this.$input = _this.refs.$ComponentInputText.$input;
      if (_this.props.onClickSubmit) {
        _this.props.onClickSubmit(e);
        return;
      }
      var value = e.activeOptions[0].value;
      // 赋值
      if (!_this.props.valueBindProp) _this.$input.value = value;
      _this.setState({
        show: !_this.state.show
      });
      if (_this.props.onChange) {
        _this.props.onChange(value, e.activeOptions[0], _this.props.args);
      }
    };

    _this.onClickCancel = function (e) {
      if (_this.props.onClickCancel) {
        _this.props.onClickCancel(e);
        return;
      }
      _this.setState({
        show: !_this.state.show
      });
    };

    _this.onClickMask = function (e) {
      if (_this.props.onClickMask) {
        _this.props.onClickMask(e);
        return;
      }
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
      this.$el = this.refs.$ComponentInputText.$el;
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          valueForKey = _props.valueForKey,
          list = _props.list,
          onClick = _props.onClick,
          onChange = _props.onChange,
          pickerStyle = _props.pickerStyle,
          pickerClassName = _props.pickerClassName,
          pickerMaskStyle = _props.pickerMaskStyle,
          pickerMaskClassName = _props.pickerMaskClassName,
          pickerShow = _props.pickerShow,
          onClickSubmit = _props.onClickSubmit,
          onClickCancel = _props.onClickCancel,
          onClickMask = _props.onClickMask,
          others = (0, _objectWithoutProperties3.default)(_props, ['valueForKey', 'list', 'onClick', 'onChange', 'pickerStyle', 'pickerClassName', 'pickerMaskStyle', 'pickerMaskClassName', 'pickerShow', 'onClickSubmit', 'onClickCancel', 'onClickMask']);

      return [_react2.default.createElement(_InputText2.default, (0, _extends3.default)({ key: 'input', ref: '$ComponentInputText' }, others, { readOnly: true, onClick: this.onClick })), _react2.default.createElement(_Picker2.default, {
        list: list, valueForKey: valueForKey, value: this.$input ? this.$input.value : this.props.value, key: 'picker',
        show: pickerShow === undefined ? this.state.show : pickerShow,
        style: pickerStyle, className: pickerClassName,
        maskStyle: pickerMaskStyle, maskClassName: pickerMaskClassName,
        onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel, onClickMask: this.onClickMask
      })];
    }
  }]);
  return InputPicker;
}(_react.Component);

InputPicker.propTypes = {
  valueBindProp: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  valueForKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  list: _propTypes2.default.array, // [{key: '', value: ''}]
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func,

  // Picker
  pickerStyle: _propTypes2.default.object,
  pickerClassName: _propTypes2.default.string,
  pickerMaskStyle: _propTypes2.default.object,
  pickerMaskClassName: _propTypes2.default.string,
  // 自定义Picker事件
  pickerShow: _propTypes2.default.bool,
  onClickSubmit: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickMask: _propTypes2.default.func
};
InputPicker.defaultProps = {};
exports.default = InputPicker;
module.exports = exports['default'];