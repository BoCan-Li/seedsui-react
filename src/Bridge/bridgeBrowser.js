import jsonp from './../jsonp';
import DB from './../DB';
import Device from './../Device';
import Toast from './../Toast/instance.js';
import Alert from './../Alert/instance.js';
import Loading from './../Loading/instance.js';
import Preview from './../Preview/instance.js';
import MediaUtil from './../MediaUtil';
import FullScreen from './../FullScreen';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

var Bridge = {
  /**
  * 基础功能:start
  */
  debug: false,
  // 拨打电话
  tel: function (number) {
    if (Device.device === 'pc') {
      this.showToast(window._seeds_lang['hint_only_mobile'] || '此功能仅可在手机中使用', {mask: false})
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
        icon: params.icon || '',
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      this.toast.setHTML(msg)
      this.toast.setMaskClassName('mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''))
      this.toast.setToastClassName('toast ' + (params.position ? params.position : 'middle'))
      this.toast.setIcon(params.icon || '')
      this.toast.setDelay(params.delay || 2000)
    }
    this.toast.show()
    if (params.success) {
      setTimeout(() => {
        params.success()
      }, params.delay ? Math.round(params.delay / 2) : 1000)
    }
  },
  // 弹出loading
  loading: null,
  showLoading: function (params = {}) {
    if (!this.loading) {
      this.loading = new Loading({
        caption: params.caption || (window._seeds_lang['loading'] || '正在加载...'),
        type: params.type,
        icon: params.icon || '',
        maskCss: params.css || null
      });
    } else {
      if (params.caption) this.loading.setCaption(params.caption)
      if (params.type) this.loading.setType(params.type)
      if (params.css) this.loading.setMaskCss(params.css)
      if (params.icon) this.toast.setIcon(params.icon || '')
      if (params.mask) this.loading.setMaskClassName('mask loading-mask ' + (params.mask === false ? ' loading-propagation' : ''))
    }
    this.loading.show()
  },
  hideLoading: function () {
    if (!this.loading) {
      this.toast.showToast(window._seeds_lang['hint_hideloading_after_showloading'] || 'showLoading后才能hideLoading')
    } else {
      this.loading.hide()
    }
  },
  // 弹出Alert
  alert: null,
  showAlert: function (msg, params = {}) {
    if (!this.alert) {
      this.alert = new Alert({
        ...params,
        html: msg,
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        }
      });
    } else {
      if (params) {
        this.alert.reset()
        for (let n in params) {
          this.alert.params[n] = params[n]
        }
        this.alert.updateDOM()
        this.alert.setHTML(msg)
      }
    }
    this.alert.show()
  },
  // 弹出Confirm
  confirm: null,
  showConfirm: function (msg, params = {}) {
    if (!this.confirm) {
      this.confirm = new Alert({
        ...params,
        html: msg,
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
        },
        onClickCancel: function(e) {
          if (params.fail) params.fail(e)
          else e.hide()
        }
      })
    } else {
      if (params) {
        this.confirm.reset()
        for (let n in params) {
          this.confirm.params[n] = params[n]
        }
        this.confirm.updateDOM()
        if (params.success) this.confirm.setOnClickSubmit(params.success)
        if (params.fail) this.confirm.setOnClickCancel(params.fail)
      }
      this.confirm.setHTML(msg)
    }
    this.confirm.show()
  },
  /**
    * 百度地图:获取当前位置名称,只支持gcj02
    * @param {Object} params: {longitude: '', latitude: '', success: fn, fail: fn}
    * @returns {Object} {address:'地址全称'}
    */
  getAddress: function (params = {}) {
    var url = 'https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + params.latitude + ',' + params.longitude + '&output=json&pois=1&ak=IlfRglMOvFxapn5eGrmAj65H&ret_coordtype=gcj02ll'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.fail) params.fail({errMsg: `getAddress:${window._seeds_lang['hint_address_failed'] || '获取地址失败, 请稍后重试'}` + err})
      } else {
        var addrs = {}
        if (data.result && data.result.formatted_address) {
          addrs.address = data.result.formatted_address
          if (params.success) params.success(addrs)
        } else {
          if (params.fail) params.fail({errMsg: `getAddress:${window._seeds_lang['hint_address_failed'] || '获取地址失败, 请稍后重试'}`})
        }
      }
    })
  },
  /**
    * 百度地图:获得天气
    * @param {Object} params: {location: 'lng,lat|lng,lat|lng,lat' | '北京市|上海市', success: fn, fail: fn}
    * @returns {Object} 天气信息results
    */
  getWeather: function (params = {}) {
    var url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + (params.location || '南京市') + '&output=json&ak=IlfRglMOvFxapn5eGrmAj65H'
    jsonp(url, null, (err, data) => {
      if (err) {
        if (params.fail) params.fail({errMsg: `getWeather:${window._seeds_lang['hint_weather_failed'] || '获取天气失败, 请稍后重试'}` + err})
      } else {
        if (data.results && data.results.length) {
          if (params.success) params.success(data.results)
        } else {
          if (params.fail) params.fail({errMsg: `getWeather:${window._seeds_lang['hint_weather_failed'] || '获取天气失败, 请稍后重试'}`})
        }
      }
    })
  },
  // 客户端默认返回控制
  back: function (argHistory, argBackLvl) {
    // 返回操作对象与返回层级
    var _history = window.history
    if (argHistory && argHistory.go) _history = argHistory
    var _backLvl = argBackLvl || -1
    
    // 返回类型
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') { // 关闭当前页面
      try {
        Bridge.closeWindow()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'home') { // 返回首页
      try {
        Bridge.goHome()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'confirm') { // 提示后返回上一页
      Bridge.showConfirm(Bridge.confirmCaption || (window._seeds_lang['confirm_quit_page'] || '您确定要离开此页面吗?'), {
        success: (e) => {
          e.hide()
          _history.go(_backLvl)
        }
      });
    } else if (isFromApp === 'confirm-close') { // 提示后关闭当前页面
      Bridge.showConfirm(Bridge.confirmCaption || (window._seeds_lang['confirm_quit_page'] || '您确定要离开此页面吗?'), {
        success: (e) => {
          e.hide()
          Bridge.closeWindow()
        }
      });
    } else if (isFromApp === 'custom') {
      console.log('自定义')
    } else { // 返加上一页
      _history.go(_backLvl)
    }
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
  /**
   * 基础功能:end
   */

  /**
    * 定制功能
    */
  platform: 'browser',
  // 初始化配置
  config: function (params = {}) {
    if (params.debug) this.debug = params.debug
    if (!this.debug) {
      console.log('config方法仅在微信上工作')
      return
    }
    DB.setSession('bridge_isready', '1')
    if (params.success) params.success()
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      return
    }
    this.showLoading()
    setTimeout(() => {
      this.hideLoading()
      this.showToast(window._seeds_lang['uploaded_completed'] || '上传完成', {mask: false})
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
    if (!params.urls || !params.urls.length) {
      Bridge.showToast(`urls${window._seeds_lang['wrong_parameter'] || '参数不正确'}, ${window._seeds_lang['cannot_preview'] || '无法预览'}`, {mask: false})
      return
    }
    var src = params.urls[params.index || 0]
    if (!src) {
      Bridge.showToast(`index${window._seeds_lang['wrong_parameter'] || '参数不正确'}, ${window._seeds_lang['cannot_preview'] || '无法预览'}`, {mask: false})
      return
    }
    var layerHTML = params.layerHTML || ''
    if (!this.preview) {
      this.preview = new Preview({
        src: src,
        layerHTML: layerHTML,
        onSuccess: function (s) {
          s.show()
        },
        onError: function () {
          Bridge.showToast(`${window._seeds_lang['invalid_image_src'] || '图片地址无效'}`, {mask: false})
        }
      })
    } else {
      this.preview.setSrc(src)
      this.preview.setLayerHTML(layerHTML)
      this.preview.update()
    }
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    const result = []
    for (let i = 0; i < this.customerMoreLen; i++) {
      result.push(this.customerMore[i])
    }
    this.customerMoreLen++
    if (this.customerMoreLen > this.customerMore.length) {
      this.customerMoreLen = 1
    }
    if (params.success) params.success(result)
  },
  getCustomer: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '6468207804099075062',
      name: '客户门店经销商1'
    })
  },
  getCustomerType: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户类型1'
    })
  },
  getCustomerAreaMore: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    if (params.success) params.success({
      id: '5365268129453435373',
      name: '客户区域1'
    })
  },
  // 部门插件
  getDepartmentMore: function (params) {
    this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
  },
  getDepartment: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
      return
    }
    params.success({
      id: '5343180131602024954',
      name: '开发一部'
    })
  },
  // 单选商品
  getGoods: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在外勤客户端中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
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
    if (this.locating) return
    this.locating = true
    console.log('调用定位...')
    setTimeout(() => {
      this.locating = false
      var res = {longitude:'118.730515', latitude:'31.982473', speed:'0.0', accuracy:'3.0.0'}
      // 将位置信息存储到cookie中60秒
      if (params.cache) DB.setCookie('app_location', JSON.stringify(res) , params.cache || 60)
      if (params.success) params.success(res)
    }, 2000)
  },
  // 获取当前地理位置带地图
  getLocationMap: function (params = {}) {
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_wqapp'] || '此功能仅可在微信或APP中使用', {mask: false})
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
    if (!this.debug) {
      this.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
      if (params.fail) params.fail({errMsg: `scanQRCode:${window._seeds_lang['hint_scan_failed'] || '扫码失败'}, ${window._seeds_lang['hint_try_again_later'] || '请稍后重试'}`})
      return
    }
    setTimeout(function () {
      if (params.success) params.success({resultStr: '504823170310092750280333'})
    }, 500)
  },
  /* 封装图片控件,使用示例见ImgUploader组件
  bridge.Image({
    onChooseSuccess: function (imgMap) {},
    onUploadSuccess:function(imgMap,res)
    onUploadFail:function(index, item)
    onUploadsSuccess:function(imgMap)
  })
  */
  Image: function (params = {}) {
    var s = this
    var msg = ''
    // 选择照片
    s.choose = function (args = {}) {
      if (!Bridge.debug) {
        if (params.onChooseFail) params.onChooseFail({errMsg: `chooseImage:${window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用'}`})
        else Bridge.showToast(window._seeds_lang['hint_only_app_and_wx'] || '此功能仅可在微信或APP中使用', {mask: false})
        return
      }
      var option = {
        enableSafe: args.enableSafe || false, // 安全上传,第次只能传一张
        max: args.max || 5,
        currentCount: args.currentCount || 0,
        sourceType: args.sourceType || ['album', 'camera'],
        sizeType: args.sizeType || ['original', 'compressed'],
        chooseOptions: args.chooseOptions || {},
        localIds: args.localIds || [] // 去重处理
      }
      var count = option.max - option.currentCount
      if (count <= 0) {
        msg = (window._seeds_lang['hint_max_upload'] || '最多只能传') + option.max + (window._seeds_lang['photos'] || '张照片')
        Bridge.showToast(msg)
        return
      }
      // 如果设置了安全上传,则每次只允许上传一张
      if (option.enableSafe) count = 1
      Bridge.chooseImage(Object.assign({
        count: count, // 默认5
        sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有camera|album
        success: function (res) {
          var imgMap = {}
          for(var i = 0, localId; localId = res.localIds[i++];){ // eslint-disable-line
            if (option.localIds.indexOf(localId) === -1) {
              imgMap[localId] = {
                serverId: '',
                sourceType: res.sourceType
              }
            }
          }
          if(params.onChooseSuccess) params.onChooseSuccess(imgMap, res)
          s.upload(imgMap)
        },
        fail: function (res) {
          Bridge.showToast(window._seeds_lang['hint_choose_image_failed'] || '选择图片失败, 请稍后再试', {mask: false})
        },
        cancel: function () {
        },
        complete: function () {
        }
      }, option.chooseOptions))
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
            var deleteItem = imgMap[img]
            if (params.onUploadFail) params.onUploadFail(imgMap, {id: img, index: index, item: deleteItem, errMsg: `uploadImage:${msg}`})
            if (index >= imgs.length - 1 && params.onUploadsSuccess) params.onUploadsSuccess(imgMap)
            loop(++index)
          }
        })
      }
      loop(0)
    }
  }
}
export default Bridge