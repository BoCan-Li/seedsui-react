// Device
var Device = (function () {
  var ua = navigator.userAgent.toLowerCase()
  // 内核
  var kernel = ''
  if (ua.indexOf('trident') > -1) {
    kernel = 'trident'
  } else if (ua.indexOf('presto') > -1) {
    kernel = 'presto'
  } else if (ua.indexOf('applewebkit') > -1) {
    kernel = 'webkit'
  } else if (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1) {
    kernel = 'gecko'
  }
  // 设备
  var device = ''
  if (ua.match(/applewebkit.*mobile.*/)) {
    device = 'mobile'
  } else {
    device = 'pc'
  }
  // 系统
  var os = ''
  var osVersion = ''
  var andriodExp = ua.match(/android\s*(\d*\.*\d*)/)
  var iosExp = ua.match(/cpu iphone os (.*?) like mac os/)
  if (andriodExp) {
    os = 'andriod'
    osVersion = andriodExp[1]
  } else if (iosExp) {
    os = 'ios'
    osVersion = iosExp[1]
  }
  // 平台
  var platform = ''
  var platformVersion = ''
  var platformMatch = null
  if (device === 'pc') {
    platform = 'browser'
  } else if (ua.indexOf('wxwork') > -1) {
    platform = 'weixinwork'
    platformMatch = ua.match(/wxwork\/([0-9.]+)/i)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  } else if (ua.indexOf('micromessenger') > -1) {
    platform = 'weixin'
    platformMatch = ua.match(/micromessenger\/([0-9.]+)/i)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  } else if (ua.indexOf('mqqbrowser') > -1) {
    platform = 'qq'
  } else if (ua.indexOf('ucbrowser') > -1) {
    platform = 'uc'
  } else if (ua.indexOf('dinghuoappversion') > -1) {
    platform = 'dinghuo'
    platformMatch = ua.match(/dinghuoappversion\/\s*([0-9.]+)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  } else if (ua.indexOf('wqappversion') > -1) {
    platform = 'waiqin'
    platformMatch = ua.match(/wqappversion\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  } else {
    platform = 'browser'
  }


  // 获得苹果机型
  function appleModel() { // 获取设备型号
    if (ua && /(iphone|ipad|ipod|ios)/i.test(ua)) {
      var m = ua.match(/mobile\/([\w.]*)/)
      if (m && m[1]) {
        return m[1]
      }
    }
    return ''
  }
  function getAppleDevice() { // 获取苹果设备名称
    // iPhoneX | iPhoneXS
    if (/iphone/gi.test(ua) && (window.screen.height === 812 && window.screen.width === 375)) return 'iPhoneX'
    // iPhoneXSM | iPhoneXSR
    if (/iphone/gi.test(ua) && (window.screen.height === 896 && window.screen.width === 414)) return 'iPhoneXSM'
    var model = appleModel()
    switch (model) {
      case '15b150':
        return 'iPhone6s'
      case '15b202':
        return 'iPhone6'
      case '13g36':
        return 'iPhone5SE'
      case '14e304':
        return 'iPhone6P'
      default:
        return ''
    }
  }

  // 网络监听
  var onLineCallback
  function handleOnline(e) {
    onLineCallback(true)
  }
  function handleOffline(e) {
    onLineCallback(false)
  }
  function onLine(callback) {
    onLineCallback = callback
    window.removeEventListener('online', handleOnline, false)
    window.removeEventListener('offline', handleOffline, false)
    window.addEventListener('online', handleOnline, false)
    window.addEventListener('offline', handleOffline, false)
  }

  // 适配刘海屏和andriod5.0以下的手机
  function adapterIPhoneX(el) {
    var root = document.getElementById('root')
    if (el && Object.prototype.toString.call(el).indexOf('[object HTML') === 0) root = el
    if (!root) return
    // 适配iPhoneX
    var isX = getAppleDevice().indexOf('iPhoneX') >= 0
    function changeSafeArea() {
      if (isX && root) {
        switch (window.orientation) {
          case 0: // 竖屏
            root.style.left = '0'
            root.style.right = '0'
            root.style.bottom = '34px'
            break
          case 90: // 向左横屏
            root.style.left = '40px'
            root.style.right = '40px'
            root.style.bottom = '34px'
            break
          case -90: // 向右横屏
            root.style.left = '40px'
            root.style.right = '40px'
            root.style.bottom = '34px'
            break
          default:
            break
        }
      }
    }
    // 刘海屏自适应
    changeSafeArea()
    window.removeEventListener('orientationchange', changeSafeArea, false)
    window.addEventListener('orientationchange', changeSafeArea, false)
  }
  // 订货客户端ios加载完成
  function dinghuoIosReady(callback) {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    /* eslint-enable */
  }
  /**
    * 动态加载桥接库
    * @param {Func} callback 加载完成回调
    * @param {Object} options {wxUrl: '', wqUrl: ''}
    */
  function dynamicLoadBridge(callback, options = {}) {
    if (platform !== 'weixin' && platform !== 'weixinwork' && platform !== 'waiqin' && platform !== 'dinghuo') {
      if (callback) window.addEventListener('load', callback, false)
      return
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = 'defer'
    if (platform === 'weixin' || platform === 'weixinwork') { // 微信
      script.src = options.wxUrl || '//res.wx.qq.com/open/js/jweixin-1.4.0.js'
      if (callback) {
        script.onload = function () {
          callback()
        }
      }
    } else if (platform === 'waiqin') { // 外勤
      script.src = options.wqUrl || '//res.waiqin365.com/d/common_mobile/component/cordova/cordova.js'
      if (callback) {
        script.onload = function () {
          document.addEventListener('deviceready', () => {
            callback()
          })
        }
      }
    } else if (platform === 'dinghuo') {
      if (os === 'ios') {
        dinghuoIosReady(() => {
          callback()
        })
      } else if (os === 'andriod') {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
          callback()
        }, false)
      } else {
        callback()
      }
    }
    if (script.src) document.body.appendChild(script)
  }
  // 获取地址栏参数
  function getUrlParameter(argName, argSearch) {
    var url = window.location.href
    if (argSearch) url = argSearch
    var params = {}
    // 如果url中包含?说明有参数
    if (url.indexOf('?') !== -1) {
      // 获取所有参数options: 如?a=1&b=2转为['a=1','b=2']
      var options = url.split('?')[1].split('&')
      if (options.length) {
        for (var i = 0; i < options.length; i++) {
          // 获取单项option: 如'a=1'转为['a', '1']
          var option = options[i].split('=')
          if (option.length === 2) {
            if (argName) {
              if (argName === option[0]) return option[1]
            } else {
              params[option[0]] = option[1]
            }
          }
        }
      }
    }
    if (Object.keys(params).length) return params
    return ''
  }
  // 获取屏幕宽高
  function getScreenWidth () {
    if (window.innerWidth) return window.innerWidth
    if (window.screen.width) return window.screen.width
    if (window.screen.availWidth) return window.screen.availWidth
  }
  function getScreenHeight () {
    if (window.innerHeight) return window.innerHeight
    if (window.screen.height) return window.screen.height
    if (window.screen.availHeight) return window.screen.availHeight
  }
  return {
    protocol: window.location.protocol,
    host: window.location.host,
    domain: window.location.protocol + '//' + window.location.host,
    kernel: kernel,
    device: device,
    os: os,
    osVersion: osVersion,
    platform: platform,
    platformVersion: platformVersion,
    appleDevice: getAppleDevice(),
    // 应用程序判断
    language: (window.navigator.browserLanguage || window.navigator.language).toLowerCase(),
    appVersion: window.navigator.appVersion,
    onLine: onLine,
    isOnLine: window.navigator.onLine || true,
    ua: ua,
    orientation: window.orientation || '请在真机上测试', // 设备方向0:竖屏,90:左横屏,-90:右横屏
    adapterIPhoneX: adapterIPhoneX, // 适配iPhoneX
    dynamicLoadBridge: dynamicLoadBridge, // 动态加载桥接库
    getUrlParameter: getUrlParameter,
    screenWidth: getScreenWidth(),
    screenHeight: getScreenHeight()
  }
})()

export default Device
