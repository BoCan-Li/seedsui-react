// Vott

var Vott = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    containerClass: 'vott-container',
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

  // 更新DOM
  s.update = function () {
    if (!s.container) return
  }
  s.update()
  /* --------------------
  Methods
  -------------------- */
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
    direction: 0,
    vertical: 0,
    horizontal: 0,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
    posX: 0
  }
  s.onTouchStart = function (e) {
    console.log(e)
    s.container.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.clientX || e.touches[0].clientX
    s.touches.startY = e.clientY || e.touches[0].clientY
  }
  s.onTouchMove = function (e) {
    console.log(e)
    s.touches.currentX = e.clientX || e.touches[0].clientX
    s.touches.currentY = e.clientY || e.touches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY
  }
  s.onTouchEnd = function (e) {
    console.log(e)
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY
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
