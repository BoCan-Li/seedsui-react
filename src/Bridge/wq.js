import DB from './../DB'
import Device from './../Device'
import locale from './../locale'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'wq',
  // 自定义操作
  invoke: function (api, params, callback) {
    /* eslint-disable */
    if (!wq.invoke) {
      console.log('没有wq.invoke的方法')
      return
    }
    wq.invoke(api, params, function (res) {
        callback && callback(res)
    })
    /* eslint-enable */
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
    wq.invoke('logout') // eslint-disable-line
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
    if (self.locationTask) {
      self.locationTask.push(params)
      return
    }
    self.locationTask = []
    console.log('调用定位...')
    wq.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'gcj02',
      success: (res) => {
        // 将位置信息存储到cookie中60秒
        if (res.latitude && res.latitude) {
          if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
          if (params.success) params.success(res)
        } else {
          if (params.fail) params.fail(res)
          else self.showToast('没有获取到经纬度', {mask: false})
        }
        self.getLocationTask(res)
      },
      fail: (res) => {
        if (params.fail) params.fail(res)
        else self.showToast('定位失败,请检查微信定位权限是否开启', {mask: false})
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
    var uploadParams = Object.clone(params)
    var self = this
    if (!params.uploadDir) {
      self.showToast(locale('没有上传目录', 'hint_no_upload_dir'), {mask: false})
      return
    }
    if (!params.localId) {
      self.showToast(locale('没有上传地址', 'hint_no_upload_localeid'), {mask: false})
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
    uploadParams.success = function () {
      if (params.success) {
        params.success({
          errMsg: 'uploadImage:ok',
          path: `${params.uploadDir}/${params.localId}`, // 前后不带/, 并且不带企业参数的上传路径
          serverId: params.serverId,
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
   uploadFile: function (argParams = {}) {
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      self.showToast(locale('此功能需要升级至6.6.0及以上的客户端', 'hint_upload_file_version'), {mask: false})
      return
    }
    if (!argParams.localId) {
      self.showToast(locale('没有上传地址', 'hint_no_upload_localeid'), {mask: false})
      return
    }
    let params = {
      url: argParams.url || `/fileupload/v1/doUpload.do?uploadPath=file`,
      filePath: argParams.localId,
      name: 'file',
      formData: argParams.data,
    }
    self.invoke('uploadFile', params, function (res) {
      if (res.errMsg === 'uploadFile:ok') {
        if (!argParams.success) return
        argParams.success(res)
      } else {
        if (!argParams.fail) return
        argParams.fail(res)
      }
    })
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
  chooseVideo: function (argParams = {}) {
    const self = this
    if (Device.compareVersion(Device.platformVersion, '6.6.0') < 0) {
      self.showToast(locale('此功能需要升级至6.6.0及以上的客户端', 'hint_choose_video_version'), {mask: false})
      return
    }
    let params = {
      sourceType: argParams.sourceType || ['album','camera'],
      maxDuration: argParams.maxDuration || 10,
      camera: argParams.camera || 'back',
      compressed: argParams.sizeType && argParams.sizeType.length && argParams.sizeType.indexOf('compressed') === -1 ? false : true
    }
    console.log('外勤WK内核chooseVideo', params)
    self.invoke('chooseVideo', params, function (res) {
      // 标准化回调参数: 将tempFilePath改为localId
      if (res.tempFilePath) {
        res.localIds = [res.tempFilePath]
      }
      if (res.errMsg === 'chooseVideo:ok') {
        if (argParams.success) argParams.success(res)
      } else {
        if (argParams.fail) argParams.fail(res)
      }
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
