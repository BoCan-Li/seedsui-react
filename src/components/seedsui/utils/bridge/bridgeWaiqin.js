import BridgeBrowser from './bridgeBrowser.js';
import Device from './../device.js';
import DB from './../db.js';

var Bridge = {
  platform: 'waiqin',
  init: function () {
    var wqScript = document.createElement('script')
    wqScript.src = '//res.waiqin365.com/d/common_mobile/component/cordova/cordova.js'
    document.body.appendChild(wqScript)
    document.addEventListener('deviceready', function () {
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
  * params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  * */
  openWindow: function (params) {
    wq.wqload.wqOpenUrl(null, null, params) // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function () {
    wq.wqload.wqClosePage() // eslint-disable-line
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
    }, params)
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
    }, params)
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
    }, params)
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params) {
    wq.wqhardware.getQrCode((result) => { // eslint-disable-line
      if (params && params.onSuccess) params.onSuccess(result)
    })
  },
  /*
   * 获取当前地理位置
   * type：坐标类型，订货365默认使用国测局'gcj02'
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度',address:'地址',country:'国',province:'省',city:'市',area:'区',street:'街道'}
   * */
  getLocation: function (params) {
    wq.wqlocation.getLocationBackground((result) => { // eslint-disable-line
      if (params && params.onSuccess) {
        // 格式化为标准的返回信息
        var location = {
          latitude: result.wqLatitude,
          longitude: result.wqLongitude,
          speed: null,
          accuracy: result.radius,
          address: result.wqAddress,
          country: '中国',
          province: result.province,
          city: result.city,
          area: result.district,
          street: result.street
        }
        params.onSuccess(location)
      }
    }, params)
  },
  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数'}
  * 返回选定照片的本地ID列表{localIds:[LocalResource://imageid123456789987654321]'}
  */
  chooseImage: function (argParams) {
    // 格式化sourceType
    var operation = 2
    if (argParams && argParams.sourceType) {
      if (argParams.sourceType.indexOf('album') >= 0 && argParams.sourceType.indexOf('camera') >= 0) {
        operation = 2
      } else if (argParams.sourceType.indexOf('album') >= 0) {
        operation = 1
      } else {
        operation = 0
      }
    }
    // 格式化sizeType
    var pwidth = null
    if (argParams && argParams.sizeType) {
      if (argParams.sizeType === 'compressed') {
        pwidth = 750
      }
    }
    // 格式化count
    var max = 5
    if (argParams && argParams.count) {
      max = argParams.count
    }
    var params = {
      operation: operation, // 0.拍照；1.相册 2.拍照/相册
      pwidth: pwidth, // 照片宽度
      max: max // 拍照最大张数
    }
    wq.wqphoto.getPhoto((result) => { // eslint-disable-line
      if (argParams && argParams.success) {
        // 格式化返回结果
        var localIds = result.map((item) => {
          return item.src
        })
        argParams.success({localIds: localIds})
      }
    }, params)
  },
  /*
  * 上传图片
  * params：{uploadDir:'',localIds:['1', '2']}
  */
  uploadImage: function (argParams) {
    // 格式化localIds
    var filePathList = []
    if (argParams && argParams.localIds && argParams.localIds.length) {
      filePathList = argParams.localIds.map((item) => {
        return {path: item}
      })
    }
    // 格式化uploadDir
    var url = argParams && argParams.uploadDir ? argParams.uploadDir : ''
    var params = {
      filePathList: filePathList,
      url: url
    }
    wq.wqphoto.startUpload(params) // eslint-disable-line
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
        return {path: item}
      })
    }
    var params = {
      position: position,
      photos: photos
    }
    wq.wqphoto.photoPreview(params) // eslint-disable-line
  },
  /*
  * 获取图片前缀
  * */
  getImagePrefix: function () {
    return 'LocalResource://imageid'
  },
  // 退出到登陆页面
  logOut: function (msg) {
    wq.wqload.wqBackToLogin({message: msg || ''}) // eslint-disable-line
  },
  // 返回按键处理
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp') || '';
    if (isFromApp === '1') {
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else {
      history.go(-1);
    }
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
    try {
      // success, fail, params
      wq.wqtitlebar.setTitleBar(this.back, null, {backCustom: true}) // eslint-disable-line
    } catch (error) {
      console.log(error);
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    try {
      wq.wqtitlebar.setTitleBar(null, null, {backCustom: false}) // eslint-disable-line
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * 获取带前缀的图片
   */
  getPreviewImages: function (imgIds) {
    return imgIds.map((imgId) => {
      return 'LocalResource://imageid' + imgId
    })
  },
  getPreviewImage: function (imgId) {
    return 'LocalResource://imageid' + imgId
  },
  // 获取上传图片路径
  getUploadDir: function (params) {
    if (params.customPath) return params.path
    let path = params.path || 'test/test01'
    const month = new Date().format('yyyyMM')
    if (params.monthPath !== false) {
      path += '/' + month
    }
    return `${path}/`;
  },
  // 获取图片全路径, 一般用于表单提交
  getFormImgsStr: function (params) {
    const imgs = params.imgIds.map((imgId) => {
      return this.getUploadDir(params) + imgId;
    });
    return imgs.join(',');
  },
  // 离线上传, 不需要带企业id
  offlineUpload: function (params) {
    const uploadDir = this.getUploadDir(params);
    const uploadParams = {uploadDir, localIds: params.imgIds};
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
        // orderNo: 'xx', // 编号
        // submitName: 'xx', // 提交人
        // customerName: 'xx', // 客户
        // cmLocation: '118.730515, 31.982473', // 位置算偏差
        // isWaterMark: '1', // 是否启用水印
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
    s.imgMap = {} // 格式{'localIdxxx':{serverId:'xxx',sourceType:'camera'}}
    // 更新图片, 用于初始化时显示后台返回的图片
    s.updateImgs = function (imgs) {
      if (imgs && imgs.length > 0) {
        s.imgs = imgs
      } else if (s.params.imgs && s.params.imgs.length > 0) {
        s.imgs = s.params.imgs
      }
      if (s.imgs.length > 0) s.imgs.forEach(function (item) {
        s.imgMap[item] = {serverId: '', sourceType: 'web'}
      })
    }
    s.updateImgs()
    // 根据watermark.location判断拍照前是否先定位, 再选照片
    s.locationChoose = function () {
      s.choose()
    }
    // 选择照片
    s.choose = function () {
      var msg = ''
      var count = s.params.max - s.imgs.length
      if (count <= 0) {
        msg = '最多只能传' + s.params.max + '张照片'
        if (s.params.onError) {
          s.params.onError({code: '000521', msg: msg})
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
          for(var i=0, localId; localId=res.localIds[i++];){ // eslint-disable-line
            if(s.imgMap[localId]){
              msg = '照片已存在，请勿重复上传！'
              if (s.params.onError) {
                s.params.onError({code: '10060', msg: msg})
              } else {
                alert(msg)
              }
              continue
            }
            s.imgMap[localId]={
              serverId:'',
              sourceType:res.sourceType
            }
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
      var imgs = []
      for (var img in s.imgMap) {
        if (s.imgMap[img].sourceType !== 'web') {
          imgs.push(Bridge.getPreviewImage(img))
        } else {
          imgs.push(img)
        }
      }
      Bridge.previewImage({
        urls: imgs,
        current: imgs[index] || imgs[0],
        index: index || 0
      })
    }
  }
}

export default Object.assign({}, BridgeBrowser, Bridge)
