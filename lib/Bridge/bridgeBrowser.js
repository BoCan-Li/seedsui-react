'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _instance7 = require('./../Preview/instance.js');

var _instance8 = _interopRequireDefault(_instance7);

var _MediaUtil = require('./../MediaUtil');

var _MediaUtil2 = _interopRequireDefault(_MediaUtil);

var _FullScreen = require('./../FullScreen');

var _FullScreen2 = _interopRequireDefault(_FullScreen);

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
        success: function success(e) {
          e.hide();
          window.history.go(-1);
        }
      });
    } else if (isFromApp === 'confirm-close') {
      Bridge.showConfirm(Bridge.confirmCaption || '您确定要离开此页面吗?', {
        success: function success(e) {
          e.hide();
          Bridge.closeWindow();
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
  /**
   * 基础功能:end
   */

  /**
    * 定制功能
    */
  platform: 'browser',
  // 初始化配置
  config: function config() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (params.debug) this.debug = params.debug;
    if (!this.debug) {
      console.log('config方法仅在微信上工作');
      return;
    }
    _DB2.default.setSession('bridge_isready', '1');
    if (params.success) params.success();
  },
  // 视频播放
  previewVideo: function previewVideo() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var target = document.getElementById('seedsui_preview_video');
    if (!target) {
      target = _MediaUtil2.default.video(params.src);
      target.id = 'seedsui_preview_video';
      target.style = 'position:absolute;top:-1000px;left:-1000px;width:100;height:100px;';
      document.body.appendChild(target);
    }
    if (target) {
      _FullScreen2.default.enter(target);
      setTimeout(function () {
        target.play();
      }, 500);
    }
  },
  /* -----------------------------------------------------
    图片插件
  ----------------------------------------------------- */
  // 拍照、本地选图
  chooseImage: function chooseImage() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在微信或APP中使用', { mask: false });
      return;
    }
    var res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseImage:ok',
      localIds: ['https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', 'https://static.zcool.cn/v3.5.180706.5/zcool/client/image/logo.png']
    };
    if (params.success) params.success(res);
  },
  // 上传图片
  uploadImage: function uploadImage() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在微信或APP中使用', { mask: false });
      return;
    }
    this.showLoading();
    setTimeout(function () {
      _this.hideLoading();
      _this.showToast('上传完成', { mask: false });
      var res = {
        errMsg: 'uploadImage:ok',
        mediaUrl: '',
        serverId: '1237378768e7q8e7r8qwesafdasdfasdfaxss111'
      };
      if (params.success) params.success(res);
    }, 1000);
  },
  // 图片预览
  // @params {urls:'需要预览的图片http链接列表',index:'图片索引',layerHTML:'图片上方的浮层'}
  preview: null,
  previewImage: function previewImage() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.urls || !params.urls.length) {
      Bridge.showToast('urls参数不正确, 无法预览', { mask: false });
      return;
    }
    var src = params.urls[params.index || 0];
    if (!src) {
      Bridge.showToast('index参数不正确, 无法预览', { mask: false });
      return;
    }
    var layerHTML = params.layerHTML || '';
    if (!this.preview) {
      this.preview = new _instance8.default({
        src: src,
        layerHTML: layerHTML,
        onSuccess: function onSuccess(s) {
          s.show();
        },
        onError: function onError() {
          Bridge.showToast('图片地址无效', { mask: false });
        }
      });
    } else {
      this.preview.setSrc(src);
      this.preview.setLayerHTML(layerHTML);
      this.preview.update();
    }
  },
  /* -----------------------------------------------------
    视频插件
  ----------------------------------------------------- */
  // debug:录像
  chooseVideo: function chooseVideo() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    console.log('chooseVideo方法在浏览器上无法运行');
    var res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseVideo:ok',
      tempFilePath: 'http://res.waiqin365.com/video/v2001.MP4',
      duration: '',
      size: '',
      height: '',
      width: ''
    };
    if (params.success) params.success(res);
  },
  /* -----------------------------------------------------
    人员插件
  ----------------------------------------------------- */
  getContactMore: function getContactMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success([{
      id: '4655721687632479006',
      name: '员工1'
    }, {
      id: '4655721687632479007',
      name: '员工2'
    }]);
  },
  getContact: function getContact() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success({
      id: '4655721687632479006',
      name: '员工1'
    });
  },
  /* -----------------------------------------------------
    客户插件
  ----------------------------------------------------- */
  customerMore: [{
    "check": true,
    "distance": 31,
    "labelType": 0,
    "addr": "南京市建邺区康文路康缘智汇港附近",
    "approval_status": "3",
    "code": "20180403004",
    "cooperate_status": "1",
    "district_id": "",
    "id": "5330457627710680963",
    "lat": "",
    "location": "31.983362,118.73069",
    "lon": "",
    "manager_name": "",
    "name": "客户门店经销商1",
    "name_py": "20180403004 20180403004",
    "trade_type": "3",
    "type_id": "",
    "type_image": ""
  }, {
    "check": true,
    "distance": 5,
    "labelType": 0,
    "addr": "江苏省南京市建邺区康文路康缘智汇港附近",
    "approval_status": "3",
    "code": "storethree",
    "cooperate_status": "1",
    "district_id": "",
    "id": "8834765014408029232",
    "lat": "",
    "location": "31.983679,118.730766",
    "lon": "",
    "manager_name": "",
    "name": "客户门店经销商2",
    "name_py": "mendian3 md3",
    "trade_type": "3",
    "type_id": "",
    "type_image": ""
  }, {
    "addr": "南京市建邺区康文路南京金贝网络科技有限公司附近",
    "approval_status": "3",
    "check": false,
    "code": "CUS000084",
    "cooperate_status": "1",
    "distance": -1,
    "district_id": "-1",
    "id": "8045732772848971055",
    "labelType": 2,
    "lat": "31.983311",
    "location": "31.983311,118.730527",
    "lon": "118.730527",
    "manager_name": "大表哥",
    "name": "客户门店经销商3",
    "name_py": "201801171557 201801171557",
    "trade_type": "3",
    "type_id": "-1",
    "type_image": ""
  }, {
    "addr": "南京市建邺区康文路南京金贝网络科技有限公司附近",
    "approval_status": "3",
    "check": true,
    "code": "CUS000085",
    "cooperate_status": "1",
    "distance": 46,
    "district_id": "",
    "id": "8353170616312361122",
    "labelType": 0,
    "lat": "",
    "location": "31.983301,118.730517",
    "lon": "",
    "manager_name": "",
    "name": "客户门店经销商4",
    "name_py": "201801171624 201801171624",
    "trade_type": "3",
    "type_id": "",
    "type_image": ""
  }],
  customerMoreLen: 1,
  getCustomerMore: function getCustomerMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    var result = [];
    for (var i = 0; i < this.customerMoreLen; i++) {
      result.push(this.customerMore[i]);
    }
    this.customerMoreLen++;
    if (this.customerMoreLen > this.customerMore.length) {
      this.customerMoreLen = 1;
    }
    if (params.success) params.success(result);
  },
  getCustomer: function getCustomer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success({
      id: '6468207804099075062',
      name: '客户门店经销商1'
    });
  },
  getCustomerType: function getCustomerType() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户类型1'
    });
  },
  getCustomerAreaMore: function getCustomerAreaMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success([{
      id: '5365268129453435373',
      name: '客户区域1'
    }, {
      id: '5365268129453435374',
      name: '客户区域2'
    }]);
  },
  getCustomerArea: function getCustomerArea() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户区域1'
    });
  },
  // 部门插件
  getDepartmentMore: function getDepartmentMore(params) {
    this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
  },
  getDepartment: function getDepartment() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    params.success({
      id: '5343180131602024954',
      name: '开发一部'
    });
  },
  // 单选商品
  getGoods: function getGoods() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('此功能仅可在外勤客户端中使用', { mask: false });
      return;
    }
    if (params.success) params.success({
      id: '5343180131602024954',
      name: '商品1',
      propvalues: '', // 商品属性不带排序号
      nameSpec: '', // 规格名称
      productRemarks: '', // 备注
      props: '', // 商品属性介绍
      propDetail: '', // 商品属性详情
      reportUnitName: '', // 报表单位名称
      reportUnitID: '', // 报表单位ID
      reportUnitRatio: '' // 报表单位比率
    });
  },
  // 打开新的窗口
  openWindow: function openWindow() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (params.url) window.location.href = params.url;
  },
  // 关闭窗口
  closeWindow: function closeWindow() {
    window.history.go(-1);
  },
  // 回到主页
  goHome: function goHome() {
    window.history.go(-1);
  },
  // 客户端返回绑定
  addBackPress: function addBackPress() {
    console.log('addBackPress方法在浏览器上无法运行');
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress() {
    console.log('removeBackPress方法在浏览器上无法运行');
  },
  /**
    * 获取当前地理位置
    * @param {Object} params
    * params: {
    * type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
    * timeout {Number}: 超时,
    * cache {Number}: 默认60秒缓存防重复定位
    * }
    * @returns {Object} {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
    */
  getLocation: function getLocation() {
    var _this2 = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('定位功能仅可在微信或APP中使用', { mask: false });
      setTimeout(function () {
        if (params.fail) params.fail({ errMsg: 'getLocation:定位功能仅可在微信或APP中使用' });
      }, 1000);
      return;
    }
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
    setTimeout(function () {
      _this2.locating = false;
      var res = { longitude: '118.730515', latitude: '31.982473', speed: '0.0', accuracy: '3.0.0'
        // 将位置信息存储到cookie中60秒
      };if (params.cache) _DB2.default.setCookie('app_location', (0, _stringify2.default)(res), params.cache || 60);
      if (params.success) params.success(res);
    }, 2000);
  },
  // 获取当前地理位置带地图
  getLocationMap: function getLocationMap() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('带地图定位功能仅可在外勤APP中使用', { mask: false });
      if (params.fail) params.fail({ errMsg: 'getLocationMap:带地图定位功能仅可在外勤APP中使用' });
      return;
    }
    setTimeout(function () {
      if (params.success) params.success({ longitude: '118.730515', latitude: '31.982473', speed: '0.0', accuracy: '3.0.0', address: '江苏省南京市新城科技园' });
    }, 500);
  },

  /* -----------------------------------------------------
    获得两个点之间的距离
    @params {point1: {longitude: '', latitude: ''}, point2: {longitude: '', latitude: ''}, fail: fn
    @return km
  ----------------------------------------------------- */
  getDistance: function getDistance() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!params.point1 || !params.point1.latitude || !params.point1.longitude || !params.point2 || !params.point2.latitude || !params.point2.longitude) {
      if (params.fail) params.fail({ errMsg: 'getDistance:传入的坐标不正确' });
      return;
    }
    var lat1 = params.point1.latitude;
    var lng1 = params.point1.longitude;
    var lat2 = params.point2.latitude;
    var lng2 = params.point2.longitude;
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function scanQRCode() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.debug) {
      this.showToast('扫码功能仅可在微信或APP中使用', { mask: false });
      if (params.fail) params.fail({ errMsg: 'scanQRCode:扫码失败' });
      return;
    }
    setTimeout(function () {
      if (params.success) params.success({ resultStr: '504823170310092750280333' });
    }, 500);
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
    onUploadSuccess:function(imgMap,res) // 单张上传成功
    onUploadFail:function(index, item) // 单张上传失败
    onUploadsSuccess:function(imgMap) // 全部上传成功
  })
  */
  Image: function Image() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var s = this;
    var msg = '';
    // 选择照片
    s.choose = function () {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!Bridge.debug) {
        if (params.onChooseFail) params.onChooseFail({ errMsg: 'chooseImage:拍照功能只能在APP或者微信中使用' });else Bridge.showToast('拍照功能只能在APP或者微信中使用', { mask: false });
        return;
      }
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed']
      };
      var count = option.max - option.currentCount;
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片';
        Bridge.showToast(msg);
        return;
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1;
      Bridge.chooseImage({
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
          Bridge.showToast('选择照片失败,请检查是否开启定位权限', { mask: false });
        },
        cancel: function cancel() {},
        complete: function complete() {}
      });
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
            var msg = '您选择的第' + index + '张图片上传失败，稍后请重试';
            Bridge.showToast(msg, { mask: false });
            if (params.onUploadFail) params.onUploadFail(index, imgMap[img]);
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