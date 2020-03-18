import DB from './../DB'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'wq',
  invoke: window.wq && window.wq.invoke ? window.wq.invoke : () => {console.log('不支持invoke')},
  config: function () {
    var self = this
    /* eslint-disable */
    wq.config({auth: false})
    wq.ready(function(){
      self.addBackPress()
    })
    /* eslint-enable */
  },
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 获得版本信息
  getAppVersion: function () {
    return window.navigator.appVersion
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作');
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    wq.openWindow(params) // eslint-disable-line
  },
  // 关闭窗口
  closeWindow: function () {
    wq.closeWindow() // eslint-disable-line
  },
  /**
    * 修改原生标题
    * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
    */
  setTitle: function (params) {
    wq.setTitle(params)
  },
  // 客户端返回绑定
  addBackPress: function (callback) {
    var self = this
    if (wq.onHistoryBack) { // eslint-disable-line
      wq.onHistoryBack(() => { // eslint-disable-line
        if (callback) {
          callback()
          self.addBackPress()
        } else {
          self.back()
          self.addBackPress()
        }
        return false
      })
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    if (wq.onHistoryBack) { // eslint-disable-line
      wq.onHistoryBack(() => { // eslint-disable-line
        return true
      })
    }
  },
  /**
    * 获取当前地理位置
    * @param {Object} params
    * params: {
    * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
    * cache {Number}: 默认60秒缓存防重复定位
    * }
    * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
    */
  getLocation: function (params = {}) {
    var self = this
    // 先从cookie中读取位置信息
    var appLocation = DB.getCookie('app_location')
    if (appLocation === 'undefined') {
      DB.removeCookie('app_location')
      appLocation = ''
    }
    try {
      if (appLocation) appLocation = JSON.parse(appLocation)
    } catch (error) {
      appLocation = ''
    }
    if (appLocation) {
      if (params.success) params.success(appLocation)
      return
    }
    // 调用定位
    if (self.locating) return
    self.locating = true
    console.log('调用定位...')
    wq.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'gcj02',
      success: (res) => {
        self.locating = false
        // 将位置信息存储到cookie中60秒
        if (res.latitude && res.latitude) {
          if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
          if (params.success) params.success(res)
        } else {
          if (params.fail) params.fail(res)
          else self.showToast('没有获取到经纬度', {mask: false})
        }
      },
      fail: (res) => {
        self.locating = false
        if (params.fail) params.fail(res)
        else self.showToast('定位失败,请检查微信定位权限是否开启', {mask: false})
      },
      complete: (res) => {
        self.locating = false
        if (params.complete) params.complete(res)
      }
    })
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode (params = {}) {
    var self = this
    wq.scanQRCode({ // eslint-disable-line
      needResult: params.needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: params.scanType || ['qrCode', 'barCode'],
      desc: params.desc || '二维码／条码',
      success: function (res) {
        if (!params.success) return;
        params.success(res)
      },
      fail: function (res) {
        if (params.fail) params.fail(res)
        else self.showToast(res.errMsg, {mask: false})
      },
      cancel: function (res) {
        if (params.cancel) params.cancel(res)
      },
      complete: function (res) {
        if (params.complete) params.complete(res)
      }
    })
  },
  chooseImage: function (params) {
    wq.chooseImage(params) // eslint-disable-line
  },
  uploadImage: function (params) {
    wq.uploadImage(params) // eslint-disable-line
  },
  previewImage: function (params) {
    wq.previewImage(params) // eslint-disable-line
  }
}

export default Bridge
