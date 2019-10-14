// Vott

var Vott = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    containerClass: 'vott-container',
    svgClass: 'vott-svg',
    shapeClass: 'vott-shape',
    shapeActiveClass: 'active',
    /*
    callbacks
    onInit:function(s)
    onChange:function(s)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Slider
  var s = this

  // Params
  s.params = params

  // Container
  s.container = (typeof container === 'string' && container !== '') ? document.querySelector(container) : container
  if (!s.container) {
    console.warn('SeedsUI Error：未找到Container，请检查传入参数是否正确')
    return
  }

  // Svg
  s.svg = null

  // 更新DOM
  s.update = function () {
    if (!s.container) return
  }
  s.update()
  /* --------------------
  Methods
  -------------------- */
  // 更新svg忏悔
  s.updateSvg =  function (svg, attr) {
    if (!attr) return
    for (var key in attr) {
      switch (key) {
        case 'xlink:href': // 文本路径添加属性特有
          svg.setAttributeNS('http://www.w3.org/1999/xlink', key, attr[key])
          break
        default:
          svg.setAttribute(key, attr[key])
      }
    }
  }
  // 创建svg相关元素  
  s.createSvg = function (tag, attr) {
    if (!document.createElementNS) return // 防止IE8报错  
    var svg = document.createElementNS('http://www.w3.org/2000/svg', tag)
    s.updateSvg(svg, attr)
    return svg
  }
  
  // 创建矩形
  s.createShape = function (svg, shapeName, attr) {
    // 创建svg容器
    if (!svg) {
      svg = this.createSvg('svg', {
        'class': s.params.svgClass,
        'viewBox': '0,0,' + s.container.clientWidth + ',' + s.container.clientHeight // 视窗大小决定里层的像素, 类似rem
      })
    }
    // 创建形状
    var shape = this.createSvg(shapeName || 'rect', attr || {  
      'x': 0,
      'y': 0,
      'width': 20,
      'height': 20, 
      'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass
    })
    svg.shape = shape
    svg.appendChild(shape)

    return svg
  }
  // 拖动形状大小
  s.scaleShape = function (target, x, y, w, h) {
    var startX = x
    var startY = y
    var width = w
    var height = h
    // 如果宽度为正数, 用户逆向缩放, 则修改x坐标与宽度两项
    if (w > 0) {
      startX = x - w
    }
    // 如果高度为正数, 用户逆向缩放, 则修改y坐标与高度两项
    if (h > 0) {
      startY = y - h
    }
    s.updateSvg(target, {
      'x': startX,
      'y': startY,
      'width': Math.abs(width),
      'height': Math.abs(height),
      'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass
    })
  }
  // 移动形状
  s.moveShape = function (target, x, y, w, h) {
    var startX = x
    var startY = y
    s.updateSvg(target, {
      'x': startX - w,
      'y': startY - h
    })
  }
  /* --------------------
  Touch Events
  -------------------- */
  // 是否支持触摸事件
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    var touchTarget = s.container
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // touch兼容pc事件
    if (s.isSupportTouch) {
      touchTarget[action]('touchstart', s.onTouchStart, false)
      touchTarget[action]('touchmove', s.onTouchMove, false)
      touchTarget[action]('touchend', s.onTouchEnd, false)
      touchTarget[action]('touchcancel', s.onTouchEnd, false)
    } else {
      touchTarget[action]('mousedown', s.onTouchStart, false)
      touchTarget[action]('mousemove', s.onTouchMove, false)
      touchTarget[action]('mouseup', s.onTouchEnd, false)
    }
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* --------------------
  Touch Handler
  -------------------- */
  function preventDefault (e) {
    e.preventDefault()
  }
  // Touch信息
  s.touches = {
    target: null, // 操作的对象
    type: 'new', // 类型: 创建 'new', 移动 'move', 缩放 'size'
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0
  }
  s.onTouchStart = function (e) {
    s.container.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.offsetX || e.touches[0].clientX
    s.touches.startY = e.offsetY || e.touches[0].clientY

    // 允许拖动
    s.moveEnd = false
    // 完成后, 将选中状态置为普通状态
    if (s.touches.target) {
      s.touches.target.classList.remove(s.params.shapeActiveClass)
    }

    if (e.target.classList.contains(s.params.shapeClass)) { // 点击形状
      e.target.classList.add(s.params.shapeActiveClass)
      s.touches.target = e.target
      s.svg = e.target.parentNode

      s.touches.type = 'move'
    } else { // 点击svg或者空白
      if (e.target.classList.contains(s.params.svgClass)) s.svg = e.target
      s.svg = s.createShape(s.svg, 'rect', {  
        'x': s.touches.startX,  
        'y': s.touches.startY,  
        'width': '1',
        'height': '1', 
        'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass
      })
      s.touches.target = s.svg.shape
      s.container.appendChild(s.svg)

      s.touches.type = 'new'
    }
  }
  s.onTouchMove = function (e) {
    if (s.moveEnd) return
    if (!s.touches.target) return
    s.touches.currentX = e.offsetX || e.touches[0].clientX
    s.touches.currentY = e.offsetY || e.touches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY
    
    // 缩放尺寸
    if (s.touches.type === 'new') {
      s.scaleShape(s.touches.target, s.touches.startX, s.touches.startY, s.touches.diffX, s.touches.diffY)
    } else if (s.touches.type === 'move') {
      // 记录开始移动位置
      if (!s.touches.moveStartX) s.touches.moveStartX = s.touches.target.getAttribute('x')
      if (!s.touches.moveStartY) s.touches.moveStartY = s.touches.target.getAttribute('y')
      s.moveShape(s.touches.target, s.touches.moveStartX, s.touches.moveStartY, s.touches.diffX, s.touches.diffY)
    }
  }
  s.onTouchEnd = function (e) {
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    s.touches.endX = e.offsetX || e.changedTouches[0].clientX
    s.touches.endY = e.offsetY || e.changedTouches[0].clientY

    // 清空记录的移动位置
    if (s.touches.moveStartX) s.touches.moveStartX = null
    if (s.touches.moveStartY) s.touches.moveStartY = null

    // 单击事件
    if (Math.abs(s.touches.startX - s.touches.endX) < 6 && Math.abs(s.touches.startY - s.touches.endY) < 6) {
      s.touches.target.parentNode.removeChild(s.touches.target)
      s.touches.target = null
    }

    s.moveEnd = true
  }
  /* --------------------
  Init
  -------------------- */
  // 主函数
  s.init = function () {
    s.attach()
  }
  // 执行主函数
  s.init()
  return s
}

export default Vott
