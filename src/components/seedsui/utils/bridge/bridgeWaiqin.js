import BridgeBrowser from './bridgeBrowser.js';
import Device from './../device.js';
import DB from './../db.js';

var Bridge = {
  platform: 'waiqin',
  config: function () {
    var self = this
    document.addEventListener('deviceready', function () {
      DB.setSession('bridge_isready', '1')
      self.back()
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
  openWindow: function (params) {
    wq.wqload.wqOpenUrl(null, null, params ? JSON.stringify(params) : null) // eslint-disable-line
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
  scanQRCode: function (params) {
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
  getLocation: function (params) {
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
  getAddress: function (params) {
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
    console.log('选择照片');
    console.log(params);
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
  * params：{uploadDir:'上传路径',localIds:['图片集合'], tenantId: '企业Id'}
  */
  uploadImage: function (argParams) {
    // 格式化localIds
    var filePathList = argParams.localIds
    if (argParams && argParams.localIds && argParams.localIds.length) {
      filePathList = argParams.localIds.map((item) => {
        return {path: item}
      })
    }
    // 格式化uploadDir
    var url = argParams && argParams.uploadDir ? argParams.uploadDir : ''
    var params = {
      filePathList: filePathList,
      url: url,
      tenantId: argParams.tenantId || ''
    }
    console.log('上传图片:');
    console.log(params);
    wq.wqphoto.startUpload(JSON.stringify(params)) // eslint-disable-line
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
  // logOut: function (msg) {
  //   wq.wqload.wqBackToLogin({message: msg || ''}) // eslint-disable-line
  // },
  // 返回按键处理,外勤的特性限制只能在history为底层时才生效
  back: function () {
    document.addEventListener('deviceready', function () {
      wq.wqtitlebar.setTitleBar(function (args) { // eslint-disable-line
        var isFromApp = Device.getUrlParameter('isFromApp') || ''
        if (isFromApp === '1' || !window.history.state) {
          var jsonStr = JSON.stringify({ message: '确定离开当前页面吗？', twoButton: '1', buttonList: [{ btn_name: '确定', button_id: 'ok' }, { btn_name: '取消', button_id: 'cancle' }] })
          if(window.confirm(jsonStr)){
            Bridge.closeWindow()
          }
        } else {
          window.history.go(-1)
        }
        Bridge.back()
      }, null, JSON.stringify({backCustom: true}))
    });
  },
  /**
   * 获取客户信息
   * params: {aclType: '0', onSuccess: fn(name, id)}
   */
  getContact: function (params) {
    wq.wqcontact.getContact((args) => { // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, { aclType: params.aclType || '0' });
  },
  // 客户端添加返回绑定
  addBackPress: function () {
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
  },
  /*
    * 离线上传, 可不带企业id
    * dir: '目录', imgIds: '图片名称集合', tenantId: '企业id,不传客户端会自己拼上,如果传的话客户端就使用传入的'
    */
  offlineUpload: function (dir, imgIds, tenantId) {
    const uploadParams = {uploadDir: dir, localIds: imgIds, tenantId: tenantId || '' };
    this.uploadImage(uploadParams);
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    max: 5,
    sourceType: ['album', 'camera'],
    sizeType: ['original', 'compressed']
    onChooseSuccess: function (imgs, imgMap) {},
    onChooseFail: function (imgs, imgMap) {},
    onUploadsSuccess: function (imgs, imgMap) {},
    onDeleteSuccess: function (imgs, imgMap) {}
  })
  */
  Image: function (params) {
    var defaults = {
      imgs: [],
      max: 5,
      safeUpload: false, // 安全上传,第次只能传一张
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      watermark: {
        // photoType: 'xx', // 水印名称
        // customerName: 'xx', // 客户名
      }
      /*
      Callbacks:
      onChooseSuccess:function(imgs,imgMap,res) // 选择成功
      onChooseFail:function(imgs,imgMap,res) // 选择失败
      onChooseCancel:function() // 取消选择
      onUploadSuccess:function(imgs,imgMap,res) // 单张上传成功
      onUploadFail:function(imgs,imgMap,res) // 单张上传失败
      onUploadsSuccess:function(imgs,imgMap) // 全部上传成功
      onDeleteSuccess:function(imgs,imgMap,key) // 全部删除成功
      */
    }
    params = params || {}
    for (var def in defaults) {
      if (!params[def]) {
        params[def] = defaults[def]
      }
    }
    var s = this
    s.params = params
    s.imgs = []
    s.imgMap = {} // 格式{'localIdxxx':{serverId:'', sourceType:'camera'}}
    // 更新图片, 用于初始化时显示后台返回的图片
    s.updateImgs = function (imgs) {
      if (imgs && imgs.length > 0) {
        s.imgs = imgs
      } else if (s.params.imgs && s.params.imgs.length > 0) {
        s.imgs = s.params.imgs
      }
      s.imgMap = {}
      if (s.imgs.length > 0) s.imgs.forEach(function (item) {
        s.imgMap[item] = {serverId: '', sourceType: 'web', src: item}
      })
    }
    s.updateImgs()
    // 选择照片
    s.choose = function () {
      var msg = ''
      var count = s.params.max - s.imgs.length
      if (count <= 0) {
        msg = '最多只能传' + s.params.max + '张照片'
        if (s.params.onError) {
          s.params.onError({code: 'limit', msg: msg})
        } else {
          alert(msg)
        }
        return
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (s.params.safeUpload) count = 1

      Bridge.chooseImage(Object.assign({
        count: count, // 默认5
        sizeType: s.params.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: s.params.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res) {
          for (var img in res) {
            s.imgMap[img] = res[img]
          }
          s.imgs = Object.keys(s.imgMap)
          if(s.params.onChooseSuccess) s.params.onChooseSuccess(s.imgs, s.imgMap, res)
        }
      }, s.params.watermark))
    }
    s.deleteImg = function (key) {
      delete s.imgMap[key]
      s.imgs = Object.keys(s.imgMap)
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap, key)
    }
    s.deleteAfter = function (index) {
      for (var i = index, img; s.imgs[i++];) {
        delete s.imgMap[img]
      }
      s.imgs = Object.keys(s.imgMap)
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap)
    }
    s.destory = function () {
      s.imgMap = {}
      s.imgs = []
      if (s.params.onDeleteSuccess) s.params.onDeleteSuccess(s.imgs, s.imgMap)
    }
    s.upload = function () {
    }
    // 图片预览
    s.preview = function (index) {
      Bridge.previewImage({
        urls: s.imgs,
        current: s.imgs[index] || s.imgs[0],
        index: index || 0
      })
    }
  }
}

export default Object.assign({}, BridgeBrowser, Bridge)
