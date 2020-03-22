import jsonp from './../jsonp'
import Device from './../Device'
import MapUtil from './../MapUtil'
import Toast from './../Toast/instance.js'
import Alert from './../Alert/instance.js'
import Loading from './../Loading/instance.js'
import locale from './../locale'

// 防止绑定事件时this指向window, 所以全局加一个变量用于存储this
window._bridge_self = null

var Bridge = {
  /**
  * 基础功能:start
  */
  debug: false,
  // 拨打电话
  tel: function (number) {
    var self = this
    if (Device.device === 'pc') {
      self.showToast(locale('hint_only_mobile') || '此功能仅可在手机中使用', {mask: false})
      return
    }
    if (isNaN(number)) return
    window.location.href = 'tel:' + number
  },
  // 弹出toast
  toast: null,
  showToast: function (msg, params = {}) {
    var self = this
    if (!msg) return
    if (!self.toast) {
      // 提示错误
      self.toast = new Toast({
        parent: document.body,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    } else {
      self.toast.updateParams({
        ...params,
        maskClass: 'mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''),
        toastClass: 'toast ' + (params.position ? params.position : 'middle'),
        icon: params.icon || '',
        delay: params.delay || 2000,
        html: msg
      })
    }
    self.toast.show()
    if (params.success) {
      setTimeout(() => {
        params.success()
      }, params.delay ? Math.round(params.delay / 2) : 1000)
    }
  },
  // 弹出loading
  loading: null,
  showLoading: function (params = {}) {
    var self = this
    if (!self.loading) {
      self.loading = new Loading({
        ...params,
        caption: params.caption || (locale('loading') || '正在加载...'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      });
    } else {
      self.loading.updateParams({
        ...params,
        caption: params.caption || (locale('loading') || '正在加载...'),
        maskClass: 'mask loading-mask ' + (params.mask === false ? ' loading-propagation' : '')
      })
    }
    self.loading.show()
  },
  hideLoading: function () {
    var self = this
    if (!self.loading) {
      self.toast.showToast(locale('hint_hideloading_after_showloading') || 'showLoading后才能hideLoading')
    } else {
      self.loading.hide()
    }
  },
  // 弹出Alert
  alert: null,
  showAlert: function (msg, params = {}) {
    var self = this
    if (!self.alert) {
      self.alert = new Alert({
        ...params,
        html: msg,
        buttonSubmitHTML: locale('ok') || '确定', // 实例化时需要国际化
        buttonCancelHTML: locale('cancel') || '取消', // 实例化时需要国际化
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        }
      });
    } else {
      if (params) {
        self.alert.updateParams({
          buttonSubmitHTML: locale('ok') || '确定', // 实例化时需要国际化
          buttonCancelHTML: locale('cancel') || '取消', // 实例化时需要国际化
          ...params,
          html: msg,
        })
      }
    }
    self.alert.show()
  },
  // 弹出Confirm
  confirm: null,
  showConfirm: function (msg, params = {}) {
    var self = this
    if (!self.confirm) {
      self.confirm = new Alert({
        ...params,
        html: msg,
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
        },
        onClickCancel: function(e) {
          e.errMsg = ''
          if (params.fail) params.fail(e)
          else e.hide()
        }
      })
    } else {
      if (params) {
        self.confirm.updateParams({
          buttonSubmitHTML: locale('ok') || '确定', // 实例化时需要国际化
          buttonCancelHTML: locale('cancel') || '取消', // 实例化时需要国际化
          ...params,
          html: msg,
          onClickSubmit: function (e) {
            if (params.success) params.success(e)
          },
          onClickCancel: function(e) {
            e.errMsg = ''
            if (params.fail) params.fail(e)
            else e.hide()
          }
        })
      }
    }
    self.confirm.show()
  },
  /**
    * 百度地图:获取当前位置名称
    * @param {Object} params: {longitude: '', latitude: '', success: fn, fail: fn}
    * @param {String} type 'wgs84 | gcj02', 默认gcj02
    * @return {Promise} result: {status: 0 成功, points 百度坐标}
    */
  getAddress: function (params = {}, type = 'gcj02') {
    return new Promise(async (resolve) => {
      const mapUtil = new MapUtil()
      if (!window.BMap) {
        resolve(null)
        return
      }
      const result = await mapUtil.getAddress([params.longitude, params.latitude], type)
      resolve(result)
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
        if (params.fail) params.fail({errMsg: `getWeather:${locale('hint_weather_failed') || '获取天气失败, 请稍后重试'}` + err})
      } else {
        if (data.results && data.results.length) {
          if (params.success) params.success(data.results)
        } else {
          if (params.fail) params.fail({errMsg: `getWeather:${locale('hint_weather_failed') || '获取天气失败, 请稍后重试'}`})
        }
      }
    })
  },
  // 客户端默认返回控制
  back: function (argHistory, argBackLvl) {
    // 因为有可能是监听绑定, this指向有可能是window, 所以需要指定self
    var self = _bridge_self
    // 返回操作对象与返回层级
    var _history = window.history
    if (argHistory && argHistory.go) _history = argHistory
    var _backLvl = argBackLvl || -1
    
    // 返回类型
    var isFromApp = Device.getUrlParameter('isFromApp', location.search) || ''
    if (isFromApp === '1') { // 关闭当前页面
      try {
        self.closeWindow()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'home') { // 返回首页
      try {
        self.goHome()
      } catch (error) {
        console.log(error)
      }
    } else if (isFromApp === 'confirm') { // 提示后返回上一页
      self.showConfirm(self.confirmCaption || (locale('confirm_quit_page') || '您确定要离开此页面吗?'), {
        success: (e) => {
          e.hide()
          _history.go(_backLvl)
        }
      });
    } else if (isFromApp === 'confirm-close') { // 提示后关闭当前页面
      self.showConfirm(self.confirmCaption || (locale('confirm_quit_page') || '您确定要离开此页面吗?'), {
        success: (e) => {
          e.hide()
          self.closeWindow()
        }
      });
    } else if (isFromApp === 'custom') {
      console.log('自定义')
    } else { // 返加上一页
      _history.go(_backLvl)
    }
  },
  /**
    * 动态加载桥接库
    * @param {Func} callback 加载完成回调
    * @param {Object} options {wxSrc: '', wqCordovaSrc: '外勤cordovajs', wqSrc: '外勤jssdkjs', fail: func({errMsg: ''})}
    */
  ready: function (callback, options = {}) {
    var self = this
    var platform = self.platform
    if (platform !== 'wechat' && platform !== 'wework' && platform !== 'miniprogram' && platform !== 'waiqin' && platform !== 'dinghuo' && platform !== 'wq') {
      if (callback) window.addEventListener('load', callback, false)
      return
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = 'defer'
    if (platform === 'wechat' || platform === 'wework' || platform === 'miniprogram') { // 微信
      script.src = options.wxSrc || '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
      if (callback) {
        script.onload = function () {
          callback()
        }
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({errMsg: '微信js加载失败'})
        }
      }
    } else if (platform === 'waiqin') { // 外勤cordova
      script.src = options.wqCordovaSrc || '//res.waiqin365.com/d/common_mobile/component/cordova/cordova.js'
      if (callback) {
        script.onload = function () {
          document.addEventListener('deviceready', () => {
            callback()
            self.config()
          })
        }
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({errMsg: '外勤cordova加载失败'})
        }
      }
    } else if (platform === 'wq') { // 外勤jssdk
      // 用开发d目录可以使用新功能
      script.src = options.wqSrc || '//res.waiqin365.com/d/open/js/waiqin365.min.js?v=1.0.1'
      if (callback) {
        script.onload = function () {
          callback()
          self.config()
        }
      }
      if (options.fail) {
        script.onerror = function () {
          options.fail({errMsg: '外勤js加载失败'})
        }
      }
    } else if (platform === 'dinghuo') {
      callback()
      self.config()
    }
    if (script.src) document.body.appendChild(script)
  },
  /**
    * 修改原生标题
    * @param {Object} params {title: '自定义标题'}
    */
  setTitle: function (params) {
    if (params.title) document.title = params.title
  },
  /**
   * 基础功能:end
   */
}
export default Bridge