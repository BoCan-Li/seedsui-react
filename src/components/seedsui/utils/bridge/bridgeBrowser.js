import DB from './../db';
import Device from './../device';
import EventUtil from './../eventutil';
import jsonp from 'jsonp';
// 系统参数
import client from './../axiosApi';
import Toast from './../../Toast/toast.js';
import Alert from './../../Alert/alert.js';
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
    this.showToast('此功能仅可在微信或APP中使用', {mask: false})
    // 模拟数据
    // var res = {
    //   sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
    //   errMsg: 'chooseImage:ok',
    //   localIds: ['https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', 'https://static.zcool.cn/v3.5.180706.5/zcool/client/image/logo.png']
    // }
    // if (params.success) params.success(res)
  },
  /* 上传图片 */
  uploadImage: function (params) {
    // this.showToast('此功能仅可在微信或APP中使用', {mask: false})
    this.showLoading('正在上传...')
    setTimeout(() => {
      this.hideLoading()
      this.showToast('上传完成', {mask: false})
      var res = {
        errMsg: 'uploadImage:ok',
        mediaUrl: '',
        serverId: '1237378768e7q8e7r8qwesafdasdfasdfaxss111'
      }
      if (params.success) params.success(res)
    }, 1000)
  },
  /* 图片预览 */
  previewImage: function (params) {
    console.log('previewImage方法在浏览器上无法运行')
  },
  /**
   * 人员插件
   * params: {onSuccess: fn}
   */
  getContact: function () {
    this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
  },
  getContactMore: function () {
    this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
  },
  /**
   * 客户插件
   * params: {superTradeType | tradeType: 默认值为1(1.客户 2.经销商 3.门店), selectedIds: '', onSuccess: fn}
   */
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
    "name": "20180403003",
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
    "name": "门店3",
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
    "name": "201801171557",
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
    "name": "201801171624",
    "name_py": "201801171624 201801171624",
    "trade_type": "3",
    "type_id": "",
    "type_image": ""
  }],
  customerMoreLen: 1,
  getCustomerMore: function (params) {
    // this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
    const result = []
    for (let i = 0; i < this.customerMoreLen; i++) {
      result.push(this.customerMore[i])
    }
    this.customerMoreLen++
    if (this.customerMoreLen > this.customerMore.length) {
      this.customerMoreLen = 1
    }
    params.onSuccess(result)
  },
  getCustomer: function (params) {
    // this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
    params.onSuccess({
      id: '5365268129453435373',
      name: '门店1号'
    })
  },
  getCustomerType: function (params) {
    this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
  },
  getCustomerArea: function (params) {
    this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
  },
  /**
   * 部门插件
   * params: {selectedIds: '',onSuccess: fn}
   */
  getDepartmentMore: function (params) {
    this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
  },
  getDepartment: function (params) {
    // this.showToast('此功能仅可在外勤客户端中使用', {mask: false})
    params.onSuccess({
      id: '5343180131602024954',
      name: '开发一部'
    })
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
  // 客户端默认返回控制
  back: function () {
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') {
      window.history.go(-1);
    } else if (isFromApp === 'home') {
      window.history.go(-1);
    } else if (isFromApp === 'confirm') {
      Bridge.showConfirm('您确定要离开此页面吗?', {
        onSuccess: (e) => {
          e.hide()
          window.history.go(-1)
        }
      });
    } else if (isFromApp === 'confirm-close') {
      Bridge.showConfirm('您确定要离开此页面吗?', {
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
    // 微信设置appId
    // const appId = Device.getUrlParameter('appId');
    // if (appId && appId !== 'false') {
    //   DB.setStore('app_appId', appId);
    // }
    console.log('addBackPress方法在浏览器上无法运行')
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    console.log('removeBackPress方法在浏览器上无法运行')
  },
  /*
   * 获取当前地理位置
   * type：'wgs84'|'gcj02'坐标类型，微信默认使用国际坐标'wgs84'
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度'}
   * */
  getLocation: function (params) {
    this.showToast('定位功能仅可在微信或APP中使用', {mask: false})
    if (params.onError) params.onError({code:'locationFail', msg: ''})
    // setTimeout(function () {
    //   if (params.onSuccess) params.onSuccess({longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'})
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
        currentCount: args.currentCount || 1,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed']
      }
      var count = option.max - option.currentCount
      if (count <= 0) {
        msg = '最多只能传' + option.max + '张照片'
        Bridge.showToast(msg)
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
          Bridge.showToast('选择照片失败,请检查是否开启定位权限', {mask: false})
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
            Bridge.showToast(msg, {mask: false})
            if (params.onUploadFail) params.onUploadFail(index, imgMap[img])
            loop(++index)
          }
        })
      }
      loop(0)
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
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      this.toast.setHTML(msg)
      this.toast.setMaskClassName('mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''))
      this.toast.setToastClassName('toast ' + (params.position ? params.position : 'middle'))
    }
    this.toast.show()
    if (params.onSuccess) {
      setTimeout(() => {
        params.onSuccess()
      }, params.duration ? Math.round(params.duration / 2) : 1000)
    }
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
          if (params.onSuccess) params.onSuccess(e)
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
					if (params.onSuccess) params.onSuccess(e)
        },
        onClickCancel: function(e) {
          if (params.onError) params.onError(e)
          else e.hide()
				},
      })
    } else {
      if (params.caption) this.confirm.setCaption(params.caption)
      if (params.onSuccess) this.confirm.setOnClickSubmit(params.onSuccess)
      if (params.onError) this.confirm.setOnClickCancel(params.onError)
      this.confirm.setHTML(msg)
    }
    this.confirm.show()
  }
}
export default Bridge