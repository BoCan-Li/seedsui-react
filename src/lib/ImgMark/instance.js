var Imgmark = function (container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    activeClass: 'active',
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
  /* ----------------------
  Method
  ---------------------- */
  // 清除
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.container.width, s.container.height)
  }
  // 保存签名
  s.save = function () {
    return s.container.toDataURL(s.params.suffix, s.params.quality)
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
    s.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    for (let item of data) {
      if (item.strokeStyle) s.ctx.strokeStyle = item.strokeStyle
      else s.ctx.strokeStyle = s.params.strokeStyle
      s.ctx.strokeRect(item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1)
    }
  }
  s.update = function () {
    if (s.params.src) {
      var img = new Image()
      img.setAttribute("crossOrigin",'Anonymous')
      img.src = s.params.src
      img.addEventListener('load', s.onLoad, false)
    }
  }
  /* ----------------------
  Events
  ---------------------- */
  s.onLoad = function (e) {
    var target = e.target
    s.container.classList.add(s.params.activeClass)
    s.container.width = target.width
    s.container.height = target.height
    console.log(s.params.data)
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
