import jsonp from './../jsonp';
import DB from './../DB';
import Device from './../Device';
import Toast from './../Toast/instance.js';
import Alert from './../Alert/instance.js';
import Loading from './../Loading/instance.js';

var Bridge = {
  /**
  * 基础功能:start
  */
  debug: false,
  // 拨打电话
  tel: function (number) {
    if (Device.device === 'pc') {
      this.showToast('此功能仅可在微信或APP中使用')
      return
    }
    if (isNaN(number)) return
    window.location.href = 'tel:' + number
  },
  // 弹出toast
  toast: null,
  showToast: function (msg, params = {}) {
    if (!msg) return
    if (!this.toast) {
      // 提示错误
      this.toast = new Toast({
        parent: document.body,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      this.toast.setHTML(msg)
      this.toast.setMaskClassName('mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''))
      this.toast.setToastClassName('toast ' + (params.position ? params.position : 'middle'))
      this.toast.setIcon(params.icon || '')
      this.toast.setDelay(params.delay || 2000)
    }
    this.toast.show()
    if (params.success) {
      setTimeout(() => {
        params.success()
      }, params.delay ? Math.round(params.delay / 2) : 1000)
    }
  },
  // 弹出loading
  loading: null,
  showLoading: function (params = {}) {
    if (!this.loading) {
      this.loading = new Loading({
        caption: params.caption || '正在加载...',
        type: params.type,
        icon: params.icon || '',
        maskCss: params.css || null
      });
    } else {
      if (params.caption) this.loading.setCaption(params.caption)
      if (params.type) this.loading.setType(params.type)
      if (params.css) this.loading.setMaskCss(params.css)
      if (params.icon) this.toast.setIcon(params.icon || '')
      if (params.mask) this.loading.setMaskClassName('mask loading-mask ' + (params.mask === false ? ' loading-propagation' : ''))
    }
    this.loading.show()
  },
  hideLoading: function () {
    if (!this.loading) {
      this.toast.showToast('请先showLoading才能hideLoading')
    } else {
      this.loading.hide()
    }
  },
  // 弹出Alert
  alert: null,
  showAlert: function (msg, params = {}) {
    if (!this.alert) {
      this.alert = new Alert({
        caption: params.caption || '',
        html: msg,
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        }
      });
    } else {
      if (params.caption) this.alert.setCaption(params.caption)
      this.alert.setHTML(msg)
    }
    this.alert.show()
  },
  // 弹出Confirm
  confirm: null,
  showConfirm: function (msg, params = {}) {
    if (!this.confirm) {
      this.confirm = new Alert({
        caption: params.caption || '',
        html: msg,
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
        },
        onClickCancel: function(e) {
          if (params.fail) params.fail(e)
          else e.hide()
        },
      })
    } else {
      if (params.caption) this.confirm.setCaption(params.caption)
      if (params.success) this.confirm.setOnClickSubmit(params.success)
      if (params.fail) this.confirm.setOnClickCancel(params.fail)
      this.confirm.setHTML(msg)
    }
    this.confirm.show()
  },
  /**
   * 百度地图:获取当前位置名称,只支持gcj02
   * @param {Object} params: {longitude: '', latitude: '', success: fn, fail: fn}
   * @returns {Object} {address:'地址全称'}
   */
  getAddress: function (params = {}) {
    var url = 'https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + params.latitude + ',' + params.longitude + '&output=json&pois=1&ak=IlfRglMOvFxapn5eGrmAj65H&ret_coordtype=gcj02ll'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.fail) params.fail({errMsg: 'getAddress:获取位置名称失败,请稍后重试' + err})
      } else {
        var addrs = {}
        if (data.result && data.result.formatted_address) {
          addrs.address = data.result.formatted_address
          if (params.success) params.success(addrs)
        } else {
          if (params.fail) params.fail({errMsg: 'getAddress:获取位置名称失败,请稍后重试'})
        }
      }
    })
  },
  /**
   * 百度地图:获得天气
   * @param {Object} params: {location: 'lng,lat|lng,lat|lng,lat' | '北京市|上海市', success: fn, fail: fn}
   * @returns {Object} 天气信息results
   */
  getWeather: function (params = {}) {
    var url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + (params.location || '南京市') + '&output=json&ak=IlfRglMOvFxapn5eGrmAj65H'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.fail) params.fail({errMsg: 'getWeather:获取天气失败,请稍后重试' + err})
      } else {
        if (data.results && data.results.length) {
          if (params.success) params.success(data.results)
        } else {
          if (params.fail) params.fail({errMsg: 'getWeather:获取天气失败,请稍后重试'})
        }
      }
    })
  },
  // 客户端默认返回控制
  back: function (argHistory, argBackLvl) {
    // 返回操作对象与返回层级
    var _history = window.history
    if (argHistory && argHistory.go) _history = argHistory
    var _backLvl = argBackLvl || -1
    
    // 返回类型
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') { // 关闭当前页面
      try {
        Bridge.closeWindow()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'home') { // 返回首页
      try {
        Bridge.goHome()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'confirm') { // 提示后返回上一页
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: (e) => {
          e.hide()
          _history.go(_backLvl)
        }
      });
    } else if (isFromApp === 'confirm-close') { // 提示后关闭当前页面
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: (e) => {
          e.hide()
          Bridge.closeWindow()
        }
      });
    } else { // 返加上一页
      _history.go(_backLvl)
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
    const ua = navigator.userAgent;
    var verExp = ua.match(/WqAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  // 返回首页
  goHome: function () {
    window.history.go(-1)
  },
  // 退出到登陆页面
  logOut: function (msg) {
    wq.wqload.wqBackToLogin(JSON.stringify({message: msg || '您的帐号因正在它处登录, 需要您重新登录'})) // eslint-disable-line
  },
  // 打开新的窗口
  openWindow: function (params, callback) {
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? JSON.stringify(params) : null) // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function () {
    wq.wqload.wqClosePage() // eslint-disable-line
  },
  // 客户端返回绑定
  addBackPress: function (callback) {
    document.addEventListener('backbutton', callback || this.back, false) // eslint-disable-line
  },
  // 客户端移除返回绑定
  removeBackPress: function (callback) {
    document.removeEventListener('backbutton', callback || this.back, false) // eslint-disable-line
  },
  /**
  * 基础功能:end
  */

  /**
  * 定制功能
  */
  platform: 'waiqin',
  config: function () {
    document.addEventListener('deviceready', () => {
      this.addBackPress()
      DB.setSession('bridge_isready', '1')
    })
  },
  /*
  * 商联支付
  * params: {appKey:'', dealerCode:'', orderId:'', payAmount:''}
  * */
  slopenpay: function (params, callback) {
    wq.wqpay.slopenpay((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, null, params ? JSON.stringify(params) : null)
  },
  /*
  * 获取APP信息
  * params: {operation: 'AllInfo'}
  * */
  getApp: function (callback, params = {operation: 'AllInfo'}) {
    wq.wqapp.getApp((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, null, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* // 文件是否存在
  isExistsFile({
    fileName: 'ss.txt',
    size: 200
  }，(result) => { // result => {isExists: '', filePath: '', fileName: ''}，isExists:'0'不存在，'1'存在
  
  })
  */
  isExistsFile: function (params, callback) {
    wq.wqio.verifyFileHasExist((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* // 附件下载
  downloadFile({
    id: '',
    fileName: src.substring(src.lastIndexOf('/') + 1, src.length), // 必填
    downloadUrl: "http://...", // 必填
    size: 200 // 必填
  }，(result) => { // result => {{flag:'', filePath: '', msg: ''}, flag:'0'失败，'1'成功，msg失败原因
  
  }) */
  downloadFile: function (params, callback) {
    wq.wqio.downloadFile((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* // 附件打开
  openFile({
    filePath: ''
  }，(result) => { // result => {flag:'', msg:''} flag:'0'失败, '1'成功, msg失败原因
  
  }） */
  openFile: function (params, callback) {
    wq.wqio.openFile((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* // 附件转为base64
  wqUrlToBase64({
    path: ['', ''],
    destroy: '1' // '0'转完后删除, '1'转完后不删除
  }, (result) => { // result => [{path:'', name:'', src:'base64'}]
  
  }） */
  wqUrlToBase64: function (params, callback) {
    wq.wqphoto.wqUrlToBase64((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null);
  },
  /* -----------------------------------------------------
    视频播放
    @params {src: '视频地址', title: '标题'}
  ----------------------------------------------------- */
  previewVideo: function (params = {}) {
    if (Device.platformVersion < '6.2.2') {
      Bridge.showToast('视频播放功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqload.wqOpenCustomerPager(JSON.stringify({ // eslint-disable-line
      IOSViewController: 'JNCVideoPlayerVC',
      androidUIR: 'com.waiqin365.lightapp.jiannanchun.VideoPlayActivity',
      androidParma: {
        videoUrl: params.src,
        title: params.title || '视频播放'
      },
      IOSParma: {
        videoUrl: params.src,
        title: params.title || '视频播放'
      }
    }))
  },
  /* -----------------------------------------------------
    视频录制
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒'}
  ----------------------------------------------------- */
  videoRecord: function (params = {}) {
    if (Device.platformVersion < '6.2.2') {
      Bridge.showToast('视频录制功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoRecord((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'videoRecord:录制失败'})
        else Bridge.showToast('录制失败', {mask: false})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频上传
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: ''}
  ----------------------------------------------------- */
  videoUpload: function (params = {}) {
    if (Device.platformVersion < '6.2.2') {
      Bridge.showToast('视频上传功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoUpload((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'videoUpload:上传失败'})
        else Bridge.showToast('上传失败', {mask: false})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频是否已经录制过了
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: '仅在hasUpload=1的情况下返回', hasVideo: '0|1', hasUpload: '0|1}
  ----------------------------------------------------- */
  videoInfo: function (params = {}) {
    if (Device.platformVersion < '6.2.2') {
      Bridge.showToast('视频功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoInfo((res) => { // eslint-disable-line
      if (res.result === '1') {
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'videoInfo:未查到此视频信息'})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params = {}) {
    wq.wqhardware.getQrCode((res) => { // eslint-disable-line
      if (res && res.qrCode) {
        var wqRes = res
        wqRes.resultStr = res.qrCode
        if (params && params.success) params.success(wqRes)
      } else {
        if (params.fail) params.fail({errMsg: 'scanQRCode:扫码失败请稍后重试'})
        else Bridge.showToast('扫码失败请稍后重试', {mask: false})
      }
    })
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
  /* -----------------------------------------------------
    获取当前地理位置 转为与微信的api一致, 原api如下:
    外勤365默认使用国测局'gcj02'定位,没有参数控制
    @return {
      "city": "南京市",
      "citycode": "0",
      "district": "秦淮区",
      "wqAddress": "江苏省南京市",
      "street": "应天大街388号",
      "loctime": "2015-09-22 17:31:25",
      "province": "江苏省",
      "wqLongitude": 118.787027,
      "wqLatitude": 32.007889,
      "radius": 40.25990676879883,
      "mokelocation": false
    }
  ----------------------------------------------------- */
  getLocation: function (params = {}) {
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
    if (this.locating) return
    this.locating = true
    console.log('调用定位...')
    // 调用定位
    wq.wqlocation.getLocationBackground((res) => { // eslint-disable-line
      this.locating = false
      if (res && res.wqLatitude) {
        // 格式化为标准的返回信息
        var location = {
          latitude: res.wqLatitude,
          longitude: res.wqLongitude,
          speed: null,
          accuracy: res.radius,
          address: res.wqAddress,
          country: '中国',
          province: res.province,
          city: res.city,
          area: res.district,
          street: res.street
        }
        // 将位置信息存储到cookie中60秒
        if (params.cache) DB.setCookie('app_location', JSON.stringify(location) , params.cache || 60)
        if (params.success) params.success(location)
      } else {
        if (params.fail) params.fail({errMsg: 'getLocation:定位失败,请检查定位权限是否开启'})
        else Bridge.showToast('定位失败,请检查定位权限是否开启', {mask: false})
      }
    }, JSON.stringify({locationType: '1'})) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /* -----------------------------------------------------
    获取当前地理位置带地图 转为与微信的api一致, 原api如下:
    外勤365默认使用国测局'gcj02'定位, 没有参数控制
    @params {editable: '是否可以标记位置, 1可标记', latlng: '经纬度,只在editable为0时生效', title: '标题, 可不传'}
    @return {
      "city": "南京市",
      "citycode": "0",
      "district": "秦淮区",
      "wqAddress": "江苏省南京市",
      "street": "应天大街388号",
      "loctime": "2015-09-22 17:31:25",
      "province": "江苏省",
      "wqLongitude": 118.787027,
      "wqLatitude": 32.007889,
      "radius": 40.25990676879883,
      "mokelocation": false,
      "poiname":""
    }
  ----------------------------------------------------- */
  getLocationMap: function (params = {}) {
    wq.wqlocation.getLocationMap((res) => { // eslint-disable-line
      if (res && res.wqLatitude) {
        // 格式化为标准的返回信息
        var location = {
          latitude: res.wqLatitude,
          longitude: res.wqLongitude,
          speed: null,
          accuracy: res.radius,
          address: res.poiname || res.wqAddress,
          country: '中国',
          province: res.province,
          city: res.city,
          area: res.district,
          street: res.street,
          locationLie: res.mokelocation
        }
        if (params.success) params.success(location)
      } else {
        if (params.fail) params.fail({errMsg: 'getLocationMap:定位失败,请检查外勤365定位权限是否开启'})
        else Bridge.showToast('定位失败,请检查外勤365定位权限是否开启', {mask: false})
      }
    }, JSON.stringify(Object.assign({editable: '1'}, params))) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /* -----------------------------------------------------
    拍照选图: 转为与微信的api一致, 原api如下:
    @params {
      "operation": 1, // 操作：0：拍照；1，相册； 2：拍照/相册。
      "max": 2,
      "pwidth": 2, // 照片宽度
      "viewId": 41236, // 页面控件ID
      "photoType": "考勤", // 水印: 项目模块
      "customerName": "客户名", // 水印: 客户名
      "submitName": "提交人", // 水印: 提交人
      "cmLocation": "门店位置", // 水印: 用于计算偏差
      "selectItems": [ // 水印: 已有图片的路径和id
        {
          "id": "1211aa",
          "path": "sdcard/"
        },
        {
          "id": "2145aa",
          "path": "sdcard//www.baidu.co"
        }
      ]
    }
    @return [
      {
        "path": "data:image/png;base64,/9j/Q...",
        "id": "3500",
        "name": "xxx.jpg",
        "src": "/storage/emulated/0/iMobii/data/camera/waiqin365@zhangkong8585235895/files/20150909090153661_26873987_ALBUM.jpg"
      }
    ]
  ----------------------------------------------------- */
  chooseImage: function (argParams) {
    var params = Object.clone(argParams)
    // 格式化sourceType
    var operation = '2'
    if (argParams && argParams.sourceType) {
      if (argParams.sourceType.indexOf('album') >= 0 && argParams.sourceType.indexOf('camera') >= 0) {
        operation = '2'
      } else if (argParams.sourceType.indexOf('album') >= 0) {
        operation = '1'
      } else {
        operation = '0'
      }
      params.operation = operation
    }
    // 格式化sizeType
    var pwidth = null
    if (argParams && argParams.sizeType) {
      if (!isNaN(argParams.sizeType)) {
        pwidth = argParams.sizeType
      } else if (argParams.sizeType.indexOf('compressed') >= 0) {
        pwidth = '750'
      }
    }
    if (pwidth) params.pwidth = pwidth
    // 格式化count
    var max = 5
    if (argParams && argParams.count) {
      max = argParams.count
      params.max = '' + max
    }
    // viewId 临时目录,不能重复
    params.viewId = '' + new Date().getTime()
    if (argParams && argParams.viewId) {
      params.viewId = argParams.viewId;
    }
    // 水印相关: photoType | customerName | submitName | cmLocation | selectItems
    wq.wqphoto.getPhoto((result) => { // eslint-disable-line
      if (argParams && argParams.success) {
        // 格式化返回结果
        var res = {
          sourceType: operation === '0' ? 'camera' : 'album',
          errMsg: 'chooseImage:ok',
          results: result,
          localIds: []
        }
        // 格式化返回结果[{src:地址, path: base64: name: 文件名}] 为 imgMap{path: {serverId: '', sourceType: ''} }
        var imgMap = {}
        for (var i = 0, item; item = result[i++];) { // eslint-disable-line
          imgMap[item.name] = {
            serverId: '',
            name: item.name,
            sourceType: res.sourceType,
            base64: item.path,
            src: item.src
          }
          res.localIds.push(item.name)
        }
        argParams.success(res, imgMap)
      }
    }, null, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    上传图片
    @params {dir:'上传路径',localIds:['图片集合'], tenantId: '企业Id'}
    @return 无
  ----------------------------------------------------- */
  uploadImage: function (params = {}) {
    if (!params.dir) {
      Bridge.showToast('请传入上传路径dir后再上传图片', {mask: false})
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      Bridge.showToast('请传入上传图片列表后再上传图片', {mask: false})
      return;
    }
    // 格式化params
    var uploadParams = {
      filePathList: params.localIds.map((item) => {
        return {path: item}
      }),
      url: params.dir
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    wq.wqphoto.startUpload(JSON.stringify(uploadParams)) // eslint-disable-line
  },
  /* -----------------------------------------------------
    图片预览
    @params {urls:'需要预览的图片http链接列表',index:'图片索引'}
  ----------------------------------------------------- */
  previewImage: function (argParams) {
    // 格式化index
    var position = 0
    if (argParams && argParams.index) position = argParams.index
    // 格式化urls
    var photos = []
    if (argParams && argParams.urls && argParams.urls.length) {
      photos = argParams.urls.map((item) => {
        return {
          path: item
        }
      })
    }
    var params = {
      position: position,
      photos: photos
    }
    wq.wqphoto.photoPreview(JSON.stringify(params)) // eslint-disable-line
  },
  /* -----------------------------------------------------
    人员插件
    @params {success: fn}
  ----------------------------------------------------- */
  getContactMore: function (params = {}) { // {selectedIds: 'id,id', aclType: '0只能看到下属 不传或者其他的参数为全部人员,默认为空', success([{id: '', name: ''}])}
    wq.wqcontact.getContactMore(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getContact: function (params = {}) {
    wq.wqcontact.getContact((args) => { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    客户插件
    dms_type说明,DMS需要的客户选择接口类型:
    【1】当前用户所属的经销商的下级终端+直属下级经销商(经销商:销售订单、发货单确认、回单确认) ；
    【2】自己是客户经理的经销商(业代:经销商库存盘点、经销商库存查询)；
    【3】自己是客户经理（或者客户经理是自己下属），如果tradeType=3,结果为没有经销商的终端，否则结果为没有上级经销商的经销商（业代：采购订单(又称直营订单)选客户）
    【4】自己是客户经理,且是“终端或有上级的经销商”（业代：销售订单(又称分销订单)选客户）；
    【5】根据dms_type=4选择的客户筛选经销商，需要传dms_cm_id、dms_trade_type参数，如果客户是终端，则选择终端所属的经销商，
    如果客户是经销商，则选择上级经销商(（业代：销售订单(又称分销订单)选供货商）)。
    【6】获取当前人所属的经销商的上级经销商
  ----------------------------------------------------- */
  getCustomerMore: function (params = {}) { // {isonline: '1.在线0.离线', selectedIds: 'id,id', tradeType: '1客户 2经销商 3门店,默认1', superTradeType: '2经销商,指门店上级经销商默认无', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', success([{id: '', name: ''}])}
    wq.wqcustomer.getCustomerMore(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(Object.assign({hiddenAdd: true}, params)));
  },
  getCustomer: function (params = {}) {
    wq.wqcustomer.getCustomer(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(Object.assign({hiddenAdd: true}, params)))
  },
  getCustomerType: function (params = {}) { // {id: 'id', name: 'name', success({id: '', name: ''})}
    wq.wqcustomer.getCustomerType(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getCustomerAreaMore: function (params = {}) { // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    if (Device.platformVersion < '6.2.2') {
      Bridge.showToast('此功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqcustomer.getCustomerAreaMore(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  getCustomerArea: function (params = {}) {
    wq.wqcustomer.getCustomerArea(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    部门插件
    @params: {selectedIds: '',success: fn}
  ----------------------------------------------------- */
  getDepartmentMore: function (params = {}) { // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    wq.wqdepartment.getDepartmentMore(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params));
  },
  getDepartment: function (params = {}) {
    wq.wqdepartment.getDepartment(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    单选商品
    @return {
      id: '5343180131602024954',
      name: '商品1',
      propvalues: '', // 商品属性不带排序号
      nameSpec: '', // 规格名称
      productRemarks: '', // 备注
      props: '', // 商品属性介绍
      propDetail: '', // 商品属性详情
      reportUnitName: '', // 报表单位名称
      reportUnitID: '', // 报表单位ID
      reportUnitRatio: '', // 报表单位比率
    }
  ----------------------------------------------------- */
  getGoods: function (params = {}) {
    wq.wqproduct.wqSelectSingleProduct(function (args) { // eslint-disable-line
      if (params.success) params.success(args)
    }, JSON.stringify(params));
  },
  /* -----------------------------------------------------
    打开原生窗口
    @params {ios: {url: '', params: {}}, android: {url: '', params: {}}}默认为打开一个webview页面
  ----------------------------------------------------- */
  openNativePage: function (params = {ios: {}, android: {}}) {
    if (!params.ios.url) {
      Bridge.showToast('ios参数url不能为空', {mask: false})
      return
    }
    if (!params.android.url) {
      Bridge.showToast('android参数url不能为空', {mask: false})
      return
    }
    window.wq.wqload.wqOpenCustomerPager({
      androidUIR: params.android.url,
      androidParma: params.android.params,
      IOSViewController: params.ios.url,
      IOSParma: params.ios.params
    })
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
  })
  */
  Image: function (params = {}) {
    var s = this
    var msg = ''
    // 选择照片
    s.choose = function (args) {
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        chooseOptions: args.chooseOptions || {}
      }
      /* watermark: {
        photoType: 'xx', // 水印名称
        customerName: 'xx', // 客户名
      } */
      var count = option.max - option.currentCount
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片'
        Bridge.showToast(msg)
        return
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1
      Bridge.chooseImage(Object.assign({
        count: count, // 默认5
        sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res, imgMap) {
          if(params.onChooseSuccess) params.onChooseSuccess(imgMap, res)
        }
      }, option.chooseOptions))
    }
  }
}

export default Bridge
