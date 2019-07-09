'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonp = require('./../jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _DB = require('./../DB');

var _DB2 = _interopRequireDefault(_DB);

var _Device = require('./../Device');

var _Device2 = _interopRequireDefault(_Device);

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
      this.alert = new _instance4.default((0, _extends3.default)({}, params, {
        html: msg,
        onClickSubmit: function onClickSubmit(e) {
          if (params.success) params.success(e);else e.hide();
        }
      }));
    } else {
      if (params) {
        this.alert.reset();
        for (var n in params) {
          this.alert.params[n] = params[n];
        }
        this.alert.updateDOM();
        this.alert.setHTML(msg);
      }
    }
    this.alert.show();
  },
  // 弹出Confirm
  confirm: null,
  showConfirm: function showConfirm(msg) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!this.confirm) {
      this.confirm = new _instance4.default((0, _extends3.default)({}, params, {
        html: msg,
        onClickSubmit: function onClickSubmit(e) {
          if (params.success) params.success(e);
        },
        onClickCancel: function onClickCancel(e) {
          if (params.fail) params.fail(e);else e.hide();
        }
      }));
    } else {
      if (params) {
        this.confirm.reset();
        for (var n in params) {
          this.confirm.params[n] = params[n];
        }
        this.confirm.updateDOM();
        if (params.success) this.confirm.setOnClickSubmit(params.success);
        if (params.fail) this.confirm.setOnClickCancel(params.fail);
      }
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
  back: function back(argHistory, argBackLvl) {
    // 返回操作对象与返回层级
    var _history = window.history;
    if (argHistory && argHistory.go) _history = argHistory;
    var _backLvl = argBackLvl || -1;

    // 返回类型
    var isFromApp = _Device2.default.getUrlParameter('isFromApp', location.search) || '';
    if (isFromApp === '1') {
      // 关闭当前页面
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'home') {
      // 返回首页
      try {
        Bridge.goHome();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'confirm') {
      // 提示后返回上一页
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: function success(e) {
          e.hide();
          _history.go(_backLvl);
        }
      });
    } else if (isFromApp === 'confirm-close') {
      // 提示后关闭当前页面
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: function success(e) {
          e.hide();
          Bridge.closeWindow();
        }
      });
    } else if (isFromApp === 'custom') {
      console.log('自定义');
    } else {
      // 返加上一页
      _history.go(_backLvl);
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
    var ua = navigator.userAgent;
    var verExp = ua.match(/WqAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  // 返回首页
  goHome: function goHome() {
    window.history.go(-1);
  },
  // 退出到登陆页面
  logOut: function logOut(msg) {
    wq.wqload.wqBackToLogin((0, _stringify2.default)({ message: msg || '您的帐号因正在它处登录, 需要您重新登录' })); // eslint-disable-line
  },
  // 打开新的窗口
  openWindow: function openWindow(params, callback) {
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? (0, _stringify2.default)(params) : null); // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function closeWindow() {
    wq.wqload.wqClosePage(); // eslint-disable-line
  },
  // 客户端返回绑定
  addBackPress: function addBackPress(callback) {
    document.addEventListener('backbutton', callback || this.back, false); // eslint-disable-line
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress(callback) {
    document.removeEventListener('backbutton', callback || this.back, false); // eslint-disable-line
  },
  /**
  * 基础功能:end
  */

  /**
  * 定制功能
  */
  platform: 'waiqin',
  config: function config() {
    var _this = this;

    document.addEventListener('deviceready', function () {
      _this.addBackPress();
      _DB2.default.setSession('bridge_isready', '1');
    });
  },
  /**
    * 支付宝支付
    * @param {Object} params
    * @param {Function} callback
    * @callback(result) {Object} {code: "0", message: "支付成功"}|{code: "-1", message: "支付失败"}|{code: "-1", message: "数据解析异常"}
    */
  alipay: function alipay(params, callback) {
    wq.wqpay.alipay(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, null, params ? (0, _stringify2.default)(params) : null);
  },
  /**
    * 商联支付
    * @param {Object} params {appKey:'', dealerCode:'', orderId:'', payAmount:''}
    * @param {Function} callback 回调
    */
  slopenpay: function slopenpay(params, callback) {
    wq.wqpay.slopenpay(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, null, params ? (0, _stringify2.default)(params) : null);
  },
  /*
  * 获取APP信息
  * params: {operation: 'AllInfo'}
  * */
  getApp: function getApp(callback) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { operation: 'AllInfo' };

    wq.wqapp.getApp(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, null, (0, _stringify2.default)(params));
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
  isExistsFile: function isExistsFile(params, callback) {
    wq.wqio.verifyFileHasExist(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* // 附件下载
  downloadFile({
    id: '',
    fileName: src.substring(src.lastIndexOf('/') + 1, src.length), // 必填
    downloadUrl: "http://...", // 必填
    size: 200 // 必填
  }，(result) => { // result => {{flag:'', filePath: '', msg: ''}, flag:'0'失败，'1'成功，msg失败原因
  
  }) */
  downloadFile: function downloadFile(params, callback) {
    wq.wqio.downloadFile(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* // 附件打开
  openFile({
    filePath: ''
  }，(result) => { // result => {flag:'', msg:''} flag:'0'失败, '1'成功, msg失败原因
  
  }） */
  openFile: function openFile(params, callback) {
    wq.wqio.openFile(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* // 附件转为base64
  wqUrlToBase64({
    path: ['', ''],
    destroy: '1' // '0'转完后删除, '1'转完后不删除
  }, (result) => { // result => [{path:'', name:'', src:'base64'}]
  
  }） */
  wqUrlToBase64: function wqUrlToBase64(params, callback) {
    wq.wqphoto.wqUrlToBase64(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* -----------------------------------------------------
    视频播放
    @params {src: '视频地址', title: '标题'}
  ----------------------------------------------------- */
  previewVideo: function previewVideo() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (_Device2.default.platformVersion < '6.2.2') {
      Bridge.showToast('视频播放功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqload.wqOpenCustomerPager((0, _stringify2.default)({ // eslint-disable-line
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
    }));
  },
  /* -----------------------------------------------------
    视频录制
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒'}
  ----------------------------------------------------- */
  videoRecord: function videoRecord() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (_Device2.default.platformVersion < '6.2.2') {
      Bridge.showToast('视频录制功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqjnc.videoRecord(function (res) {
      // eslint-disable-line
      if (res.result === '1') {
        if (params.success) params.success(res);
      } else {
        if (params.fail) params.fail({ errMsg: 'videoRecord:录制失败' });else Bridge.showToast('录制失败', { mask: false });
      }
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    视频上传
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: ''}
  ----------------------------------------------------- */
  videoUpload: function videoUpload() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (_Device2.default.platformVersion < '6.2.2') {
      Bridge.showToast('视频上传功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqjnc.videoUpload(function (res) {
      // eslint-disable-line
      if (res.result === '1') {
        if (params.success) params.success(res);
      } else {
        if (params.fail) params.fail({ errMsg: 'videoUpload:上传失败' });else Bridge.showToast('上传失败', { mask: false });
      }
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    视频是否已经录制过了
    @params {id: '宴会id'}
    @return {result: '1', ID: '宴会id', secs: '毫秒', vid: '仅在hasUpload=1的情况下返回', hasVideo: '0|1', hasUpload: '0|1}
  ----------------------------------------------------- */
  videoInfo: function videoInfo() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (_Device2.default.platformVersion < '6.2.2') {
      Bridge.showToast('视频功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqjnc.videoInfo(function (res) {
      // eslint-disable-line
      if (res.result === '1') {
        if (params.success) params.success(res);
      } else {
        if (params.fail) params.fail({ errMsg: 'videoInfo:未查到此视频信息' });
      }
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function scanQRCode() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqhardware.getQrCode(function (res) {
      // eslint-disable-line
      if (res && res.qrCode) {
        var wqRes = res;
        wqRes.resultStr = res.qrCode;
        if (params && params.success) params.success(wqRes);
      } else {
        if (params.fail) params.fail({ errMsg: 'scanQRCode:扫码失败请稍后重试' });else Bridge.showToast('扫码失败请稍后重试', { mask: false });
      }
    });
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
  getLocation: function getLocation() {
    var _this2 = this;

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
    // 调用定位
    wq.wqlocation.getLocationBackground(function (res) {
      // eslint-disable-line
      _this2.locating = false;
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
          // 将位置信息存储到cookie中60秒
        };if (params.cache) _DB2.default.setCookie('app_location', (0, _stringify2.default)(location), params.cache || 60);
        if (params.success) params.success(location);
      } else {
        if (params.fail) params.fail({ errMsg: 'getLocation:定位失败,请检查定位权限是否开启' });else Bridge.showToast('定位失败,请检查定位权限是否开启', { mask: false });
      }
    }, (0, _stringify2.default)({ locationType: '1' })); // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
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
  getLocationMap: function getLocationMap() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqlocation.getLocationMap(function (res) {
      // eslint-disable-line
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
        };
        if (params.success) params.success(location);
      } else {
        if (params.fail) params.fail({ errMsg: 'getLocationMap:定位失败,请检查外勤365定位权限是否开启' });else Bridge.showToast('定位失败,请检查外勤365定位权限是否开启', { mask: false });
      }
    }, (0, _stringify2.default)((0, _assign2.default)({ editable: '1' }, params))); // "0"双定位百度优先，"1"双定位高德优先，"2"单百度定位，"3"单高德定位
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
  chooseImage: function chooseImage(argParams) {
    var params = Object.clone(argParams);
    // 格式化sourceType
    var operation = '2';
    if (argParams && argParams.sourceType) {
      if (argParams.sourceType.indexOf('album') >= 0 && argParams.sourceType.indexOf('camera') >= 0) {
        operation = '2';
      } else if (argParams.sourceType.indexOf('album') >= 0) {
        operation = '1';
      } else {
        operation = '0';
      }
      params.operation = operation;
    }
    // 格式化sizeType
    var pwidth = null;
    if (argParams && argParams.sizeType) {
      if (!isNaN(argParams.sizeType)) {
        pwidth = argParams.sizeType;
      } else if (argParams.sizeType.indexOf('compressed') >= 0) {
        pwidth = '750';
      }
    }
    if (pwidth) params.pwidth = pwidth;
    // 格式化count
    var max = 5;
    if (argParams && argParams.count) {
      max = argParams.count;
      params.max = '' + max;
    }
    // viewId 临时目录,不能重复
    params.viewId = '' + new Date().getTime();
    if (argParams && argParams.viewId) {
      params.viewId = argParams.viewId;
    }
    // 水印相关: photoType | customerName | submitName | cmLocation | selectItems
    wq.wqphoto.getPhoto(function (result) {
      // eslint-disable-line
      if (argParams && argParams.success) {
        // 格式化返回结果
        var res = {
          sourceType: operation === '0' ? 'camera' : 'album',
          errMsg: 'chooseImage:ok',
          results: result,
          localIds: []
          // 格式化返回结果[{src:地址, path: base64: name: 文件名}] 为 imgMap{path: {serverId: '', sourceType: ''} }
        };var imgMap = {};
        for (var i = 0, item; item = result[i++];) {
          // eslint-disable-line
          imgMap[item.name] = {
            serverId: '',
            name: item.name,
            sourceType: res.sourceType,
            base64: item.path,
            src: item.src
          };
          res.localIds.push(item.name);
        }
        argParams.success(res, imgMap);
      }
    }, null, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    上传图片
    @params {dir:'上传路径',localIds:['图片集合'], tenantId: '企业Id'}
    @return 无
  ----------------------------------------------------- */
  uploadImage: function uploadImage() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.dir) {
      Bridge.showToast('请传入上传路径dir后再上传图片', { mask: false });
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      Bridge.showToast('请传入上传图片列表后再上传图片', { mask: false });
      return;
    }
    // 格式化params
    var uploadParams = {
      filePathList: params.localIds.map(function (item) {
        return { path: item };
      }),
      url: params.dir
    };
    if (params.tenantId) uploadParams.tenantId = params.tenantId;
    wq.wqphoto.startUpload((0, _stringify2.default)(uploadParams)); // eslint-disable-line
  },
  /* -----------------------------------------------------
    图片预览
    @params {urls:'需要预览的图片http链接列表',index:'图片索引'}
  ----------------------------------------------------- */
  previewImage: function previewImage(argParams) {
    // 格式化index
    var position = 0;
    if (argParams && argParams.index) position = argParams.index;
    // 格式化urls
    var photos = [];
    if (argParams && argParams.urls && argParams.urls.length) {
      photos = argParams.urls.map(function (item) {
        return {
          path: item
        };
      });
    }
    var params = {
      position: position,
      photos: photos
    };
    wq.wqphoto.photoPreview((0, _stringify2.default)(params)); // eslint-disable-line
  },
  /* -----------------------------------------------------
    人员插件
    @params {success: fn}
  ----------------------------------------------------- */
  getContactMore: function getContactMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', aclType: '0只能看到下属 不传或者其他的参数为全部人员,默认为空', success([{id: '', name: ''}])}
    wq.wqcontact.getContactMore(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  getContact: function getContact() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcontact.getContact(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
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
  getCustomerMore: function getCustomerMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {isonline: '1.在线0.离线', selectedIds: 'id,id', tradeType: '1客户 2经销商 3门店,默认1', superTradeType: '2经销商,指门店上级经销商默认无', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', success([{id: '', name: ''}])}
    wq.wqcustomer.getCustomerMore(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)((0, _assign2.default)({ hiddenAdd: true }, params)));
  },
  getCustomer: function getCustomer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcustomer.getCustomer(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)((0, _assign2.default)({ hiddenAdd: true }, params)));
  },
  getCustomerType: function getCustomerType() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {id: 'id', name: 'name', success({id: '', name: ''})}
    wq.wqcustomer.getCustomerType(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  getCustomerAreaMore: function getCustomerAreaMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    if (_Device2.default.platformVersion < '6.2.2') {
      Bridge.showToast('此功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqcustomer.getCustomerAreaMore(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  getCustomerArea: function getCustomerArea() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcustomer.getCustomerArea(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    部门插件
    @params: {selectedIds: '',success: fn}
  ----------------------------------------------------- */
  getDepartmentMore: function getDepartmentMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', success([{id: '', name: ''}])}
    wq.wqdepartment.getDepartmentMore(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  getDepartment: function getDepartment() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqdepartment.getDepartment(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
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
  getGoods: function getGoods() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqproduct.wqSelectSingleProduct(function (args) {
      // eslint-disable-line
      if (params.success) params.success(args);
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    打开原生窗口
    @params {ios: {url: '', params: {}}, android: {url: '', params: {}}}默认为打开一个webview页面
  ----------------------------------------------------- */
  openNativePage: function openNativePage() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { ios: {}, android: {} };

    if (!params.ios.url) {
      Bridge.showToast('ios参数url不能为空', { mask: false });
      return;
    }
    if (!params.android.url) {
      Bridge.showToast('android参数url不能为空', { mask: false });
      return;
    }
    window.wq.wqload.wqOpenCustomerPager({
      androidUIR: params.android.url,
      androidParma: params.android.params,
      IOSViewController: params.ios.url,
      IOSParma: params.ios.params
    });
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
    s.choose = function (args) {
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        chooseOptions: args.chooseOptions || {}
        /* watermark: {
          photoType: 'xx', // 水印名称
          customerName: 'xx', // 客户名
        } */
      };var count = option.max - option.currentCount;
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
        success: function success(res, imgMap) {
          if (params.onChooseSuccess) params.onChooseSuccess(imgMap, res);
        }
      }, option.chooseOptions));
    };
  }
};

exports.default = Bridge;
module.exports = exports['default'];