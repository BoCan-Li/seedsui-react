import DB from './../DB'
import Device from './../Device'
import GeoUtil from './../GeoUtil'
import locale from './../locale'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'wq',
  // 自定义操作
  invoke: function (api, params, callback) {
    if (!wq.invoke) { // eslint-disable-line
      console.log('没有wq.invoke的方法')
      return
    }
    wq.invoke(api, params, function (response) { // eslint-disable-line
      if (!callback) return
      if (typeof callback === 'function') {
        callback(response)
        return
      }
      if (typeof callback !== 'object') return
      var msg = response && response.errMsg ? response.errMsg : ''
      if (msg) {
        var index = msg.indexOf(':')
        var res = msg.substring(index + 1)
        switch (res) {
          case 'ok':
            if (callback.success) callback.success(response)
            break
          case 'cancel':
            if (callback.cancel) callback.cancel(response)
            break
          default:
            if (callback.fail) callback.fail(response)
        }
      }
      callback.complete && callback.complete(response)
    })
  },
  // 配置鉴权
  config: function () {
    var self = this
    /* eslint-disable */
    wq.config({auth: false})
    wq.ready(function(){
      self.addBackPress()
    })
    /* eslint-enable */
  },

  // ios下加载桥接方法
  setup: function (callback) {
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
    // WVJBIframe.src = 'https://__bridge_loaded__'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__' // 针对ios wk内核
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    /* eslint-enable */
  },
  // android下加载桥接方法
  connectJsBridge: function (callback) {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        callback(WebViewJavascriptBridge)
      }, false)
    }
    /* eslint-enable */
  },
  // 注册事件
  registerHandler: function (events) {
    var self = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      self.setup(function (bridge) {
        events.forEach((eventName) => {
          bridge.registerHandler(eventName, function (data) {
            const event = new CustomEvent(eventName, { detail: data })
            // 分发事件
            window.dispatchEvent(event)
          })
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      /* eslint-disable */
      self.connectJsBridge(function (bridge) {
        events.forEach((eventName) => {
          bridge.registerHandler(eventName, function (data) {
            const event = new CustomEvent(eventName, {
              detail: data
            })
            // 分发事件
            window.dispatchEvent(event)
          })
        })
      })
      /* eslint-enable */
    }
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
    var verExp = navigator.userAgent.match(/WqAppVersion\/([\w.]*)/)
    if (verExp && verExp[1]) return verExp[1].trim()
    return ''
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function logOut() {
    wq.invoke('logout') // eslint-disable-line
  },
  /**
    * 打开新的窗口
    * @param {Object} params {title: '自定义标题', url: '打开地址(h5:为打开老内容)', target: '_self'}}
    */
  openWindow: function (params = {}) {
    var self = this
    // 新内核打开老内核
    if (params.url.indexOf('h5:') === 0) {
      if (Device.os === 'andriod') {
        let url = params.url
        if (url.indexOf('h5:/') === 0) {
          url = `${window.origin}${url.replace(/^h5:/, '')}`
        } else {
          url = `${url.replace(/^h5:/, '')}`
        }
        wq.invoke('nativeComponent', { // eslint-disable-line
          android: {
            name: 'org.apache.cordova.WqCordovaActivity',
            params: {
              url: url,
              title: params.title || ''
            }
          }
        }, () => {})
        if (params.target === '_self') self.back()
      } else if (Device.os === 'ios') {
        let option = params
        if (!params.cancel && params.target === '_self') {
          option.cancel = function () {
            setTimeout(() => {
              self.back()
            }, 500)
          }
        }
        wq.openWindow(option) // eslint-disable-line
      }
    } else { // 新内核间跳转
      wq.openWindow(params) // eslint-disable-line
    }
  },
  // 关闭窗口
  closeWindow: function (params) {
    wq.closeWindow(params) // eslint-disable-line
  },
  /**
    * 修改原生标题
    * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
    */
  setTitle: function (params) {
    if (params && params.title) document.title = params.title
    wq.setTitle(params) // eslint-disable-line
  },
  // 客户端返回绑定
  addBackPress: function (callback) {
    var self = this
    if (wq.onHistoryBack) { // eslint-disable-line
      wq.onHistoryBack(() => { // eslint-disable-line
        if (callback) {
          callback()
          self.addBackPress(callback)
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
    * @prop {String} type 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
    * @prop {Number} cache 默认60秒缓存防重复定位
    * @return {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
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
    if (self.locationTask) {
      self.locationTask.push(params)
      return
    }
    self.locationTask = []
    console.log('调用定位...')
    wq.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: params.type || 'gcj02',
      success: (res) => {
        // 将位置信息存储到cookie中60秒
        if (res.longitude && res.latitude) {
          // 兼容ios客户端622以前的版本只能返回wgs84的问题
          if (Device.os === 'ios' && Device.compareVersion(Device.platformVersion, '6.6.2') < 0) {
            let point = GeoUtil.coordtransform([res.longitude, res.latitude], 'wgs84', 'gcj02')
            res.longitude = point[0]
            res.latitude = point[1]
          }
          if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
          if (params.success) params.success(res)
        } else {
          if (params.fail) params.fail(res)
        }
        self.getLocationTask(res)
      },
      fail: (res) => {
        if (params.fail) params.fail(res)
        self.getLocationTask(res)
      },
      complete: (res) => {
        if (params.complete) params.complete(res)
      }
    })
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params = {}) {
    wq.scanQRCode({ // eslint-disable-line
      needResult: params.needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: params.scanType || ['qrCode', 'barCode'],
      desc: params.desc || '二维码／条码',
      success: function (res) {
        if (params.success) params.success(res)
      },
      fail: function (res) {
        if (params.fail) params.fail(res)
      },
      cancel: function (res) {
        if (params.cancel) params.cancel(res)
      },
      complete: function (res) {
        if (params.complete) params.complete(res)
      }
    })
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      watermark: ['第一行', '第二行'],
      success({localIds:[src]})
    * }
    */
  chooseImage: function (params) {
    console.log('外勤WK内核chooseImage', params)
    wq.chooseImage(params) // eslint-disable-line
  },
  /**
    * 照片上传, ios测试环境无法上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      tenantId: '企业id',
      localId: 'localId',
      success: func(res)
    * }
    */
  uploadImage: function (params = {}) {
    // var self = this
    var uploadParams = Object.clone(params)
    if (!params.uploadDir) {
      if (params.fail) params.fail({errMsg: 'uploadImage:fail' + locale('没有上传目录', 'hint_no_upload_dir')})
      return
    }
    if (!params.localId) {
      if (params.fail) params.fail({errMsg: 'uploadImage:fail' + locale('没有上传地址', 'hint_no_upload_localeid')})
      return
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    // ext参数: isAutoCheck: '0'/'1'是否自动识别|cmId: 客户Id|appId：应用Id|menuId: 菜单Id(必填)|funcId: 表单Id
    let menuId = Device.getUrlParameter('menuId') || ''
    uploadParams.ext = {
      menuId: menuId,
      ...(params.ext || {})
    }
    // 构建成功回调的参数
    uploadParams.success = function (res) {
      if (params.success) {
        params.success({
          errMsg: 'uploadImage:ok',
          path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
          serverId: res && res.serverId ? res.serverId : '',
          tenantId: params.tenantId
        })
      }
    }
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0 && uploadParams.ext) {
      delete uploadParams.ext
    }
    console.log('外勤WK内核上传')
    console.log(uploadParams)
    wq.uploadImage(uploadParams) // eslint-disable-line
  },
  previewImage: function (params) {
    wq.previewImage(params) // eslint-disable-line
  },
  /**
    * 视频文件上传
    * @param {Object} params
    * {
      uploadDir: '目录/年月',
      localId: 'localId',
      success: func(res)
    * }
    */
  uploadFile: function (params) {
    var self = this
    params = params || {}
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      if (params.fail) params.fail({errMsg: 'uploadImage:fail' + locale('此功能需要升级至6.6.0及以上的客户端', 'hint_upload_file_version')})
      return
    }
    if (!params.localId) {
      if (params.fail) params.fail({errMsg: 'uploadImage:fail' + locale('没有上传地址', 'hint_no_upload_localeid')})
      return
    }
    self.invoke('uploadFile', {
      url: params.url || `https://cloud.waiqin365.com/fileupload/v1/doUpload.do?uploadPath=file`,
      filePath: params.localId,
      name: 'file',
      formData: params.data
    }, params)
  },
  /**
    * 选择、录制视频
    * @param {Object} params
    * {
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      maxDuration: 10, // 最大录相时长
      camera: 'back', // back || front，默认拉起的是前置或者后置摄像头。非必填，默认back
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success({localIds:[src]})
    * }
    */
  chooseVideo: function (params) {
    const self = this
    params = params || {}
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      if (params.fail) params.fail(locale('此功能需要升级至6.6.0及以上的客户端', 'hint_choose_video_version'))
      return
    }
    console.log('外勤WK内核chooseVideo', params)
    self.invoke('chooseVideo', {
      sourceType: params.sourceType || ['album','camera'],
      maxDuration: params.maxDuration || 10,
      camera: params.camera || 'back',
      compressed: params.sizeType && params.sizeType.length && params.sizeType.indexOf('compressed') === -1 ? false : true
    }, function (res) {
      // 标准化回调参数: 将tempFilePath改为localId
      if (res.tempFilePath) {
        res.localIds = [res.tempFilePath]
      }
      if (res.errMsg.indexOf('chooseVideo:ok') !== -1) {
        if (params.success) params.success(res)
      } else if (res.errMsg.indexOf('chooseVideo:cancel') !== -1) {
        if (params.cancel) params.cancel(res)
      } else {
        if (params.fail) params.fail(res)
      }
      if (params.complete) params.complete(res)
    })
  },
  /**
    * 文件操作: 预览文件
    * @param {Object} params
    * params: {
    *  url: '', // 需要预览文件的地址(必填，可以使用相对路径)
    *  name: '', // 需要预览文件的文件名(不填的话取url的最后部分)
    *  size: 1048576 // 需要预览文件的字节大小(必填)
    * }
    */
  previewFile: function (params) {
    wq.previewFile(params) // eslint-disable-line
  }
}

export default Bridge
