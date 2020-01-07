import Device from './../Device'
import BridgeBase from './base'
import BridgeBrowser from './browser'
import BridgeWeixin from './wx'
import BridgeDinghuo from './dinghuo'
import BridgeWaiqin from './wq'
import BridgeWaiqinCordova from './cordova'

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
} else if (Device.platform === 'waiqin') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWaiqinCordova
  }
} else if (Device.platform === 'wq') {
  Bridge = {
    ...BridgeBase,
    ...BridgeWaiqin
  }
} else {
  Bridge = {
    ...BridgeBase,
    ...BridgeBrowser
  }
}

export default Bridge
