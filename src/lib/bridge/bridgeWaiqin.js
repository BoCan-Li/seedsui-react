// require PrototypeObject.js
import BridgeBrowser from './bridgeBrowser.js'
import Device from './../Device.js'
import DB from './../DB.js'

var Bridge = {
  platform: 'waiqin',
  config: function () {
    document.addEventListener('deviceready', () => {
      this.addBackPress()
      DB.setSession('bridge_isready', '1')
    })
  },
  // 获得版本信息
  getAppVersion: function () {
    const ua = navigator.userAgent;
    var verExp = ua.match(/WqAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  // 退出到登陆页面
  logOut: function (msg) {
    wq.wqload.wqBackToLogin(JSON.stringify({message: msg || ''})) // eslint-disable-line
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
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* // 文件是否存在
  isExistsFile({
    "fileName": "ss.txt",
    "size": 200
  }，(result) => {
  // 返回{{"isExists":"","filePath":"","fileName":""}，isExists:'0'不存在，'1'存在
  })
  */
  isExistsFile: function (params, callback) {
    wq.wqio.verifyFileHasExist((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* // 附件下载
  downloadFile({
    "id": "id",
    "fileName": "ss.txt",
    "downloadUrl": "http://...",
    "size": 200
  }，(result) => {
  // 返回{{"code":"","filePath":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }) */
  downloadFile: function (params, callback) {
    wq.wqio.downloadFile((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* // 附件打开
  openFile（{
    "filePath": ""
  }，(result) => {
  // 返回{{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function (params, callback) {
    wq.wqio.openFile((result) => { // eslint-disable-line
      if (callback) callback(result)
    }, params ? JSON.stringify(params) : null)
  },
  /* -----------------------------------------------------
    视频播放
    @params {src: '视频地址', title: '标题'}
  ----------------------------------------------------- */
  previewVideo: function (params = {}) {
    if (Device.platformVersion < '6.2.2') {
      BridgeBrowser.showToast('视频播放功能需要升级至6.2.2及以上的客户端', {mask: false})
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
      BridgeBrowser.showToast('视频录制功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoRecord((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.onSuccess) params.onSuccess(res)
      } else {
        if (params.onError) params.onError({code: 'videoRecordFail', msg: '录制失败'})
        else BridgeBrowser.showToast('录制失败', {mask: false})
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
      BridgeBrowser.showToast('视频上传功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoUpload((res) => { // eslint-disable-line
      if (res.result === '1'){
        if (params.onSuccess) params.onSuccess(res)
      } else {
        if (params.onError) params.onError({code: 'videoUploadFail', msg: '上传失败'})
        else BridgeBrowser.showToast('上传失败', {mask: false})
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
      BridgeBrowser.showToast('视频功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqjnc.videoInfo((res) => { // eslint-disable-line
      if (res.result === '1') {
        if (params.onSuccess) params.onSuccess(res)
      } else {
        if (params.onError) params.onError({code: 'videoInfoFail', msg: '未查到此视频信息'})
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
        if (params && params.onSuccess) params.onSuccess(wqRes)
      } else {
        if (params.onError) params.onError({code: 'qrcodeFail', msg: '扫码失败请稍后重试'})
        else BridgeBrowser.showToast('扫码失败请稍后重试', {mask: false})
      }
    })
  },
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
    var appLocation = DB.getCookie('app_location') || ''
    if (appLocation) {
      if (params.onSuccess) params.onSuccess(JSON.parse(appLocation))
      return
    }
    wq.wqlocation.getLocationBackground((res) => { // eslint-disable-line
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
        // 将位置信息存储到cookie中10秒
        DB.setCookie('app_location', JSON.stringify(location) , 10)
        if (params.onSuccess) params.onSuccess(location)
      } else {
        if (params.onError) params.onError({code: 'locationFail', msg: '定位失败,请检查订货365定位权限是否开启'})
        else BridgeBrowser.showToast('定位失败,请检查订货365定位权限是否开启', {mask: false})
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
        if (params.onSuccess) params.onSuccess(location)
      } else {
        if (params.onError) params.onError({code: 'locationFail', msg: '定位失败,请检查外勤365定位权限是否开启'})
        else BridgeBrowser.showToast('定位失败,请检查外勤365定位权限是否开启', {mask: false})
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
      } else if (JSON.stringify(argParams.sizeType) === JSON.stringify(['compressed']) || argParams.sizeType === 'compressed') {
        pwidth = '750'
        params.pwidth = pwidth
      }
    }
    // 格式化count
    var max = 5
    if (argParams && argParams.count) {
      max = argParams.count
      params.max = '' + max
    }
    // viewId | 水印相关: photoType | customerName | submitName | cmLocation | selectItems
    params.viewId = '' + parseInt(Math.random() * 1000, 10)
    if (argParams && argParams.viewId) {
      params.viewId = argParams.viewId;
    }
    wq.wqphoto.getPhoto((result) => { // eslint-disable-line
      if (argParams && argParams.success) {
        // 格式化返回结果[{src:地址, path: base64: name: 文件名}] 为 imgMap{path: {serverId: '', sourceType: ''} }
        var imgMap = {}
        for (var i = 0, item; item = result[i++];) { // eslint-disable-line
          imgMap[item.name] = {
            serverId: '',
            name: item.name,
            sourceType: operation === '0' ? 'camera' : 'album',
            base64: item.path,
            src: item.src
          }
        }
        argParams.success(imgMap)
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
      BridgeBrowser.showToast('请传入上传路径dir后再上传图片', {mask: false})
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      BridgeBrowser.showToast('请传入上传图片列表后再上传图片', {mask: false})
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
    @params {urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
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
    @params {onSuccess: fn}
  ----------------------------------------------------- */
  getContactMore: function (params = {}) { // {selectedIds: 'id,id', aclType: '0只能看到下属 不传或者其他的参数为全部人员,默认为空', onSuccess([{id: '', name: ''}])}
    wq.wqcontact.getContactMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params))
  },
  getContact: function (params = {}) {
    wq.wqcontact.getContact((args) => { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
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
  getCustomerMore: function (params = {}) { // {selectedIds: 'id,id', tradeType: '1客户 2经销商 3门店,默认1', superTradeType: '2经销商,指门店上级经销商默认无', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', onSuccess([{id: '', name: ''}])}
    wq.wqcustomer.getCustomerMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(Object.assign({hiddenAdd: true}, params)));
  },
  getCustomer: function (params = {}) {
    wq.wqcustomer.getCustomer(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(Object.assign({hiddenAdd: true}, params)))
  },
  getCustomerType: function (params = {}) { // {id: 'id', name: 'name', onSuccess({id: '', name: ''})}
    wq.wqcustomer.getCustomerType(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params))
  },
  getCustomerAreaMore: function (params = {}) { // {selectedIds: 'id,id', onSuccess([{id: '', name: ''}])}
    if (Device.platformVersion < '6.2.2') {
      BridgeBrowser.showToast('此功能需要升级至6.2.2及以上的客户端', {mask: false})
      return
    }
    wq.wqcustomer.getCustomerAreaMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params))
  },
  getCustomerArea: function (params = {}) {
    wq.wqcustomer.getCustomerArea(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params))
  },
  /* -----------------------------------------------------
    部门插件
    @params: {selectedIds: '',onSuccess: fn}
  ----------------------------------------------------- */
  getDepartmentMore: function (params = {}) { // {selectedIds: 'id,id', onSuccess([{id: '', name: ''}])}
    wq.wqdepartment.getDepartmentMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params));
  },
  getDepartment: function (params = {}) {
    wq.wqdepartment.getDepartment(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
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
      if (params.onSuccess) params.onSuccess(args)
    }, JSON.stringify(params));
  },
  /* -----------------------------------------------------
    打开新的窗口
    @params {url:'', title: ''}默认为打开一个webview页面
  ----------------------------------------------------- */
  openWindow: function (params, callback) {
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? JSON.stringify(params) : null) // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function () {
    wq.wqload.wqClosePage() // eslint-disable-line
  },
  // 客户端默认返回控制
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') {
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'home') {
      try {
        Bridge.closeWindow()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'confirm') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide();
          window.history.go(-1)
        }
      });
    } else if (isFromApp === 'confirm-close') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide();
          Bridge.closeWindow()
        }
      });
    } else {
      window.history.go(-1)
    }
  },
  // 客户端返回绑定
  addBackPress: function () {
    document.addEventListener('backbutton', this.back, false) // eslint-disable-line
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    document.removeEventListener('backbutton', this.back, false) // eslint-disable-line
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
        BridgeBrowser.showToast(msg)
        return
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1
      Bridge.chooseImage(Object.assign({
        count: count, // 默认5
        sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res) {
          if(params.onChooseSuccess) params.onChooseSuccess(res)
        }
      }, option.chooseOptions))
    }
  }
}

export default Object.assign({}, BridgeBrowser, Bridge)
