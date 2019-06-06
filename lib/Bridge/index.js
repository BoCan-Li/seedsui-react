'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Device = require('./../Device');

var _Device2 = _interopRequireDefault(_Device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = {};
if (_Device2.default.platform === 'weixin') {
  Bridge = require('./bridgeWeixin');
} else if (_Device2.default.platform === 'weixinwork') {
  Bridge = require('./bridgeWeixin');
} else if (_Device2.default.platform === 'dinghuo') {
  Bridge = require('./bridgeDinghuo');
  Bridge.config();
} else if (_Device2.default.platform === 'waiqin') {
  Bridge = require('./bridgeWaiqin');
  Bridge.config();
} else {
  Bridge = require('./bridgeBrowser');
}
if (Bridge.default) Bridge = Bridge.default;
if (Bridge.config) Bridge.config();

exports.default = Bridge;
module.exports = exports['default'];