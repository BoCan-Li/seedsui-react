'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
  platform: 'waiqin',
  config: function config() {
    var _this = this;

    document.addEventListener('deviceready', function () {
      _this.addBackPress();
      _DB2.default.setSession('bridge_isready', '1');
    });
  },
  // 获得版本信息
  getAppVersion: function getAppVersion() {
    var ua = navigator.userAgent;
    var verExp = ua.match(/WqAppVersion\/.{0,}(\d+\.\d+\.\d+)/);
    if (verExp && verExp[1]) return verExp[1].trim();
    return '';
  },
  // 退出到登陆页面
  logOut: function logOut(msg) {
    wq.wqload.wqBackToLogin((0, _stringify2.default)({ message: msg || '' })); // eslint-disable-line
  },
  /*
  * 商联支付
  * params: {appKey:'', dealerCode:'', orderId:'', payAmount:''}
  * */
  slopenpay: function slopenpay(params, callback) {
    wq.wqpay.slopenpay(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, null, params ? (0, _stringify2.default)(params) : null);
  },
  /* -----------------------------------------------------
    文件操作
  ----------------------------------------------------- */
  /* // 文件是否存在
  isExistsFile({
    "fileName": "ss.txt",
    "size": 200
  }，(result) => {
  // 返回{{"isExists":"","filePath":"","fileName":""}，isExists:'0'不存在，'1'存在
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
    "id": "id",
    "fileName": "ss.txt",
    "downloadUrl": "http://...",
    "size": 200
  }，(result) => {
  // 返回{{"code":"","filePath":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }) */
  downloadFile: function downloadFile(params, callback) {
    wq.wqio.downloadFile(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* // 附件打开
  openFile（{
    "filePath": ""
  }，(result) => {
  // 返回{{"code":"","message":""}，code:'0'失败，'1'成功，message失败原因
  }） */
  openFile: function openFile(params, callback) {
    wq.wqio.openFile(function (result) {
      // eslint-disable-line
      if (callback) callback(result);
    }, params ? (0, _stringify2.default)(params) : null);
  },
  /* -----------------------------------------------------
    视频录制
    @params {
      "id": '21341234' // 宴会id
    }
    @return [
    ]
  ----------------------------------------------------- */
  /* -----------------------------------------------------
    视频上传
    @params {
      "id": '21341234' // 宴会id
    }
    @return [
    ]
  ----------------------------------------------------- */
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
        if (params && params.onSuccess) params.onSuccess(wqRes);
      } else {
        if (params.onError) params.onError({ code: 'qrcodeFail', msg: '扫码失败请稍后重试' });
      }
    });
  },
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
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // 先从cookie中读取位置信息
    var appLocation = _DB2.default.getCookie('app_location') || '';
    if (appLocation) {
      if (params.onSuccess) params.onSuccess(JSON.parse(appLocation));
      return;
    }
    wq.wqlocation.getLocationBackground(function (res) {
      // eslint-disable-line
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
          // 将位置信息存储到cookie中10秒
        };_DB2.default.setCookie('app_location', (0, _stringify2.default)(location), 10);
        if (params.onSuccess) params.onSuccess(location);
      } else {
        if (params.onError) params.onError({ code: 'locationFail', msg: '定位失败,请检查订货365定位权限是否开启' });
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
        if (params.onSuccess) params.onSuccess(location);
      } else {
        if (params.onError) params.onError({ code: 'locationFail', msg: '定位失败,请检查订货365定位权限是否开启' });
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
      } else if ((0, _stringify2.default)(argParams.sizeType) === (0, _stringify2.default)(['compressed']) || argParams.sizeType === 'compressed') {
        pwidth = '750';
        params.pwidth = pwidth;
      }
    }
    // 格式化count
    var max = 5;
    if (argParams && argParams.count) {
      max = argParams.count;
      params.max = '' + max;
    }
    // viewId | 水印相关: photoType | customerName | submitName | cmLocation | selectItems
    params.viewId = '' + parseInt(Math.random() * 1000, 10);
    if (argParams && argParams.viewId) {
      params.viewId = argParams.viewId;
    }
    wq.wqphoto.getPhoto(function (result) {
      // eslint-disable-line
      if (argParams && argParams.success) {
        // 格式化返回结果[{src:地址, path: base64: name: 文件名}] 为 imgMap{path: {serverId: '', sourceType: ''} }
        var imgMap = {};
        for (var i = 0, item; item = result[i++];) {
          // eslint-disable-line
          imgMap[item.name] = {
            serverId: '',
            name: item.name,
            sourceType: operation === '0' ? 'camera' : 'album',
            base64: item.path,
            src: item.src
          };
        }
        argParams.success(imgMap);
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
      _bridgeBrowser2.default.showToast('请传入上传路径dir后再上传图片');
      return;
    }
    if (!params.localIds || Object.isEmptyObject(params.localIds)) {
      _bridgeBrowser2.default.showToast('请传入上传图片列表后再上传图片');
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
    @params {urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接',index:'图片索引'}
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
    @params {onSuccess: fn}
  ----------------------------------------------------- */
  getContactMore: function getContactMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', aclType: '0只能看到下属 不传或者其他的参数为全部人员,默认为空', onSuccess([{id: '', name: ''}])}
    wq.wqcontact.getContactMore(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  getContact: function getContact() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcontact.getContact(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
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
    // {selectedIds: 'id,id', tradeType: '1客户 2经销商 3门店,默认1', hiddenAdd: '隐藏添加按钮,默认false', dms_type: 'dms类型', onSuccess([{id: '', name: ''}])}
    wq.wqcustomer.getCustomerMore(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)((0, _assign2.default)({ hiddenAdd: true }, params)));
  },
  getCustomer: function getCustomer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcustomer.getCustomer(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)((0, _assign2.default)({ hiddenAdd: true }, params)));
  },
  getCustomerType: function getCustomerType() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {id: 'id', name: 'name', onSuccess({id: '', name: ''})}
    wq.wqcustomer.getCustomerType(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  getCustomerAreaMore: function getCustomerAreaMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', onSuccess([{id: '', name: ''}])}
    if (_Device2.default.platformVersion < '6.2.2') {
      _bridgeBrowser2.default.showToast('此功能需要升级至6.2.2及以上的客户端', { mask: false });
      return;
    }
    wq.wqcustomer.getCustomerAreaMore(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  getCustomerArea: function getCustomerArea() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqcustomer.getCustomerArea(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    部门插件
    @params: {selectedIds: '',onSuccess: fn}
  ----------------------------------------------------- */
  getDepartmentMore: function getDepartmentMore() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {selectedIds: 'id,id', onSuccess([{id: '', name: ''}])}
    wq.wqdepartment.getDepartmentMore(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  getDepartment: function getDepartment() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    wq.wqdepartment.getDepartment(function (args) {
      // eslint-disable-line
      if (params.onSuccess) params.onSuccess(args);
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
      if (params.onSuccess) params.onSuccess(args);
    }, (0, _stringify2.default)(params));
  },
  /* -----------------------------------------------------
    打开新的窗口
    @params {url:'', title: ''}默认为打开一个webview页面
  ----------------------------------------------------- */
  openWindow: function openWindow(params, callback) {
    wq.wqload.wqOpenUrl(callback ? callback : null, null, params ? (0, _stringify2.default)(params) : null); // eslint-disable-line
  },
  // 关闭当前窗
  closeWindow: function closeWindow() {
    wq.wqload.wqClosePage(); // eslint-disable-line
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
        Bridge.closeWindow();
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
  // 客户端返回绑定
  addBackPress: function addBackPress() {
    document.addEventListener('backbutton', this.back, false); // eslint-disable-line
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress() {
    document.removeEventListener('backbutton', this.back, false); // eslint-disable-line
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
        watermark: args.watermark || {}
        /* watermark: {
          photoType: 'xx', // 水印名称
          customerName: 'xx', // 客户名
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
          if (params.onChooseSuccess) params.onChooseSuccess(res);
        }
      }, option.watermark));
    };
  }
}; // require PrototypeObject.js
exports.default = (0, _assign2.default)({}, _bridgeBrowser2.default, Bridge);
module.exports = exports['default'];