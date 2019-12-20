import Device from './../Device'
import BridgeBase from './base'
import BridgeBrowser from './browser'
import BridgeWeixin from './wx'
import BridgeDinghuo from './dinghuo'
import BridgeWaiqin from './wq'


var Bridge = {}
if (Device.platform === 'weixin') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWeixin
  }
} else if (Device.platform === 'weixinwork') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWeixin
  }
} else if (Device.platform === 'dinghuo') {
  Bridge = {
    ...BridgeBase,
    ...BridgeDinghuo
  }
  Bridge.config()
} else if (Device.platform === 'waiqin') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWaiqin
  }
  Bridge.config()
} else {
  Bridge = {
    ...BridgeBase,
    ...BridgeBrowser
  }
}

export default Bridge