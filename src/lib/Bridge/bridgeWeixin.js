import BridgeBrowser from './bridgeBrowser.js'
import ApiAxios from './../ApiAxios.js'
import Device from './../Device.js'
import DB from './../DB.js'

var Bridge = {
  platform: 'weixin',
  /**
   * 初始化配置
   * @opts {url: string, params: object, onSuccess: func, onError: func}
   */
  config: function (opts = {}) {
    var errMsg = ''
    var serviceUrl = opts.url || '/wxapi/getJsApiTicket.action'
    // 记录进入app的url，后面微信sdk
    var url = encodeURIComponent(window.location.href.split('#')[0]);
    var ticketParams = {
      appId: DB.getStore('app_appId') || '',
      url: url
    }
    ApiAxios.get(serviceUrl, opts.params || ticketParams).then(response => {
      let result = response
      if (result.code === '1') {
        if (opts.onSuccess) {
          opts.onSuccess({result: result, status: '1'})
        } else {
          this.wxSignature(opts, result)
        }
      } else {
        if (opts.onError) opts.onError({code: 'oauthInterfaceFail', msg: response.message})
        else BridgeBrowser.showToast(response.message, {mask: false})
      }
    })
    .catch(err => {
      errMsg = '微信鉴权接口异常,请稍后重试'
      if (opts.onError) opts.onError({code: 'oauthInterfaceFail', msg: errMsg})
      else BridgeBrowser.showToast(errMsg, {mask: false})
    })
  },
  wxSignature: function (opts, result) {
    var errMsg = ''
    const params = {
      debug: opts.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.data.appId, // 必填，公众号的唯一标识
      timestamp: result.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
      signature: result.data.signature,// 必填，签名，见附录1
      jsApiList: ['getLocation', 'chooseImage', 'uploadImage', 'previewImage', 'onHistoryBack', 'closeWindow', 'hideOptionMenu', 'hideMenuItems', 'scanQRCode']
    }
    if (!wx) { // eslint-disable-line
      errMsg = '微信组件下载失败,如需使用本地能力,请返回重试'
      if (opts.onFail) opts.onFail({code: 'bridgeInitFail', msg: errMsg})
      else BridgeBrowser.showToast(errMsg, {mask: false})
      return
    }
    wx.config(params) // eslint-disable-line
    wx.ready(function () { // eslint-disable-line
      // 隐藏右上角按钮
      // wx.hideOptionMenu() // eslint-disable-line
      // 桥接成功
      DB.setSession('bridge_isready', '1')
      // Callback
      if (opts.onReady) opts.onReady()
    })
    wx.error(function (res) { // eslint-disable-line
      // 桥接失败
      DB.setSession('bridge_isready', '-1')
      // Callback
      errMsg = '微信签名过期导致验证失败' + JSON.stringify(res)
      if (opts.onFail) opts.onFail({code: 'oauthFail', msg: errMsg})
      else BridgeBrowser.showToast(errMsg, {mask: false})
    })
  },
  // 关闭窗口
  closeWindow: function () {
    wx.closeWindow() // eslint-disable-line
  },
  // 客户端默认返回控制
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') {
      window.history.go(-1);
    } else if (isFromApp === 'home') {
      window.history.go(-1);
    } else if (isFromApp === 'confirm') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide()
          window.history.go(-1)
        }
      });
    } else if (isFromApp === 'confirm-close') {
      BridgeBrowser.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide()
          window.history.go(-1)
        }
      });
    } else {
      window.history.go(-1)
    }
  },
  // 客户端返回绑定
  addBackPress: function () {
    if (wx.onHistoryBack) wx.onHistoryBack(function () { // eslint-disable-line
      this.back()
      return false
    })
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    if (wx.onHistoryBack) wx.onHistoryBack(function () { // eslint-disable-line
      return true
    })
  },
  /* -----------------------------------------------------
    获取当前地理位置
    @params {type: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84'}
    @return {latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度'}
  ----------------------------------------------------- */
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
      if (params.onSuccess) params.onSuccess(appLocation)
      return
    }
    // 定位超时
    setTimeout(() => {
      if (!DB.getCookie('app_location')) {
        var errMsg = '请确认微信定位权限是否开启,如未开启将影响图片上传功能'
        if (params.onError) params.onError({code: 'locationFail', msg: errMsg})
        else BridgeBrowser.showToast(errMsg, {mask: false})
      }
    }, 5000)
    // 定位
    wx.getLocation({ // eslint-disable-line
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      type: 'gcj02',
      success: function (res) {
        // 将位置信息存储到cookie中60秒
        if (res.latitude && res.latitude) {
          DB.setCookie('app_location', JSON.stringify(res) , 60)
          if (params.onSuccess) params.onSuccess(res)
        } else {
          var errMsg = '定位失败,请重新进入此页面'
          if (params.onError) params.onError({code: 'locationFail', msg: errMsg})
          else BridgeBrowser.showToast(errMsg, {mask: false})
        }
      },
      fail: function () {
        var errMsg = '定位失败,请检查微信定位权限是否开启'
        if (params.onError) params.onError({code: 'locationFail', msg: errMsg})
        else BridgeBrowser.showToast(errMsg, {mask: false})
      },
      cancel: function (res) {
        if (params.onCancel) params.onCancel(res)
      },
      complete: function (res) {
        if (params.onComplete) params.onComplete(res)
      }
    })
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode (params = {}) {
    wx.scanQRCode({ // eslint-disable-line
      needResult: params.needResult || 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
      scanType: params.scanType || ['qrCode', 'barCode'],
      desc: 'scanQRCode desc',
      success: function (res) {
        if (!params.onSuccess) return;
        var wxRes = res
        // 如果没有设置needResult,则清除前缀
        if (isNaN(params.needResult)) {
          if (res.resultStr.indexOf('QR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('QR,'.length)
          } else if (res.resultStr.indexOf('EAN_13,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_13,'.length)
          } else if (res.resultStr.indexOf('EAN_8,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('EAN_8,'.length)
          } else if (res.resultStr.indexOf('AZTEC,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('AZTEC,'.length)
          } else if (res.resultStr.indexOf('DATAMATRIX,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('DATAMATRIX,'.length)
          } else if (res.resultStr.indexOf('UPCA,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCA,'.length)
          } else if (res.resultStr.indexOf('UPCE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('UPCE,'.length)
          } else if (res.resultStr.indexOf('CODABAR,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODABAR,'.length)
          } else if (res.resultStr.indexOf('CODE_39,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_39,'.length)
          } else if (res.resultStr.indexOf('CODE_93,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_93,'.length)
          } else if (res.resultStr.indexOf('CODE_128,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('CODE_128,'.length)
          } else if (res.resultStr.indexOf('ITF,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('ITF,'.length)
          } else if (res.resultStr.indexOf('MAXICODE,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('MAXICODE,'.length)
          } else if (res.resultStr.indexOf('PDF_417,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('PDF_417,'.length)
          } else if (res.resultStr.indexOf('RSS_14,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSS_14,'.length)
          } else if (res.resultStr.indexOf('RSSEXPANDED,') >= 0) {
            wxRes.resultStr = res.resultStr.substring('RSSEXPANDED,'.length)
          }
        }
        // 回调
        params.onSuccess(wxRes)
      },
      fail: function (res) {
        if (params.onError) params.onError({code: 'qrcodeFail', msg: '扫码失败,请退出重试' + res})
        else BridgeBrowser.showToast('扫码失败,请退出重试', {mask: false})
      },
      cancel: function (res) {
        if (params.onCancel) params.onCancel(res)
      },
      complete: function (res) {
        if (params.onComplete) params.onComplete(res)
      }
    })
  },
  /*
  * 拍照、本地选图
  * params：{sourceType:['album:相册', 'camera:拍照'],sizeType:['original:原图', 'compressed:压缩'],count:'最大张数', success:fn, fail:fn, cancel: fn, complete: fn}
  * 返回选定照片的本地ID列表{localIds:[]'}
  */
  chooseImage: function (params) {
    wx.chooseImage(params) // eslint-disable-line
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
  uploadImage: function (params) {
    wx.uploadImage(params) // eslint-disable-line
  },
  /*
  * 图片预览
  * params：{urls:'需要预览的图片http链接列表',current:'当前显示图片的http链接'}
  */
  previewImage: function (params) {
    wx.previewImage(params) // eslint-disable-line
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
    onUploadSuccess:function(imgMap,res) // 单张上传成功
    onUploadFail:function(index, item) // 单张上传失败
    onUploadsSuccess:function(imgMap) // 全部上传成功
  })
  */
  Image: function (params) {
    var s = this
    var msg = ''
    // 选择照片
    s.choose = function (args = {}) {
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed']
      }
      var count = option.max - option.currentCount
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片'
        BridgeBrowser.showToast(msg)
        return
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1
      Bridge.chooseImage({
        count: count, // 默认5
        sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res) {
          var imgMap = {}
          for(var i = 0, localId; localId = res.localIds[i++];){ // eslint-disable-line
            imgMap[localId] = {
              serverId: '',
              sourceType: res.sourceType
            }
          }
          if(params.onChooseSuccess) params.onChooseSuccess(imgMap, res)
          s.upload(imgMap)
        },
        fail: function (res) {
          BridgeBrowser.showToast('选择照片失败,请检查是否开启定位权限', {mask: false})
        },
        cancel: function () {
        },
        complete: function () {
        }
      })
    }
    // 上传照片
    s.upload = function (imgMap) {
      let imgs = Object.keys(imgMap)
      let loop = function (index) {
        if (index >= imgs.length) {
          return
        }
        let img = imgs[index]
        if (imgMap[img].serverId) {
          loop(++index)
          return
        }
        Bridge.uploadImage({
          localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            let serverId = res.serverId; // 返回图片的服务器端ID
            imgMap[img].serverId = serverId
            if (params.onUploadSuccess) params.onUploadSuccess(imgMap, res)
            if (index >= imgs.length - 1 && params.onUploadsSuccess) params.onUploadsSuccess(imgMap)
            loop(++index)
          },
          fail: function () {
            var msg = '您选择的第' + index + '张图片上传失败，稍后请重试'
            BridgeBrowser.showToast(msg, {mask: false})
            if (params.onUploadFail) params.onUploadFail(index, imgMap[img])
            loop(++index)
          }
        })
      }
      loop(0)
    }
  }
}

export default Object.assign({}, BridgeBrowser, Bridge)
