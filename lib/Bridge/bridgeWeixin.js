'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _jsonp = require('./../jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _DB = require('./../DB');

var _DB2 = _interopRequireDefault(_DB);

var _Device = require('./../Device');

var _Device2 = _interopRequireDefault(_Device);

var _EventUtil = require('./../EventUtil');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _instance = require('./../Toast/instance.js');

var _instance2 = _interopRequireDefault(_instance);

var _instance3 = require('./../Alert/instance.js');

var _instance4 = _interopRequireDefault(_instance3);

var _instance5 = require('./../Loading/instance.js');

var _instance6 = _interopRequireDefault(_instance5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = {
  /**
    * 基础功能:start
    */
  debug: false,
  // 打印日志, 参数: el绑定点击5次的元素, log日志文字, 结果：显示日志信息
  logger: function logger(el) {
    // 监听触发的元素,点击十次显示
    var subscribeEl = el || document.body;
    // 日志盒子
    var logBox = document.createElement('div');
    logBox.setAttribute('style', 'position:absolute;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(0, 0, 0, 0.85);color:white;');

    var logClose = document.createElement('div');
    logClose.setAttribute('style', 'height:44px;line-height:44px;text-align:center;background:rgba(200,50,50,1);');
    logClose.innerHTML = '关闭';
    logClose.addEventListener('click', function () {
      document.body.removeChild(logBox);
    }, false);
    var logContent = document.createElement('div');
    logContent.setAttribute('style', 'position:absolute;top:44px;left:0;right:0;bottom:0;padding:10px;overflow:auto;');
    logBox.appendChild(logClose);
    logBox.appendChild(logContent);
    logBox.addEventListener('click', stopPropagationHandler, false);
    function stopPropagationHandler(e) {
      e.stopPropagation();
    }
    if (subscribeEl.getAttribute('data-multipleclick')) return;
    _EventUtil2.default.addHandler(subscribeEl, 'multipleclick', function () {
      logContent.innerHTML = _DB2.default.getSession('app_logger') || '无日志';
      document.body.appendChild(logBox);
    });
    subscribeEl.setAttribute('data-multipleclick', '1');
  },
  // 拨打电话
  tel: function tel(number) {
    if (_Device2.default.device === 'pc') {
      this.showToast('此功能仅可在微信或APP中使用');
      return;
    }
    if (isNaN(number)) return;
    window.location.href = 'tel:' + number;
  },
  // 弹出toast
  toast: null,
  showToast: function showToast(msg) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!msg) return;
    if (!this.toast) {
      // 提示错误
      this.toast = new _instance2.default({
        parent: document.body,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      this.toast.setHTML(msg);
      this.toast.setMaskClassName('mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''));
      this.toast.setToastClassName('toast ' + (params.position ? params.position : 'middle'));
      this.toast.setIcon(params.icon || '');
      this.toast.setDelay(params.delay || 2000);
    }
    this.toast.show();
    if (params.success) {
      setTimeout(function () {
        params.success();
      }, params.delay ? Math.round(params.delay / 2) : 1000);
    }
  },
  // 弹出loading
  loading: null,
  showLoading: function showLoading() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.loading) {
      this.loading = new _instance6.default({
        caption: params.caption || '正在加载...',
        type: params.type,
        icon: params.icon || '',
        maskCss: params.css || null
      });
    } else {
      if (params.caption) this.loading.setCaption(params.caption);
      if (params.type) this.loading.setType(params.type);
      if (params.css) this.loading.setMaskCss(params.css);
      if (params.icon) this.toast.setIcon(params.icon || '');
      if (params.mask) this.loading.setMaskClassName('mask loading-mask ' + (params.mask === false ? ' loading-propagation' : ''));
    }
    this.loading.show();
  },
  hideLoading: function hideLoading() {
    if (!this.loading) {
      this.toast.showToast('请先showLoading才能hideLoading');
    } else {
      this.loading.hide();
    }
  },
  // 弹出Alert
  alert: null,
  showAlert: function showAlert(msg) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!this.alert) {
      this.alert = new _instance4.default({
        caption: params.caption || '',
        html: msg,
        onClickSubmit: function onClickSubmit(e) {
          if (params.success) params.success(e);else e.hide();
        }
      });
    } else {
      if (params.caption) this.alert.setCaption(params.caption);
      this.alert.setHTML(msg);
    }
    this.alert.show();
  },
  // 弹出Confirm
  confirm: null,
  showConfirm: function showConfirm(msg) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!this.confirm) {
      this.confirm = new _instance4.default({
        caption: params.caption || '',
        html: msg,
        onClickSubmit: function onClickSubmit(e) {
          if (params.success) params.success(e);
        },
        onClickCancel: function onClickCancel(e) {
          if (params.fail) params.fail(e);else e.hide();
        }
      });
    } else {
      if (params.caption) this.confirm.setCaption(params.caption);
      if (params.success) this.confirm.setOnClickSubmit(params.success);
      if (params.fail) this.confirm.setOnClickCancel(params.fail);
      this.confirm.setHTML(msg);
    }
    this.confirm.show();
  },
  /**
    * 百度地图:获取当前位置名称,只支持gcj02
    * @param {Object} params: {longitude: '', latitude: '', success: fn, fail: fn}
    * @returns {Object} {address:'地址全称'}
    */
  getAddress: function getAddress() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = 'https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + params.latitude + ',' + params.longitude + '&output=json&pois=1&ak=IlfRglMOvFxapn5eGrmAj65H&ret_coordtype=gcj02ll';
    (0, _jsonp2.default)(url, null, function (err, data) {
      if (err) {
        if (params.fail) params.fail({ errMsg: 'getAddress:获取位置名称失败,请稍后重试' + err });
      } else {
        var addrs = {};
        if (data.result && data.result.formatted_address) {
          addrs.address = data.result.formatted_address;
          if (params.success) params.success(addrs);
        } else {
          if (params.fail) params.fail({ errMsg: 'getAddress:获取位置名称失败,请稍后重试' });
        }
      }
    });
  },
  /**
    * 百度地图:获得天气
    * @param {Object} params: {location: 'lng,lat|lng,lat|lng,lat' | '北京市|上海市', success: fn, fail: fn}
    * @returns {Object} 天气信息results
    */
  getWeather: function getWeather() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + (params.location || '南京市') + '&output=json&ak=IlfRglMOvFxapn5eGrmAj65H';
    (0, _jsonp2.default)(url, null, function (err, data) {
      if (err) {
        if (params.fail) params.fail({ errMsg: 'getWeather:获取天气失败,请稍后重试' + err });
      } else {
        if (data.results && data.results.length) {
          if (params.success) params.success(data.results);
        } else {
          if (params.fail) params.fail({ errMsg: 'getWeather:获取天气失败,请稍后重试' });
        }
      }
    });
  },
  // 客户端默认返回控制
  back: function back() {
    var isFromApp = _Device2.default.getUrlParameter('isFromApp', location.search) || '';
    if (isFromApp === '1') {
      window.history.go(-1);
    } else if (isFromApp === 'home') {
      window.history.go(-1);
    } else if (isFromApp === 'confirm') {
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: function success(e) {
          e.hide();
          window.history.go(-1);
        }
      });
    } else if (isFromApp === 'confirm-close') {
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: function success(e) {
          e.hide();
          window.history.go(-1);
        }
      });
    } else {
      window.history.go(-1);
    }
  },
  // 判断是否是主页
  isHomePage: function isHomePage(callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true);
      return;
    }
    callback(false);
  },
  // 获得版本信息
  getAppVersion: function getAppVersion() {
    return window.navigator.appVersion;
  },
  // 返回首页
  goHome: function goHome() {
    window.history.go(-1);
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作');
  },
  // 打开新的窗口
  openWindow: function openWindow() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (params.url) window.location.href = params.url;
  },
  // 关闭窗口
  closeWindow: function closeWindow() {
    wx.closeWindow(); // eslint-disable-line
  },
  // 客户端返回绑定
  addBackPress: function addBackPress(callback) {
    if (wx.onHistoryBack) {
      // eslint-disable-line
      wx.onHistoryBack(function () {
        // eslint-disable-line
        if (callback) {
          callback();
        } else {
          Bridge.back();
        }
        return false;
      });
    }
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress() {
    if (wx.onHistoryBack) {
      // eslint-disable-line
      wx.onHistoryBack(function () {
        // eslint-disable-line
        return true;
      });
    }
  },
  /**
   * 基础功能:end
   */

  /**
   * 定制功能
   */
  platform: _Device2.default.platform,
  /**
    * 获取当前地理位置
    * @param {Object} params
    * params: {
    * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
    * cache {Number}: 默认60秒缓存防重复定位
    * }
    * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
    */
  getLocation: function getLocation() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 先从cookie中读取位置信息
    var appLocation = _DB2.default.getCookie('app_location');
    if (appLocation === 'undefined') {
      _DB2.default.removeCookie('app_location');
      appLocation = '';
    }
    try {
      if (appLocation) appLocation = JSON.parse(appLocation);
    } catch (error) {
      appLocation = '';
    }
    if (appLocation) {
      if (params.success) params.success(appLocation);
      return;
    }
    // 调用定位
    if (this.locating) return;
    this.locating = true;
    console.log('调用定位...');
    wx.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'gcj02',
      success: function success(res) {
        _this.locating = false;
        // 将位置信息存储到cookie中60秒
        if (res.latitude && res.latitude) {
          if (params.cache) _DB2.default.setCookie('app_location', (0, _stringify2.default)(res), params.cache || 60);
          if (params.success) params.success(res);
        } else {
          if (params.fail) params.fail(res);else Bridge.showToast('没有获取到经纬度', { mask: false });
        }
      },
      fail: function fail(res) {
        _this.locating = false;
        if (params.fail) params.fail(res);else Bridge.showToast('定位失败,请检查微信定位权限是否开启', { mask: false });
      },
      complete: function complete(res) {
        _this.locating = false;
        if (params.onComplete) params.onComplete(res);
      }
    });
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode: function scanQRCode() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wx.scanQRCode({ // eslint-disable-line
      needResult: params.needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: params.scanType || ['qrCode', 'barCode'],
      desc: 'scanQRCode desc',
      success: function success(res) {
        if (!params.success) return;
        var wxRes = res;
        // 如果没有设置needResult,则清除前缀
        if (isNaN(params.needResult)) {
          if (res.resultStr.indexOf('QR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('QR,'.length);
          } else if (res.resultStr.indexOf('EAN_13,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_13,'.length);
          } else if (res.resultStr.indexOf('EAN_8,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_8,'.length);
          } else if (res.resultStr.indexOf('AZTEC,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('AZTEC,'.length);
          } else if (res.resultStr.indexOf('DATAMATRIX,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('DATAMATRIX,'.length);
          } else if (res.resultStr.indexOf('UPCA,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCA,'.length);
          } else if (res.resultStr.indexOf('UPCE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCE,'.length);
          } else if (res.resultStr.indexOf('CODABAR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODABAR,'.length);
          } else if (res.resultStr.indexOf('CODE_39,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_39,'.length);
          } else if (res.resultStr.indexOf('CODE_93,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_93,'.length);
          } else if (res.resultStr.indexOf('CODE_128,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_128,'.length);
          } else if (res.resultStr.indexOf('ITF,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('ITF,'.length);
          } else if (res.resultStr.indexOf('MAXICODE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('MAXICODE,'.length);
          } else if (res.resultStr.indexOf('PDF_417,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('PDF_417,'.length);
          } else if (res.resultStr.indexOf('RSS_14,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSS_14,'.length);
          } else if (res.resultStr.indexOf('RSSEXPANDED,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSSEXPANDED,'.length);
          }
        }
        // 回调
        params.success(wxRes);
      },
      fail: function fail(res) {
        if (params.fail) params.fail(res);else Bridge.showToast('扫码失败,请退出重试', { mask: false });
      },
      cancel: function cancel(res) {
        if (params.onCancel) params.onCancel(res);
      },
      complete: function complete(res) {
        if (params.onComplete) params.onComplete(res);
      }
    });
  },

  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数', success:fn, fail:fn, cancel: fn, complete: fn}
  * 返回选定照片的本地ID列表{localIds:[]'}
  */
  chooseImage: function chooseImage(params) {
    wx.chooseImage(params); // eslint-disable-line
  },
  /*
  * 上传图片
  params：{
    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
      var serverId = res.serverId; // 返回图片的服务器端ID
    }
  }
  */
  uploadImage: function uploadImage(params) {
    wx.uploadImage(params); // eslint-disable-line
  },
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接'}
  */
  previewImage: function previewImage(params) {
    wx.previewImage(params); // eslint-disable-line
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
    onUploadSuccess:function(imgMap,res) // 单张上传成功
    onUploadFail:function(index, item) // 单张上传失败
    onUploadsSuccess:function(imgMap) // 全部上传成功
  })
  */
  Image: function Image(params) {
    var s = this;
    var msg = '';
    // 选择照片
    s.choose = function () {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        chooseOptions: args.chooseOptions || {}
      };
      var count = option.max - option.currentCount;
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片';
        Bridge.showToast(msg);
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
              sourceType: res.sourceType
            };
          }
          if (params.onChooseSuccess) params.onChooseSuccess(imgMap, res);
          s.upload(imgMap);
        },
        fail: function fail(res) {
          if (params.onChooseFail) params.onChooseFail(res);else Bridge.showToast('选择照片失败', { mask: false });
        },
        cancel: function cancel() {},
        complete: function complete() {}
      }, option.chooseOptions));
    };
    // 上传照片
    s.upload = function (imgMap) {
      var imgs = (0, _keys2.default)(imgMap);
      var loop = function loop(index) {
        if (index >= imgs.length) {
          return;
        }
        var img = imgs[index];
        if (imgMap[img].serverId) {
          loop(++index);
          return;
        }
        Bridge.uploadImage({
          localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function success(res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            imgMap[img].serverId = serverId;
            if (params.onUploadSuccess) params.onUploadSuccess(imgMap, res);
            if (index >= imgs.length - 1 && params.onUploadsSuccess) params.onUploadsSuccess(imgMap);
            loop(++index);
          },
          fail: function fail() {
            var msg = '您选择的第' + index + '张图片上传失败, 稍后请重试';
            Bridge.showToast(msg, { mask: false });
            var deleteItem = imgMap[img];
            delete imgMap[img];
            if (params.onUploadFail) params.onUploadFail(imgMap, { index: index, item: deleteItem, errMsg: 'uploadImage:' + msg });
            if (index >= imgs.length - 1 && params.onUploadsSuccess) params.onUploadsSuccess(imgMap);
            loop(++index);
          }
        });
      };
      loop(0);
    };
  }
};

exports.default = Bridge;
module.exports = exports['default'];