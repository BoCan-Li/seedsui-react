import BridgeWeiXin from './bridgeWeiXin'
import BridgeBrowser from './bridgeBrowser'
import BridgeDh365 from './bridgeDh365'

var bridge
var ua = navigator.userAgent.toLowerCase()
if (ua.indexOf('micromessenger') > -1) {
  bridge = BridgeWeiXin
} else if (ua.match(/DinghuoAppVersion\/.{0,}(\d+\.\d+\.\d+)/)) {
  bridge = BridgeDh365
} else {
  bridge = BridgeBrowser
}

export default bridge
