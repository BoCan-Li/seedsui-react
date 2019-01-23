// Tree 树结构
var Tree = function (container, params) {
  function getElementByParent (parent, selector) {
    return (typeof selector === 'string' && selector !== '') ? parent.querySelector(selector) : selector
  }
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null, // [{id: '', name: '', parentid: ''}]
    // DOM
    checkbox: false, // 是否可选
    bar: null,
    barOptionClass: 'tree-bar-button',
    barButtonDelClass: 'tree-bar-button-del',

    extendClass: 'extend',
    activeClass: 'active',

    treeClass: 'tree',
    lineClass: 'tree-line', // 行
    titleClass: 'tree-title', // 标题
    arrowClass: 'tree-icon-arrow',
    iconClass: 'tree-icon', // 左侧图标

    buttonAddHTML: '',
    buttonAddClass: 'tree-button-add',
    buttonAddSrc: '',
    buttonDelHTML: '',
    buttonDelClass: 'tree-button-del',
    buttonDelSrc: '',

    idAttr: 'data-id',
    parentidAttr: 'data-parentid',
    nameAttr: 'data-name',

    /*
    callbacks
    onClick:function(Tree)
    onClickLastChild:function(Tree)
    onClickAdd: function(option)
    onData:function(option)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Tree
  var s = this

  // Params
  s.params = params

  // Container
  s.container = getElementByParent(document, container)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Tree的DOM对象，请检查传入参数是否正确')
    return
  }

  // Bar
  s.updateBar = function () {
    if (s.params.bar) {
      s.bar = getElementByParent(document, s.params.bar)
      if (!s.bar) {
        console.log('SeedsUI Error：未找到Bar的DOM对象，请检查传入参数是否正确')
        return
      }
    }
  }
  s.updateBar()
  s.setBar = function (bar) {
    s.params.bar = bar
  }

  // Selected
  s.selected = {}
  var _data = s.params.data
  s.getChildren = function (id) {
    var children = []
    for (var i = 0, child; child = _data[i++];) { // eslint-disable-line
      if (id && child.parentid === id.toString()) {
        children.push(child)
      }
    }
    return children
  }
  s.initData = function (id, ulContainer) { // 指定的部门id，根节点为-1
    var children = s.getChildren(id)
    for (var i = 0, option; option = children[i++];) { // eslint-disable-line
      // 拷贝option，方便传入回调中而不影响原option
      var copyOption = Object.create(option)
      // line的data-xxx属性html
      var lineDataHTML = ''
      for (var n in option) {
        lineDataHTML += 'data-' + n + '="' + option[n] + '" '
      }

      // tree-icon和tree-title的html
      copyOption.html = '<div class="' + s.params.iconClass + '">' +
        '<i class="' + s.params.arrowClass + '"></i>' +
        '</div>' +
        '<div class="' + s.params.titleClass + '">' + option.name + '</div>'
      // Callback onData
      if (s.params.onData) s.params.onData(copyOption)

      var li = document.createElement('li')

      // tree-btnadd
      var btnHTML = ''
      var addBtnHTML = ''
      var delBtnHTML = ''
      if (s.params.checkbox) {
        // if (!s.selected[option.id]) {
          // 添加按钮
          if (s.params.buttonAddHTML) {
            addBtnHTML = s.params.buttonAddHTML
          } else if (s.params.buttonAddSrc) {
            addBtnHTML = '<span class="' + s.params.buttonAddClass + '" style="background-image:url(' + s.params.buttonAddSrc + ')"></span>'
          } else {
            addBtnHTML = '<span class="' + s.params.buttonAddClass + '"></span>'
          }
          // 删除按钮
          if (s.params.buttonDelHTML) {
            delBtnHTML = s.params.buttonDelHTML
          } else if (s.params.buttonDelSrc) {
            delBtnHTML = '<span class="' + s.params.buttonDelClass + '" style="background-image:url(' + s.params.buttonDelSrc + ')"></span>'
          } else {
            delBtnHTML = '<span class="' + s.params.buttonDelClass + '"></span>'
          }
          // 如果html没有添加和删除样式,则默认增加添加和删除样式,用于后续的点击操作识别
          if (addBtnHTML && !addBtnHTML.hasClass(s.params.buttonAddClass)) addBtnHTML.addClass(s.params.buttonAddClass)
          if (delBtnHTML && !delBtnHTML.hasClass(s.params.buttonDelClass)) delBtnHTML.addClass(s.params.buttonDelClass)
          // 合成html
          btnHTML = addBtnHTML + delBtnHTML;
        // }
      }

      // 父级和当前都被选中,则移除当前选中项
      if (s.isSelected(option.id, option.parentid) === 2) {
        s.removeSelected(option.id)
      }

      // 生成完整的html
      var html = '<div class="' + s.params.lineClass + '" ' + lineDataHTML + '>' + copyOption.html + btnHTML + '</div>'
      if (s.selected[option.id]) {
        html = '<div class="' + s.params.lineClass + ' ' + s.params.activeClass + '" ' + lineDataHTML + '>' + copyOption.html + btnHTML + '</div>'
      }
      li.innerHTML = html
      var ul = document.createElement('ul')
      li.appendChild(ul)
      ulContainer.appendChild(li)
      // var ul = s.container.querySelector('[' + s.params.idAttr + '="' + option.id + '"]').nextElementSibling
      s.initData(option.id, ul)
    }
  }
  s.update = function () {
    if (!s.params.data || !s.params.data.length) {
      console.log('SeedsUI Warn：未找到Tree的Data数据，可在初始化时传入data参数，或者通过setData方法设置数据')
      return
    }
    if (!s.params.data[0].id || !s.params.data[0].parentid || !s.params.data[0].name) {
      console.log('SeedsUI Error：Tree的Data数据格式不正确，请检查data参数是否有id、name、parentid属性')
      return
    }
    s.updateBar()

    s.container.innerHTML = ''
    s.initData(-1, s.container)// 根节点
  }
  // s.update()
  /* ------------------
    Method
    ------------------ */
  s.setData = function (data) {
    _data = s.params.data = data
  }
  // 添加数据
  s.addData = function (data, id, childNode) {
    _data = data
    s.initData(id, childNode)
  }
  // 获得数据
  s.getDataByTarget = function (target) {
    var opts = {}
    /* eslint-disable */
    for (var i = 0, att; att = target.attributes[i++];) {
      if (att.nodeName.indexOf('data-') !== -1) {
        opts[att.nodeName.substring(5)] = att.nodeValue
      }
    }
    /* eslint-enable */
    return opts
  }
  // 获得所有父节点
  s.getParentOptions = function (parentid) {
    var parentOptions = []
    var currentId = parentid
    while (currentId !== '-1') { // 提取所有父级节点
      for (var i = 0, opt; opt = s.params.data[i++];) { // eslint-disable-line
        if (opt.id === currentId) {
          parentOptions.push(opt)
          currentId = opt.parentid
          break;
        }
      }
    }
    return parentOptions
  }
  // 当前被选中返回1，父级被选中返回-1，当前和父级都被选中返回2，没有被选中返回0
  s.isSelected = function (id, parentid) {
    var currentFlag = false
    var parentFlag = false
    // 判断当前和父级是否被选中
    if (s.selected[id]) {
      currentFlag = true
    }
    if (s.selected[parentid]) {
      parentFlag = true
    }

    // 判断树中是否存在此节点,比较id和parentid
    var hasNode = false
    if (!s.params.data || !s.params.data.length) return 0
    for (var i = 0, opt; opt = s.params.data[i++];) { // eslint-disable-line
      if (opt.id === id && opt.parentid === parentid) {
        hasNode = true
        break
      }
    }
    if (!hasNode) return 0

    // 向上查询是否已添加到选中项，一直查到顶级
    var parentNodes = s.getParentOptions(parentid)
    for (var i = 0, opt; opt = parentNodes[i++];) { // eslint-disable-line
      if (s.selected[opt.id]) {
        parentFlag = true
        break
      }
    }

    if (currentFlag && parentFlag) return 2
    if (currentFlag) return 1
    if (parentFlag) return -1
    return 0
  }

  // Json是否为空
  s.isEmptyJson = function (json) {
    var temp = ''
    for (var j in json) {
      temp += j
    }
    if (temp === '') return true
    return false
  }
  // 创建选中项
  s.createBarOption = function (id, name, parentid) {
    var div = document.createElement('span')
    div.setAttribute('class', s.params.barOptionClass)
    div.setAttribute(s.params.idAttr, id)
    if (parentid) div.setAttribute(s.params.parentidAttr, parentid)
    div.setAttribute(s.params.nameAttr, name)

    var label = document.createElement('label')
    label.innerHTML = name

    var del = document.createElement('a')
    del.classList.add(s.params.barButtonDelClass)

    div.appendChild(label)
    div.appendChild(del)
    return div
  }
  // 删除选中项
  s.removeSelected = function (id) {
    if (s.selected[id]) {
      // 删除数组
      delete s.selected[id]
      // 删除bar上元素
      if (s.bar) s.bar.removeChild(s.bar.querySelector('[' + s.params.idAttr + '="' + id + '"]'))
      // 清空树上的选中状态
      var node = s.container.querySelector('[' + s.params.idAttr + '="' + id + '"]')
      if (node) node.classList.remove(s.params.activeClass)
    }
  }
  s.removeAllSelected = function () {
    for (var id in s.selected) {
      s.removeSelected(id)
    }
    s.hideBar()
  }
  s.collapseAll = function () {
    var elements = s.container.querySelectorAll('.' + s.params.extendClass)
    for (var i = 0, el; el = elements[i++];) { // eslint-disable-line
      el.classList.remove(s.params.extendClass)
    }
  }
  s.extendAll = function () {
    var elements = s.container.querySelectorAll('.' + s.params.lineClass)
    for (var i = 0, el; el = elements[i++];) { // eslint-disable-line
      el.classList.add(s.params.extendClass)
    }
  }
  s.addSelected = function (opts) {
    if (!opts.id || !opts.name || !opts.parentid) {
      console.log('SeedsUI Error:id、name、parentid三个参数不正确')
      return
    }
    if (s.selected[opts.id]) {
      console.log('SeedsUI Info:您要选中的节点已经选中')
      return
    }
    
    if (s.isSelected(opts.id, opts.parentid)) {
      console.log('SeedsUI Info:您要选中的节点已经选中')
      return
    }

    // bar上添加选中
    if (s.bar) {
      var barOption = s.createBarOption(opts.id, opts.name, opts.parentid)
      s.bar.appendChild(barOption)
      s.showBar()
    }

    // tree中激活选中
    var treeOption = s.container.querySelector('[' + s.params.idAttr + '="' + opts.id + '"]')
    if (treeOption) treeOption.classList.add(s.params.activeClass)

    // s.selected中添加选中
    s.selected[opts.id] = opts

    // 回调
    if (s.params.onClickAdd) s.params.onClickAdd(opts)
  }
  // 显示选中项
  s.showBar = function () {
    s.bar.classList.add(s.params.activeClass)
  }
  // 隐藏选中项
  s.hideBar = function () {
    s.bar.classList.remove(s.params.activeClass)
  }

  s.reset = function () {
    s.removeAllSelected()
    s.collapseAll()
  }
  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 点击树,touch兼容pc事件
    if (s.isSupportTouch) {
      s.container[action]('touchstart', s.onTouchStart, false)
      s.container[action]('touchend', s.onTouchEnd, false)
    } else {
      s.container[action]('click', s.onClickTree, false)
    }
    
    // 点击选中容器
    if (s.bar) {
      s.bar[action]('click', s.onClickBar, false)
    }
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* ------------------
    Event Handler
    ------------------ */
  // Tap
  s.touches = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
  }
  s.onTouchStart = function (e) {
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  s.onTouchEnd = function (e) {
    s.touches.endX = e.changedTouches[0].clientX
    s.touches.endY = e.changedTouches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.endX
    s.touches.diffY = s.touches.startY - s.touches.endY
    // 单击事件
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      s.onClickTree(e)
    }
  }
  // 点击树
  s.onClickTree = function (e) {
    // 点击树
    s.targetLi = null
    s.targetLine = null
    s.target = e.target

    if (s.target.classList.contains(s.params.lineClass)) { // 点击二级
      s.targetLine = s.target
      s.targetLi = s.target.parentNode
    } else if (s.target.classList.contains(s.params.iconClass) ||
      s.target.classList.contains(s.params.titleClass)) { // 点击三级
      s.targetLine = s.target.parentNode
      s.targetLi = s.target.parentNode.parentNode
    }
    if (s.target.classList.contains(s.params.buttonAddClass)) { // 点击添加
      s.onClickBtnAdd(e)
    } else if (s.target.classList.contains(s.params.buttonDelClass)) { // 点击删除
      s.onClickBtnDel(e)
    } else if (s.targetLine) { // 点击其它元素,但s.targetLine存在的情况下
      // 展开与收缩
      s.targetLine.classList.toggle(s.params.extendClass)
      var lines = s.targetLine.nextElementSibling.querySelectorAll('li > .' + s.params.lineClass)
      /* eslint-disable */
      for (var i = 0, line; line = lines[i++];) {
        if (s.selected[line.getAttribute(s.params.idAttr)]) {
          line.classList.add(s.params.activeClass)
        }
      }
      /* eslint-enable */

      // Callback onClickLastChild(点击底层)
      if ((!s.targetLine.nextElementSibling || !s.targetLine.nextElementSibling.hasChildNodes()) && s.params.onClickLastChild) s.params.onClickLastChild(s)
      // Callback onClick
      if (s.params.onClick) s.params.onClick(s)
    } else {
      // Callback onClick
      if (s.params.onClick) s.params.onClick(s)
    }
    e.stopPropagation()
  }
  // 点击添加按钮
  s.onClickBtnAdd = function (e) {
    var elLine = e.target.parentNode
    // 删除子级
    var elLines = elLine.parentNode.querySelectorAll('.' + s.params.lineClass)
    /* eslint-disable */
    for (var i = 0, el; el = elLines[i++];) {
      var elId = el.getAttribute(s.params.idAttr)
      s.removeSelected(elId)
    }
    /* eslint-enable */
    // 显示此级
    elLine.classList.add(s.params.activeClass)
    /*
    var id=elLine.getAttribute(s.params.idAttr)
    var name=elLine.getAttribute(s.params.nameAttr)
    var parentid=elLine.getAttribute(s.params.parentidAttr)
    */
    var opts = s.getDataByTarget(elLine)
    // 添加到s.selected
    s.addSelected(opts)
  }
  // 点击bar
  s.onClickBar = function (e) {
    if (e.target.classList.contains(s.params.barButtonDelClass)) {
      s.onClickBtnDel(e)
    }
  }
  // 点击删除按钮
  s.onClickBtnDel = function (e) {
    s.option = e.target.parentNode
    s.target = e.target
    // 选中选中项
    var id = s.option.getAttribute(s.params.idAttr)
    s.removeSelected(id)
    // 如果为空，则隐藏选中容器
    if (s.isEmptyJson(s.selected)) {
      if (s.bar) s.hideBar()
    }
  }

  // 主函数
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Tree
