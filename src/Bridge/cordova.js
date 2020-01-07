import DB from './../DB';
import Device from './../Device';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

var Bridge = {
  /**
  * 定制功能
  */
  platform: 'waiqin',
  config: function () {
    var self = this
    document.addEventListener('deviceready', () => {
      self.addBackPress()
    })
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
    var self = this
    document.addEventListener('backbutton', callback || self.back, false) // eslint-disable-line
  },
  // 客户端移除返回绑定
  removeBackPress: function (callback) {
    var self = this
    document.removeEventListener('backbutton', callback || self.back, false) // eslint-disable-line
  },
  /**
    * 支付宝支付
    * @param {Object} params
    * @param {Function} callback
    * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
    */
  alipay: function (params, callback) {
    wq.wqpay.alipay((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, null, params ? JSON.stringify(params) : null)
  },
  /**
    * 商联支付
    * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
    * @param {Function} callback 回调
    */
  slopenpay: function (params, callback) {
    wq.wqpay.slopenpay((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, null, params ? JSON.stringify(params) : null)
  },
  /**
    * 大华捷通支付
    * @param {Object} params {payChannel:'UPPay 云闪付  WXPay微信支付 AliPay 支付宝支付', payData:'服务端获取'}
    * @param {Function} callback 回调
    */
  qmfpay: function (params, callback) {
    wq.wqpay.qmfpay((result) => { // eslint-disable-line
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
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      self.showToast('视频播放功能需要升级至6.2.2及以上的客户端', {mask: false})
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
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      self.showToast(window._seeds_lang['hint_video_record_version'] || '视频录制功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoRecord((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'videoRecord:录制失败'})
        else self.showToast(window._seeds_lang['hint_video_record_version'] || '录制失败', {mask: false})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频上传
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: ''}
  ----------------------------------------------------- */
  videoUpload: function (params = {}) {
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      self.showToast(window._seeds_lang['hint_video_upload_version'] || '视频上传功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoUpload((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'videoUpload:上传失败'})
        else self.showToast(window._seeds_lang['hint_video_upload_failed'] || '上传失败', {mask: false})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    视频是否已经录制过了
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: '仅在hasUpload=1的情况下返回', hasVideo: '0|1', hasUpload: '0|1}
  ----------------------------------------------------- */
  videoInfo: function (params = {}) {
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      self.showToast(window._seeds_lang['hint_video_info_version'] || '视频功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoInfo((res) => { // eslint-disable-line
      if (res.result === '1') {
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: `videoInfo:${window._seeds_lang['hint_video_info_failed'] || '未查到此视频信息'}`})
      }
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params = {}) {
    var self = this
    wq.wqhardware.getQrCode((res) => { // eslint-disable-line
      if (res && res.qrCode) {
        var wqRes = res
        wqRes.resultStr = res.qrCode
        if (params && params.success) params.success(wqRes)
      } else {
        if (params.fail) params.fail({errMsg: `scanQRCode:${window._seeds_lang['hint_scan_failed'] || '扫码失败'}, ${window._seeds_lang['hint_try_again_later'] || '请稍后重试'}`})
        else self.showToast(`scanQRCode:${window._seeds_lang['hint_scan_failed'] || '扫码失败'}, ${window._seeds_lang['hint_try_again_later'] || '请稍后重试'}`, {mask: false})
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
    // 调用定位
    wq.wqlocation.getLocationBackground((res) => { // eslint-disable-line
      self.locating = false
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
        if (params.fail) params.fail({errMsg: `getLocation: ${window._seeds_lang['hint_location_failed'] || '定位失败,请检查定位权限是否开启'}`})
        else self.showToast(window._seeds_lang['hint_location_failed'] || '定位失败, 请检查定位权限是否开启', {mask: false})
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
    var self = this
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
        if (params.fail) params.fail({errMsg: `getLocationMap:${window._seeds_lang['hint_location_map_failed'] || '定位失败, 请检查外勤365定位权限是否开启'}`})
        else self.showToast(window._seeds_lang['hint_location_map_failed'] || '定位失败, 请检查外勤365定位权限是否开启', {mask: false})
      }
    }, JSON.stringify(Object.assign({editable: '1'}, params))) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /* -----------------------------------------------------
    拍照选图: 转为与微信的api一致, 原api如下:
    @params {
      isAI: '1.是 0.不是'
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
    @params {dir:'目录/年月',localIds:['图片集合'], tenantId: '企业Id', isAI: '1.是 0.不是'}
    @return 无
  ----------------------------------------------------- */
  uploadImage: function (params = {}) {
    var self = this
    if (!params.dir) {
      self.showToast(window._seeds_lang['hint_upload_image_must_dir'] || '没有上传目录', {mask: false})
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      self.showToast(window._seeds_lang['hint_upload_image_must_localIds'] || '没有上传图片地址', {mask: false})
      return;
    }
    // 格式化params
    var uploadParams = {
      filePathList: params.localIds.map((item) => {
        if (params.isAI) {
          return {
            isAI: params.isAI,
            path: item
          }
        }
        return {path: item}
      }),
      url: params.dir
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    wq.wqphoto.startUpload(JSON.stringify(uploadParams)) // eslint-disable-line
  },
  /**
    * 图片预览
    * @param {Object} params
    * {
    * urls:[],
    * current:'当前显示图片地址',
    * index:'当前显示图片索引'
    * }
    */
  previewImage: function (argParams) {
    var self = this
    if (!argParams.urls || !argParams.urls.length) {
      self.showToast(window._seeds_lang['hint_preview_image_must_urls'] || '没有预览图片地址', {mask: false})
      return
    }
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
    setEmployeeId: '1'自动补充semployeeId
  ----------------------------------------------------- */
  getCustomerMore: function (params = {}) { // {isonline: '1.在线0.离线', selectedIds: 'id,id', setEmployeeId: '1', tradeType: '1客户 2经销商 3门店,默认1', superTradeType: '2经销商,指门店上级经销商默认无', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', success([{id: '', name: ''}])}
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
    var self = this
    if (Device.compareVersion(Device.platformVersion, '6.2.2') < 0) {
      self.showToast(window._seeds_lang['hint_get_customer_area_more_version'] || '此功能需要升级至6.2.2及以上的客户端', {mask: false})
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
    var self = this
    if (!params.ios.url) {
      self.showToast(window._seeds_lang['hint_open_native_page_must_ios_url'] || 'ios参数url不能为空', {mask: false})
      return
    }
    if (!params.android.url) {
      self.showToast(window._seeds_lang['hint_open_native_page_must_android_url'] || 'android参数url不能为空', {mask: false})
      return
    }
    window.wq.wqload.wqOpenCustomerPager({
      androidUIR: params.android.url,
      androidParma: params.android.params,
      IOSViewController: params.ios.url,
      IOSParma: params.ios.params
    })
  }
}

export default Bridge