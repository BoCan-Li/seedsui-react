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

var _InputVerify = require('./../InputVerify');

var _InputVerify2 = _interopRequireDefault(_InputVerify);

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _ApiAxios = require('./../ApiAxios');

var _ApiAxios2 = _interopRequireDefault(_ApiAxios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Verify = function (_Component) {
  (0, _inherits3.default)(Verify, _Component);

  function Verify(props) {
    (0, _classCallCheck3.default)(this, Verify);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Verify.__proto__ || (0, _getPrototypeOf2.default)(Verify)).call(this, props));

    _this.componentDidMount = function () {
      if (_this.props.autoSent) _this.onClickSent();
    };

    _this.onValiChange = function (value) {
      _this.setState({
        verifycode: value
      });
      // this.validateSubmit(this.state.username, value);
      var syncData = _this.props.syncData;

      if (syncData) syncData('', value, { data: _this.state.data, op: 'input' });
    };

    _this.onClickSent = function () {
      var _this$props = _this.props,
          url = _this$props.url,
          params = _this$props.params,
          syncData = _this$props.syncData,
          beforeSent = _this$props.beforeSent;

      if (beforeSent) {
        var beforeSentMsg = beforeSent();
        if (beforeSentMsg) {
          _Bridge2.default.showToast(beforeSentMsg, { mask: false });
          return;
        }
      }
      _this.setState({
        sentDisabled: true
      });
      _ApiAxios2.default.get(url, params).then(function (result) {
        if (result.code === '1') {
          _this.setState({
            data: result.data
          });
          _this.countdown();
          if (syncData) syncData('', _this.state.verifycode, { data: result.data, op: 'sms' });
        } else {
          _this.setState({
            sentDisabled: false,
            data: null
          });
          if (syncData) syncData(result.message, _this.state.verifycode, { data: null, op: 'sms' });
          _Bridge2.default.showToast(result.message, { mask: false });
        }
      }).catch(function () {
        _this.setState({
          sentDisabled: false,
          data: null
        });
        var errMsg = '短信发送异常, 请稍后再试';
        if (syncData) syncData(errMsg, _this.state.verifycode, { data: null, op: 'sms' });
        _Bridge2.default.showToast(errMsg, { mask: false });
      });
    };

    _this.countdown = function () {
      var syncData = _this.props.syncData;

      var interval = setInterval(function () {
        _this.setState({
          second: _this.state.second - 1,
          sentCaption: _this.state.second - 1 + '秒后重试',
          sentDisabled: true
        });
        if (_this.state.second - 1 <= 0) {
          window.clearInterval(interval);
          _this.setState({
            second: _this.props.second || 60,
            interval: null,
            sentCaption: '发送验证码'
          });
          if (syncData) syncData('', _this.state.verifycode, { data: _this.state.data, op: 'resume' });
          // if (this.validateUserName(this.state.username)) {
          //   this.setState({
          //     sentDisabled: true
          //   });
          // }
        }
      }, 1000);
      _this.setState({
        interval: true
      });
    };

    _this.state = {
      data: null, // 服务端返回的data
      verifycode: '',
      interval: null,
      second: props.second || 60,
      sentCaption: '发送验证码',
      sentDisabled: false
    };
    return _this;
  }

  (0, _createClass3.default)(Verify, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          verifycode = _state.verifycode,
          sentCaption = _state.sentCaption;
      var _props = this.props,
          autoSent = _props.autoSent,
          url = _props.url,
          params = _props.params,
          sentDisabled = _props.sentDisabled,
          syncData = _props.syncData,
          beforeSent = _props.beforeSent,
          _props$maxLength = _props.maxLength,
          maxLength = _props$maxLength === undefined ? '6' : _props$maxLength,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? '验证码' : _props$placeholder,
          others = (0, _objectWithoutProperties3.default)(_props, ['autoSent', 'url', 'params', 'sentDisabled', 'syncData', 'beforeSent', 'maxLength', 'placeholder']);

      return _react2.default.createElement(_InputVerify2.default, (0, _extends3.default)({ clear: true, onChange: this.onValiChange, value: verifycode, placeholder: placeholder, maxLength: maxLength, sentCaption: sentCaption, sentDisabled: sentDisabled || this.state.sentDisabled, onClickSent: this.onClickSent }, others));
    }
  }]);
  return Verify;
}(_react.Component);

Verify.propTypes = {
  autoSent: _propTypes2.default.bool, // 自动发送
  url: _propTypes2.default.string,
  params: _propTypes2.default.object, // 登录时用{clientType: 'appId', mobile: '138xxxxxx'},
  sentDisabled: _propTypes2.default.bool, // 是否禁用发送验证码
  syncData: _propTypes2.default.func, // 'error', 'verifycode', {data: 'data', op: 'input | sms | resume'}
  beforeSent: _propTypes2.default.func,
  second: _propTypes2.default.number
};
Verify.defaultProps = {
  url: '/login/sendLoginSmsVerifyCode.action',
  second: 60
};
exports.default = Verify;
module.exports = exports['default'];