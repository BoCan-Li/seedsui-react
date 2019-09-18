// Actionsheet
var Actionsheet = function (params) {
  if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    overflowContainer: document.body,
    overflowContainerActiveClass: 'overflow-hidden',
    parent: document.body,

    animationAttr: 'data-animation',
    animation: 'slideUp',

    mask: null,
    maskClass: 'mask',
    maskActiveClass: 'active',
    maskFeatureClass: 'actionsheet-mask',

    actionsheetClass: 'actionsheet',
    groupClass: 'actionsheet-group',
    optionClass: 'actionsheet-option',
    buttonCancelClass: 'actionsheet-cancel',
    buttonCancelHTML: window._seeds_lang['cancel'] || '取消',
    data: [] // [{text: '', handler: func()}]
    /*
    Callbacks:
    option.handler:function(Actionsheet)
    onClickCancel:function(Actionsheet)
    onClickMask:function(Actionsheet)
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
  // Parent | OverflowContainer
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
  // Actionsheet | Mask
  s.actionsheet
  s.mask
  s.group
  s.options = []
  // Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass + ' ' + s.params.maskFeatureClass)
    return mask
  }
  // Actionsheet
  s.createActionsheet = function () {
    var actionsheet = document.createElement('div')
    actionsheet.setAttribute('class', s.params.actionsheetClass)
    actionsheet.setAttribute(s.params.animationAttr, s.params.animation)
    return actionsheet
  }
  // Group
  s.createGroup = function () {
    var group = document.createElement('div')
    group.setAttribute('class', s.params.groupClass)
    // Options
    s.options = []
    for (var [i, opt] of s.params.data.entries()) { // eslint-disable-line
      var option = document.createElement('a')
      option.setAttribute('class', s.params.optionClass)
      option.setAttribute('data-index', i)
      option.innerHTML = opt.text
      s.options.push(option)
      group.appendChild(option)
    }
    return group
  }
  // Options
  s.createOptions = function (appendToEl) {
    
  }
  // buttonCancel
  s.createButtonCancel = function () {
    // 创建取消按钮
    if (!s.params.buttonCancelHTML) {
      return 0
    }
    var buttonCancel = document.createElement('a')
    buttonCancel.setAttribute('class', s.params.buttonCancelClass)
    buttonCancel.innerHTML = s.params.buttonCancelHTML
    return buttonCancel
  }

  s.create = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      s.actionsheet = s.mask.querySelector('.' + s.params.actionsheetClass)
      s.group = s.mask.querySelector('.' + s.params.groupClass)
      s.options = [].slice.call(s.mask.querySelectorAll('.' + s.params.optionClass))
      /* eslint-disable */
      // for (var i = 0, option; option = s.options[i++];) {
      //   option.handler = option.getAttribute('handler')
      // }
      /* eslint-enable */
      s.buttonCancel = s.mask.querySelector('.' + s.params.buttonCancelClass)
      return
    }
    s.mask = s.createMask()
    s.actionsheet = s.createActionsheet()
    s.group = s.createGroup()
    s.buttonCancel = s.createButtonCancel()
    s.actionsheet.appendChild(s.group)
    s.actionsheet.appendChild(s.buttonCancel)
    s.mask.appendChild(s.actionsheet)
    s.parent.appendChild(s.mask)
  }
  s.create()

  /* ------------------
  Method
  ------------------ */
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.parent.removeChild(s.mask)
  }
  s.showActionsheet = function () {
    s.actionsheet.classList.add(s.params.maskActiveClass)
  }
  s.hideActionsheet = function () {
    s.actionsheet.classList.remove(s.params.maskActiveClass)
  }
  s.destroyActionsheet = function () {
    s.parent.removeChild(s.actionsheet)
  }

  s.isHid = true
  s.hide = function () {
    s.isHid = true
    // 显示遮罩
    s.hideMask()
    // 显示弹出框
    s.hideActionsheet()
    // 显示滚动条
    if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass)
  }
  s.show = function () {
    s.isHid = false
    // 显示遮罩
    s.showMask()
    // 显示弹出框
    s.showActionsheet()
    // 禁用滚动条
    if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass)
  }
  s.destroy = function () { // 销毁
    s.destroyMask()
  }
  /* ------------------
  Control
  ------------------ */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    s.mask[action]('click', s.onClick, false)
    s.actionsheet[action]('webkitTransitionEnd', s.onTransitionEnd, false)
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
    // 点击容器
    if (s.params.onClick) s.params.onClick(s)
    if (e.target.classList.contains(s.params.maskClass)) { // 点击遮罩
      s.onClickMask(s)
    } else if (e.target.classList.contains(s.params.headerCancelClass)) { // 点击确定按钮
      s.onClickCancel(s)
    } else if (e.target.classList.contains(s.params.optionClass)) { // 点击项
      s.onClickOption(s)
    }

    s.hide()
  }
  // 点击遮罩
  s.onClickMask = function (s) {
    if (s.params.onClickMask) s.params.onClickMask(s)
    else s.hide()
  }
  // 点击项
  s.onClickOption = function (s) {
    var e = s.event
    var index = e.target.getAttribute('data-index')
    if (!isNaN(index)) {
      if(s.params.data[index].handler instanceof Function) option.handler(s)
    }
  }
  // Cancel
  s.onClickCancel = function (s) {
    if (s.params.onClickCancel) s.params.onClickCancel(s)
    else s.hide()
  }

  s.onTransitionEnd = function (e) {
    if (e.propertyName === 'visibility') return
  }
  /* ------------------
  Init
  ------------------ */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Actionsheet
