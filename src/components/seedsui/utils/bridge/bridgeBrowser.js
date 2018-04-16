// import createHistory from 'history/createBrowserHistory'
import DB from './../db';
import EventUtil from './../eventutil';
import coordtransform from 'coordtransform';

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
    location.href = params.url
  },
  /* 关闭窗口 */
  closeWindow: function () {
    history.go(-1)
  },
  /* 回到主页 */
  goHome: function () {
    history.go(-2)
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
    console.log('addBackPress方法在浏览器上无法运行')
  },
  /* 客户端移除返回绑定 */
  removeBackPress: function () {
    console.log('removeBackPress方法在浏览器上无法运行')
  },
  /* 获取当前地理位置 */
  getLocation: function (params) {
    console.log('只能模拟getLocation定位')
    setTimeout(function () {
      // 模拟微信国测局定位地址
      if (params.onSuccess) params.onSuccess({longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'})
    }, 1000)
  },
  /*
   * 百度地图:获取当前位置名称
   * params：{type: 'gcj02', longitude: 'xx', latitude: 'xx', onSuccess: ()}
   * 返回：{latitude:'纬度',longitude:'经度',speed:'速度',accuracy:'位置精度'}
   * */
  getAddress: function (params) {
    // 定位到容器<div id="baidu_container"></div>
    var map = new BMap.Map("baidu_container") // eslint-disable-line
    var bd09 = [params.longitude, params.latitude]
    // 国测局gcj02转百度坐标
    if (params.type === 'gcj02') {
      bd09 = coordtransform.gcj02tobd09(params.longitude, params.latitude)
    }
    // 国际坐标wgs84转百度坐标
    if (params.type === 'wgs84') {
      bd09 = coordtransform.wgs84tobd09(params.longitude, params.latitude)
    }
    var startPoint = new BMap.Point(bd09[0], bd09[1]) // eslint-disable-line
    map.centerAndZoom(startPoint, 15)
    let Geocoder = new BMap.Geocoder() // eslint-disable-line
    Geocoder.getLocation(map.getCenter(), (rs) => {
      if (params.onSuccess) params.onSuccess(rs)
    }, (res) => {
      if (params.onError) params.onError({code: '112', msg: '获取位置名称失败,请稍后重试' + res})
      else alert('code: 112, 获取位置名称失败,请稍后重试')
    })
  },
  /*
   * 百度地图:获得两个点之间的距离
   * params：{type: 'gcj02', point1: [longitude, latitude], point2: [longitude, latitude], onSuccess: ()}
   * 返回：distance米
   * */
  getDistance: function (params) {
    if (params.point1.length !== 2 || params.point2.length !== 2) {
      if (params.onError) params.onError('传入的坐标不正确')
      return
    }
    // 定位到容器<div id="baidu_container"></div>
    var map = new BMap.Map("baidu_container") // eslint-disable-line
    var point1 = params.point1
    var point2 = params.point2
    // 国测局gcj02转百度坐标
    if (params.type === 'gcj02') {
      point1 = coordtransform.gcj02tobd09(point1[0], point1[1])
      point2 = coordtransform.gcj02tobd09(point2[0], point2[1])
    }
    // 国际坐标wgs84转百度坐标
    if (params.type === 'wgs84') {
      point1 = coordtransform.wgs84tobd09(point1[0], point1[1])
      point2 = coordtransform.wgs84tobd09(point2[0], point2[1])
    }
    var startPoint = new BMap.Point(point1[0], point1[1]) // eslint-disable-line
    var endPoint = new BMap.Point(point2[0], point2[1]) // eslint-disable-line
    var pointDistance = map.getDistance(startPoint, endPoint).toFixed(2)
    return pointDistance
  },
  /*
   * 扫描二维码并返回结果
   * 返回：{resultStr:''}
   * */
  scanQRCode (params) {
    console.log('scanQRCode方法在浏览器上无法运行')
  },
  /* 退出到登陆页面 */
  logOut: function (message) {
    console.log('身份认证未通过,需要重新登录')
    // const history = createHistory()
    // let login_url = '/h5fw/#/_react_/login'
    // history.replace(login_url)
    // window.location.reload()
  },
  // 获取上传图片路径,与后端约定好的固定格式, tenantId/项目名/自定义路径/月份
  getUploadDir: function (params) {
    if (params.customPath) return params.path
    let path = params.path || 'test/test01'
    const month = new Date().format('yyyyMM')
    if (params.monthPath !== false) {
      path += '/' + month
    }
    return `${path}/`;
  },
  Image: function (params) {
    var s = this
    s.imgs = ''
    s.imgMap = {}
    s.photoLocation = function (point) {
      var watermark = ['南京市建邺区嘉陵江东街附近', '偏差300米']
      s.choose(watermark)
    }
    s.mixinChoose = function () {
    }
    s.choose = function (watermark) {
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
      return {code: 'undefinedDomain', msg: '图片域名未定义'};
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
      return {code: 'undefinedSelectedSupplier', msg: '请选择供货商'};
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
    EventUtil.addHandler(subscribeEl, 'multipleClick', function() {
      logContent.innerHTML = DB.getSession('app_logger') || '无日志'
      document.body.appendChild(logBox)
    })
    subscribeEl.setAttribute('data-multipleclick', '1')
  }
}
export default Bridge
