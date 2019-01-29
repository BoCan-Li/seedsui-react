// Emoji 表情管理
var Emoji = function (params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
		data: null,

		mask: null,
		maskClass: 'emoji-mask',
		maskActiveClass: 'active',
		isClickMaskHide: true,
		
		containerClass: 'emoji',
		containerActiveClass: 'active',

		textareaClass: 'emoji-edit-input',
		
		iconClass: 'emoji-edit-icon',

		carrouselClass: 'emoji-carrousel'
		/*
    callbacks
		onChange:function(value, s, e)
		onClickMask: function(s, e)
		onClickSubmit: function(value, s, e)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
	}
	
	// Emoji
	var s = this
	
	// Params
	s.params = params

	// Mask
  s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
  if (!s.mask) {
    console.log('SeedsUI Error：未找到Emoji的mask元素，请检查传入参数是否正确')
    return
	}
	
  // Container
  s.container = s.mask.querySelector('.' + s.params.containerClass)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Emoji的container元素，请检查传入参数是否正确')
    return
	}

	// Textarea
	s.textarea = s.mask.querySelector('.' + s.params.textareaClass + ' textarea')
	if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的textarea元素，请检查传入参数是否正确')
    return
	}
	if (s.textarea.tagName !== 'TEXTAREA') {
		console.log('SeedsUI Error：Emoji的textarea元素必须为一个textarea')
    return
	}

	// Icon
	s.icon = s.mask.querySelector('.' + s.params.iconClass)
	if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的icon元素，请检查传入参数是否正确')
    return
	}

	// Carrousel
	s.carrousel = s.mask.querySelector('.' + s.params.carrouselClass)
	if (!s.textarea) {
    console.log('SeedsUI Error：未找到Emoji的carrousel元素，请检查传入参数是否正确')
    return
	}
  /* --------------------
  Method
	-------------------- */
	// 设置数据
  s.setData = function (data) {
    s.params.data = data
	}
	// 显隐
	s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }
  s.showContainer = function () {
    s.container.classList.add(s.params.containerActiveClass)
  }
  s.hideContainer = function () {
    s.container.classList.remove(s.params.containerActiveClass)
  }
	s.show = function () {
		s.showMask()
		s.showContainer()
	}
	s.hide = function () {
		s.hideMask()
		s.hideContainer()
	}
	// 将文件转成图片
	s.parse = function (str) {
		var emojiExpr = /(\[[\u4E00-\u9FA5]*\])/gm
		var parseStr = str
		while (emojiExpr.exec(str)) {
			if (s.params.data[RegExp.$1]) {
				parseStr = parseStr.replace(RegExp.$1, '<span data-emoji=' + s.params.data[RegExp.$1] + '></span>')
			}
		}
		return parseStr
	}
	// 监听位置
	s.cursorOffset = 0

	// 插入表情文字
	s.insertFace = function (emojiName) {
		// 设置value
		var value = s.textarea.value
		var valueBefore = value.substr(0, s.cursorOffset)
		var valueAfter = value.substr(s.cursorOffset, value.length)
		var valueInsert = emojiName
		s.cursorOffset = s.cursorOffset + emojiName.length
		s.textarea.value = valueBefore + valueInsert + valueAfter
		// 设置光杆位置
		s.textarea.focus()
		this.setCaretPosition(s.textarea, s.cursorOffset)
		return s.textarea.value;
	}
	// 设置光标位置
  s.setCaretPosition = function (elem, caretPos) {
    if (elem !== null) {
      if (elem.createTextRange) {
        var range = elem.createTextRange()
        range.move('character', caretPos)
        range.select()
      } else {
        if (elem.selectionStart) {
          elem.focus()
          elem.setSelectionRange(caretPos, caretPos)
        } else {
          elem.focus()
        }
      }
    }
	}
	s.init = function (elInput) {
		s.textarea = elInput
		document.onselectionchange = (e) => {
			if (Object.prototype.toString.call(e.target.activeElement) === '[object HTMLTextAreaElement]') {
				// 获得光标位置
				s.cursorOffset = s.textarea.selectionStart;
			}
		}
		s.textarea.addEventListener('input', (e) => {
			// 获得光标位置
			s.cursorOffset = e.target.selectionStart
		}, false)
	}
  /* --------------------
  Controller
  -------------------- */
  s.events = function (detach) {
    var target = s.mask
    var action = detach ? 'removeEventListener' : 'addEventListener'
		target[action]('click', s.onClick, false)
		// 获取焦点时, 隐藏表情
		s.textarea[action]('focus', s.onFocus, false)
  }
  s.attach = function () {
    s.events()
  }
  s.detach = function () {
    s.events(false)
	}
	s.onClick = function (e) {
		var target = e.target;
    if (target.getAttribute('data-emoji')) { // 点击表情
      var value = s.insertFace(target.getAttribute('alt'))
			if (s.params.onChange) s.params.onChange(value, s)
		} else if (target.classList.contains(s.params.iconClass)) { // 点击展开收缩图标
			if (s.carrousel.style.display === 'none') {
				s.carrousel.style.display = 'block'
				s.icon.classList.add('active')
			} else {
				s.carrousel.style.display = 'none'
				s.icon.classList.remove('active')
			}
		} else if (target.classList.contains(s.params.maskClass)) { // 点击遮罩
			if (s.params.onClickMask) s.params.onClickMask(s, e)
      if (s.params.isClickMaskHide) s.hide()
		} else if (target.classList.contains(s.params.submitClass)) { // 点击提交
			if (s.params.onClickSubmit) s.params.onClickSubmit(s.textarea.value, s, e)
      if (s.params.isClickMaskHide) s.hide()
		}
		e.stopPropagation()
	}
	// 获取焦点时, 隐藏表情
	s.onFocus = () => {
    s.icon.classList.remove('active')
    s.carrousel.style.display = 'none'
  }
  /* --------------------
  Init
  -------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Emoji
