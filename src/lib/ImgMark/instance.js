var Imgmark = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    src: '',
    data: [],
    strokeStyle: '#00ff00',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92
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
  s.width = s.container.width
  s.height = s.container.height
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
  /* ----------------------
  Method
  ---------------------- */
  // 清除签名
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.width, s.height)
  }
  // 是否画过
  s.isDrew = function () {
    var blank = document.createElement('canvas')
    blank.width = s.container.width
    blank.height = s.container.height
    if (s.container.toDataURL() === blank.toDataURL()) return false
    return true
  }
  // 保存签名
  s.save = function () {
    // 如果已经画过了,则返回base64,如果没有画过,则返回空
    if (s.isDrew()) {
      return s.container.toDataURL(s.params.suffix, s.params.quality)
    } else {
      return ''
    }
  }
  // 绘制图片
  s.draw = function (img, data) {
    if (!img) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    if (!data) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img')
      return
    }
    s.ctx.strokeStyle = s.params.strokeStyle
    s.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    for (let item of data) {
      s.ctx.strokeRect(item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1)
    }
  }
  s.update = function () {
    if (s.params.src) {
      var image = new Image()
      image.src = s.params.src
      image.addEventListener('load', s.onLoad, false)
    }
  }
  /* ----------------------
  Events
  ---------------------- */
  s.onLoad = function (e) {
    var target = e.target
    s.container.width = target.width
    s.container.height = target.height
    s.draw(target, s.params.data)
    // 缩小
    var scale = s.params.height / target.height
    s.container.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
    s.container.style.WebkitTransformOrigin = `0 0`
  }
  // 主函数
  s.init = function () {
    s.update()
  }

  s.init()
}

export default Imgmark
