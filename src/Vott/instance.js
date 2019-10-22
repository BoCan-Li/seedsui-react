// Vott (require GeoUtil)
import GeoUtil from '../GeoUtil'

var Vott = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    src: '',

    loadingClass: 'imgmark-loading',
    errorClass: 'imgmark-error',
    activeClass: 'active',

    containerClass: 'vott-container',

    svgClass: 'vott-svg',

    shapeClass: 'vott-shape',
    shapeActiveClass: 'active',
    shapeCss: '',
    shapeActiveCss: '',
    hideClass: 'hide',
    // 编辑圆圈
    shapeScalerClass: 'vott-shape-scaler',
    xMinYMinClass: 'xMinYMin', // 左上
    xMinYMidClass: 'xMinYMid', // 左中
    xMinYMaxClass: 'xMinYMax', // 左下

    xMidYMinClass: 'xMidYMin', // 中上
    xMidYMaxClass: 'xMidYMax', // 中下

    xMaxYMinClass: 'xMaxYMin', // 右上
    xMaxYMidClass: 'xMaxYMid', // 右中
    xMaxYMaxClass: 'xMaxYMax', // 右下

    scale: true // 缩放类型: true等比例缩放, false自由缩放
    /*
    callbacks
    onInit:function(s)
    onChange:function(s)
    onSuccess:function(s)
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
    return svg
  }
  // 创建svg相关元素  
  s.createSvg = function (tag, attr) {
    if (!document.createElementNS) return // 防止IE8报错  
    var svg = document.createElementNS('http://www.w3.org/2000/svg', tag)
    s.updateSvg(svg, attr)
    return svg
  }

  // Svg
  s.svg = s.container.querySelector('.' + s.params.svgClass) || s.createSvg('svg', {
    'class': s.params.svgClass,
    // 'viewBox': '0,0,' + s.container.clientWidth + ',' + s.container.clientHeight // 视窗大小决定里层的像素, 类似rem, 设置此值让svg内值同px相同
    preserveAspectRatio: 'none' // 长宽比, none为拉伸到和svg画布相同尺寸, 设置此值让svg内值同px相同
  })

  // Loading
  s.loadingContainer = s.container.parentNode.querySelector('.' + s.params.loadingClass) || null

  // Error
  s.errorContainer = s.container.parentNode.querySelector('.' + s.params.errorClass) || null

  // Scaler, 缩放圆圈
  s.scaler = null

  // 图片加载完成或者错误
  s.onLoad = function (e) {
    console.log('加载完成')
    var target = e.target
    // 显隐
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.remove(s.params.activeClass)
    s.svg.classList.add(s.params.activeClass)
    // 计算宽高
    var scale = 1
    if (target.width > target.height) { // 宽图计算
      scale = s.container.clientWidth / target.width
    } else { // 长图计算
      scale = s.container.clientHeight / target.height
    }
    var width = target.width * scale
    var height = target.height * scale
    s.svg.setAttribute('style', `width:${width};height:${height}`)
    // 设置背景图
    s.svg.style.backgroundImage = `url(${s.params.src})`
    // s.draw(target, s.params.data, s.params.isDrawSrc)
    //console.log(s.container.clientHeight)
    // 缩小
    // var scale = s.container.clientHeight / target.height
    // s.svg.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
    // s.svg.style.WebkitTransformOrigin = `0 0`
    // Callback
    if (s.params.onSuccess) s.params.onSuccess(s)
  }
  s.onError = function () {
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass)
    if (s.errorContainer) s.errorContainer.classList.add(s.params.activeClass)
    s.svg.classList.remove(s.params.activeClass)
    // Callback
    if (s.params.onError) s.params.onError(s)
  }
  // 更新DOM
  s.update = function () {
    if (!s.params.src || !s.container) return
    // 更新容器
    s.svg.innerHTML = ''
    // 更新缩放圆圈
    var xMinYMin = s.svg.querySelector('.' + s.params.xMinYMinClass) // 左上
    var xMinYMid = s.svg.querySelector('.' + s.params.xMinYMidClass) // 左中
    var xMinYMax = s.svg.querySelector('.' + s.params.xMinYMaxClass) // 左下

    var xMidYMin = s.svg.querySelector('.' + s.params.xMidYMinClass) // 中上
    var xMidYMax = s.svg.querySelector('.' + s.params.xMidYMaxClass) // 中下

    var xMaxYMin = s.svg.querySelector('.' + s.params.xMaxYMinClass) // 右上
    var xMaxYMid = s.svg.querySelector('.' + s.params.xMaxYMidClass) // 右中
    var xMaxYMax = s.svg.querySelector('.' + s.params.xMaxYMaxClass) // 右下

    if (xMinYMin && xMinYMid && xMinYMax && xMidYMin && xMidYMax && xMaxYMin && xMaxYMid && xMaxYMax) {
      s.scaler = {
        xMinYMin: xMinYMin, // 左上
        xMinYMid: xMinYMid, // 左中
        xMinYMax: xMinYMax, // 左下

        xMidYMin: xMidYMin, // 中上
        xMidYMax: xMidYMax, // 中下

        xMaxYMin: xMaxYMin, // 右上
        xMaxYMid: xMaxYMid, // 右中
        xMaxYMax: xMaxYMax // 右下
      }
    }

    // 创建图片
    console.log(s.params.src)
    var img = new Image()
    img.src = s.params.src
    img.addEventListener('load', s.onLoad, false)
    img.addEventListener('error', s.onError, false)
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
    var shape = s.createSvg(shapeName || 'polygon', attr || {  
      'points': '0,0,1,0,1,1,0,1',
      'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass,
      'style': s.params.shapeCss + '' + s.params.shapeActiveCss
    })
    svg.shape = shape
    svg.appendChild(shape)

    return svg
  }
  // 移除形状
  s.removeShape = function (target) {
    target.parentNode.removeChild(target)
    s.touches.target = null
    s.hideScaler()
  }
  // 创建圆形
  s.createCircle = function (svg, attr) {
    var shape = s.createSvg('circle', attr)
    svg.shape = shape
    svg.appendChild(shape)

    return svg
  }
  // 拖动形状大小
  s.scaleShape = function (target, currentX, currentY, type) {
    if (type === 'new') {
      type = 'xMaxYMax'
    } else {
    }
    // 4个坐标
    var pointsArr = s.sortPoints(s.touches.target.getAttribute('points'))
    // 坐标字符串
    var points = ''

    if (s.params.scale) { // 等比缩放, 并构建四个点
      if (type === 'xMinYMin') { // 左上
        let fixedX = pointsArr[3][0]
        let fixedY = pointsArr[3][1]
        points =
        fixedX + ',' + currentY + ',' +
        currentX + ',' + currentY + ',' +
        currentX + ',' + fixedY + ',' +
        fixedX + ',' + fixedY
      } else if (type === 'xMinYMid') { // 左中
        let fixedX1 = pointsArr[0][0]
        let fixedY1 = pointsArr[0][1]
        let fixedX2 = pointsArr[3][0]
        let fixedY2 = pointsArr[3][1]
        points =
        fixedX1 + ',' + fixedY1 + ',' +
        currentX + ',' + fixedY1 + ',' +
        currentX + ',' + fixedY2 + ',' +
        fixedX2 + ',' + fixedY2
      } else if (type === 'xMinYMax') { // 左下
        let fixedX = pointsArr[0][0]
        let fixedY = pointsArr[0][1]
        points =
        fixedX + ',' + fixedY + ',' +
        currentX + ',' + fixedY + ',' +
        currentX + ',' + currentY + ',' +
        fixedX + ',' + currentY
      } else if (type === 'xMidYMin') { // 中上
        let fixedX1 = pointsArr[2][0]
        let fixedY1 = pointsArr[2][1]
        let fixedX2 = pointsArr[3][0]
        let fixedY2 = pointsArr[3][1]
        points =
        fixedX2 + ',' + currentY + ',' +
        fixedX1 + ',' + currentY + ',' +
        fixedX1 + ',' + fixedY1 + ',' +
        fixedX2 + ',' + fixedY2
      } else if (type === 'xMidYMax') { // 中下
        let fixedX1 = pointsArr[0][0]
        let fixedY1 = pointsArr[0][1]
        let fixedX2 = pointsArr[1][0]
        let fixedY2 = pointsArr[1][1]
        points =
        fixedX1 + ',' + fixedY1 + ',' +
        fixedX2 + ',' + fixedY2 + ',' +
        fixedX2 + ',' + currentY + ',' +
        fixedX1 + ',' + currentY
      } else if (type === 'xMaxYMin') { // 右上
        let fixedX = pointsArr[2][0]
        let fixedY = pointsArr[2][1]
        points =
        currentX + ',' + currentY + ',' +
        fixedX + ',' + currentY + ',' +
        fixedX + ',' + fixedY + ',' +
        currentX + ',' + fixedY
      } else if (type === 'xMaxYMid') { // 右中
        let fixedX1 = pointsArr[1][0]
        let fixedY1 = pointsArr[1][1]
        let fixedX2 = pointsArr[2][0]
        let fixedY2 = pointsArr[2][1]
        points =
        currentX + ',' + fixedY1 + ',' +
        fixedX1 + ',' + fixedY1 + ',' +
        fixedX2 + ',' + fixedY2 + ',' +
        currentX + ',' + fixedY2
      } else if (type === 'xMaxYMax') { // 右下
        let fixedX = pointsArr[1][0]
        let fixedY = pointsArr[1][1]
        points =
        currentX + ',' + fixedY + ',' +
        fixedX + ',' + fixedY + ',' +
        fixedX + ',' + currentY + ',' +
        currentX + ',' + currentY
      }
    } else { // 自由缩放, 并构建四个点
      console.log('自由缩放')
    }

    s.updateSvg(target, {
      'points': points,
      'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass,
      'style': s.params.shapeCss + '' + s.params.shapeActiveCss
    })
  }
  // 显示缩放控件
  s.showScaler = function () {
    if (!s.scaler) return
    for (var scalerName in s.scaler) {
      s.scaler[scalerName].classList.remove(s.params.hideClass)
    }
    s.scalerShow = true
  }
  // 隐藏缩放控件
  s.hideScaler = function () {
    if (!s.scaler) return
    for (var scalerName in s.scaler) {
      s.scaler[scalerName].classList.add(s.params.hideClass)
    }
    s.scalerShow = false
  }
  // 移动形状
  s.moveShape = function (target, x, y, diffX, diffY) {
    // 构建points
    var points = target.getAttribute('points').split(',')
    // 获取左上角的点
    var startX = Number(points[2] || 0)
    var startY = Number(points[3] || 0)
    // 获取右下角的点
    var endX = Number(points[6] || 0)
    var endY = Number(points[7] || 0)
    // 获取宽高
    var width = Math.abs(endX - startX || 0)
    var height = Math.abs(endY - startY || 0)

    // 计算8个点的位置
    points = [
      (x + width) + diffX, y + diffY, // 右上
      x + diffX, y + diffY, // 左上
      x + diffX, (y + height) + diffY, // 左下
      (x + width) + diffX, (y + height) + diffY, // 右下
    ]
    
    s.updateSvg(target, {
      'points': points.join(',')
    })
  }
  // 编辑形状
  s.editShape = function (target) {
    // 从右上角开始到右下角结束
    var points = target.getAttribute('points').split(',')

    // 获取左上角的点
    var startX = Number(points[2] || 0)
    var startY = Number(points[3] || 0)
    // 获取右下角的点
    var endX = Number(points[6] || 0)
    var endY = Number(points[7] || 0)

    var width = Math.abs(endX - startX || 0)
    var height = Math.abs(endY - startY || 0)

    // 计算8个点的位置
    points = {
      xMinYMin: [startX, startY], // 左上
      xMinYMid: [startX, startY + height / 2], // 左中
      xMinYMax: [startX, startY + height], // 左下

      xMidYMin: [startX + width / 2, startY], // 中上
      xMidYMax: [startX + width / 2, startY + height], // 中下

      xMaxYMin: [startX + width, startY], // 右上
      xMaxYMid: [startX + width, startY + height / 2], // 右中
      xMaxYMax: [startX + width, startY + height] // 右下
    }
    
    var hasScaler = !!s.scaler
    for (var pointName in points) {
      var point = points[pointName]
      if (!hasScaler) { // 如果没有缩放者saler, 则构建
        var svg = s.createCircle(s.svg, {
          'cx': point[0],
          'cy': point[1],
          'r': 5,
          'class': s.params.shapeScalerClass + ' ' + s.params[pointName + 'Class']
        })
        if (!s.scaler) s.scaler = {}
        s.scaler[pointName] = svg.shape
      } else { // 如果已经有缩放者saler, 则更新
        s.updateSvg(s.scaler[pointName], {
          'cx': point[0],
          'cy': point[1],
        })
        // 移动位置到最下面
        s.svg.appendChild(s.scaler[pointName])
      }
    }
    s.showScaler()
  }
  // 点转成多边形[[x,y]]
  s.toPolygon = function (points) {
    var polygon = []
    var page = 0
    points.split(',').forEach(function (point, i) {
      // debugger
      if (i !== 0 && i % 2 === 0) {
        page++
      }
      if (!polygon[page]) polygon[page] = []
      polygon[page].push(point)
    })
    return polygon
  }
  // 多边形坐标点按逆时针排序, 从右上角开始到右下角结束
  s.sortPoints = function (points) {
    var polygon = s.toPolygon(points)
    var sorts = GeoUtil.sortPoints(polygon)
    return sorts
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
    // 按Delete键删除形状
    document[action]('keydown', s.onKeyDown, false)
    // 双击删除形状
    touchTarget[action]('dblclick', s.onDblClick, false)
    // 用于touch事件时只能取绝对位置
    s.stageInfo = touchTarget.getBoundingClientRect()
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  function preventDefault (e) {
    e.preventDefault()
  }
  // Touch信息
  s.touches = {
    target: null, // 操作的对象
    type: 'new', // 类型: 新增形状 'new', 已有形状 'move'
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
    s.touches.startX = s.isSupportTouch ? e.touches[0].clientX - s.stageInfo.left : e.offsetX
    s.touches.startY = s.isSupportTouch ? e.touches[0].clientY - s.stageInfo.top : e.offsetY

    // 允许拖动
    s.moveEnd = false

    // 完成后, 将选中状态置为普通状态
    if (s.touches.target) s.touches.target.classList.remove(s.params.shapeActiveClass)

    // 判断方向
    if (e.target.classList.contains(s.params.shapeScalerClass)) { // 点击右下角, 放大缩小
      if (e.target.classList.contains(s.params.xMinYMinClass)) s.touches.type = 'xMinYMin' // 左上
      else if (e.target.classList.contains(s.params.xMinYMidClass)) s.touches.type = 'xMinYMid' // 左中
      else if (e.target.classList.contains(s.params.xMinYMaxClass)) s.touches.type = 'xMinYMax' // 左下
      else if (e.target.classList.contains(s.params.xMidYMinClass)) s.touches.type = 'xMidYMin' // 中上
      else if (e.target.classList.contains(s.params.xMidYMaxClass)) s.touches.type = 'xMidYMax' // 中下
      else if (e.target.classList.contains(s.params.xMaxYMinClass)) s.touches.type = 'xMaxYMin' // 右上
      else if (e.target.classList.contains(s.params.xMaxYMidClass)) s.touches.type = 'xMaxYMid' // 右中
      else if (e.target.classList.contains(s.params.xMaxYMaxClass)) s.touches.type = 'xMaxYMax' // 右下
      else s.touches.type = 'xMaxYMax' // 右下

      var points = s.toPolygon(s.touches.target.getAttribute('points'))
      s.touches.startX = points[1][0]
      s.touches.startY = points[1][1]
    } else if (e.target.classList.contains(s.params.shapeClass)) { // 点击形状, 则移动
      e.target.classList.add(s.params.shapeActiveClass)
      e.target.setAttribute('style', e.target.getAttribute('style').replace(s.params.shapeActiveCss, ''))
      s.touches.target = e.target

      s.touches.type = 'move'
    } else if (e.target.classList.contains(s.params.svgClass)) { // 点击svg容器, 新增形状
      // 新增形状
      s.svg = s.createShape(s.svg, 'polygon', {  
        'points': s.touches.startX + ',' + s.touches.startY + ',' +
                  (s.touches.startX + 1) + ',' + s.touches.startY + ',' +
                  (s.touches.startX + 1) + ',' + (s.touches.startY + 1) + ',' +
                  s.touches.startX + ',' + (s.touches.startY + 1),
        'class': s.params.shapeClass + ' ' + s.params.shapeActiveClass
      })
      s.touches.target = s.svg.shape
      s.container.appendChild(s.svg)

      s.touches.type = 'new'
    }
  }
  s.onTouchMove = function (e) {
    if (s.moveEnd || !s.touches.target) return
    s.touches.currentX = s.isSupportTouch ? e.touches[0].clientX - s.stageInfo.left : e.offsetX
    s.touches.currentY = s.isSupportTouch ? e.touches[0].clientY - s.stageInfo.top : e.offsetY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY
    // 隐藏缩放控件
    if (s.scalerShow) s.hideScaler()
    if (s.touches.type === 'move') { // 已有形状拖动位置
      // 记录的鼠标位置距离左上角的位置
      if (!s.touches.moveDiffX || !s.touches.moveDiffY) {
        var points = s.touches.target.getAttribute('points').split(',')
        s.touches.moveDiffX = Number(points[2] || 0) - s.touches.currentX
        s.touches.moveDiffY = Number(points[3] || 0) - s.touches.currentY
      }
      s.moveShape(s.touches.target, s.touches.currentX, s.touches.currentY, s.touches.moveDiffX, s.touches.moveDiffY)
    } else { // 新增或者拖动右下角形状改大小
      s.scaleShape(s.touches.target, s.touches.currentX, s.touches.currentY, s.touches.type)
    }
  }
  s.onTouchEnd = function (e) {
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    s.touches.endX = s.isSupportTouch ? e.changedTouches[0].clientX - s.stageInfo.left : e.offsetX
    s.touches.endY = s.isSupportTouch ? e.changedTouches[0].clientY - s.stageInfo.top : e.offsetY

    // 清空记录的移动位置
    if (s.touches.moveDiffX) s.touches.moveDiffX = null
    if (s.touches.moveDiffY) s.touches.moveDiffY = null


    // 矫正多边形点坐标, 使其坐标位置从左上角顺时针开始
    if (s.touches.target) {
      var points = s.sortPoints(s.touches.target.getAttribute('points')).join(',')
      s.touches.target.setAttribute('points', points)
    }

    // 如果点击新增的形状, 则删除此形状
    var bbox = s.touches.target.getBBox()
    if (s.touches.type === 'new' && (bbox.height < 10 || bbox.width < 10)) {
      s.touches.target.parentNode.removeChild(s.touches.target)
      s.touches.target = null
    } else { // 拖动
      s.editShape(s.touches.target)
    }

    s.moveEnd = true
  }
  // 双击删除此形状
  s.onDblClick = function (e) {
    if (e.target.classList.contains(s.params.shapeClass) && e.target.classList.contains(s.params.shapeActiveClass)) {
      s.removeShape(e.target)
    }
  }
  // 按Delete键删除此形状
  s.onKeyDown = function (e) {
    if (!s.touches.target) return
    if (e.keyCode === 8) {
      s.removeShape(s.touches.target)
    }
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
