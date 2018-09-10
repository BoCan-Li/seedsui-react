import Device from './../Device'

var Bridge = {}
if (Device.platform === 'weixin') {
  Bridge = require('./bridgeWeiXin').default
} else if (Device.platform === 'dinghuo') {
  Bridge = require('./bridgeDinghuo').default
  Bridge.config()
} else if (Device.platform === 'waiqin') {
  Bridge = require('./bridgeWaiqin').default
  Bridge.config()
} else {
  Bridge = require('./bridgeBrowser').default
}

export default Bridge
