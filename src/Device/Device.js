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
  function updatePlatform () {
    if (device === 'pc') {
      platform = 'browser'
    } else if (ua.indexOf('miniprogram') > -1) {
      platform = 'miniprogram'
      platformMatch = ua.match(/micromessenger\/([0-9.]+)/i)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    } else if (ua.indexOf('wxwork') > -1) {
      platform = 'wework'
      platformMatch = ua.match(/wxwork\/([0-9.]+)/i)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    } else if (ua.indexOf('micromessenger') > -1) {
      platform = 'wechat'
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
      if (!window.localStorage.getItem('seedsui_bridge_wq_cordova_enable')) platform = 'wq'
      platformMatch = ua.match(/wqappversion\/([\w.]*)/)
      if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
    } else {
      platform = 'browser'
    }
  }
  updatePlatform()

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
  // 获取地址栏参数
  function getUrlParameter(argName, argSearch) {
    var url = window.location.href
    if (argSearch) url = argSearch
    var params = {}
    // 如果url中包含?说明有参数
    if (url.indexOf('?') !== -1) {
      if (!argName) return '?' + url.split('?')[1]
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
    getUrlParameter: getUrlParameter,
    screenWidth: getScreenWidth(),
    screenHeight: getScreenHeight(),
    compareVersion: function (s1, s2) { // 比较版本号, -1小于 0等于 1大于
      // 不考虑字母
      function s2i(s) {
        return s.split('').reduce(function (a, c) {
          var code = c.charCodeAt(0)
          if (48 <= code && code < 58) {
            a.push(code - 48)
          }
          return a
        }, []).reduce(function (a, c) {
          return 10 * a + c
        }, 0)
      }
      var a = s1.split('.').map(function (s) {
        return s2i(s)
      })
      var b = s2.split('.').map(function (s) {
        return s2i(s)
      })
      var n = a.length < b.length ? a.length : b.length
      for (var i = 0; i < n; i++) {
        if (a[i] < b[i]) {
          return -1
        } else if (a[i] > b[i]) {
          return 1
        }
      }
      if (a.length < b.length) return -1
      if (a.length > b.length) return 1
      var last1 = s1.charCodeAt(s1.length - 1) | 0x20
      var last2 = s2.charCodeAt(s2.length - 1) | 0x20
      return last1 > last2 ? 1 : last1 < last2 ? -1 : 0
    }
  }
})()

export default Device
