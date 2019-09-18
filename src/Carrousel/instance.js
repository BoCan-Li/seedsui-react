// Carrousel 滑动控件(require Device.js)
import Device from './../Device'

var Carrousel = function (container, params) {
  function getPureChildren (children, className) {
    var arr = []
    for (var i = 0; i < children.length; i++) {
      if (children[i].classList.contains(className)) arr.push(children[i])
    }
    return arr
  }
  function getElementByParent (parent, selector) {
    return (typeof selector === 'string' && selector !== '') ? parent.querySelector(selector) : selector
  }

  /* --------------------
  Model
  -------------------- */
  var defaults = {
    stopPropagation: true, // 是否阻止点击事件的传播, 此属性与FastClick冲突
    pagination: '.carrousel-pagination', // 小点点
    controlPrev: null, // 左箭头
    controlNext: null, // 右箭头
    autoplay: 0, // 设置毫秒数，0为不自动播放
    slidesPerView: 1,
    threshold: '50',
    duration: '300',
    height: null, // 固定高度
    width: null, // 固定宽度
    imglazyQuery: '.carrousel-lazy', // 图片懒加载
    imgLoadAttr: 'data-load-src',

    // loop
    loop: false,
    slideDuplicateClass: 'carrousel-slide-duplicate',

    // dom class
    pageClass: 'carrousel-page', // 轮播页模式,则不需要算高度
    wrapperClass: 'carrousel-wrapper',
    slideClass: 'carrousel-slide',
    slideActiveClass: 'active',
    bulletClass: 'bullet',
    bulletActiveClass: 'active',
    controlPrevClass: 'carrousel-prev',
    controlNextClass: 'carrousel-next'

    /*
    callbacks
    onInit:function(Carrousel)
    onClick:function(Carrousel)
    onSlideChange:function(Carrousel)
    onSlideChangeEnd:function(Carrousel)
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
  s.container = getElementByParent(document, container)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Slider的ID，请检查传入参数是否正确')
    return
  }

  // Wrapper
  s.wrapper = s.container.querySelector('.' + s.params.wrapperClass) // [es6]s.wrapper=s.container.querySelector(':scope > .'+s.params.wrapperClass)

  // Pagination
  s.pagination = getElementByParent(s.container, s.params.pagination)
  s.bullets = []
  s.updateBullets = function () {
    if (!s.pagination) return

    s.bullets = []
    s.pagination.innerHTML = ''
    // s.numberOfBullets = s.params.loop ? s.slides.length - s.params.slidesPerView * 2 : s.slides.length
    for (var i = 0; i < s.slides.length; i++) {
      var bullet = document.createElement('span')
      bullet.setAttribute('class', s.params.bulletClass)
      bullet.setAttribute('data-index', i)
      s.pagination.appendChild(bullet)
      s.bullets.push(bullet)
    }
  }
  // Control左右切换
  s.controlPrev = getElementByParent(s.container, s.params.controlPrev)
  s.controlNext = getElementByParent(s.container, s.params.controlNext)
  // 索引
  s.activeIndexTruth = 0
  s.max = 0
  // Slides
  s.updateSlides = function () {
    s.slides = getPureChildren(s.wrapper.children, s.params.slideClass)// [es6]s.slides=s.wrapper.querySelectorAll(':scope > .'+s.params.slideClass)
  }
  // loop dupSlides
  s.dupSlides = []
  s.createLoop = function () {
    if (!s.params.loop) return
    // 删除循环
    s.destroyLoop()
    var beforeDupSlides = []
    var afterDupSlides = []

    if (s.params.slidesPerView > s.slides.length) return
    var i
    var dup
    s.slides.forEach(function (n, i, a) {
      if (i < s.params.slidesPerView) afterDupSlides.push(n.cloneNode(true))
      if (i < s.slides.length && i >= s.slides.length - s.params.slidesPerView) beforeDupSlides.push(n.cloneNode(true))
    })
    for (i = 0; i < afterDupSlides.length; i++) {
      dup = s.wrapper.appendChild(afterDupSlides[i])
      dup.classList.add(s.params.slideDuplicateClass)
      dup.classList.remove(s.params.slideClass)
    }
    for (i = beforeDupSlides.length - 1; i >= 0; i--) {
      dup = s.wrapper.insertBefore(beforeDupSlides[i], s.wrapper.firstElementChild)
      dup.classList.add(s.params.slideDuplicateClass)
      dup.classList.remove(s.params.slideClass)
    }
    s.activeIndexTruth = s.params.slidesPerView
    s.dupSlides = beforeDupSlides.concat(afterDupSlides)
  }
  s.destroyLoop = function () {
    var slideDuplicate = getPureChildren(s.wrapper.children, s.params.slideDuplicateClass)
    //  var slideDuplicate=s.wrapper.querySelectorAll(':scope > .'+s.params.slideDuplicateClass)
    /* eslint-disable */
    for (var i = 0, slideDu; slideDu = slideDuplicate[i++];) {
      s.wrapper.removeChild(slideDu)
    }
    /* eslint-enable */
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
  /* --------------------
  Update
  -------------------- */
  s.activeIndex = s.activeIndexTruth // 去除duplicate，滑动页索引
  // 根据index更新选中class
  s.updateClasses = function () {
    s.activeIndex = s.activeIndexTruth
    if (s.params.loop) {
      s.activeIndex = s.activeIndexTruth - s.params.slidesPerView
      if (s.max - s.params.slidesPerView === s.activeIndexTruth) { // 正向滑动
        s.activeIndex = 0
      }
      if (s.activeIndex < 0) { // 反向滑动
        s.activeIndex = s.slides.length + s.activeIndex
      }
    }
    var i
    // Slide
    for (i = 0; i < s.slides.length; i++) {
      s.slides[i].classList.remove(s.params.slideActiveClass)
    }
    s.slides[s.activeIndex].classList.add(s.params.slideActiveClass)

    //  Pagination
    if (!s.pagination) return
    for (i = 0; i < s.bullets.length; i++) {
      s.bullets[i].classList.remove(s.params.bulletActiveClass)
    }
    s.bullets[s.activeIndex].classList.add(s.params.bulletActiveClass)
  }
  s.updateWidth = function () {
    if (s.params.width && !isNaN(s.params.width)) {
      s.width = s.params.width
    } else if (/(\d+)px/.test(s.params.width)) {
      s.width = /(\d+)px/.exec(s.params.width)[1]
    } else if (/(\d+)px/.test(s.container.style.width)) {
      s.width = /(\d+)px/.exec(s.container.style.width)[1]
    } else {
      s.width = (s.container.clientWidth ? s.container.clientWidth : Device.screenWidth)
    }
    s.container.style.width = s.width + 'px'
    // Slide width
    s.slideWidth = Math.floor(s.width / s.params.slidesPerView)

    // Wrapper width
    s.wrapperWidth = s.slideWidth * s.max
    s.wrapper.style.width = s.wrapperWidth + 'px'
    
    // Slide width
    s.slides.forEach(function (n, i, a) {
      n.style.width = s.slideWidth + 'px'
    })

    // dupSlide width
    s.dupSlides.forEach(function (n, i, a) {
      n.style.width = s.slideWidth + 'px'
    })
  }
  s.updateHeight = function () {
    if (s.params.height && !isNaN(s.params.height)) {
      s.height = s.params.height
    } else if (/(\d+)px/.test(s.params.height)) {
      s.height = /(\d+)px/.exec(s.params.height)[1]
    } else if (/(\d+)px/.test(s.container.style.height)) {
      s.height = /(\d+)px/.exec(s.container.style.height)[1]
    } else if (s.container.classList.contains(s.params.pageClass)) { // 如果没有设置高度,且是页面轮播,则高度自适应
      s.height = null
    } else { // 非页面轮播时,则需要计算高度
      s.height = (s.container.clientHeight ? s.container.clientHeight : s.wrapper.clientHeight)
    }
    if (!s.height) return
    // Container height
    s.container.style.height = s.height + 'px'
    // Wrapper height
    s.wrapper.style.height = s.height + 'px'
    // Slide height
    s.slides.forEach(function (n, i, a) {
      n.style.height = s.height + 'px'
    })
    // dupSlide height
    s.dupSlides.forEach(function (n, i, a) {
      n.style.height = s.height + 'px'
    })
  }
  // 更新容器尺寸
  s.updateContainerSize = function () {
    s.max = parseInt(s.slides.length, 10) + parseInt(s.dupSlides.length, 10)
    // Container width
    s.updateWidth()

    // Container height
    s.updateHeight()

    // 更新active index
    s.updateClasses()

    // 如果有循环的话
    if (s.params.loop) {
      moveToIndex(0)
    }
  }
  // 图片懒加载
  var imgs = []
  var cacheImgs = []
  function imgLoad (e) {
    var target = e.target
    var imgTarget = imgs[target.index]
    if (!imgTarget) return
    if (imgTarget.tagName === 'IMG') {
      imgTarget.src = target.src
    } else {
      imgTarget.style.backgroundImage = 'url(' + target.src + ')'
    }
  }
  s.updateLazyImg = function () {
    imgs = this.container.querySelectorAll(s.params.imglazyQuery)
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute(s.params.imgLoadAttr)
      cacheImgs[i] = new Image()
      cacheImgs[i].index = i
      cacheImgs[i].src = src
      cacheImgs[i].addEventListener('load', imgLoad, false)
    }
  }

  // 更新
  s.update = function () {
    s.updateSlides()
    s.updateBullets()
    s.createLoop()
    s.updateContainerSize()
    if (s.params.imglazyQuery) s.updateLazyImg()
  }
  s.update()
  if (s.slides.length <= 0) {
    return
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
      touchTarget[action]('click', s.onClick, false)
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
  s.onTouchStart = function (e) {
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    s.container.addEventListener('touchmove', preventDefault, false)
    s.touches.startX = e.clientX || e.touches[0].clientX
    s.touches.startY = e.clientY || e.touches[0].clientY
    // 关闭自动播放
    s.stopAutoplay()
  }
  s.onTouchMove = function (e) {
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    s.touches.currentX = e.clientX || e.touches[0].clientX
    s.touches.currentY = e.clientY || e.touches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.currentX
    s.touches.diffY = s.touches.startY - s.touches.currentY
    // runCallBack
    if (s.params.onSlideChange) s.params.onSlideChange(s)

    // 设置滑动方向
    if (s.touches.direction === 0) { // 设置滑动方向(-1上下 | 1左右)
      s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1
    }
    if (s.touches.direction === -1) { // 设置垂直方向(-1上 | 1下)
      s.touches.vertical = s.touches.diffY < 0 ? 1 : -1
    }
    if (s.touches.direction === 1) { // 设置左右方向(-1左 | 1右)
      s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1
    }

    // 如果是上下滑动则不工作
    if (s.touches.vertical !== 0) {
      s.container.removeEventListener('touchmove', preventDefault, false)
      return
    }

    // x轴距离左边的像素，向左为负数，向右为正数
    var moveX = s.touches.posX - s.touches.diffX
    // 判断是否是边缘
    if (moveX > 0 || Number(-moveX) + Number(s.width) >= s.wrapperWidth) {
      return
    }
    s.wrapper.style.webkitTransform = 'translate(' + moveX + 'px,0px)'
  }
  s.onTouchEnd = function (e) {
    if (s.params.stopPropagation) e.stopPropagation() // 此属性与FastClick冲突
    // s.container.removeEventListener('touchmove', preventDefault, false)
    s.touches.endX = e.clientX || e.changedTouches[0].clientX
    s.touches.endY = e.clientY || e.changedTouches[0].clientY

    // 单击事件
    if (Math.abs(s.touches.startX - s.touches.endX) < 6 && Math.abs(s.touches.startY - s.touches.endY) < 6) {
      if (s.params.onClick) s.params.onClick(s, e)
    // 滑动事件,左右拉动
    } else if (s.touches.direction === 1) {
      if (s.touches.diffX > s.params.threshold) {
        // 下一页
        s.activeIndexTruth++
      } else if (s.touches.diffX < -s.params.threshold) {
        // 上一页
        s.activeIndexTruth--
      }
      s.slideTo(s.activeIndexTruth)
    }

    // 清空滑动方向
    s.touches.direction = 0
    s.touches.vertical = 0
    s.touches.horizontal = 0
    
    // 重新开启自动播放
    s.startAutoplay()
  }
  s.onClick = function (e) {
    e.stopPropagation()
    if (e.target.classList.contains(s.params.bulletClass)) {
      s.onClickBullet(e)
    } else if (e.target.classList.contains(s.params.controlPrevClass)) {
      s.onClickPrev(e)
    } else if (e.target.classList.contains(s.params.controlNextClass)) {
      s.onClickNext(e)
    } else {
      if (s.params.onClick) s.params.onClick(s, e)
    }
  }
  s.onClickBullet = function (e) {
    var index = Number(e.target.getAttribute('data-index')) || 0
    // 如果是循环,需要计算真实的索引
    if (s.params.loop) {
      index += s.params.slidesPerView
    }
    s.slideTo(index)
  }
  s.onClickPrev = function (e) {
    s.slideTo(s.activeIndexTruth - 1)
  }
  s.onClickNext = function (e) {
    s.slideTo(s.activeIndexTruth + 1)
  }
  /* --------------------
  Autoplay
  -------------------- */
  s.startAutoplay = function () {
    if (!s.params.autoplay) return
    s.autoplayer = window.setInterval(function () {
      s.activeIndexTruth++
      if (s.activeIndexTruth >= s.max) {
        s.activeIndexTruth = 0
      }
      s.slideTo(s.activeIndexTruth)
    }, s.params.autoplay)
  }

  s.stopAutoplay = function (internal) {
    if (s.autoplayer) {
      window.clearInterval(s.autoplayer)
    }
  }

  /* --------------------
  Method
  -------------------- */
  function moveToIndex (speed) {
    s.wrapper.style.webkitTransitionDuration = speed + 'ms'
    s.touches.posX = -s.activeIndexTruth * s.slideWidth
    s.wrapper.style.webkitTransform = 'translate(' + s.touches.posX + 'px,0px)'
  }
  s.slideTo = function (slideIndex, speed, runCallbacks) {
    var duration = isNaN(speed) ? s.params.duration : speed
    if (slideIndex >= 0) {
      s.activeIndexTruth = slideIndex
    }
    // 索引不能小于0
    if (s.activeIndexTruth < 0) {
      s.activeIndexTruth = 0
    }
    // 索引不能大于slide总数
    if (s.activeIndexTruth > s.max - 1) {
      s.activeIndexTruth = s.max - 1
    }
    // 一页多屏，索引不能露出空白区域
    if (s.params.slidesPerView > 1 && s.activeIndexTruth > s.max - params.slidesPerView) {
      s.activeIndexTruth = s.max - s.params.slidesPerView
    }

    // 更新class
    s.updateClasses()
    // 移动至index
    moveToIndex(duration)
    // 移动位置并触发回调onSlideChangeEnd
    setTimeout(function () {
      s.wrapper.style.webkitTransitionDuration = '0ms'
      // callback onSlideChangeEnd
      s.target = s.slides[s.activeIndexTruth]
      if (s.params.onSlideChangeEnd && runCallbacks !== false) s.params.onSlideChangeEnd(s)
      // 循环的情况
      if (s.params.loop) {
        if (s.touches.posX === 0) {
          s.activeIndexTruth = s.max - s.params.slidesPerView * 2
          // console.log('最左侧，应跳转到：'+s.activeIndexTruth)
          moveToIndex(0)
          return
        }
        if (Number(-s.touches.posX) + Number(s.width) >= Number(s.wrapperWidth)) {
          s.activeIndexTruth = s.params.slidesPerView
          // console.log('最右侧，应跳转到：'+s.activeIndexTruth)
          moveToIndex(0)
          return
        }
      }
    }, duration)
  }
  // 更改params
  s.setParams = function (params) {
    for (var n in params) {
      s.params[n] = params[n]
    }
  }
  // 主函数
  s.init = function () {
    // s.update()
    s.attach()
    if (s.params.autoplay) s.startAutoplay()
    // runCallBack
    s.target = s.slides[s.activeIndexTruth]
    if (s.params.onInit) s.params.onInit(s)
  }
  // 执行主函数
  s.init()
  //  Return slider instance
  return s
}

/* Carrousel.prototype = (function () {
  return {
  }
})() */

export default Carrousel