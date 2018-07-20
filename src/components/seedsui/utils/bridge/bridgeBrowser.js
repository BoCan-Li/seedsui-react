import DB from './../db';
import Device from './../device';
import EventUtil from './../eventutil';
import jsonp from 'jsonp';
// 系统参数
import client from './../axiosApi';
import Toast from './../../Toast/toast.js';
import Loading from './../../Loading/loading.js';

var Bridge = {
  platform: 'browser',
  /* 初始化配置 */
  config: function (opts) {
    console.log('config方法仅在微信上工作')
    if (opts.onSuccess) opts.onSuccess()
  },
  /* 获得版本信息 */
  getAppVersion: function () {
    return window.navigator.appVersion
  },
  /* 拍照、本地选图 */
  chooseImage: function (params) {
    console.log('chooseImage方法在浏览器上无法运行')
  },
  /* 上传图片 */
  uploadImage: function (params) {
    console.log('uploadImage方法在浏览器上无法运行')
  },
  /* 图片预览 */
  previewImage: function (params) {
    console.log('previewImage方法在浏览器上无法运行')
  },
  /*
  * 打开新的窗口
  * params: {url:''}
  * */
  openWindow: function (params) {
    window.location.href = params.url
  },
  /* 关闭窗口 */
  closeWindow: function () {
    window.history.go(-1)
  },
  /* 回到主页 */
  goHome: function () {
    window.history.go(-2)
  },
  /* 判断是否是主页 */
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  /* 客户端添加返回绑定 */
  addBackPress: function () {
    // 微信设置appId
    // const appId = Device.getUrlParameter('appId');
    // if (appId && appId !== 'false') {
    //   DB.setStore('app_appId', appId);
    // }
    console.log('addBackPress方法在浏览器上无法运行')
  },
  /* 客户端移除返回绑定 */
  removeBackPress: function () {
    console.log('removeBackPress方法在浏览器上无法运行')
  },
  /* 获取当前地理位置 */
  getLocation: function (params) {
    if (params.onError) params.onError({code:'locationFail', msg: '此功能仅可在微信或APP中使用'})
    // 模拟getLocation定位
    // setTimeout(function () {
    //   var res = {longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'}
    //   if (params.onSuccess) params.onSuccess(res)
    // }, 500)
  },
  /*
   * 百度地图:获取当前位置名称
   * params：{type: 'gcj02', longitude: '', latitude: '', onSuccess: fn, onFail: fn}
   * 返回：{address:'地址全称'}
   * */
  getAddress: function (params) {
    var url = 'https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + params.latitude + ',' + params.longitude + '&output=json&pois=1&ak=IlfRglMOvFxapn5eGrmAj65H&ret_coordtype=gcj02ll'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.onError) params.onError({code: 'addressFail', msg: '获取位置名称失败,请稍后重试' + err})
      } else {
        var addrs = {}
        if (data.result && data.result.formatted_address) {
          addrs.address = data.result.formatted_address
          if (params.onSuccess) params.onSuccess(addrs)
        } else {
          if (params.onError) params.onError({code: 'addressFail', msg: '获取位置名称失败,请稍后重试'})
        }
      }
    });
  },
  /*
   * 百度地图:获得两个点之间的距离
   * params: {point1: {longitude: '', latitude: ''}, point2: {longitude: '', latitude: ''}, onError: fn)
   * 返回km
   * */
  getDistance: function(params) {
    if (!params.point1 || !params.point1.latitude || !params.point1.longitude || !params.point2 || !params.point2.latitude || !params.point2.longitude) {
      if (params.onError) params.onError({code: 'distanceFail', msg: '传入的坐标不正确'})
      return
    }
    var lat1 = params.point1.latitude
    var lng1 = params.point1.longitude
    var lat2 = params.point2.latitude
    var lng2 = params.point2.longitude
    var radLat1 = lat1 * Math.PI / 180.0
    var radLat2 = lat2 * Math.PI / 180.0
    var a = radLat1 - radLat2
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode (params) {
    if (params.onError) params.onError({code: 'qrcodeFail', msg: '此功能仅可在微信或APP中使用'})
  },
  /* 退出到登陆页面 */
  logOut: function (message) {
    // 如果有errMsg,则停止
    var errMsg = Device.getUrlParameter('errMsg')
    // 如果地址栏有errMsg,则优先显示地址栏
    if (errMsg) {
      try {
        errMsg = decodeURIComponent(errMsg)
      } catch (e) {
        errMsg = '未知错误'
      }
      window.location.replace('/h5fw/#/_react_/exception/' + errMsg)
      return
    }
    // 否则跳转到登录页面
    var login_url = '/h5fw/#/_react_/login'
    // openId & appId
    login_url += `/${DB.getStore('app_openId') || 'false'}/${DB.getStore('app_appId') || 'false'}`
    // message
    login_url += '?msg=' + (message || '')
    // 红包页面跳回
    if (window.location.href.indexOf('/redpacket') >= 0) {
      login_url += '&page=redpacket'
    }
    window.location.replace(login_url)
  },
  /*
    * 获取上传图片路径,与后端约定好的固定格式
    * dir: '目录', params：{customPath: true | false 自定义目录}
    * 返回路径/月份
    */
  getUploadDir: function (dir, params) {
    var path = dir || 'test/test01' // 定义的目录
    var month = new Date().format('yyyyMM') // 增加月份目录
    if (params) {
      if (params.customPath) return dir
    }
    return `${path + '/' + month}/`;
  },
  /*
    * 获取图片全路径, 用于提交表单
    * dir: '目录', imgIds: '图片名称集合'
    */
  getUploadImgsPath: function (dir, imgIds) {
    const imgs = imgIds.map((imgId) => {
      return dir + imgId;
    });
    return imgs.join(',');
  },
  Image: function (params) {
    var s = this
    s.imgs = ''
    s.imgMap = {}
    s.choose = function (watermark) {
      if (params.onError) params.onError({code: 'chooseFail', msg: '此功能仅可在微信或APP中使用'})
    }
    s.deleteImg = function (key) {
    }
    s.deleteAfter = function (index) {
    }
    s.destory = function () {
    }
    s.upload = function () {
    }
    s.preview = function (index) {
    }
  },
  /*
   * 设置系统参数
   * @param data: {appId: '', openId: '', image_url: '', mobile: '', selectedSupplier: object, sysParms: object}
   * */
  setSystemParameter: function (data) {
    // 设置系统参数
    if (data.sysParms) DB.setStore('app_sysparams', data.sysParms)
    // 设置图片主域名
    let imgDomain = data.image_url ? data.image_url.clearProtocol() : '';
    if (imgDomain && imgDomain.length - 1 !== imgDomain.lastIndexOf('/')) {
      imgDomain = imgDomain + '/';
      DB.setStore('app_imgDomain', decodeURIComponent(imgDomain));
    } else {
      console.log('图片域名未定义');
      return {code: 'imgDomainFail', msg: '图片域名未定义'};
    }
    // 设置uid
    DB.setStore('app_uid', data.uid || '');
    // 设置手机号
    DB.setStore('app_mobile', data.mobile || '');
    // 设置appId和openId
    DB.setStore('app_openId', data.openId || '');
    DB.setStore('app_appId', data.appId || '');
    // 设置选中的供货商
    if (data.selectedSupplier && typeof data.selectedSupplier === 'object') {
      DB.setStore('app_selectedSupplier', data.selectedSupplier);
    } else {
      console.log('没有供货商');
      return {code: 'selectedSupplierFail', msg: '请选择供货商'};
    }
    // 记录日志
    DB.setSession('app_logger', '获得的系统参数:' + JSON.stringify(data));
  },
  /*
   * 获取系统参数
   * 参数: params{appId: '', code: ''}
   * 返回：{resultStr:''}
   * */
  getSystemParameter: function (params) {
    var sysparams = DB.getStore('app_sysparams') || []
    for (var i = 0, sysparam; sysparam = sysparams[i++];) { // eslint-disable-line
      if (sysparam.appId === params.appId && sysparam.code === params.code) {
        return sysparam.value
      }
    }
    return ''
  },
  loadSystemParameter: function (callback) {
    // 判断localstorge是否有值
    if (DB.getStore('app_uid')) {
      callback();
      return;
    }
    client.get(`/login/getSystemParameter.action`).then(result => {
      if (result.code === '1') {
        this.setSystemParameter(result.data);
        // 加载数据
        callback();
      } else {
        // 提示获取地址失败
        this.showToast(result.message)
      }
    }).catch(() => {
      this.logOut('请求系统参数异常，请重新登录')
      // this.showMsg('请求系统参数异常，请稍后重试');
    });
  },
  /*
   * 打印日志
   * 参数: el绑定点击5次的元素, log日志文字
   * 结果：显示日志信息
   * */
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
      // 提示获取地址失败
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
        maskClass: 'mask toast-mask ' + (params.position ? params.position : 'middle') + (params.mask === false ? ' toast-propagation' : ''),
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      this.toast.setHTML(msg)
      this.toast.setMaskClassName('mask toast-mask ' + (params.position ? params.position : 'middle') + (params.mask === false ? ' toast-propagation' : ''))
    }
    this.toast.show()
  },
  // 弹出loading
  loading: null,
  showLoading: function (params = {}) {
    if (!this.loading) {
      this.loading = new Loading({
        type: params.type,
        maskCss: params.css || null
      });
    } else {
      if (params.type) this.loading.setType(params.type)
      if (params.css) this.loading.setMaskCss(params.css)
      this.loading.setMaskClassName('mask loading-mask ' + (params.mask === false ? ' loading-propagation' : ''))
    }
    this.loading.show()
  }
}
export default Bridge