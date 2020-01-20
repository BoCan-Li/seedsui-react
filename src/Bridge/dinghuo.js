import DB from './../DB'
import Device from './../Device'
import getLocaleValue from './../ConfigProvider/getLocaleValue.js'

var Bridge = {
  /**
   * 定制功能
   */
  platform: 'dinghuo',
  config: function () {
    var self = this
    // 返回物理按键绑定
    self.addBackPress()
    self.registerHandler(['getGoodsByApp', 'getCartGoodsByApp', 'onBackPress', 'setOnlineByApp'])
  },
  // 公共方法，通过桥接调用原生方法公共入口
  invoke: function (name, param, callback) {
    var self = this
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      self.setup(function(bridge) {
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

  // 注册事件
  registerHandler: function (events) {
    var self = this
    if (typeof window !== 'undefined') {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { /* 判断iPhone|iPad|iPod|iOS */
        /* eslint-disable */
        self.setup(function(bridge) {
          events.forEach((eventName) => {
            bridge.registerHandler(eventName, () => {
                const event = new CustomEvent(eventName);
                // 分发事件
                window.dispatchEvent(event);
            })
          })
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
            })
          })
        } else {
          document.addEventListener(
            'WebViewJavascriptBridgeReady', () => {
              events.forEach((eventName) => {
                window.WebViewJavascriptBridge.registerHandler(eventName, () => {
                  const event = new CustomEvent(eventName)
                  // 分发事件
                  window.dispatchEvent(event)
                })
              })
            }, false)
        }
      }
    }
  },
  // 判断是否是主页
  isHomePage: function (callback) {
    var self = this
    self.invoke('isHomePage', null, function (data) {
      if (data.result.toString() === '1') {
        callback(true)
      } else {
        callback(false)
      }
    });
  },
  // 获得版本信息
  getAppVersion: function () {
    const ua = navigator.userAgent.toLowerCase();
    var verExp = ua.match(/dinghuoappversion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  // 去首页
  goHome: function (callback) {
    var self = this
    self.invoke('goHome', null, callback)
  },
  // 退出到登陆页面
  logOut: function () {
    var self = this
    self.invoke('logOut');
  },
  // 打开新的窗口
  openWindow: function (params, callback) {
    var self = this
    self.invoke('openWindow', params, callback)
  },
  // 关闭当前窗
  closeWindow: function (callback) {
    var self = this
    self.invoke('closeWindow', null, callback)
  },
  /**
    * 修改原生标题
    * @param {Object} params {title: '自定义标题', visiable: '0' 隐藏  '1' 展示, left: { show: false 隐藏返回按钮 true 显示返回按钮}}
    * @param {Function} callback 回调
    */
  setTitle: function (params, callback) {
    var self = this
    self.invoke('setTitle', params, callback);
  },
  // 客户端添加返回绑定
  addBackPress: function (callback) {
    var self = this
    try {
      self.setBackEnable(true);
      window.addEventListener('onBackPress', callback || self.back);
      // ios客户端返回按钮绑定(ios不支持onBackPress)
      self.addIosBackPress(callback)
    } catch (error) {
      console.log(error);
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function (callback) {
    var self = this
    try {
      self.setBackEnable(false);
      window.removeEventListener('onBackPress', callback || self.back);
    } catch (error) {
      console.log(error);
    }
  },
  /**
    * 支付宝支付
    * @param {Object} params {orderInfo: ''}
    * @param {Function} callback
    * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
    */
  alipay: function (params, callback) {
    var self = this
    self.invoke('alipay', params, callback)
  },
  /**
    * 商联支付
    * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
    * @param {Function} callback 回调
    */
  slopenpay: function (params, callback) {
    var self = this
    self.invoke('slopenpay', params, callback)
  },
  /**
    * 大华捷通支付
    * @param {Object} params {payChannel:'UPPay 云闪付  WXPay微信支付 AliPay 支付宝支付', payData:'服务端获取'}
    * @param {Function} callback 回调
    */
  qmfpay: function (params, callback) {
    var self = this
    // resultCode:
    // 0000 支付请求发送成功,商户订单是否成功支付应该以商户后台收到支付结果
    // 1000 用户取消支付
    // 1001 参数错误
    // 1002 网络连接错误
    // 1003 支付客户端未安装
    // 2001 订单处理中，支付结果未知(有可能已经支付成功)，请通过后台接口查询订单状态
    // 2002 订单号重复
    // 2003 订单支付失败
    // 9999 其他支付错误
    // 5004 版本过低
    if (Device.compareVersion(Device.platformVersion, '2.3.6') < 0) {
      callback({resultCode:'5004',resultInfo:'{"resultMsg":"请安装2.3.6以上版本"}'})
      return
    }
    self.invoke('qmfpay', params, callback)
  },
  /**
    * ios绑定左上角返回按钮
    * @param {Object} params {title: '自定义标题'}
    * @param {Function} callback 回调
    */
  onHistoryBack: function (callback) {
    var self = this
    self.invoke('onHistoryBack', null, callback);
  },
  // ios客户端返回按钮绑定, ios不支持addBackPress
  addIosBackPress: function (callback) {
    var self = this
    self.onHistoryBack(() => {
      if (callback) callback()
      else if (self.back) self.back()
      self.addIosBackPress(callback)
    })
  },
  /**
    * 分享文本
    * @param {Object} params
    * {
    * title: '标题(仅ios支持)',
    * desc: '副标题(仅ios支持)',
    * link: '链接(仅ios支持)',
    * text: '文本(安卓只支持发送文本)',
    * }
    * @param {Function} callback 回调
    */
  shareText: function (params, callback) {
    var self = this
    self.invoke('shareText', params, callback);
  },
  /**
    * 获取订货包名
    * @param {Function} callback({result: 'cn.com.wq.ordergoods'}), ios包名cn.com.wq.ordergoods, andriod包名com.waiqin365.dhcloud
    */
  getIdentification: function (callback) {
    var self = this
    if (Device.compareVersion(Device.platformVersion, '2.3.6') < 0) {
      callback({})
      return
    }
    self.invoke('getIdentification', null, callback);
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* 文件是否存在
  isExistsFile({
    "fileName": "ss.txt",
    "size": 200
  }, (result) => {
  // 返回格式 {{"isExists":"","filePath":"","fileName":""}，isExists:'0'不存在，'1'存在
  })
  */
  isExistsFile: function (params, callback) {
    var self = this
    self.invoke('isExistsFile', params, callback)
  },
  /* 附件下载
  downloadFile({
    "id": "id",
    "fileName": "ss.txt",
    "downloadUrl": "http://...",
    "size": 200
  }, (result) => {
  // 返回格式 {{"code":"","filePath":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }) */
  downloadFile: function (params, callback) {
    var self = this
    self.invoke('downloadFile', params, callback)
  },
  /* 附件打开
  openFile（{
    "filePath": ""
  }, (result) => {
  // 返回格式 {{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function (params, callback) {
    var self = this
    self.invoke('openFile', params, callback)
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params) {
    var self = this
    self.invoke('scanQRCode', null, params.success)
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
    self.invoke('getLocation', 'gcj02', (res) => {
      self.locating = false
      if (res && res.latitude) {
        // 将位置信息存储到cookie中60秒
        if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'getLocation:定位失败,请检查订货365定位权限是否开启'})
        else self.showToast('定位失败,请检查订货365定位权限是否开启', {mask: false})
      }
    })
  },
  /* -----------------------------------------------------
    获取当前网络状态
    @return {networkType:'返回网络类型2g，3g，4g，wifi'}
  ----------------------------------------------------- */
  getNetworkType: function (callback) {
    var self = this
    self.invoke('getNetworkType', null, callback)
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
    * sourceType:['album:相册', 'camera:拍照'],
    * sizeType:['original:原图', 'compressed:压缩'],
    * count:'最大张数',
    * success({localIds:['LocalResource://imageid'+id]})
    * }
    */
  chooseImage: function (params) {
    var self = this
    self.invoke('chooseImage', params, function (res) {
      res.localIds = res.localIds.map(function (id) {
        return 'LocalResource://imageid' + id
      })
      if (params.success) params.success(res)
    })
  },
  /**
    * 拍照、本地选图
    * @param {Object} params
    * {
    * dir:'目录/年月',
    * localIds:['LocalResource://imageid' + id],
    * tenantId: 'ios必传'
    * }
    */
  uploadImage: function (params = {}) {
    var self = this
    if (!params.dir) {
      self.showToast(getLocaleValue('hint_upload_image_must_dir') || '没有上传目录', {mask: false})
      return
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      self.showToast(getLocaleValue('hint_upload_image_must_localIds') || '没有上传图片地址', {mask: false})
      return
    }
    if (!params.tenantId) {
      self.showToast(getLocaleValue('hint_upload_image_must_tenantId') || '没有上传企业id', {mask: false})
      return
    }
    // 上传不能包含'LocalResource://imageid'
    params.localIds = params.localIds.map(function (localId) {
      return localId.replace(new RegExp('LocalResource://imageid'), '')
    })
    // 格式化params
    var uploadParams = {
      localIds: params.localIds,
      uploadDir: params.dir
    }
    if (params.tenantId) uploadParams.tenantId = params.tenantId
    if (params.isAI) uploadParams.isAI = params.isAI
    self.invoke('uploadImage', uploadParams);
  },
  /**
    * 图片预览
    * @param {Object} params
    * {
    * urls:['本地照片需要加上LocalResource://imageid'],
    * current:'当前显示图片地址',
    * index:'当前显示图片索引'
    * }
    */
  previewImage: function (params) {
    var self = this
    if (!params.urls || !params.urls.length) {
      self.showToast(getLocaleValue('hint_preview_image_must_urls') || '没有预览图片地址', {mask: false})
      return
    }
    self.invoke('previewImage', params)
  },
  /* -----------------------------------------------------
    监听/取消监听物理返回事件(仅android)
    @params true:监听 | false:取消监听
  ----------------------------------------------------- */
  setBackEnable: function (flag) {
    var self = this
    if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      self.invoke('setBackEnable', flag);
    }
  },
  // 获取图片前缀
  getImagePrefix: function () {
    return 'LocalResource://imageid';
  },
  // 下载图片
  downloadImage: function () {

  },
  // 分享给朋友
  onMenuShareAppMessage: function () {

  },
  // 分享到朋友圈
  onMenuShareTimeline: function () {

  },
  // 获取登陆信息
  loginInfo: function (callback) {
    var self = this
    self.invoke('getLoginInfo', null, callback);
  },
  // 根据key获取登陆信息
  getLoginInfo (key, callback) {
    var self = this
    self.loginInfo(function (result) {
      callback(result[key])
    })
  },
  // 获取系统参数
  systemParameter (callback) {
    var self = this
    self.invoke('getSystemParameter', null, callback)
  },
  // 修改原生角标
  changeBadgeNum: function (count) {
    var self = this
    self.invoke('setBadgeNum', {key: count});
  }
}

export default Bridge
