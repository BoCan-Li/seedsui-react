import Device from './../Device'

var Bridge = {}
if (Device.platform === 'weixin') {
  Bridge = require('./bridgeWeixin')
} else if (Device.platform === 'weixinwork') {
  Bridge = require('./bridgeWeixin')
} else if (Device.platform === 'dinghuo') {
  Bridge = require('./bridgeDinghuo')
  Bridge.config()
} else if (Device.platform === 'waiqin') {
  Bridge = require('./bridgeWaiqin')
  Bridge.config()
} else {
  Bridge = require('./bridgeBrowser')
}
if (Bridge.default) Bridge = Bridge.default
if (Bridge.config) Bridge.config()

export default Bridge
