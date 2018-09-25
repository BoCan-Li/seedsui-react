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
  /*
  * 打开新的窗口
  * params: {url:'', title: ''}默认为打开一个webview页面
  * */
  openWindow: function (params, callback) {
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? JSON.stringify(params) : null) // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function () {
    wq.wqload.wqClosePage() // eslint-disable-line
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
  * 文件操作
  * */
  /* 文件是否存在
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
  /* 附件下载
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
  /* 附件打开
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
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params = {}) {
    wq.wqhardware.getQrCode((res) => { // eslint-disable-line
      if (res && res.qrCode) {
        var wqRes = res
        wqRes.resultStr = res.qrCode
        if (params && params.onSuccess) params.onSuccess(wqRes)
      } else {
        if (params.onError) params.onError({code: 'qrcodeFail', msg: '扫码失败请稍后重试'})
      }
    })
  },
  /*
   * 获取当前地理位置
   * 外勤365默认使用国测局'gcj02'定位,没有参数控制
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度',address:'地址',country:'国',province:'省',city:'市',area:'区',street:'街道'}
   * */
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
      }
    }, JSON.stringify({locationType: '1'})) // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
  },
  /*
   * 获取当前位置名称
   * params：{type: 'gcj02', longitude: 'xx', latitude: 'xx', onSuccess: (), onError: ()}
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度'}
   * */
  getAddress: function (params = {}) {
    // 先从cookie中读取位置信息
    var appLocation = DB.getCookie('app_location') || ''
    if (appLocation) {
      if (params.onSuccess) params.onSuccess(JSON.parse(appLocation))
      return
    }
    if (params.onError) params.onError({code: 'addressFail', msg: '获取位置名称失败,请稍后重试'})
    else alert('获取位置名称失败,请稍后重试')
  },
  /*
  * 拍照、本地选图
  * params：{sourceType:['album', 'camera'],sizeType:['original', 'compressed'],count:'最大张数', success:fn, fail:fn, photoType:'', customerName: ''}
  * 返回选定照片的本地ID列表{localIds:[LocalResource://imageid123456789987654321]'}
  */
  chooseImage: function (argParams) {
    var params = {}
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
      if (argParams.sizeType === 'compressed') {
        pwidth = '750'
        params.operation = pwidth
      }
    }
    // 格式化count
    var max = 5
    if (argParams && argParams.count) {
      max = argParams.count
      params.max = '' + max
    }
    // viewId
    params.viewId = '' + parseInt(Math.random() * 1000, 10)
    // photoType
    if (argParams && argParams.photoType) {
      params.photoType = argParams.photoType;
    }
    // customerName
    if (argParams && argParams.customerName) {
      params.customerName = argParams.customerName;
    }
    // submitName
    if (argParams && argParams.submitName) {
      params.submitName = argParams.submitName;
    }
    // cmLocation
    if (argParams && argParams.cmLocation) {
      params.cmLocation = argParams.cmLocation;
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
  /*
  * 上传图片
  * params：{dir:'上传路径',localIds:['图片集合'], tenantId: '企业Id'}
  */
  uploadImage: function (params = {}) {
    if (!params.dir) {
      BridgeBrowser.showToast('请传入上传路径dir后再上传图片')
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      BridgeBrowser.showToast('请传入上传图片列表后再上传图片')
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
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
  * 备注：图片url后面带localId为标识为本地，客户端优先从本地查找，本地没有再从网络加载
  */
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
  // 退出到登陆页面
  logOut: function (msg) {
    wq.wqload.wqBackToLogin(JSON.stringify({message: msg || ''})) // eslint-disable-line
  },
  /**
   * 人员插件
   * params: {onSuccess: fn}
   */
  getContactMore: function (params = {}) {
    wq.wqcontact.getContactMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, '{"selectedIds":"' + (params.selectedIds || '') + '","aclType":"' + (params.aclType || '') + '"}') // aclType:人员权限（0：只能看到下属;不传或者其他的参数为全部人员）
  },
  getContact: function (params = {}) {
    wq.wqcontact.getContact((args) => { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, '{"id":"' + (params.id || '') + '","aclType":"' + (params.aclType || '') + '"}')
  },
  /**
   * 客户插件
   * params: {tradeType: 1:客户 2:经销商 3:门店 空串:全部; 默认为空串, selectedIds: '', onSuccess: fn}
   */
  getCustomerMore: function (params = {}) {
    wq.wqcustomer.getCustomerMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, '{"selectedIds":"' + (params.selectedIds || '') + '","tradeType":"' + (params.tradeType || '') + '","hiddenAdd":' + (params.hiddenAdd || true) + '}');
  },
  getCustomer: function (params = {}) {
    wq.wqcustomer.getCustomer(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    },'{"id":"' + (params.id || '') + '","name":"' + (params.name || '') + '","tradeType":"' + (params.tradeType || '') + '","hiddenAdd":' + (params.hiddenAdd || true) + '}')
  },
  getCustomerType: function (params = {}) {
    wq.wqcustomer.getCustomerType(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    },'{"id":"' + (params.id || '') + '","name":"' + (params.name || '') + '","tradeType":"' + (params.tradeType || '') + '"}')
  },
  getCustomerArea: function (params = {}) {
    wq.wqcustomer.getCustomerArea(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    },'{"id":"' + (params.id || '') + '","name":"' + (params.name || '') + '"}')
  },
  /**
   * 部门插件
   * params: {selectedIds: '',onSuccess: fn}
   */
  getDepartmentMore: function (params = {}) {
    wq.wqdepartment.getDepartmentMore(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    }, '{"selectedIds":"' + (params.selectedIds || '') + '"}');
  },
  getDepartment: function (params = {}) {
    wq.wqdepartment.getDepartment(function (args) { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args)
    },'{"id":"' + (params.id || '') + '","name":"' + (params.name || '') + '"}')
  },
  // 客户端默认返回控制
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') {
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'home') {
      try {
        Bridge.closeWindow()
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'confirm') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide();
          window.history.go(-1);
        }
      });
    } else if (isFromApp === 'confirm-close') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide();
          Bridge.closeWindow();
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
        watermark: args.watermark || {}
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
      }, option.watermark))
    }
  }
}

export default Object.assign({}, BridgeBrowser, Bridge)
