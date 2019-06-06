import jsonp from './../jsonp';
import DB from './../DB';
import Device from './../Device';
import EventUtil from './../EventUtil';
import Toast from './../Toast/instance.js';
import Alert from './../Alert/instance.js';
import Loading from './../Loading/instance.js';

var Bridge = {
  /**
  * 基础功能:start
  */
  debug: false,
  // 打印日志, 参数: el绑定点击5次的元素, log日志文字, 结果：显示日志信息
  logger: function (el) {
    // 监听触发的元素,点击十次显示
    var subscribeEl = el || document.body
    // 日志盒子
    var logBox = document.createElement('div')
    logBox.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(0, 0, 0, 0.85);color:white;')
    
    var logClose = document.createElement('div')
    logClose.setAttribute('style', 'height:44px;line-height:44px;text-align:center;background:rgba(200,50,50,1);')
    logClose.innerHTML = '关闭'
    logClose.addEventListener('click', function () {
      document.body.removeChild(logBox)
    }, false)
    var logContent = document.createElement('div')
    logContent.setAttribute('style', 'position:absolute;top:44px;left:0;right:0;bottom:0;padding:10px;overflow:auto;')
    logBox.appendChild(logClose)
    logBox.appendChild(logContent)
    logBox.addEventListener('click', stopPropagationHandler, false)
    function stopPropagationHandler(e) {
      e.stopPropagation()
    }
    if (subscribeEl.getAttribute('data-multipleclick')) return;
    EventUtil.addHandler(subscribeEl, 'multipleclick', function() {
      logContent.innerHTML = DB.getSession('app_logger') || '无日志'
      document.body.appendChild(logBox)
    })
    subscribeEl.setAttribute('data-multipleclick', '1')
  },
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
        Bridge.goHome();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'confirm') {
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: (e) => {
          e.hide()
          window.history.go(-1)
        }
      });
    } else if (isFromApp === 'confirm-close') {
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: (e) => {
          e.hide()
          Bridge.closeWindow()
        }
      });
    } else {
      window.history.go(-1)
    }
    // 更新系统参数, 订货客户端需要不断更新系统参数
    if (Bridge.updateSystemParameter) Bridge.updateSystemParameter()
  },
  // 判断是否是主页
  isHomePage: function (callback) {
    this.invoke('isHomePage', null, function (data) {
      if (data.result.toString() === '1') {
        callback(true)
      } else {
        callback(false)
      }
    });
  },
  // 获得版本信息
  getAppVersion: function () {
    const ua = navigator.userAgent;
    var verExp = ua.match(/DinghuoAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  /**
   * 基础功能:end
   */
 
  /**
   * 定制功能
   */
  platform: 'dinghuo',
  config: function () {
    // 更新系统参数
    this.updateSystemParameter()
    // 返回物理按键绑定
    this.addBackPress()
    DB.setSession('bridge_isready', '1')
    this.registerHandler(['getGoodsByApp', 'getCartGoodsByApp', 'onBackPress', 'setOnlineByApp'])
  },
  // 公共方法，通过桥接调用原生方法公共入口
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

  // 注册事件
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
  /* -----------------------------------------------------
    商联支付
    @params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
  ----------------------------------------------------- */
  slopenpay: function (params, callback) {
    this.invoke('slopenpay', params, callback)
  },
  /**
    * 支付宝支付
    * @param {Object} params
    * @param {Function} callback
    * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
    */
  alipay: function (params, callback) {
    this.invoke('alipay', params, callback)
  },
  /* -----------------------------------------------------
    打开新的窗口
    @params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  ----------------------------------------------------- */
  openWindow: function (params, callback) {
    this.invoke('openWindow', params, callback)
  },
  // 关闭当前窗
  closeWindow: function (callback) {
    this.invoke('closeWindow', null, callback)
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
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
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params) {
    this.invoke('scanQRCode', null, params.success)
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
    this.invoke('getLocation', 'gcj02', (res) => {
      this.locating = false
      if (res && res.latitude) {
        // 将位置信息存储到cookie中60秒
        if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
        if (params.success) params.success(res)
      } else {
        if (params.fail) params.fail({errMsg: 'getLocation:定位失败,请检查订货365定位权限是否开启'})
        else Bridge.showToast('定位失败,请检查订货365定位权限是否开启', {mask: false})
      }
    })
  },
  /* -----------------------------------------------------
    获取当前网络状态
    @return {networkType:'返回网络类型2g，3g，4g，wifi'}
  ----------------------------------------------------- */
  getNetworkType: function (callback) {
    this.invoke('getNetworkType', null, callback)
  },
  /* -----------------------------------------------------
    拍照、本地选图
    @params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数'}
    @return 选定照片的本地ID列表{localIds:[id,id,id]'}, src需要增加前缀'LocalResource://imageid'+id才能显示
  ----------------------------------------------------- */
  chooseImage: function (params) {
    this.invoke('chooseImage', params, params.success);
  },
  /* -----------------------------------------------------
    上传图片
    @params {dir:'',localIds:['localId', 'localId'], tenantId: ''}
  ----------------------------------------------------- */
  uploadImage: function (params = {}) {
    if (!params.dir) {
      Bridge.showToast('请传入上传路径dir后再上传图片')
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      Bridge.showToast('请传入上传图片列表后再上传图片')
      return;
    }
    // 格式化params
    var uploadParams = {
      localIds: params.localIds,
      uploadDir: params.dir
    }
    if (uploadParams.tenantId) params.tenantId = params.tenantId
    this.invoke('uploadImage', uploadParams);
  },
  // 获取带前缀的图片
  getPreviewImages: function (imgIds) {
    return imgIds.map((imgId) => {
      return 'LocalResource://imageid' + imgId
    })
  },
  getPreviewImage: function (imgId) {
    return 'LocalResource://imageid' + imgId
  },
  /* -----------------------------------------------------
    图片预览
    备注：图片LocalResource://imageid标识为本地，客户端优先从本地查找，本地没有再从网络加载
    @params {urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
  ----------------------------------------------------- */
  previewImage: function (argParams) {
    if (!argParams.urls || !argParams.urls.length) return
    var self = this
    // 如果是网络图片直接显示,如果是本地图片,则加上前缀再显示
    var params = argParams
    params.urls = argParams.urls.map(function (url) {
      if (url.indexOf('//') === -1 && url.indexOf('http://') === -1 && url.indexOf('https://') !== -1) {
        return self.getPreviewImage(url)
      }
      return url
    })
    this.invoke('previewImage', params)
  },
  /* -----------------------------------------------------
    监听/取消监听物理返回事件(仅android)
    @params true:监听 | false:取消监听
  ----------------------------------------------------- */
  setBackEnable: function (flag) {
    if (/(Android)/i.test(navigator.userAgent)) { /* 判断Android */
      this.invoke('setBackEnable', flag);
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
  // 退出到登陆页面
  logOut: function () {
    this.invoke('logOut');
  },
  // 获取登陆信息
  loginInfo: function (callback) {
    this.invoke('getLoginInfo', null, callback);
  },
  // 根据key获取登陆信息
  getLoginInfo (key, callback) {
    this.loginInfo(function (result) {
      callback(result[key])
    })
  },
  // 获取系统参数
  systemParameter (callback) {
    this.invoke('getSystemParameter', null, callback)
  },
  /* -----------------------------------------------------
  设置系统参数
  @params {appId: '', openId: '', image_url: '', mobile: '', selectedSupplier: object, sysParms: object}
  ----------------------------------------------------- */
  setSystemParameter: function (data) {
    // 设置系统参数
    if (data.sysParms) DB.setStore('dinghuo_sysparams', data.sysParms)
    // 设置图片主域名
    let imgDomain = data.image_url ? data.image_url.clearProtocol() : '';
    if (imgDomain && imgDomain.length - 1 !== imgDomain.lastIndexOf('/')) {
      imgDomain = imgDomain + '/';
      DB.setStore('dinghuo_img_domain', decodeURIComponent(imgDomain));
    } else {
      console.log('图片域名未定义');
      return {code: 'imgDomainFail', errMsg: 'setSystemParameter:图片域名未定义'};
    }
    // 设置uid
    DB.setStore('dinghuo_uid', data.uid || '');
    // 设置手机号
    DB.setStore('dinghuo_mobile', data.mobile || '');
    // 设置appId和openId
    if (data.openId) DB.setStore('app_openId', data.openId || '');
    if (data.appId) DB.setStore('app_appId', data.appId || '');
    // 设置选中的供货商
    if (data.selectedSupplier && typeof data.selectedSupplier === 'object') {
      DB.setStore('dinghuo_selected_supplier', data.selectedSupplier);
    } else {
      console.log('没有供货商');
      return {code: 'selectedSupplierFail', errMsg: 'setSystemParameter:请选择供货商'};
    }
  },
  // 更新系统参数
  updateSystemParameter: function (callback) {
    // 更新系统参数
    this.loginInfo((loginData) => {
      this.systemParameter((sysData) => {
        const data = {}
        data.image_url = loginData.image_url
        data.uid = loginData.uid
        data.mobile = loginData.mobile
        data.selectedSupplier = loginData.selectedSupplier
        data.sysParms = sysData
        this.setSystemParameter(data)
        if (callback) callback()
      });
    });
  },
  // 修改原生角标
  changeBadgeNum: function (count) {
    this.invoke('setBadgeNum', {key: count});
  },
  // 去首页
  goHome: function (callback) {
    this.invoke('goHome', null, callback)
  },
  // 客户端添加返回绑定
  addBackPress: function (callback) {
    try {
      this.setBackEnable(true);
      window.addEventListener('onBackPress', callback || this.back);
    } catch (error) {
      console.log(error);
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function (callback) {
    try {
      this.setBackEnable(false);
      window.removeEventListener('onBackPress', callback || this.back);
    } catch (error) {
      console.log(error);
    }
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
    s.choose = function (args = {}) {
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        chooseOptions: args.chooseOptions || {}
      }
      /* watermark: {
        orderNo: 'xx', // 编号
        submitName: 'xx', // 提交人
        customerName: 'xx', // 客户
        cmLocation: '118.730515, 31.982473', // 位置算偏差
        isWaterMark: '1', // 是否启用水印
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
        success: function (res) {
          var imgMap = {}
          for(var i = 0, localId; localId = res.localIds[i++];){ // eslint-disable-line
            imgMap[localId] = {
              serverId: '',
              sourceType: JSON.stringify(option.sourceType) === JSON.stringify(['camera']) ? 'camera' : 'album'
            }
          }
          if (params.onChooseSuccess) params.onChooseSuccess(imgMap, res)
        }
      }, option.chooseOptions))
    }
  }
}

export default Bridge
