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
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass)
    return mask
  }
  s.createToast = function () {
    var toast = document.createElement('div')
    toast.setAttribute('class', s.params.toastClass)
    return toast
  }
  s.createToastWrapper = function () {
    var wrapper = document.createElement('div')
    wrapper.setAttribute('class', s.params.wrapperClass)
    return wrapper
  }
  s.createToastIcon = function () {
    var icon = document.createElement('span')
    if (!s.params.icon) return icon
    icon.setAttribute('class', s.params.iconClass + (s.params.icon ? ' ' + s.params.icon : ''))
    return icon
  }
  s.createToastCaption = function () {
    var caption = document.createElement('span')
    caption.setAttribute('class', s.params.captionClass)
    if (s.params.html) caption.innerHTML = s.params.html
    return caption
  }
  s.create = function () {
    s.mask = s.createMask()
    s.toast = s.createToast()
    s.wrapper = s.createToastWrapper()
    s.caption = s.createToastCaption()
    s.icon = s.createToastIcon()
    if (s.icon) s.wrapper.appendChild(s.icon)
    s.wrapper.appendChild(s.caption)
    s.toast.appendChild(s.wrapper)
    s.mask.appendChild(s.toast)
    s.parent.appendChild(s.mask)
  }
  s.update = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      s.toast = s.mask.querySelector('.' + s.params.toastClass)
      s.wrapper = s.mask.querySelector('.' + s.params.wrapperClass)
    } else {
      s.create()
    }
    s.toast.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  s.update()

  /* --------------------
  Method
  -------------------- */
  s.setMaskClassName = function (className) {
    s.params.maskClass = className
    s.mask.setAttribute('class', s.params.maskClass)
  }
  s.setToastClassName = function (className) {
    s.params.toastClass = className
    s.toast.setAttribute('class', s.params.toastClass)
  }
  s.setIcon = function (className) {
    s.params.icon = className
    if (s.params.icon) {
      s.icon.setAttribute('class', s.params.iconClass + (s.params.icon ? ' ' + s.params.icon : ''))
    } else {
      s.icon.setAttribute('class', '')
    }
  }
  s.setDelay = function (delay) {
    s.params.delay = delay
  }
  s.setHTML = function (html) {
    s.caption.innerHTML = html
  }

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