// InputRange 范围框
var InputRange = function (container, params) {
	/* -----------------------
  Model
	----------------------- */
	var defaults = {
		tooltipClass: 'range-tooltip',
		inputClass: 'range-input'
	}
	params = params || {}
	for (var def in defaults) {
		if (params[def] === undefined) {
			params[def] = defaults[def]
		}
	}
	var s = this
	s.params = params

	// Container
	s.container = typeof container === 'string' ? document.querySelector(container) : container
	if (!s.container) {
		console.log('SeedsUI Error：未找到InputRange的DOM对象，请检查传入参数是否正确')
		return
	}

	// Tooltip
	s.tooltip = s.container.querySelector('.' + s.params.tooltipClass)
	if (!s.container) {
		console.log('SeedsUI Error：未找到InputRange的tooltip，请检查传入参数是否正确')
		return
	}

	// Input
	s.input = s.container.querySelector('.' + s.params.inputClass)
	if (!s.input) {
		console.log('SeedsUI Error：未找到InputRange的input，请检查传入参数是否正确')
		return
	}

	/* -----------------------
	Touch Events
	----------------------- */
	s.events = function (detach) {
		var touchTarget = s.input
		var action = detach ? 'removeEventListener' : 'addEventListener'
		touchTarget[action]('touchstart', s.onRangeStart, false)
		touchTarget[action]('touchmove', s.onRangeMove, false)
		touchTarget[action]('input', s.onRangeMove, false)
		touchTarget[action]('touchend', s.onRangeEnd, false)
	}
	// attach、dettach事件
	s.attach = function () {
		s.events()
	}
	s.detach = function () {
		s.events(true)
	}
	s.attach()
	/* -----------------------
	Touch Handler
	----------------------- */
	s.onRangeStart = function () {
		s.showToolTip(s.tooltip, s.input)
	}
	s.onRangeMove = function () {
		s.showToolTip(s.tooltip, s.input)
	}
	s.onRangeEnd = function () {
		setTimeout(function () {
			s.tooltip.style.display = 'none'
		}, 1000)
	}
	/* -----------------------
	Method
	----------------------- */
	// 显示tooltip
	s.showToolTip = function (tooltip, input) {
		//当前值所占百分比
		var percent = ((input.value - input.min) / (input.max - input.min)).toFixed(2)

		//距左的位置
		var dragRange = input.clientWidth * percent
		var offsetLeft = input.offsetLeft + dragRange - 10
		//var currentOffsetLeft=offsetLeft-input.parentNode.offsetLeft

		//滑块内部的实际位置
		var currentBallLeft = 28 * percent

		//当前值的位置-滑块的位置=小球正中间的位置
		var left = offsetLeft - currentBallLeft
		tooltip.innerHTML = input.value
		tooltip.style.visibility = 'visible';
    tooltip.style.left = left + 'px';
	}
}

export default InputRange
