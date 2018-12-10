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

var _bridgeBrowser = require('./bridgeBrowser.js');

var _bridgeBrowser2 = _interopRequireDefault(_bridgeBrowser);

var _Device = require('./../Device.js');

var _Device2 = _interopRequireDefault(_Device);

var _DB = require('./../DB.js');

var _DB2 = _interopRequireDefault(_DB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bridge = {
  platform: _Device2.default.platform,

  // 关闭窗口
  closeWindow: function closeWindow() {
    wx.closeWindow(); // eslint-disable-line
  },
  // 客户端默认返回控制
  back: function back() {
    var isFromApp = _Device2.default.getUrlParameter('isFromApp', location.search) || '';
    if (isFromApp === '1') {
      window.history.go(-1);
    } else if (isFromApp === 'home') {
      window.history.go(-1);
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
          window.history.go(-1);
        }
      });
    } else {
      window.history.go(-1);
    }
  },
  // 客户端返回绑定
  addBackPress: function addBackPress() {
    if (wx.onHistoryBack) wx.onHistoryBack(function () {
      // eslint-disable-line
      this.back();
      return false;
    });
  },
  // 客户端移除返回绑定
  removeBackPress: function removeBackPress() {
    if (wx.onHistoryBack) wx.onHistoryBack(function () {
      // eslint-disable-line
      return true;
    });
  },
  /* -----------------------------------------------------
    获取当前地理位置
    @params {type: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84'}
    @return {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
  ----------------------------------------------------- */
  getLocation: function getLocation() {
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
      if (params.onSuccess) params.onSuccess(appLocation);
      return;
    }
    // 定位超时
    setTimeout(function () {
      if (!_DB2.default.getCookie('app_location')) {
        var errMsg = '请确认微信定位权限是否开启,如未开启将影响图片上传功能';
        if (params.onError) params.onError({ code: 'locationFail', msg: errMsg });else _bridgeBrowser2.default.showToast(errMsg, { mask: false });
      }
    }, 5000);
    // 定位
    wx.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'gcj02',
      success: function success(res) {
        // 将位置信息存储到cookie中60秒
        if (res.latitude && res.latitude) {
          _DB2.default.setCookie('app_location', (0, _stringify2.default)(res), 60);
          if (params.onSuccess) params.onSuccess(res);
        } else {
          var errMsg = '定位失败,请重新进入此页面';
          if (params.onError) params.onError({ code: 'locationFail', msg: errMsg });else _bridgeBrowser2.default.showToast(errMsg, { mask: false });
        }
      },
      fail: function fail() {
        var errMsg = '定位失败,请检查微信定位权限是否开启';
        if (params.onError) params.onError({ code: 'locationFail', msg: errMsg });else _bridgeBrowser2.default.showToast(errMsg, { mask: false });
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
        if (!params.onSuccess) return;
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
        params.onSuccess(wxRes);
      },
      fail: function fail(res) {
        if (params.onError) params.onError({ code: 'qrcodeFail', msg: '扫码失败,请退出重试' + res });else _bridgeBrowser2.default.showToast('扫码失败,请退出重试', { mask: false });
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
              sourceType: res.sourceType
            };
          }
          if (params.onChooseSuccess) params.onChooseSuccess(imgMap, res);
          s.upload(imgMap);
        },
        fail: function fail(res) {
          _bridgeBrowser2.default.showToast('选择照片失败,请检查是否开启定位权限', { mask: false });
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
            var msg = '您选择的第' + index + '张图片上传失败，稍后请重试';
            _bridgeBrowser2.default.showToast(msg, { mask: false });
            delete imgMap[img];
            if (params.onUploadFail) params.onUploadFail(imgMap, { index: index, item: imgMap[img], code: 'uploadFail', msg: msg });
            loop(++index);
          }
        });
      };
      loop(0);
    };
  }
};

exports.default = (0, _assign2.default)({}, _bridgeBrowser2.default, Bridge);
module.exports = exports['default'];