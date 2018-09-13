'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Device = require('./../Device');

var _Device2 = _interopRequireDefault(_Device);

var _bridgeWeixin = require('./bridgeWeixin');

var _bridgeWeixin2 = _interopRequireDefault(_bridgeWeixin);

var _bridgeDinghuo = require('./bridgeDinghuo');

var _bridgeDinghuo2 = _interopRequireDefault(_bridgeDinghuo);

var _bridgeWaiqin = require('./bridgeWaiqin');

var _bridgeWaiqin2 = _interopRequireDefault(_bridgeWaiqin);

var _bridgeBrowser = require('./bridgeBrowser');

var _bridgeBrowser2 = _interopRequireDefault(_bridgeBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = {};
if (_Device2.default.platform === 'weixin') {
  Bridge = _bridgeWeixin2.default;
} else if (_Device2.default.platform === 'dinghuo') {
  Bridge = _bridgeDinghuo2.default;
  Bridge.config();
} else if (_Device2.default.platform === 'waiqin') {
  Bridge = _bridgeWaiqin2.default;
  Bridge.config();
} else {
  Bridge = _bridgeBrowser2.default;
}

exports.default = Bridge;
module.exports = exports['default'];