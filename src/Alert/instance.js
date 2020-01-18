// Alert 提示框
var Alert = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    overflowContainerActiveClass: 'overflow-hidden',

    maskClass: 'mask alert-mask',
    maskActiveClass: 'active',

    duration: 300,
    animationAttr: 'data-animation',
    animation: 'zoom',
    animationClass: 'popup-animation middle',

    alertClass: 'alert',
    alertActiveClass: 'active',
    contentClass: 'alert-content',
    handlerClass: 'alert-handler',
    buttonSubmitClass: 'alert-submit button',
    buttonCancelClass: 'alert-cancel button',

    caption: '',
    html: '',
    buttonSubmitHTML: '确定', // 实例化时需要国际化
    buttonCancelHTML: '取消', // 实例化时需要国际化

    isClickMaskHide: false,
    /*
    Callbacks:
    onClick:function(Alert)
    onClickSubmit:function(Alert)
    onClickCancel:function(Alert)
    onClickMask:function(Alert)
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
  // Params
  s.params.mask = null
  if (params.mask) {
    s.params.mask = params.mask
  }
  
  s.params.parent = document.body // 创建于哪个元素下
  if (params.parent) {
    s.params.parent = params.parent
  }
  
  s.params.overflowContainer = document.body
  if (params.overflowContainer) {
    s.params.overflowContainer = params.overflowContainer
  }
  // Parent | OverflowContainer
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
  // Alert | Mask
  s.mask = null
  s.alert = null
  s.html = null
  s.buttonBox = null
  s.buttonSubmit = null
  s.buttonCancel = null
  // Mask
  s.createMask = function () {
    s.mask = document.createElement('div')
    s.mask.setAttribute('class', s.params.maskClass)
  }
  // Alert
  s.createButton = function (html, className) {
    var button = document.createElement('a')
    button.setAttribute('class', className)
    button.innerHTML = html
    return button
  }
  s.createAlert = function () {
    s.alert = document.createElement('div')
    s.alert.setAttribute('class', s.params.alertClass + (s.params.animationClass ? ' ' + s.params.animationClass : ''))
    s.alert.setAttribute(s.params.animationAttr, s.params.animation)

    s.html = document.createElement('div')
    s.html.setAttribute('class', s.params.contentClass)
    s.html.innerHTML = s.params.html

    s.buttonBox = document.createElement('div')
    s.buttonBox.setAttribute('class', s.params.handlerClass)

    // 如果有取消按钮
    if (s.params.onClickCancel) {
      s.buttonCancel = s.createButton(s.params.buttonCancelHTML, s.params.buttonCancelClass)
      s.buttonBox.appendChild(s.buttonCancel)
    }
    s.buttonSubmit = s.createButton(s.params.buttonSubmitHTML, s.params.buttonSubmitClass)

    s.buttonBox.appendChild(s.buttonSubmit)

    if (s.params.caption && s.params.caption !== '') {
      s.caption = document.createElement('h1')
      s.caption.innerHTML = s.params.caption
      s.alert.appendChild(s.caption)
    }

    s.alert.appendChild(s.html)
    s.alert.appendChild(s.buttonBox)
  }
  s.create = function () {
    s.createMask()
    s.createAlert()
    s.mask.appendChild(s.alert)
    s.parent.appendChild(s.mask)
  }
  // 更新DOM
  s.updateDOM = function () {
    // 容器
    if (s.alert) {
      s.alert.setAttribute('class', s.params.alertClass + (s.params.animationClass ? ' ' + s.params.animationClass : ''))
      s.alert.setAttribute(s.params.animationAttr, s.params.animation)
    }
    // 内容
    if (s.html) {
      s.html.setAttribute('class', s.params.contentClass)
      s.html.innerHTML = s.params.html
    }
    // 标题
    if (s.caption && s.params.caption) s.caption.innerHTML = s.params.caption
    // 按钮容器
    if (s.buttonBox) {
      s.buttonBox.setAttribute('class', s.params.handlerClass)
    }
    // 如果有属性, 却没有确定按钮, 则创建一个
    if (s.params.onClickSubmit && !s.buttonSubmit) {
      s.buttonSubmit = s.createButtonSubmit()
      s.buttonBox.appendChild(s.buttonSubmit)
    }
    // 确定按钮
    if (s.buttonSubmit) {
      s.buttonSubmit.innerHTML = s.params.buttonSubmitHTML
      s.buttonSubmit.setAttribute('class', s.params.buttonSubmitClass)
    }
    // 如果有属性, 却没有取消按钮, 则创建一个
    if (s.params.onClickCancel && !s.buttonCancel) {
      s.buttonCancel = s.createButtonCancel()
      s.buttonBox.insertBefore(s.buttonCancel, s.buttonSubmit)
    }
    // 取消按钮
    if (s.buttonCancel) {
      s.buttonCancel.innerHTML = s.params.buttonCancelHTML
      s.buttonCancel.setAttribute('class', s.params.buttonCancelClass)
    }
  }
  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
    s.updateDOM()
  }
  // DOM获取与创建
  s.update = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      if (!s.alert) s.alert = s.mask.querySelector('.' + s.params.alertClass)
      if (!s.buttonSubmit) s.buttonSubmit = s.alert.querySelector('.' + s.params.buttonSubmitClass)
      if (!s.buttonCancel) s.buttonCancel = s.alert.querySelector('.' + s.params.buttonCancelClass)
    } else {
      s.create()
    }
    s.mask.style.webkitTransitionDuration = s.params.duration + 'ms'
    s.alert.style.webkitTransitionDuration = s.params.duration + 'ms'
  }
  s.update()
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
  s.showAlert = function () {
    s.alert.classList.add(s.params.alertActiveClass)
  }
  s.hideAlert = function () {
    s.alert.classList.remove(s.params.alertActiveClass)
  }
  s.isHid = true
  s.hide = function () {
    s.isHid = true
    // 隐藏遮罩
    s.hideMask()
    // 隐藏弹出框
    s.hideAlert()
    // 显示滚动条
    if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
    // 执行回调
    if (s.params.duration === 0) s.onTransitionEnd()
  }
  s.show = function () {
    s.isHid = false
    // 显示遮罩
    s.showMask()
    // 显示弹出框
    s.showAlert()
    // 禁用滚动条
    if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
    // 执行回调
    if (s.params.duration === 0) s.onTransitionEnd()
  }
  s.destroy = function () {
    s.destroyMask()
  }
  // 重置数据
  s.reset = function () {
    s.params = defaults
    s.updateDOM()
  }
  /* --------------------
  Control
  -------------------- */
  s.events = function (detach) {
    var touchTarget = s.alert
    var action = detach ? 'removeEventListener' : 'addEventListener'
    touchTarget[action]('click', s.onClick, false)
    touchTarget[action]('webkitTransitionEnd', s.onTransitionEnd, false)
    // 遮罩
    s.mask[action]('click', s.onClickMask, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.onClick = function (e) {
    s.event = e

    if (s.params.onClick) s.params.onClick(s)
    if (e.target.className.indexOf(s.params.buttonSubmitClass) !== -1) {
      if (s.params.onClickSubmit) s.params.onClickSubmit(s)
      else s.hide()
    } else if (e.target.className.indexOf(s.params.buttonCancelClass) !== -1) {
      if (s.params.onClickCancel) s.params.onClickCancel(s)
      else s.hide()
    }
  }
  s.onClickMask = function (e) {
    if (e.target === s.mask) {
      s.event = e
      if (s.params.onClickMask) s.params.onClickMask(s)
      if (s.params.isClickMaskHide) s.hide()
    }
  }
  s.onTransitionEnd = function (e) {
    if (e && e.propertyName === 'visibility') return
    if (s.isHid) {
      // Callback onHid
      if (s.params.onHid) s.params.onHid(s)
    } else {
      // Callback onShowed
      if (s.params.onShowed) s.params.onShowed(s)
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

export default Alert
