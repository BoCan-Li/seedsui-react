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

var _Alert = require('./../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _NumBox = require('./../NumBox');

var _NumBox2 = _interopRequireDefault(_NumBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumBoxPop = function (_Component) {
  (0, _inherits3.default)(NumBoxPop, _Component);

  function NumBoxPop(props) {
    (0, _classCallCheck3.default)(this, NumBoxPop);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBoxPop.__proto__ || (0, _getPrototypeOf2.default)(NumBoxPop)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.show !== _this.props.show) {
        _this.setState({
          show: _this.props.show
        });
        // 当此组件显示时,重新注入值
        if (_this.props.show === true) {
          _this.setState({
            value: _this.props.value
          }, function () {
            _this.focusValue();
          });
        }
      }
    };

    _this.onChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.onClickSubmit = function (args) {
      var onClickSubmit = _this.props.onClickSubmit;

      if (onClickSubmit) onClickSubmit(_this.state.value, args);
    };

    _this.focusValue = function () {
      _this.$numbox.$input.focus();
      setTimeout(function () {
        _this.$numbox.onFocus();
        _this.$numbox.$input.select();
      }, 100);
    };

    _this.onClickCancel = function () {
      _this.$numbox.$input.value = _this.props.value;
      if (_this.props.onClickCancel) _this.props.onClickCancel();
    };

    _this.state = {
      value: props.value || '1'
    };
    return _this;
  }

  (0, _createClass3.default)(NumBoxPop, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          args = _props.args,
          show = _props.show,
          caption = _props.caption,
          min = _props.min,
          max = _props.max,
          digits = _props.digits;

      return _react2.default.createElement(
        _Alert2.default,
        { args: args, ref: function ref(el) {
            _this2.$el = el;
          }, duration: 0, caption: caption, show: show, onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel },
        _react2.default.createElement(_NumBox2.default, { ref: function ref(el) {
            _this2.$numbox = el;
          }, min: min, max: max, digits: digits, changeFocus: true, value: this.state.value, style: { margin: '0 auto' }, className: 'flex xl', onChange: this.onChange })
      );
    }
  }]);
  return NumBoxPop;
}(_react.Component);

NumBoxPop.propTypes = {
  args: _propTypes2.default.any,
  // 文本框
  value: _propTypes2.default.string,
  // events
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func,
  show: _propTypes2.default.bool,
  caption: _propTypes2.default.string,
  // rule设置
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  digits: _propTypes2.default.number
};
NumBoxPop.defaultProps = {
  show: false,
  caption: '修改购买数量',
  min: 0,
  max: 99999,
  digits: 0,
  value: '0',
  args: null
};
exports.default = NumBoxPop;
module.exports = exports['default'];