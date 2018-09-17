// Indexbar 索引控件
var Indexbar = function (container, params) {
	/* -----------------------
  Model
  ----------------------- */	
	var defaults = {
		indexAttr: 'data-indexbar-name', // DOM索引属性
		indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
		barClass: 'indexbar',
		barActiveClass: 'active',
		tooltipClass: 'indexbar-tooltip'
	}
	params = params || {}
	for (var def in defaults) {
		if (params[def] === undefined) {
			params[def] = defaults[def]
		}
	}
	// Indexbar
	var s = this

	// Params
	s.params = params

	// Container
	s.container = typeof container === 'string' ? document.querySelector(container) : container
	if (!s.container) {
		console.log('SeedsUI Error：未找到Indexbar的DOM对象，请检查传入参数是否正确')
		return
	}

	// Bar
	s.bar = null
	s.createBar = function () {
		var bar = document.createElement('div')
		bar.setAttribute('class', s.params.barClass)
		return bar
	}
	s.createIndexs = function () {
		var indexs = []
		s.params.indexs.forEach(function (n) {
			var index = document.createElement('a')
			index.innerHTML = n
			indexs.push(index)
		})
		return indexs
	}

	// ToolTip
	s.tooltip = null
	s.createToolTip = function () {
		var toolTip = document.createElement('div')
		toolTip.setAttribute('class', s.params.tooltipClass)
		return toolTip
	}

	// Indexs
	s.update = function () {
		s.bar = s.container.querySelector('.' + s.params.barClass)
    if (!s.bar) {
			s.bar = s.createBar()
			s.indexs = s.createIndexs()
			s.indexs.forEach(function (n) {
				s.bar.appendChild(n)
			})
			s.container.appendChild(s.bar)
		}
		s.tooltip = s.container.querySelector('.' + s.params.tooltipClass)
		if (!s.tooltip) {
			s.tooltip = s.createToolTip()
			s.container.appendChild(s.tooltip)
		}
  }
	s.update()

	// Tooltip
	s.tooltip = s.bar.parentNode.querySelector('.' + s.params.tooltipClass)

	/* -----------------------
	Touch Events
	----------------------- */
	// body事件绑定
	var touchTarget = s.container
	s.events = function (detach) {
		var action = detach ? 'removeEventListener' : 'addEventListener'
		touchTarget[action]('touchmove', s.onTouchMove, false)
		touchTarget[action]('touchend', s.onTouchEnd, false)
		touchTarget[action]('touchcancel', s.onTouchEnd, false)
	}
	// attach、dettach事件
	s.attach = function (event) {
		s.events()
	}
	s.detach = function (event) {
		s.events(true)
	}
	/* -----------------------
	Touch Handler
	----------------------- */
	// Touch信息
	s.touches = {
		startX: 0,
		startY: 0,
		currentX: 0,
		currentY: 0,
		endX: 0,
		endY: 0
	}
	// 索引
	function preventDefault(e) {
		e.preventDefault()
	}
	s.onTouchMove = function (e) {
		s.touches.currentY = e.touches[0].clientY
		s.goIndex(s.touches.currentY)
	}
	s.onTouchEnd = function (e) {
		touchTarget.removeEventListener('touchmove', preventDefault, false)
		s.detach()
		// 移除激活indexbar
		s.bar.classList.remove(s.params.barActiveClass)
	}
	s.bar.addEventListener('touchstart', function (e) {
		touchTarget.addEventListener('touchmove', preventDefault, false)
		s.touches.startX = e.touches[0].clientX
		s.touches.startY = e.touches[0].clientY
		// 给body绑定触摸事件
		s.attach()
		// 滚动到指定位置
		s.goIndex(s.touches.startY)
		// 激活indexbar
		s.bar.classList.add(s.params.barActiveClass)
	}, false)
	/* -----------------------
	Method
	----------------------- */
	var currentHTML = 'A'
	s.goIndex = function (y) {
		// 修改文字
		var current = document.elementFromPoint(s.touches.startX, y)
		if (!current || !current.parentNode || current.parentNode !== s.bar) return
		currentHTML = current.innerHTML
		s.tooltip.innerHTML = currentHTML
		var target = s.container.querySelector('[' + s.params.indexAttr + '=' + currentHTML + ']')
		if (!target) return
		// 移动位置
		if (target) s.container.scrollTop = target.offsetTop
	}
}

export default Indexbar
