import Device from './../device'

var bridge
if (Device.platform === 'weixin') {
  bridge = require('./bridgeWeiXin').default
} else if (Device.platform === 'dinghuo') {
  bridge = require('./bridgeDinghuo').default
  bridge.config()
} else if (Device.platform === 'waiqin') {
  bridge = require('./bridgeWaiqin').default
  bridge.config()
} else {
  bridge = require('./bridgeBrowser').default
}

export default bridge
