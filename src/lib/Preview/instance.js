import PinchZoom from './pinch-zoom.js'

var Preview = function (params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    src: '', // 图片地址
    layerHTML: '',

    hash: 's_preview',
    hashReplace: /(isFromApp=\w+)&?/, // 需要被替换的字符, 因为此地址字段会影响preview返回
    route: true,

    mask: null,
    maskClass: 'preview-mask',
    maskActiveClass: 'active',

    headerClass: 'preview-header',
    headerBackClass: 'preview-header-back',

    containerClass: 'preview-container',

    wrapperClass: 'preview-wrapper',

    layerClass: 'preview-layer',

    /*
    Callbacks:
    onClickBack: function(Preview)
    onSuccess: function(Preview)
    onError: function(Preview)
    onShowSuccess: function(Preview)
    onShowError: function(Preview)
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
  /* ----------------------
  Model Method
  ---------------------- */
  s.setSrc = function (src) {
    if (src) {
      s.params.src = src
    }
  }
  s.setLayerHTML = function (layerHTML) {
    if (layerHTML) {
      s.params.layerHTML = layerHTML
    }
  }
  s.setOnSuccess = function (onSuccess) {
    if (onSuccess) {
      s.params.onSuccess = onSuccess
    }
  }
  s.setOnError = function (onError) {
    if (onError) {
      s.params.onError = onError
    }
  }
  // 创建预览层
  s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
  s.header = null
  s.headerBack = null
  s.container = null
  s.img = null
  s.createPreview = function (img, layerHTML) {
    if (!s.mask) {
      s.mask = document.createElement('div')
      s.mask.setAttribute('class', s.params.maskClass)

      s.header = document.createElement('div')
      s.header.setAttribute('class', s.params.headerClass)

      s.headerBack = document.createElement('div')
      s.headerBack.setAttribute('class', s.params.headerBackClass)
      s.headerBack.addEventListener('click', s.onClickBack, false)

      s.header.appendChild(s.headerBack)

      s.container = document.createElement('div')
      s.container.setAttribute('class', s.params.containerClass)

      s.mask.appendChild(s.header)
      s.mask.appendChild(s.container)
      document.body.append(s.mask)
    } else {
      s.header = s.mask.querySelector('.' + s.params.headerClass)
      s.headerBack = s.mask.querySelector('.' + s.params.headerBackClass)
      s.headerBack.addEventListener('click', s.onClickBack, false)
      s.container = s.mask.querySelector('.' + s.params.containerClass)

      s.container.innerHTML = ''
    }

    // 构建图片
    s.img = img
    s.container.appendChild(s.img)

    // 构建浮层
    s.container.innerHTML = s.container.innerHTML + layerHTML
  }
  // 路径是否合法, true为有效, false为无效
  s.validSrc = null
  // 缩放类PinchZoom
  s.PinchZoom = null
  // 更新
  s.update = function () {
    if (!s.params.src) {
      s.validSrc = false // 图片地址无效
      return
    }
    var img = new Image()
    img.src = s.params.src
    img.addEventListener('load', function () {
      if (img.width > img.height) { // 宽图
        img.style.height = '100%'
      } else { // 高图
        img.style.width = '100%'
      }
      s.createPreview(img, s.params.layerHTML)
      s.validSrc = true // 图片地址有效
      // PinchZoom
      if (!s.PinchZoom) {
        s.PinchZoom = new PinchZoom(s.container, {})
        // 解决PinchZoom刚进入时白底的bug
        setTimeout(() => {
          s.container.style.backgroundColor = '#000'
        }, 100)
      } else {
        s.PinchZoom.update()
      }
      // Callback
      if (s.params.onSuccess) s.params.onSuccess(s)
    }, false)
    img.addEventListener('error', function () {
      s.validSrc = false // 图片地址无效
      // Callback
      if (s.params.onError) s.params.onError(s)
    }, false)
  }
  s.update()
  /* ----------------------
  Method
  ---------------------- */
  // 路由控制
  s.addHash = function () {
    if (!s.params.route) return
    var href = window.location.href
    if (href.indexOf(s.params.hash) !== -1) return
    
    if (href.indexOf('#') !== -1) { // 有#号, 拼#后面
      if (s.params.hashReplace.test(href)) { // 如果有isFromApp, 则替换为空 (没有#号则不能替换,否则在真机上会闪屏刷新)
        href = href.replace(RegExp.$1, '')
      }
      href = href + (href.indexOf('?') !== -1 ? '&' : '?') + s.params.hash
    } else { // 没有#号, 增加#+hash
      href = href + '#' + s.params.hash
    }
    window.location.href = href

    // var hash = ''
    // if (href.indexOf('#') !== -1) { // 有#号, 拼#后面
    //   hash = '#' + href.split('#')[1] + s.params.hash
    // } else { // 没有#号, 增加#+hash
    //   hash = '#' + s.params.hash
    // }
    // window.history.pushState({
    //   href: hash
    // }, document.title, hash)
  }
  s.removeHash = function () {
    if (!s.params.route) return
    if (window.location.href.indexOf(s.params.hash) !== -1) {
      window.history.go(-1)
    }
  }
  // 隐藏预览
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.hide = function () {
    s.removeHash() // 删除hash
    s.hideMask()
  }
  // 显示预览
  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.show = function () {
    if (s.validSrc) {
      if (s.params.onShowSuccess) s.params.onShowSuccess(s)
      s.addHash() // 增加hash
      s.showMask()
    } else {
      if (s.params.onShowError) s.params.onShowError(s, '图片加载失败')
    }
  }
  /* --------------------
  Events
  -------------------- */
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    if (s.params.route) {
      window[action]('popstate', s.onPopstate, false)
    }
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  s.onPopstate = function () {
    if (window.location.href.indexOf(s.params.hash) === -1) { // 应当不显示
      if (s.mask.classList.contains(s.params.maskActiveClass)) {
        s.hideMask()
      }
    } else { // 应当显示
      s.showMask()
    }
  }
  s.onClickBack = function () {
    if (s.params.onClickBack) s.params.onClickBack(s)
    else s.hide()
  }
  // 主函数
  s.init = function () {
    s.attach()
  }

  s.init()
}

export default Preview
