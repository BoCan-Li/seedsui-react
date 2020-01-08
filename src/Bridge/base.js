import jsonp from './../jsonp';
import Device from './../Device';
import Toast from './../Toast/instance.js';
import Alert from './../Alert/instance.js';
import Loading from './../Loading/instance.js';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

var Bridge = {
  /**
  * 基础功能:start
  */
  debug: false,
  // 拨打电话
  tel: function (number) {
    var self = this
    if (Device.device === 'pc') {
      self.showToast(window._seeds_lang['hint_only_mobile'] || '此功能仅可在手机中使用', {mask: false})
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
        html: msg,
        delay: params.delay || 2000
      });
    } else {
      self.toast.setHTML(msg)
      self.toast.setMaskClassName('mask toast-mask' + (params.mask === false ? ' toast-propagation' : ''))
      self.toast.setToastClassName('toast ' + (params.position ? params.position : 'middle'))
      self.toast.setIcon(params.icon || '')
      self.toast.setDelay(params.delay || 2000)
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
        caption: params.caption || (window._seeds_lang['loading'] || '正在加载...'),
        type: params.type,
        icon: params.icon || '',
        maskCss: params.css || null
      });
    } else {
      if (params.caption) self.loading.setCaption(params.caption)
      if (params.type) self.loading.setType(params.type)
      if (params.css) self.loading.setMaskCss(params.css)
      if (params.icon) self.toast.setIcon(params.icon || '')
      if (params.mask) self.loading.setMaskClassName('mask loading-mask ' + (params.mask === false ? ' loading-propagation' : ''))
    }
    self.loading.show()
  },
  hideLoading: function () {
    var self = this
    if (!self.loading) {
      self.toast.showToast(window._seeds_lang['hint_hideloading_after_showloading'] || 'showLoading后才能hideLoading')
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
        onClickSubmit: function (e) {
          if (params.success) params.success(e)
          else e.hide()
        }
      });
    } else {
      if (params) {
        self.alert.reset()
        for (let n in params) {
          self.alert.params[n] = params[n]
        }
        self.alert.updateDOM()
        self.alert.setHTML(msg)
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
          if (params.fail) params.fail(e)
          else e.hide()
        }
      })
    } else {
      if (params) {
        self.confirm.reset()
        for (let n in params) {
          self.confirm.params[n] = params[n]
        }
        self.confirm.updateDOM()
        if (params.success) self.confirm.setOnClickSubmit(params.success)
        if (params.fail) self.confirm.setOnClickCancel(params.fail)
      }
      self.confirm.setHTML(msg)
    }
    self.confirm.show()
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
    var self = this
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
      self.showConfirm(self.confirmCaption || (window._seeds_lang['confirm_quit_page'] || '您确定要离开此页面吗?'), {
        success: (e) => {
          e.hide()
          _history.go(_backLvl)
        }
      });
    } else if (isFromApp === 'confirm-close') { // 提示后关闭当前页面
      self.showConfirm(self.confirmCaption || (window._seeds_lang['confirm_quit_page'] || '您确定要离开此页面吗?'), {
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
    * @param {Object} options {wxSrc: '', wqCordovaSrc: '外勤cordovajs', wqSrc: '外勤jssdkjs'}
    */
  ready: function (callback, options = {}) {
    var self = this
    var platform = self.platform
    if (platform !== 'weixin' && platform !== 'weixinwork' && platform !== 'waiqin' && platform !== 'dinghuo' && platform !== 'wq') {
      if (callback) window.addEventListener('load', callback, false)
      return
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = 'defer'
    if (platform === 'weixin' || platform === 'weixinwork') { // 微信
      script.src = options.wxSrc || '//res.wx.qq.com/open/js/jweixin-1.4.0.js'
      if (callback) {
        script.onload = function () {
          callback()
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
    } else if (platform === 'wq') { // 外勤jssdk
      // 用开发d目录可以使用新功能
      script.src = options.wqSrc || '//res.waiqin365.com/d/open/js/waiqin365.min.js?v=1.0.1'
      if (callback) {
        script.onload = function () {
          callback()
          self.config()
        }
      }
    } else if (platform === 'dinghuo') {
      callback()
      self.config()
    }
    if (script.src) document.body.appendChild(script)
  }
  /**
   * 基础功能:end
   */
}
export default Bridge