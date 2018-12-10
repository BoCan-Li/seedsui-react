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

    _this.status = '';

    _this.onValiChange = function (value) {
      var syncData = _this.props.syncData;

      if (syncData) syncData('', value, { result: null, status: _this.status, op: 'input' });
    };

    _this.onClickSent = function () {
      var _this$props = _this.props,
          url = _this$props.url,
          params = _this$props.params,
          syncData = _this$props.syncData,
          beforeSent = _this$props.beforeSent;

      var input = _this.$el.$input;
      // 倒计时中,阻止继续
      if (_this.state.second !== _this.props.sentSecond) {
        _Bridge2.default.showToast(_this.state.second + '秒后重试', { mask: false });
        if (syncData) {
          _this.status = 'send_fail';
          syncData(_this.state.second + '秒后重试', input.value, { result: null, status: _this.status, op: 'click' });
        }
        return;
      }
      // 发送前回调不为空,阻止继续
      if (beforeSent) {
        var beforeSentMsg = beforeSent();
        if (beforeSentMsg) {
          _Bridge2.default.showToast(beforeSentMsg, { mask: false });
          return;
        }
      }
      // 开始发送
      if (syncData) {
        _this.status = 'send_ok';
        syncData('', input.value, { result: null, status: _this.status, op: 'click' });
      }
      _ApiAxios2.default.get(url, { data: params }).then(function (result) {
        if (result.code === '1') {
          _this.countdown();
          if (syncData) {
            _this.status = 'sent_ok';
            syncData('', input.value, { result: result, status: _this.status, op: 'click' });
          }
        } else {
          if (syncData) {
            _this.status = 'sent_fail';
            syncData(result.message, input.value, { result: result, status: _this.status, op: 'click' });
          }
          _Bridge2.default.showToast(result.message, { mask: false });
        }
      }).catch(function () {
        var errMsg = '短信发送异常, 请稍后再试';
        if (syncData) {
          _this.status = 'sent_fail';
          syncData(errMsg, input.value, { result: null, status: _this.status, op: 'click' });
        }
        _Bridge2.default.showToast(errMsg, { mask: false });
      });
    };

    _this.countdown = function () {
      var syncData = _this.props.syncData;

      var interval = setInterval(function () {
        _this.setState({
          second: _this.state.second - 1,
          caption: _this.state.second - 1 + '秒后重试'
        });
        if (_this.state.second - 1 <= 0) {
          window.clearInterval(interval);
          _this.setState({
            second: _this.props.sentSecond || 60,
            caption: _this.props.sentCaption || '发送验证码'
          });
          if (syncData) {
            _this.status = '';
            syncData('', _this.$el.$input.value, { result: null, status: _this.status, op: 'timeover' });
          }
        }
      }, 1000);
    };

    _this.state = {
      second: props.sentSecond || 60,
      caption: props.sentCaption || '发送验证码'
    };
    return _this;
  }

  (0, _createClass3.default)(Verify, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var caption = this.state.caption;
      var _props = this.props,
          autoSent = _props.autoSent,
          url = _props.url,
          params = _props.params,
          syncData = _props.syncData,
          beforeSent = _props.beforeSent,
          sentDisabled = _props.sentDisabled,
          sentSecond = _props.sentSecond,
          sentCaption = _props.sentCaption,
          maxLength = _props.maxLength,
          placeholder = _props.placeholder,
          clear = _props.clear,
          others = (0, _objectWithoutProperties3.default)(_props, ['autoSent', 'url', 'params', 'syncData', 'beforeSent', 'sentDisabled', 'sentSecond', 'sentCaption', 'maxLength', 'placeholder', 'clear']);

      return _react2.default.createElement(_InputVerify2.default, (0, _extends3.default)({ ref: function ref(el) {
          _this2.$el = el;
        }, clear: clear, onChange: this.onValiChange, placeholder: placeholder, maxLength: maxLength, sentCaption: caption, sentDisabled: sentDisabled, onClickSent: this.onClickSent }, others));
    }
  }]);
  return Verify;
}(_react.Component);

Verify.propTypes = {
  autoSent: _propTypes2.default.bool, // 自动发送
  url: _propTypes2.default.string,
  params: _propTypes2.default.object,
  syncData: _propTypes2.default.func, // '错误信息', 'value', {result: object, status: 'send_fail | send_ok | sent_ok | sent_fail', op: 'click | input | timeover'}
  beforeSent: _propTypes2.default.func, // 如果返回字符串,将弹出信息,并不发短信
  sentDisabled: _propTypes2.default.bool, // 是否禁用发送验证码
  sentSecond: _propTypes2.default.number,
  sentCaption: _propTypes2.default.string,
  maxLength: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  placeholder: _propTypes2.default.string,
  clear: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func])
};
Verify.defaultProps = {
  url: '/login/sendLoginSmsVerifyCode.action',
  sentSecond: 60,
  sentCaption: '发送验证码',
  maxLength: 6,
  placeholder: '验证码',
  clear: true
};
exports.default = Verify;
module.exports = exports['default'];