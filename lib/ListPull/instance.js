'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// ListPull 列表滑动菜单
var ListPull = function ListPull(container, params) {
	/* -----------------------
 Model
 ----------------------- */
	var defaults = {
		leftClass: 'listpull-left',
		rightClass: 'listpull-right',
		handlerClass: 'listpull-handler',
		activeClass: 'listpull-active',
		threshold: 20,
		duration: 150
		/*
  Callbacks:
  onClick:function(ListPull)
  	onPull:function(ListPull)
  onShowedLeft:function(ListPull)
  onShowedRight:function(ListPull)
  */
	};
	params = params || {};
	for (var def in defaults) {
		if (params[def] === undefined) {
			params[def] = defaults[def];
		}
	}
	var s = this;
	// Params
	s.params = params;
	// Container
	s.container = typeof container === 'string' ? document.querySelector(container) : container;
	if (!s.container) {
		console.log('SeedsUI Error：未找到ListPull的DOM对象，请检查传入参数是否正确');
		return;
	}
	/* -----------------------
 Method
 ----------------------- */
	s.dragHorizontal = 0;
	// 设置左右方向(-1左 | 1右)
	s.hide = function (target) {
		if (!target) {
			var actives = s.container.querySelectorAll('.' + s.params.activeClass);
			if (actives.length > 0) target = actives[0];
		}
		if (target) {
			target.style.webkitTransitionDuration = s.params.duration + 'ms';
			target.style.webkitTransform = 'translate3d(0px,0px,0px)';
			target.classList.remove(s.params.activeClass);
		}
	};
	s.show = function (target, direction) {
		target.style.webkitTransitionDuration = s.params.duration + 'ms';
		var x = direction === 'right' ? -s.rightClientWidth : s.leftClientWidth;
		target.style.webkitTransform = 'translate3d(' + x + 'px,0px,0px)';
		target.classList.add(s.params.activeClass);
		// Callback onShowedLeft | onShowedRight
		s.target = target;
		if (s.params.onShowedLeft || s.params.onShowedRight) {
			setTimeout(function () {
				if (direction === 'left' && s.params.onShowedLeft) s.params.onShowedLeft(s);
				if (direction === 'right' && s.params.onShowedRight) s.params.onShowedRight(s);
			}, s.params.duration);
		}
	};
	/* -----------------------
 Touch Events
 ----------------------- */
	s.events = function (detach) {
		var touchTarget = s.container;
		var action = detach ? 'removeEventListener' : 'addEventListener';
		touchTarget[action]('touchstart', s.onTouchStart, false);
		touchTarget[action]('touchmove', s.onTouchMove, false);
		touchTarget[action]('touchend', s.onTouchEnd, false);
		touchTarget[action]('touchcancel', s.onTouchEnd, false);
	};
	s.attach = function (event) {
		s.events();
	};
	s.detach = function (event) {
		s.events(true);
	};
	/* -----------------------
 Touch Handler
 ----------------------- */
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
		diffY: 0
		// 索引
	};s.activeIndex = 0;
	function preventDefault(e) {
		e.preventDefault();
	}

	s.onTouchStart = function (e) {
		s.touches.startX = e.touches[0].clientX;
		s.touches.startY = e.touches[0].clientY;
		s.leftClientWidth = 0;
		s.rightClientWidth = 0;
		// 如果点击时有展开的列表项，则先收缩
		var actives = s.container.querySelectorAll('.' + s.params.activeClass);
		if (actives.length > 0) {
			s.hide(actives[0]);
		} else if (e.target.classList.contains(s.params.handlerClass)) {
			// 拉动对象
			var left = e.target.parentNode.querySelector('.' + s.params.leftClass);
			var right = e.target.parentNode.querySelector('.' + s.params.rightClass);
			s.leftClientWidth = left ? left.clientWidth : 0;
			s.rightClientWidth = right ? right.clientWidth : 0;
		}
	};
	s.onTouchMove = function (e) {
		if (!s.leftClientWidth && !s.rightClientWidth) return;
		s.touches.currentX = e.touches[0].clientX;
		s.touches.currentY = e.touches[0].clientY;
		s.touches.diffX = s.touches.currentX - s.touches.startX;
		s.touches.diffY = s.touches.currentY - s.touches.startY;

		// 设置滑动方向
		if (s.touches.direction === 0) {
			// 设置滑动方向(-1上下 | 1左右)
			s.touches.direction = Math.abs(s.touches.diffX) > Math.abs(s.touches.diffY) ? 1 : -1;
		}
		if (s.touches.direction === -1) {
			// 设置垂直方向(-1上 | 1下)
			s.touches.vertical = s.touches.diffY < 0 ? 1 : -1;
		}
		if (s.touches.direction === 1) {
			// 设置左右方向(-1左 | 1右)
			s.touches.horizontal = s.touches.diffX < 0 ? 1 : -1;
		}

		// 如果是上下滑动则不工作
		if (s.touches.vertical !== 0) {
			s.container.removeEventListener('touchmove', preventDefault, false);
			return;
		}

		// 如果滑动了，则禁止事件向下传播
		e.stopPropagation();
		if (s.touches.diffX < -s.rightClientWidth) s.touches.diffX = -s.rightClientWidth;
		if (s.touches.diffX > s.leftClientWidth) s.touches.diffX = s.leftClientWidth;

		// Callback onPull
		if (s.params.onPull) s.params.onPull(s);

		// 滑动
		e.target.style.webkitTransform = 'translate3d(' + s.touches.diffX + 'px,0px,0px)';
	};
	s.onTouchEnd = function (e) {
		s.touches.endX = e.clientX || e.changedTouches[0].clientX;
		s.touches.endY = e.clientY || e.changedTouches[0].clientY;
		if (Math.abs(s.touches.startX - s.touches.endX) < 6 && Math.abs(s.touches.startY - s.touches.endY) < 6) {
			// 点击
			s.target = e.target;
			// Callback onClick
			if (s.params.onClick) s.params.onClick(s);
		} else {
			// 滑动
			if (s.leftClientWidth || s.rightClientWidth) {
				if (Math.abs(s.touches.diffX) > s.params.threshold) {
					s.show(e.target, s.touches.diffX > 0 ? 'left' : 'right');
				} else {
					s.hide(e.target);
				}
			}
		}
		// 清空滑动方向
		s.touches.direction = 0;
		s.touches.vertical = 0;
		s.touches.horizontal = 0;
		s.left = 0;
		s.right = 0;
	};
	// Init
	s.init = function () {
		s.attach();
	};
	s.init();
};

exports.default = ListPull;
module.exports = exports['default'];