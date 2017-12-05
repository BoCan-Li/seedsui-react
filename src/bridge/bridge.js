import BridgeWeiXin from './bridgeWeiXin'
import BridgeBrowser from './bridgeBrowser'

var bridge
var ua = navigator.userAgent.toLowerCase()
if (ua.indexOf('micromessenger') > -1) {
  bridge = BridgeWeiXin
} else {
  bridge = BridgeBrowser
}

export default bridge
