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

    // 编辑圆圈
    xMinYMinClass: 'vott-shape-xMinYMin', // 左上
    xMinYMidClass: 'vott-shape-xMinYMid', // 左中
    xMinYMaxClass: 'vott-shape-xMinYMax', // 左下

    xMidYMinClass: 'vott-shape-xMidYMin', // 中上
    xMidYMaxClass: 'vott-shape-xMidYMax', // 中下

    xMaxYMinClass: 'vott-shape-xMaxYMin', // 右上
    xMaxYMidClass: 'vott-shape-xMaxYMid', // 右中
    xMaxYMaxClass: 'vott-shape-xMaxYMax' // 右下
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
  // Vott
  var s = this

  // Params
  s.params = params

  // Container
  s.container = (typeof container === 'string' && container !== '') ? document.querySelector(container) : container
  if (!s.container) {
    console.warn('SeedsUI Error：未找到Container，请检查传入参数是否正确')
    return
  }

  // 更新svg属性
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

  // Svg
  s.svg = s.createSvg('svg', {
    'class': s.params.svgClass,
    // 'viewBox': '0,0,' + s.container.clientWidth + ',' + s.container.clientHeight // 视窗大小决定里层的像素, 类似rem, 设置此值让svg内值同px相同
    preserveAspectRatio: 'none' // 长宽比, none为拉伸到和svg画布相同尺寸, 设置此值让svg内值同px相同
  })

  // 更新DOM
  s.update = function () {
    if (!s.container) return
    s.container.innerHTML = ''
    s.container.appendChild(s.svg)
  }
  s.update()

  /* --------------------
  Methods
  -------------------- */
  // 创建形状
  s.createShape = function (svg, shapeName, attr) {
    // 创建svg容器
    if (!svg) {
      svg = s.createSvg('svg', {
        'class': s.params.svgClass,
        // 'viewBox': '0,0,' + s.container.clientWidth + ',' + s.container.clientHeight // 视窗大小决定里层的像素, 类似rem, 设置此值让svg内值同px相同
        preserveAspectRatio: 'none' // 长宽比, none为拉伸到和svg画布相同尺寸, 设置此值让svg内值同px相同
      })
    }
    // 创建形状
    var shape = s.createSvg(shapeName || 'rect', attr || {  
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
  // 创建圆形
  s.createCircle = function (svg, attr) {
    var shape = s.createSvg('circle', attr)
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
  // 编辑形状
  s.editShape = function (target) {
    var startX = Number(target.getAttribute('x') || 0)
    var startY = Number(target.getAttribute('y') || 0)
    var width = Number(target.getAttribute('width') || 0)
    var height = Number(target.getAttribute('height') || 0)
    // 计算8个点的位置
    var points = {
      xMinYMin: [startX, startY], // 左上
      xMinYMid: [startX, startY + height / 2], // 左中
      xMinYMax: [startX, startY + height], // 左下

      xMidYMin: [startX + width / 2, startY], // 中上
      xMidYMax: [startX + width / 2, startY + height], // 中下

      xMaxYMin: [startX + width, startY], // 右上
      xMaxYMid: [startX + width, startY + height / 2], // 右中
      xMaxYMax: [startX + width, startY + height] // 右下
    }
    for (var pointName in points) {
      var point = points[pointName]
      s.createCircle(s.svg, {
        'cx': point[0],
        'cy': point[1],
        'r': 5,
        'class': s.params[pointName + 'Class']
      })
    }
  }
  /* --------------------
  Touch Events
  -------------------- */
  // 是否支持触摸事件
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    var touchTarget = s.svg
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
    type: 'new', // 类型: 新增形状 'new', 已有形状 'old'
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

    if (e.target.classList.contains(s.params.shapeClass)) { // 点击形状, 要么编辑, 要么移动
      e.target.classList.add(s.params.shapeActiveClass)
      s.touches.target = e.target

      s.touches.type = 'old'
    } else if (e.target.classList.contains(s.params.svgClass)) { // 点击svg容器, 新增形状
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
    
    if (s.touches.type === 'new') { // 新增形状改大小
      s.scaleShape(s.touches.target, s.touches.startX, s.touches.startY, s.touches.diffX, s.touches.diffY)
    } else if (s.touches.type === 'old') { // 已有形状拖动位置
      // 记录开始移动位置, 使用原始值减去差值修改x和y属性, 防止阶减的情况
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

    if (Math.abs(s.touches.startX - s.touches.endX) < 6 && Math.abs(s.touches.startY - s.touches.endY) < 6) { // 单击
      if (s.touches.type === 'new') { // 如果点击新增的形状, 则删除此形状
        s.touches.target.parentNode.removeChild(s.touches.target)
        s.touches.target = null
      } else if (s.touches.type === 'old') { // 如果是移动状态, 则为编辑
        s.editShape(s.touches.target)
      }
    } else { // 拖动
      if (s.touches.type === 'new') { // 如果拖动新增的形状, 完成显示编辑
        s.editShape(s.touches.target)
      }
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
