import Device from './../Device'
import BridgeWeixin from './bridgeWeixin'
import BridgeDinghuo from './bridgeDinghuo'
import BridgeWaiqin from './bridgeWaiqin'
import BridgeBrowser from './bridgeBrowser'

var Bridge = {}
if (Device.platform === 'weixin') {
  Bridge = BridgeWeixin
} else if (Device.platform === 'weixinwork') {
  Bridge = BridgeDinghuo
  Bridge.config()
} else if (Device.platform === 'dinghuo') {
  Bridge = BridgeDinghuo
  Bridge.config()
} else if (Device.platform === 'waiqin') {
  Bridge = BridgeWaiqin
  Bridge.config()
} else {
  Bridge = BridgeBrowser
}

export default Bridge
