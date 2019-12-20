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
  /**
   * 基础功能:end
   */
}
export default Bridge