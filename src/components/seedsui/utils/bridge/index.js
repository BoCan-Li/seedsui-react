import BridgeWeiXin from './bridgeWeiXin'
import BridgeBrowser from './bridgeBrowser'
import BridgeDinghuo from './bridgeDinghuo'
import BridgeWaiqin from './bridgeWaiqin'
import Device from './../device'

var bridge
var ua = navigator.userAgent.toLowerCase()
if (Device.platform === 'weixin') {
  bridge = BridgeWeiXin
} else if (Device.platform === 'dinghuo') {
  bridge = BridgeDinghuo
  bridge.config()
} else if (Device.platform === 'waiqin') {
  bridge = BridgeWaiqin
} else {
  bridge = BridgeBrowser
}

export default bridge
