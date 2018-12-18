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

var _SelectPicker = require('./../SelectPicker');

var _SelectPicker2 = _interopRequireDefault(_SelectPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputSelect = function (_Component) {
  (0, _inherits3.default)(InputSelect, _Component);

  function InputSelect(props) {
    (0, _classCallCheck3.default)(this, InputSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputSelect.__proto__ || (0, _getPrototypeOf2.default)(InputSelect)).call(this, props));

    _this.getValue = function (options) {
      if (!_this.props.multiple) return options[0].value;
      var value = options.map(function (item) {
        return item.value;
      });
      return value.join(_this.props.split || ',');
    };

    _this.getOptions = function (options) {
      return _this.props.multiple ? options : options[0];
    };

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
      var value = _this.getValue(e.activeOptions);
      var options = _this.getOptions(e.activeOptions);
      // 赋值
      if (!_this.props.valueBindProp) _this.$input.value = value;
      _this.setState({
        show: !_this.state.show
      });
      if (_this.props.onChange) {
        _this.props.onChange(value, options, _this.props.args);
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

  (0, _createClass3.default)(InputSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$input = this.refs.$ComponentInputText.$input;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          valueForKey = _props.valueForKey,
          split = _props.split,
          list = _props.list,
          multiple = _props.multiple,
          pickerStyle = _props.pickerStyle,
          pickerClassName = _props.pickerClassName,
          onClick = _props.onClick,
          onChange = _props.onChange,
          pickerShow = _props.pickerShow,
          onClickSubmit = _props.onClickSubmit,
          onClickCancel = _props.onClickCancel,
          onClickMask = _props.onClickMask,
          others = (0, _objectWithoutProperties3.default)(_props, ['valueForKey', 'split', 'list', 'multiple', 'pickerStyle', 'pickerClassName', 'onClick', 'onChange', 'pickerShow', 'onClickSubmit', 'onClickCancel', 'onClickMask']);

      return [_react2.default.createElement(_InputText2.default, (0, _extends3.default)({ key: 'input', ref: '$ComponentInputText' }, others, { readOnly: true, onClick: this.onClick })), _react2.default.createElement(_SelectPicker2.default, {
        list: list, valueForKey: valueForKey, value: this.$input ? this.$input.value : this.props.value, key: 'picker',
        split: split,
        show: pickerShow === undefined ? this.state.show : pickerShow,
        multiple: multiple,
        style: pickerStyle, className: pickerClassName,
        onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel, onClickMask: this.onClickMask
      })];
    }
  }]);
  return InputSelect;
}(_react.Component);

InputSelect.propTypes = {
  valueBindProp: _propTypes2.default.bool,
  valueForKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  split: _propTypes2.default.string,
  list: _propTypes2.default.array, // [{key: '', value: ''}]
  multiple: _propTypes2.default.bool,
  pickerStyle: _propTypes2.default.bool,
  pickerClassName: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func,

  // 自定义Picker事件
  pickerShow: _propTypes2.default.bool,
  onClickSubmit: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickMask: _propTypes2.default.func
};
InputSelect.defaultProps = {
  split: ','
};
exports.default = InputSelect;
module.exports = exports['default'];