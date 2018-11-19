// Indexbar 索引控件
var Indexbar = function (params) {
	/* -----------------------
  Model
  ----------------------- */	
	var defaults = {
		overflowContainer: document.body,
		parent: document.body,
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

	// Parent | OverflowContainer
	s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
	s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
	if (!s.overflowContainer) {
		console.warn('SeedsUI Error: IndexBar控件缺少overflowContainer')
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
		var div = document.createElement('div')
		div.setAttribute('class', s.params.tooltipClass)
		return div
	}

	// Indexs
	s.update = function () {
		s.bar = s.parent.querySelector('.' + s.params.barClass)
    if (!s.bar) {
			s.bar = s.createBar()
			s.indexs = s.createIndexs()
			s.indexs.forEach(function (n) {
				s.bar.appendChild(n)
			})
			s.parent.appendChild(s.bar)
		}
		// tooltip必须在bar的后面, 否则active显示样式将不生效
		s.tooltip = s.parent.querySelector('.' + s.params.tooltipClass)
		if (!s.tooltip) {
			s.tooltip = s.createToolTip()
			s.bar.parentNode.insertBefore(s.tooltip, s.bar.nextSibling)
		}
  }
	s.update()

	// Tooltip
	s.tooltip = s.parent.querySelector('.' + s.params.tooltipClass)

	/* -----------------------
	Method
	----------------------- */
	s.setOverflowContainer = function (overflowContainer) {
		if (!overflowContainer) return
		s.params.overflowContainer = overflowContainer
		s.overflowContainer = typeof s.params.overflowContainer === 'string' ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer
	}
	s.setParent = function (parent) {
		if (!parent) return
		s.params.parent = parent
		s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
		if (s.parent) {
			s.parent.insertBefore(s.bar, s.parent.lastChild)
			s.bar.parentNode.insertBefore(s.tooltip, s.bar.nextSibling)
		}
	}
	var currentHTML = 'A'
	s.goIndex = function (y) {
		// 修改文字
		var current = document.elementFromPoint(s.touches.startX, y)
		if (!current || !current.parentNode || current.parentNode !== s.bar) return
		currentHTML = current.innerHTML
		s.tooltip.innerHTML = currentHTML
		// 对应滚动容器中的目标元素
		var target = s.overflowContainer.querySelector('[' + s.params.indexAttr + '=' + currentHTML + ']')
		if (!target) return
		// 移动位置
		if (target) s.overflowContainer.scrollTop = target.offsetTop
	}

	/* -----------------------
	Touch Events
	----------------------- */
	// body事件绑定
	s.events = function (detach) {
		var touchTarget = s.bar
		var action = detach ? 'removeEventListener' : 'addEventListener'
		touchTarget[action]('touchstart', s.onTouchStart, false)
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
	// function preventDefault(e) {
	// 	e.preventDefault()
	// }
	s.onTouchStart = function (e) {
		// e.currentTarget.addEventListener('touchmove', preventDefault, false)
		s.touches.startX = e.touches[0].clientX
		s.touches.startY = e.touches[0].clientY
		// 滚动到指定位置
		s.goIndex(s.touches.startY)
		// 激活indexbar
		s.bar.classList.add(s.params.barActiveClass)
	}
	s.onTouchMove = function (e) {
		s.touches.currentY = e.touches[0].clientY
		s.goIndex(s.touches.currentY)
	}
	s.onTouchEnd = function (e) {
		// e.currentTarget.removeEventListener('touchmove', preventDefault, false)
		// 移除激活indexbar
		s.bar.classList.remove(s.params.barActiveClass)
	}
	s.attach()
}

export default Indexbar
