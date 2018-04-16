import BridgeBrowser from './bridgeBrowser.js';
import Device from './../device.js';
import DB from './../db.js'

var Bridge = {
  platform: 'dinghuo',
  init: function () {
    DB.setSession('bridge_isready', '1')
    this.registerHandler(['getGoodsByApp', 'getCartGoodsByApp', 'onBackPress', 'setOnlineByApp']);
  },
  /* 获得版本信息 */
  getAppVersion: function () {
    const ua = navigator.userAgent;
    var verExp = ua.match(/DinghuoAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  /* 公共方法，通过桥接调用原生方法公共入口 */
  invoke: function (name, param, callback) {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      this.setup(function(bridge) {
        bridge.callHandler(name, param, function(response) {
          if (callback) {
            try {
              callback(JSON.parse(response))
            } catch (e) {
              callback(response)
            }
          }
        })
      })
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      // 注册分类页面事件
      if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(name, param && JSON.stringify(param), function (response) {
          if (callback) {
            try {
              callback(JSON.parse(response))
            } catch (e) {
              callback(response)
            }
          }
        })
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', () => {
          window.WebViewJavascriptBridge.callHandler(name, param && JSON.stringify(param), function (response) {
            if (callback) {
              try {
                callback(JSON.parse(response))
              } catch (e) {
                callback(response)
              }
            }
          })
        }, false);
      }
    }
  },
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
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
    /* eslint-enable */
  },

  /**
   * 注册事件
   */
  registerHandler: function (events) {
    if (typeof window !== 'undefined') {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
        /* eslint-disable */
        this.setup(function(bridge) {
          events.forEach((eventName) => {
            bridge.registerHandler(eventName, () => {
                const event = new CustomEvent(eventName);
                // 分发事件
                window.dispatchEvent(event);
            })
          });
        })
        /* eslint-enable */
      } else if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
        // 注册分类页面事件
        if (window.WebViewJavascriptBridge) {
          events.forEach((eventName) => {
            window.WebViewJavascriptBridge.registerHandler(eventName, () => {
              const event = new CustomEvent(eventName);
              // 分发事件
              window.dispatchEvent(event);
            });
          });
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady', () => {
              events.forEach((eventName) => {
                window.WebViewJavascriptBridge.registerHandler(eventName, () => {
                  const event = new CustomEvent(eventName);
                  // 分发事件
                  window.dispatchEvent(event);
                });
              });
            }, false);
        }
      }
    }
  },
  /*
  * 判断是否是首页
  * params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  * */
  isHomePage: function (callback) {
    this.invoke('isHomePage', null, function (data) {
      if (data.result.toString() === '1') {
        callback(true)
      } else {
        callback(false)
      }
    });
  },
  /*
  * 商联支付
  * params: {appKey:'', dealerCode:'', orderId:'', payAmount:''}
  * */
  slopenpay: function (params, callback) {
    this.invoke('slopenpay', params, callback)
  },
  /*
  * 打开新的窗口
  * params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  * */
  openWindow: function (params, callback) {
    this.invoke('openWindow', params, callback)
  },
  /* 关闭当前窗 */
  closeWindow: function (callback) {
    this.invoke('closeWindow', null, callback)
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
    this.invoke('isExistsFile', params, callback)
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
    this.invoke('downloadFile', params, callback)
  },
  /* 附件打开
  openFile（{
    "filePath": ""
  }，(result) => {
  // 返回{{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function (params, callback) {
    this.invoke('openFile', params, callback)
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function (params) {
    this.invoke('scanQRCode', null, params.onSuccess)
  },
  /*
   * 获取当前地理位置
   * type：坐标类型，订货365默认使用国测局'gcj02'
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度',address:'地址',country:'国',province:'省',city:'市',area:'区',street:'街道'}
   * */
  getLocation: function (params) {
    const self = this;
    setTimeout(function () {
      self.invoke('getLocation', 'gcj02', params.onSuccess)
    }, 1000);
  },
  /*
  * 获取当前网络状态
  * 返回：{networkType:'返回网络类型2g，3g，4g，wifi'}
  * */
  getNetworkType: function (callback) {
    this.invoke('getNetworkType', null, callback)
  },
  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数'}
  * 返回选定照片的本地ID列表{localIds:[LocalResource://imageid123456789987654321]'}
  */
  chooseImage: function (params) {
    this.invoke('chooseImage', params, params.success);
  },
  /*
  * 上传图片
  * params：{uploadDir:'',localIds:['1', '2']}
  */
  uploadImage: function (params) {
    this.invoke('uploadImage', params);
  },
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
  * 备注：图片url后面带localId为标识为本地，客户端优先从本地查找，本地没有再从网络加载
  */
  previewImage: function (params) {
    this.invoke('previewImage', params);
  },
  /*
    * 监听/取消监听物理返回事件(仅android)
    * flag（true：监听，false：取消监听）
    */
  setBackEnable: function (flag) {
    if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      this.invoke('setBackEnable', flag);
    }
  },
  /*
  * 获取图片前缀
  * */
  getImagePrefix: function () {
    return 'LocalResource://imageid';
  },
  /*
  * 下载图片
  */
  downloadImage: function () {

  },
  /* 分享给朋友 */
  onMenuShareAppMessage: function () {

  },
  /* 分享到朋友圈 */
  onMenuShareTimeline: function () {

  },
  /* 退出到登陆页面 */
  logOut: function () {
    this.invoke('logOut');
  },
  /* 获取登陆信息 */
  loginInfo: function (callback) {
    this.invoke('getLoginInfo', null, callback);
  },
  /* 根据key获取登陆信息 */
  getLoginInfo (key, callback) {
    this.loginInfo(function (result) {
      callback(result[key])
    })
  },
  /* 获取系统参数 */
  systemParameter (callback) {
    this.invoke('getSystemParameter', null, callback)
  },
  /* 修改原生角标 */
  changeBadgeNum: function (count) {
    this.invoke('setBadgeNum', {key: count});
  },
  /* 去首页 */
  goHome: function (callback) {
    this.invoke('goHome', null, callback)
  },
  /* 返回按键处理 */
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp') || '';
    if (isFromApp === '1') {
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === '2') {
      try {
        Bridge.goHome();
      } catch (error) {
        console.log(error);
      }
    } else {
      history.go(-1);
    }
  },
  /* 客户端添加返回绑定 */
  addBackPress: function () {
    try {
      this.setBackEnable(true);
      window.addEventListener('onBackPress', this.back);
    } catch (error) {
      console.log(error);
    }
  },
  /* 客户端移除返回绑定 */
  removeBackPress: function () {
    try {
      this.setBackEnable(false);
      window.removeEventListener('onBackPress', this.back);
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
