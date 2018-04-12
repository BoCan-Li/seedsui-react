import BridgeWeiXin from './bridgeWeiXin'
import BridgeBrowser from './bridgeBrowser'
import BridgeDinghuo from './bridgeDinghuo'

var bridge
var ua = navigator.userAgent.toLowerCase()
if (ua.indexOf('micromessenger') > -1) {
  bridge = BridgeWeiXin
} else if (ua.indexOf('dinghuoappversion') > -1) {
  bridge = BridgeDinghuo
  bridge.init()
} else {
  bridge = BridgeBrowser
}

export default bridge
