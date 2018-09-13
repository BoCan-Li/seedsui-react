'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _bridgeBrowser = require('./bridgeBrowser.js');

var _bridgeBrowser2 = _interopRequireDefault(_bridgeBrowser);

var _Device = require('./../Device.js');

var _Device2 = _interopRequireDefault(_Device);

var _DB = require('./../DB.js');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = {
  platform: 'dinghuo',
  config: function config() {
    _DB2.default.setSession('bridge_isready', '1');
    this.registerHandler(['getGoodsByApp', 'getCartGoodsByApp', 'onBackPress', 'setOnlineByApp']);
  },
  /* 获得版本信息 */
  getAppVersion: function getAppVersion() {
    var ua = navigator.userAgent;
    var verExp = ua.match(/DinghuoAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  /* 公共方法，通过桥接调用原生方法公共入口 */
  invoke: function invoke(name, param, callback) {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      /* 判断iPhone|iPad|iPod|iOS */
      /* eslint-disable */
      this.setup(function (bridge) {
        bridge.callHandler(name, param, function (response) {
          if (callback) {
            try {
              callback(JSON.parse(response));
            } catch (e) {
              callback(response);
            }
          }
        });
      });
      /* eslint-enable */
    } else if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      // 注册分类页面事件
      if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.callHandler(name, param && (0, _stringify2.default)(param), function (response) {
          if (callback) {
            try {
              callback(JSON.parse(response));
            } catch (e) {
              callback(response);
            }
          }
        });
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
          window.WebViewJavascriptBridge.callHandler(name, param && (0, _stringify2.default)(param), function (response) {
            if (callback) {
              try {
                callback(JSON.parse(response));
              } catch (e) {
                callback(response);
              }
            }
          });
        }, false);
      }
    }
  },
  setup: function setup(callback) {
    /* eslint-disable */
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
    /* eslint-enable */
  },

  /**
   * 注册事件
   */
  registerHandler: function registerHandler(events) {
    if (typeof window !== 'undefined') {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        /* 判断iPhone|iPad|iPod|iOS */
        /* eslint-disable */
        this.setup(function (bridge) {
          events.forEach(function (eventName) {
            bridge.registerHandler(eventName, function () {
              var event = new CustomEvent(eventName);
              // 分发事件
              window.dispatchEvent(event);
            });
          });
        });
        /* eslint-enable */
      } else if (/(Android)/i.test(navigator.userAgent)) {
        /* 判断Android */
        // 注册分类页面事件
        if (window.WebViewJavascriptBridge) {
          events.forEach(function (eventName) {
            window.WebViewJavascriptBridge.registerHandler(eventName, function () {
              var event = new CustomEvent(eventName);
              // 分发事件
              window.dispatchEvent(event);
            });
          });
        } else {
          document.addEventListener('WebViewJavascriptBridgeReady', function () {
            events.forEach(function (eventName) {
              window.WebViewJavascriptBridge.registerHandler(eventName, function () {
                var event = new CustomEvent(eventName);
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
  isHomePage: function isHomePage(callback) {
    this.invoke('isHomePage', null, function (data) {
      if (data.result.toString() === '1') {
        callback(true);
      } else {
        callback(false);
      }
    });
  },
  /*
  * 商联支付
  * params: {appKey:'', dealerCode:'', orderId:'', payAmount:''}
  * */
  slopenpay: function slopenpay(params, callback) {
    this.invoke('slopenpay', params, callback);
  },
  /*
  * 打开新的窗口
  * params: {url:''}默认为打开一个webview页面，如果打开原生页面需要加前缀：nyNative://
  * */
  openWindow: function openWindow(params, callback) {
    this.invoke('openWindow', params, callback);
  },
  /* 关闭当前窗 */
  closeWindow: function closeWindow(callback) {
    this.invoke('closeWindow', null, callback);
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
  isExistsFile: function isExistsFile(params, callback) {
    this.invoke('isExistsFile', params, callback);
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
  downloadFile: function downloadFile(params, callback) {
    this.invoke('downloadFile', params, callback);
  },
  /* 附件打开
  openFile（{
    "filePath": ""
  }，(result) => {
  // 返回{{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function openFile(params, callback) {
    this.invoke('openFile', params, callback);
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function scanQRCode(params) {
    this.invoke('scanQRCode', null, params.onSuccess);
  },
  /*
   * 获取当前地理位置
   * type：坐标类型，订货365默认使用国测局'gcj02'
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度',address:'地址',country:'国',province:'省',city:'市',area:'区',street:'街道'}
   * */
  getLocation: function getLocation() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 先从cookie中读取位置信息
    var appLocation = _DB2.default.getCookie('app_location') || '';
    if (appLocation) {
      if (params.onSuccess) params.onSuccess(JSON.parse(appLocation));
      return;
    }
    this.invoke('getLocation', 'gcj02', function (res) {
      if (res && res.latitude) {
        // 将位置信息存储到cookie中10秒
        _DB2.default.setCookie('app_location', (0, _stringify2.default)(res), 10);
        if (params.onSuccess) params.onSuccess(res);
      } else {
        if (params.onError) params.onError({ code: 'locationFail', msg: '定位失败,请检查订货365定位权限是否开启' });
      }
    });
  },
  /*
   * 获取当前位置名称
   * params：{type: 'gcj02', longitude: 'xx', latitude: 'xx', onSuccess: (), onError: ()}
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度'}
   * */
  getAddress: function getAddress() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 先从cookie中读取位置信息
    var appLocation = _DB2.default.getCookie('app_location') || '';
    if (appLocation) {
      if (params.onSuccess) params.onSuccess(JSON.parse(appLocation));
      return;
    }
    if (params.onError) params.onError({ code: 'addressFail', msg: '获取位置名称失败,请稍后重试' });else alert('获取位置名称失败,请稍后重试');
  },
  /*
  * 获取当前网络状态
  * 返回：{networkType:'返回网络类型2g，3g，4g，wifi'}
  * */
  getNetworkType: function getNetworkType(callback) {
    this.invoke('getNetworkType', null, callback);
  },
  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数'}
  * 返回选定照片的本地ID列表{localIds:[id,id,id]'}, src需要增加前缀'LocalResource://imageid'+id才能显示
  */
  chooseImage: function chooseImage(params) {
    this.invoke('chooseImage', params, params.success);
  },
  /*
  * 上传图片
  * params：{dir:'',localIds:['localId', 'localId'], tenantId: ''}
  */
  uploadImage: function uploadImage() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.dir) {
      _bridgeBrowser2.default.showToast('请传入上传路径dir后再上传图片');
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      _bridgeBrowser2.default.showToast('请传入上传图片列表后再上传图片');
      return;
    }
    // 格式化params
    var uploadParams = {
      localIds: params.localIds,
      uploadDir: params.dir
    };
    if (uploadParams.tenantId) params.tenantId = params.tenantId;
    this.invoke('uploadImage', uploadParams);
  },
  /**
   * 获取带前缀的图片
   */
  getPreviewImages: function getPreviewImages(imgIds) {
    return imgIds.map(function (imgId) {
      return 'LocalResource://imageid' + imgId;
    });
  },
  getPreviewImage: function getPreviewImage(imgId) {
    return 'LocalResource://imageid' + imgId;
  },
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
  * 备注：图片url后面带localId为标识为本地，客户端优先从本地查找，本地没有再从网络加载
  */
  previewImage: function previewImage(argParams) {
    if (!argParams.urls || !argParams.urls.length) return;
    var self = this;
    // 如果是网络图片直接显示,如果是本地图片,则加上前缀再显示
    var params = argParams;
    params.urls = argParams.urls.map(function (url) {
      if (url.indexOf('//') === -1 && url.indexOf('http://') === -1 && url.indexOf('https://') !== -1) {
        return self.getPreviewImage(url);
      }
      return url;
    });
    this.invoke('previewImage', params);
  },
  /*
    * 监听/取消监听物理返回事件(仅android)
    * flag（true：监听，false：取消监听）
    */
  setBackEnable: function setBackEnable(flag) {
    if (/(Android)/i.test(navigator.userAgent)) {
      /* 判断Android */
      this.invoke('setBackEnable', flag);
    }
  },
  /*
  * 获取图片前缀
  * */
  getImagePrefix: function getImagePrefix() {
    return 'LocalResource://imageid';
  },
  /*
  * 下载图片
  */
  downloadImage: function downloadImage() {},
  /* 分享给朋友 */
  onMenuShareAppMessage: function onMenuShareAppMessage() {},
  /* 分享到朋友圈 */
  onMenuShareTimeline: function onMenuShareTimeline() {},
  /* 退出到登陆页面 */
  logOut: function logOut() {
    this.invoke('logOut');
  },
  /* 获取登陆信息 */
  loginInfo: function loginInfo(callback) {
    this.invoke('getLoginInfo', null, callback);
  },
  /* 根据key获取登陆信息 */
  getLoginInfo: function getLoginInfo(key, callback) {
    this.loginInfo(function (result) {
      callback(result[key]);
    });
  },

  /* 获取系统参数 */
  systemParameter: function systemParameter(callback) {
    this.invoke('getSystemParameter', null, callback);
  },

  /*
   * 设置系统参数
   * @param data: {appId: '', openId: '', image_url: '', mobile: '', selectedSupplier: object, sysParms: object}
   * */
  setSystemParameter: function setSystemParameter(data) {
    // 设置系统参数
    if (data.sysParms) _DB2.default.setStore('app_sysparams', data.sysParms);
    // 设置图片主域名
    var imgDomain = data.image_url ? data.image_url.clearProtocol() : '';
    if (imgDomain && imgDomain.length - 1 !== imgDomain.lastIndexOf('/')) {
      imgDomain = imgDomain + '/';
      _DB2.default.setStore('app_imgDomain', decodeURIComponent(imgDomain));
    } else {
      console.log('图片域名未定义');
      return { code: 'imgDomainFail', msg: '图片域名未定义' };
    }
    // 设置uid
    _DB2.default.setStore('app_uid', data.uid || '');
    // 设置手机号
    _DB2.default.setStore('app_mobile', data.mobile || '');
    // 设置appId和openId
    if (data.openId) _DB2.default.setStore('app_openId', data.openId || '');
    if (data.appId) _DB2.default.setStore('app_appId', data.appId || '');
    // 设置选中的供货商
    if (data.selectedSupplier && (0, _typeof3.default)(data.selectedSupplier) === 'object') {
      _DB2.default.setStore('app_selectedSupplier', data.selectedSupplier);
    } else {
      console.log('没有供货商');
      return { code: 'selectedSupplierFail', msg: '请选择供货商' };
    }
  },
  /* 修改原生角标 */
  changeBadgeNum: function changeBadgeNum(count) {
    this.invoke('setBadgeNum', { key: count });
  },
  /* 去首页 */
  goHome: function goHome(callback) {
    this.invoke('goHome', null, callback);
  },
  /* 返回按键处理 */
  back: function back() {
    var isFromApp = _Device2.default.getUrlParameter('isFromApp', location.search) || '';
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
      _bridgeBrowser2.default.showConfirm('您确定要离开此页面吗?', {
        onSuccess: function onSuccess(e) {
          e.hide();
          window.history.go(-1);
        }
      });
    } else if (isFromApp === 'confirm-close') {
      _bridgeBrowser2.default.showConfirm('您确定要离开此页面吗?', {
        onSuccess: function onSuccess(e) {
          e.hide();
          Bridge.closeWindow();
        }
      });
    } else {
      window.history.go(-1);
    }
  },
  // 客户端添加返回绑定
  addBackPress: function addBackPress() {
    var _this = this;

    try {
      this.setBackEnable(true);
      window.addEventListener('onBackPress', this.back);
    } catch (error) {
      console.log(error);
    }
    // 使用桥接初始化系统参数
    this.loginInfo(function (loginData) {
      _this.systemParameter(function (sysData) {
        var data = {};
        data.image_url = loginData.image_url;
        data.uid = loginData.uid;
        data.mobile = loginData.mobile;
        data.selectedSupplier = loginData.selectedSupplier;
        data.sysParms = sysData;
        _bridgeBrowser2.default.setSystemParameter(data);
      });
    });
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress() {
    try {
      this.setBackEnable(false);
      window.removeEventListener('onBackPress', this.back);
    } catch (error) {
      console.log(error);
    }
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
  })
  */
  Image: function Image() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var s = this;
    var msg = '';
    // 选择照片
    s.choose = function () {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 1,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        watermark: args.watermark || {}
        /* watermark: {
          orderNo: 'xx', // 编号
          submitName: 'xx', // 提交人
          customerName: 'xx', // 客户
          cmLocation: '118.730515, 31.982473', // 位置算偏差
          isWaterMark: '1', // 是否启用水印
        } */
      };var count = option.max - option.currentCount;
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片';
        _bridgeBrowser2.default.showToast(msg);
        return;
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1;
      Bridge.chooseImage((0, _assign2.default)({
        count: count, // 默认5
        sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function success(res) {
          var imgMap = {};
          for (var i = 0, localId; localId = res.localIds[i++];) {
            // eslint-disable-line
            imgMap[localId] = {
              serverId: '',
              sourceType: (0, _stringify2.default)(option.sourceType) === (0, _stringify2.default)(['camera']) ? 'camera' : 'album'
            };
          }
          if (params.onChooseSuccess) params.onChooseSuccess(imgMap, res);
        }
      }, option.watermark));
    };
  }
};

exports.default = (0, _assign2.default)({}, _bridgeBrowser2.default, Bridge);
module.exports = exports['default'];