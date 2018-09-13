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

var _Notice = require('./../Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Device = require('./../Device.js');

var _Device2 = _interopRequireDefault(_Device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoNetwork = function (_Component) {
  (0, _inherits3.default)(NoNetwork, _Component);

  function NoNetwork(props) {
    (0, _classCallCheck3.default)(this, NoNetwork);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NoNetwork.__proto__ || (0, _getPrototypeOf2.default)(NoNetwork)).call(this, props));

    _this.state = {
      isOnLine: _Device2.default.isOnLine
    };
    _Device2.default.onLine(function (isOnLine) {
      _this.setState({
        isOnLine: isOnLine
      });
    });
    return _this;
  }

  (0, _createClass3.default)(NoNetwork, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isOnLine = this.state.isOnLine;
      var _props = this.props,
          caption = _props.caption,
          sndcaption = _props.sndcaption;

      return isOnLine ? null : _react2.default.createElement(_Notice2.default, { ref: function ref(el) {
          _this2.$el = el;
        }, iconClassName: 'icon-no-network', caption: caption, sndcaption: sndcaption });
    }
  }]);
  return NoNetwork;
}(_react.Component);

NoNetwork.propTypes = {
  caption: _propTypes2.default.string,
  sndcaption: _propTypes2.default.string
};
NoNetwork.defaultProps = {
  caption: '网络状态不佳',
  sndcaption: '请尝试开关飞行模式后再试'
};
exports.default = NoNetwork;
module.exports = exports['default'];