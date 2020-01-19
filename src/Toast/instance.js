// Toast 提示框
var Toast = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    mask: null,
    parent: document.body, // 创建于哪个元素下

    maskClass: 'mask toast-mask', // 加toast-propagation允许点击
    maskActiveClass: 'active',

    toastClass: 'toast bottom',
    toastActiveClass: 'active',
    wrapperClass: 'toast-wrapper',
    captionClass: 'toast-caption',
    iconClass: 'toast-icon',
    
    duration: 300,
    delay: 0,
    html: '',
    icon: '' // 传入icon的class

    /* callbacks
    onShowed(Toast)// 显示动画结束后回调
    onHid(Toast)// 隐藏动画结束后回调
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.toast = null
  s.wrapper = null
  // Mask
  s.updateMask = function () {
    if (!s.mask || !s.mask.tagName) {
      s.mask = document.createElement('div')
    }
    s.mask.setAttribute('class', s.params.maskClass)
  }
  // Toast
  s.updateToast = function () {
    if (!s.toast) {
      s.toast = document.createElement('div')
    }
    s.toast.setAttribute('class', s.params.toastClass)
    s.toast.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  // Wrapper
  s.updateWrapper = function () {
    if (!s.wrapper) {
      s.wrapper = document.createElement('div')
    }
    s.wrapper.setAttribute('class', s.params.wrapperClass)
  }
  // Icon
  s.updateIcon = function () {
    if (!s.icon) {
      s.icon = document.createElement('span')
    }
    if (!s.params.icon) {
      s.icon.setAttribute('class', '')
    } else {
      s.icon.setAttribute('class', s.params.iconClass + (s.params.icon ? ' ' + s.params.icon : ''))
    }
  }
  // Caption
  s.updateCaption = function () {
    if (!s.caption) {
      s.caption = document.createElement('span')
    }
    s.caption.setAttribute('class', s.params.captionClass)
    if (s.params.html) s.caption.innerHTML = s.params.html
  }

  // 创建DOM
  s.createDOM = function () {
    s.updateMask()
    s.updateToast()
    s.updateWrapper()
    s.updateCaption()
    s.updateIcon()
    if (s.icon) s.wrapper.appendChild(s.icon)
    s.wrapper.appendChild(s.caption)
    s.toast.appendChild(s.wrapper)
    s.mask.appendChild(s.toast)
    s.parent.appendChild(s.mask)
  }

  // 更新DOM
  s.updateDOM = function () {
    s.updateMask()
    s.updateToast()
    s.updateWrapper()
    s.updateCaption()
    s.updateIcon()
  }

  // DOM获取与创建
  s.update = function () {
    // 已有DOM则只更新DOM, 如果没有自定义则创建DOM
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask && s.mask.tagName) {
      s.toast = s.mask.querySelector('.' + s.params.toastClass)
      s.wrapper = s.mask.querySelector('.' + s.params.wrapperClass)
      s.caption = s.mask.querySelector('.' + s.params.captionClass)
      s.icon = s.mask.querySelector('.' + s.params.iconClass)
      s.updateDOM()
    } else {
      s.createDOM()
    }
  }
  s.update()

  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.updateDOM()
  }
  /* --------------------
  Method
  -------------------- */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }

  s.showToast = function () {
    s.toast.classList.add(s.params.toastActiveClass)
  }
  s.hideToast = function () {
    s.toast.classList.remove(s.params.toastActiveClass)
  }

  s.isHid = true
  s.hide = function () {
    s.isHid = true
    s.hideMask()
    s.hideToast()
    if (s.params.duration === 0) s.onTransitionEnd()
  }
  s.show = function () {
    s.isHid = false
    s.showMask()
    s.showToast()
    if (s.params.duration === 0) s.onTransitionEnd()

    // 显示数秒后，自动消失
    if (s.params.delay) {
      if (s.delayer) window.clearTimeout(s.delayer)
      s.delayer = setTimeout(function () {
        s.hide()
      }, s.params.delay)
    }
  }
  s.destroy = function () {
    s.destroyMask()
  }
  /* --------------------
  Controller
  -------------------- */
  s.events = function (detach) {
    var target = s.toast
    var action = detach ? 'removeEventListener' : 'addEventListener'
    target[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // target[action]('webkitAnimationEnd',s.onAnimationEnd,false)
  }
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(false)
  }
  s.transitionFlag = true
  // Events Handler
  s.onTransitionEnd = function (e) {
    if (e.propertyName === 'visibility') return
    // 防止animationend和transitionend多次执行的问题
    if (s.transitionFlag) {
      s.transitionFlag = false;
      if (s.isHid) {
        // Callback onHid
        if (s.params.onHid) s.params.onHid(s)
      } else {
        // Callback onShowed
        if (s.params.onShowed) s.params.onShowed(s)
      }
    }
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Toast
