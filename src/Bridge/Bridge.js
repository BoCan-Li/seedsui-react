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
  Bridge.config()
} else if (Device.platform === 'waiqin') {
  if (window.sessionStorage.getItem('seedsui_bridge_wq_cordova_enable')) {
    Bridge = {
      ...BridgeBase,
      ...BridgeWaiqin
    }
    Bridge.config()
  } else {
    Bridge = {
      ...BridgeBase,
      ...BridgeWaiqinCordova
    }
  }
} else {
  Bridge = {
    ...BridgeBase,
    ...BridgeBrowser
  }
}

export default Bridge