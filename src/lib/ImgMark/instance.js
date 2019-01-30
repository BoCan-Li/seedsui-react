var Imgmark = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    loadingClass: 'imgmark-loading',
    errorClass: 'imgmark-error',
    activeClass: 'active',

    src: '',
    drawSrc: true, // 是否连同背景一起绘制到canvas上
    data: [],
    strokeStyle: '#00ff00',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92,

    previewClass: 'imgmark-preview',
    previewActiveClass: 'active',
    previewContainerClass: 'imgmark-preview-container',
    previewLayerClass: 'imgmark-preview-layer',
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  if (!s.container) {
    console.log('SeedsUI Error : HandSign container不存在，请检查页面中是否有此元素')
    return
  }
  s.loadingContainer = s.container.parentNode.querySelector('.' + s.params.loadingClass) || null
  s.errorContainer = s.container.parentNode.querySelector('.' + s.params.errorClass) || null
  s.ctx = s.container.getContext('2d')
  s.stageInfo = s.container.getBoundingClientRect()
  s.path = {
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
  }
  /* ----------------------
  Model Method
  ---------------------- */
  s.setData = function (data) {
    if (data) {
      s.params.data = data
    }
  }
  s.setStrokeStyle = function (strokeStyle) {
    if (strokeStyle) {
      s.params.strokeStyle = strokeStyle
    }
  }
  s.setLineWidth = function (lineWidth) {
    if (lineWidth) {
      s.params.lineWidth = lineWidth
    }
  }
  s.setSuffix = function (suffix) {
    if (suffix) {
      s.params.suffix = suffix
    }
  }
  s.setQuality = function (quality) {
    if (quality) {
      s.params.quality = quality
    }
  }
  s.setDrawBg = function (drawSrc) {
    if (drawSrc) {
      s.params.drawSrc = drawSrc
    }
  }
  /* ----------------------
  Method
  ---------------------- */
  // 清除
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.container.width, s.container.height)
  }
  // 创建预览层
  s.previewMask = null
  s.previewContainer = null
  s.previewImg = null
  s.createPreview = function (img, layers) {
    if (!s.previewMask) {
      s.previewMask = document.createElement('div')
      s.previewMask.setAttribute('class', s.params.previewClass)

      s.previewContainer = document.createElement('div')
      s.previewContainer.setAttribute('class', s.params.previewContainerClass)

      s.previewMask.addEventListener('click', s.closePreview, false)

      document.body.append(s.previewMask)
    } else {
      s.previewContainer.innerHTML = ''
    }
    // 构建图片
    s.previewImg = img

    s.previewContainer.appendChild(s.previewImg)
    if (layers && layers.length) {
      var layersHTML = ''
      for (var layer of layers) {
        layersHTML += '<div class="'+ s.params.previewLayerClass +'" style="background-image:url(' + layer + ')"></div>'
        // layerDiv.style.backgroundImage = 'url(' + layer + ')'
        // s.previewContainer.appendChild(layerDiv)
      }
      s.previewContainer.innerHTML = s.previewContainer.innerHTML + layersHTML
    }
    s.previewMask.appendChild(s.previewContainer)
  }

  s.hash = ''
  s.addHash = function () {
    if (window.location.href.indexOf('#') !== -1) {
      if (s.hash && window.location.href.indexOf(s.hash) !== -1) {

      } else {
        s.hash = '#' + window.location.href.split('#')[1] + '&preview'
      }
      window.history.pushState({
        href: s.hash
      }, document.title, s.hash)
    } else {
      s.hash = '#&preview'
      window.history.pushState({
        href: s.hash
      }, document.title, s.hash)
    }
  }
  s.removeHash = function () {
    if (window.location.href.indexOf(s.hash) !== -1) {
      window.history.go(-1)
    }
  }
  // 关闭预览
  s.closePreview = function () {
    // 删除hash
    s.removeHash()
    s.previewMask.classList.remove(s.params.previewActiveClass)
  }
  // 预览
  s.preview = function (src, options) {
    var img = new Image()
    img.src = src
    img.addEventListener('load', function () {
      if (img.width > img.height) { // 宽图
        img.style.height = '100%'
      } else { // 高图
        img.style.width = '100%'
      }
      s.createPreview(img, options && options.layers ? options.layers : '')
      s.previewMask.classList.add(s.params.previewActiveClass)
      // 增加hash
      s.addHash()
      if (options && options.onSuccess) options.onSuccess()
    }, false)
    img.addEventListener('error', function () {
      if (options && options.onError) options.onError('图片加载失败')
    }, false)
  }
  // 保存图片为base64
  s.save = function () {
    try {
      return s.container.toDataURL(s.params.suffix, s.params.quality)
    } catch (error) {
      console.error(error)
      return null
    }
  }
  // 绘制图片
  s.draw = function (img, data, drawSrc) {
    if (!img) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    if (!data) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    if (drawSrc) {
      s.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    }
    for (let item of data) {
      if (item.strokeStyle) s.ctx.strokeStyle = item.strokeStyle
      else s.ctx.strokeStyle = s.params.strokeStyle
      if (item.lineWidth) s.ctx.lineWidth = item.lineWidth
      else s.ctx.lineWidth = s.params.lineWidth
      s.ctx.strokeRect(item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1)
    }
  }
  s.update = function () {
    if (s.params.src) {
      var img = new Image()
      img.src = s.params.src
      img.addEventListener('load', s.onLoad, false)
      img.addEventListener('error', s.onError, false)
    }
  }
  /* ----------------------
  Events
  ---------------------- */
  s.onLoad = function (e) {
    var target = e.target
    // 显隐
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.remove(s.params.activeClass)
    s.container.classList.add(s.params.activeClass)
    // 绘图
    s.container.width = target.width
    s.container.height = target.height
    s.draw(target, s.params.data, s.params.drawSrc)
    // 缩小
    var scale = s.params.height / target.height
    s.container.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
    s.container.style.WebkitTransformOrigin = `0 0`
  }
  s.onError = function () {
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.add(s.params.activeClass)
    s.container.classList.remove(s.params.activeClass)
  }
  // 主函数
  s.init = function () {
    s.update()
  }

  s.init()
}

export default Imgmark
