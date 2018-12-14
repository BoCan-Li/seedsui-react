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
      if (_this.props.onClickSubmit) _this.props.onClickSubmit(_this.state.value, args);
    };

    _this.focusValue = function () {
      _this.$numbox.$input.focus();
      setTimeout(function () {
        _this.$numbox.onFocus();
        _this.$numbox.$input.select();
      }, 100);
    };

    _this.onClickCancel = function (args) {
      var value = _this.props.value;

      _this.setState({
        value: value
      });
      if (_this.props.onClickCancel) _this.props.onClickCancel(value, args);
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
          value = _props.value,
          onClickCancel = _props.onClickCancel,
          onClickSubmit = _props.onClickSubmit,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'show', 'caption', 'value', 'onClickCancel', 'onClickSubmit']);

      return _react2.default.createElement(
        _Alert2.default,
        { args: args, ref: function ref(el) {
            _this2.$el = el;
          }, duration: 0, caption: caption, show: show, onClickSubmit: this.onClickSubmit, onClickCancel: this.onClickCancel },
        _react2.default.createElement(_NumBox2.default, (0, _extends3.default)({
          ref: function ref(el) {
            _this2.$numbox = el;
          },
          value: this.state.value,
          style: { margin: '0 auto' },
          className: 'flex xl',
          onChange: this.onChange
        }, others))
      );
    }
  }]);
  return NumBoxPop;
}(_react.Component);

NumBoxPop.propTypes = {
  args: _propTypes2.default.any,
  // 容器
  show: _propTypes2.default.bool,
  caption: _propTypes2.default.string,
  // 文本框
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  // events
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
NumBoxPop.defaultProps = {
  show: false,
  caption: '修改购买数量'
};
exports.default = NumBoxPop;
module.exports = exports['default'];