import DB from './../DB';
import Device from './../Device';
import Preview from './../Preview/instance.js';
import MediaUtil from './../MediaUtil';
import FullScreen from './../FullScreen';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

var Bridge = {
  /**
    * 定制功能
    */
  platform: 'browser',
  // 初始化配置
  config: function (params = {}) {
    var self = this
    if (params.debug) self.debug = params.debug
    if (!self.debug) {
      console.log('config方法仅在微信上工作')
      return
    }
    if (params.success) params.success()
  },
  // 判断是否是主页
  isHomePage: function (callback, rule) {
    if (rule && window.location.href.indexOf(rule) >= 0) {
      callback(true)
      return
    }
    callback(false)
  },
  // 获得版本信息
  getAppVersion: function () {
    return window.navigator.appVersion
  },
  // 退出到登陆页面
  logOut: function logOut() {
    console.log('logOut方法仅在app上工作');
  },
  // 回到主页
  goHome: function () {
    window.history.go(-1)
  },
  // 打开新的窗口
  openWindow: function (params = {}) {
    if (Device.device === 'pc') {
      window.open(params.url)
      return
    }
    if (params.url) window.location.href = params.url
  },
  // 关闭窗口
  closeWindow: function () {
    window.history.go(-1)
  },
  // 客户端返回绑定
  addBackPress: function () {
    console.log('addBackPress方法在浏览器上无法运行')
  },
  // 客户端移除返回绑定
  removeBackPress: function () {
    console.log('removeBackPress方法在浏览器上无法运行')
  },
  // 视频播放
  previewVideo: function (params = {}) {
    var target = document.getElementById('seedsui_preview_video')
    if (!target) {
      target = MediaUtil.video(params.src)
      target.id = 'seedsui_preview_video'
      target.style = 'position:absolute;top:-1000px;left:-1000px;width:100;height:100px;'
      document.body.appendChild(target)
    }
    if (target) {
      FullScreen.enter(target)
      setTimeout(() => {
        target.play()
      }, 500)
    }
  },
  /* -----------------------------------------------------
    图片插件
  ----------------------------------------------------- */
  // 拍照、本地选图
  chooseImage: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      return
    }
    var res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseImage:ok',
      localIds: ['https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', 'https://static.zcool.cn/v3.5.180706.5/zcool/client/image/logo.png']
    }
    if (params.success) params.success(res)
  },
  // 上传图片
  uploadImage: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      return
    }
    self.showLoading()
    setTimeout(() => {
      self.hideLoading()
      self.showToast(window._seeds_lang['uploaded_completed'] || '上传完成', {mask: false})
      var res = {
        errMsg: 'uploadImage:ok',
        mediaUrl: '',
        serverId: new Date().getTime()
      }
      if (params.success) params.success(res)
      // if (params.fail) params.fail(res)
    }, 1000)
  },
  // 图片预览
  // @params {urls:'需要预览的图片http链接列表',index:'图片索引',layerHTML:'图片上方的浮层'}
  preview: null,
  previewImage: function (params = {}) {
    var self = this;
    if (!params.urls || !params.urls.length) {
      self.showToast(`urls${window._seeds_lang['wrong_parameter'] || '参数不正确'}, ${window._seeds_lang['cannot_preview'] || '无法预览'}`, {mask: false})
      return
    }
    var src = params.urls[params.index || 0]
    if (!src) {
      self.showToast(`index${window._seeds_lang['wrong_parameter'] || '参数不正确'}, ${window._seeds_lang['cannot_preview'] || '无法预览'}`, {mask: false})
      return
    }
    var layerHTML = params.layerHTML || ''
    if (!self.preview) {
      self.preview = new Preview({
        src: src,
        layerHTML: layerHTML,
        onSuccess: function (s) {
          s.show()
          if (params.onSuccess) params.onSuccess(s)
        },
        onError: function () {
          self.showToast(`${window._seeds_lang['invalid_image_src'] || '图片地址无效'}`, {mask: false})
        }
      })
    } else {
      self.preview.setSrc(src)
      self.preview.setLayerHTML(layerHTML)
      self.preview.update()
    }
    return self.preview
  },
  /* -----------------------------------------------------
    视频插件
  ----------------------------------------------------- */
  // debug:录像
  chooseVideo: function (params = {}) {
    console.log('chooseVideo方法在浏览器上无法运行')
    var res = {
      sourceType: 'camera', // 微信返回的两种来源: 'camera', 'album'
      errMsg: 'chooseVideo:ok',
      tempFilePath: 'http://res.waiqin365.com/video/v2001.MP4',
      duration: '',
      size: '',
      height: '',
      width: ''
    }
    if (params.success) params.success(res)
  },
  /* -----------------------------------------------------
    人员插件
  ----------------------------------------------------- */
  getContactMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success([
      {
        id: '4655721687632479006',
        name: '员工1'
      },
      {
        id: '4655721687632479007',
        name: '员工2'
      }
    ])
  },
  getContact: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '4655721687632479006',
      name: '员工1'
    })
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
  getCustomerMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    const result = []
    for (let i = 0; i < self.customerMoreLen; i++) {
      result.push(self.customerMore[i])
    }
    self.customerMoreLen++
    if (self.customerMoreLen > self.customerMore.length) {
      self.customerMoreLen = 1
    }
    if (params.success) params.success(result)
  },
  getCustomer: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '6468207804099075062',
      name: '客户门店经销商1'
    })
  },
  getCustomerType: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户类型1'
    })
  },
  getCustomerAreaMore: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success([
      {
        id: '5365268129453435373',
        name: '客户区域1'
      },
      {
        id: '5365268129453435374',
        name: '客户区域2'
      }
    ])
  },
  getCustomerArea: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户区域1'
    })
  },
  // 部门插件
  getDepartmentMore: function (params) {
    var self = this
    self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
  },
  getDepartment: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    params.success({
      id: '5343180131602024954',
      name: '开发一部'
    })
  },
  // 单选商品
  getGoods: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
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
      reportUnitRatio: '', // 报表单位比率
    })
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
  getLocation: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      setTimeout(() => {
        if (params.fail) params.fail({errMsg: `getLocation:${window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用'}`})
      }, 1000)
      return
    }
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
      if (params.success) params.success(appLocation)
      return
    }
    // 调用定位
    if (self.locating) return
    self.locating = true
    console.log('调用定位...')
    setTimeout(() => {
      self.locating = false
      var res = {longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'}
      // 将位置信息存储到cookie中60秒
      if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
      if (params.success) params.success(res)
    }, 2000)
  },
  // 获取当前地理位置带地图
  getLocationMap: function (params = {}) {
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在微信或APP中使用', {mask: false})
      if (params.fail) params.fail({errMsg: `getLocationMap:${window._seeds_lang['hint_only_wqapp'] || '此功能仅可在微信或APP中使用'}`})
      return
    }
    setTimeout(function () {
      if (params.success) params.success({longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0', address: '江苏省南京市新城科技园'})
    }, 500)
  },
  
  /* -----------------------------------------------------
    扫描二维码并返回结果
    @return {resultStr:''}
  ----------------------------------------------------- */
  scanQRCode: function (params = {}) {
    var self = this
    if (!self.debug) {
      self.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      if (params.fail) params.fail({errMsg: `scanQRCode:${window._seeds_lang['hint_scan_failed'] || '扫码失败'}, ${window._seeds_lang['hint_try_again_later'] || '请稍后重试'}`})
      return
    }
    setTimeout(function () {
      if (params.success) params.success({resultStr: '504823170310092750280333'})
    }, 500)
  }
}
export default Bridge