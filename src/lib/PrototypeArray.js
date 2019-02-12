// 兼容ES7的includes
if (!window.Array.prototype.includes) {
  window.Array.prototype.includes = function (searchElement) {
    return this.some(function (el) {
      return el === searchElement
    })
  }
}

// 幂集 如:[1,2],返回[[1],[2],[1,2]]
window.Array.prototype.powerset = function () {
  var ps = [[]]
  for (var i = 0; i < this.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(this[i]))
    }
  }
  return ps
}

// 二维数组转为一维数组
window.Array.prototype.toOneColumn = function () {
  var reg = /[\d\.]+\,([\d\.]+)/g // eslint-disable-line
  return this.join(',').replace(reg, '$1').split(',')
}

// 包含，支持传数组包含数组
window.Array.prototype.contains = function (arg) {
  if (toString.call(arg) !== '[object Array]') {
    return this.indexOf(arg) > -1
  }
  return this.filter(function (elem) {
    return arg.indexOf(elem) > -1
  }).length === arg.length
}

// 比较两个数组是否相同, 比较不了包含{x: 20}的数组
if (window.Array.prototype.equals) {
  console.warn('覆盖现有的window.Array.prototype.equals。 可能的原因：新的API定义了方法，存在框架冲突，或者在代码中包含了双重包含。')
}
window.Array.prototype.equals = function (array) {
  if (!array)
    return false

  // 比较长度可以节省很多时间
  if (this.length !== array.length)
    return false

  for (var i = 0; i < this.length; i++) {
    // 检查是否有嵌套的数组
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // 递归到嵌套数组中
      if (!this[i].equals(array[i]))
        return false
    }
    // 检查是否有JSON数据,只比较一层
    else if (this[i] instanceof Object && array[i] instanceof Object) {
      for (var n in this[i]) {
        if (this[i][n] !== array[i][n] ) return false
      }
    }
    else if (this[i] !== array[i]) {
      // 警告 - 两个不同的对象实例永远不会相同：{x：20}!= {x：20}
      return false
    }
  }
  return true
}
// 从for-in循环隐藏方法
Object.defineProperty(window.Array.prototype, "equals", { enumerable: false })

// 判断数组中是否有重复数据,只能比较数字字符串
window.Array.prototype.isRepeatArray = function () {
  var arrStr = this.join(',') + ','
  for (var item of this) {
    if (arrStr.replace(item + ',', '').indexOf(item + ',') >= 0) return true
  }
  return false
}
// 移除数组json中的项
window.Array.prototype.removeProperties = function (properties) {
  for (var item of this) {
    for (var n in item) {
      for (var property of properties) {
        if (n === property) delete item[n]
      }
    }
  }
  return this
}
// 将数组中的项都转成字符串
window.Array.prototype.toStringOption = function () {
  return this.map(function (item) {
    if (typeof item === 'object' || typeof item === 'function') return JSON.stringify(item)
    return item
  })
}

/* -----------------------------------------------------
  树数据扁平化, 将树的children拉平
  @格式 [{id: '', name: '', children: {}}]
  @return [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
 ----------------------------------------------------- */
window.Array.prototype.flattenTree = function () {
  var list = this
  if (!Array.isArray(list) || !list.length) return list
  return _buildTreeToFlatten(list)
}
function _buildTreeToFlatten (list) { // 扁平化, 将children拉平
  var tree = []
  var temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (var i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    var item = temp.shift()
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (var c = 0; c < item.children.length; c++) {
        item.children[c].parentid = item.id
      }
      temp = item.children.concat(temp)
    }
    // 删除此项children
    delete item.children
    // 添加此项到tree
    tree.push(item)
  }
  return tree
}

// 取出无父节点的顶层数据, 即[{id: '', name: '', parentid: '-1' 或没有parentid}]
window.Array.prototype.getFlattenTreeRoots = function () {
  var list = this
  var roots = []
  var objList = {}
  // 转成键值对数据
  list.forEach(function (item) {
    objList[item.id] = item
  })
  // 取出顶层数据
  list.forEach(function (item) {
    if (!objList[item.parentid]) roots.push(item)
  })
  return roots
}

// 根据id, 取出此id的下级节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreeChildren = function (id) {
  var list = this
  var children = []
  for (var i = 0, child; child = list[i++];) { // eslint-disable-line
    if (id && child.parentid === id.toString()) {
      children.push(child)
    }
  }
  return children
}

// 根据id, 取出此id的后代节点数据, 即[{id: '', name: '', parentid: ''}]
window.Array.prototype.getFlattenTreeDescendants = function (id) {
  var list = this
  var descendants = []
  function buildChildren (list, id) {
    for (var i = 0, item; item = list[i++];) { // eslint-disable-line
      if (id && item.parentid === id.toString()) {
        descendants.push(item)
        buildChildren(list, item.id)
      }
    }
  }
  buildChildren(list, id)
  return descendants
}

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
window.Array.prototype.getFlattenTreeNode = function (id) {
  var list = this
  var item = list.filter(function (option) {
    if (option.id === id) return true
    return false
  });
  if (item && item.length > 0) {
    item = item[0]
  }
  return item
}


/* -----------------------------------------------------
  树数据深度化, 将树的parentid深度为children, 必须有id和parentid
  @格式 [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
  @return [{id: '', name: '', children: {}}]
 ----------------------------------------------------- */
window.Array.prototype.deepTree = function () {
  var list = this
  if (!Array.isArray(list) || !list.length) return list
  if (!list[0].hasOwnProperty('parentid')) return list

  // 深度化, 修改trees
  function _buildTreeToDeep (item) {
    var children = list.getFlattenTreeChildren(item.id)
    if (children && children.length) {
      if (item.children) {
        item.children.push(children)
      } else {
        item.children = children
      }
      for (var i = 0, child; child = children[i++];) { // eslint-disable-line
        _buildTreeToDeep(child)
      }
    }
  }
  var trees = list.getFlattenTreeRoots()
  for (var i = 0, tree; tree = trees[i++];) { // eslint-disable-line
    _buildTreeToDeep(tree)
  }
  return trees
}

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
window.Array.prototype.getDeepTreeNode = function (id) {
  var list = Object.clone(this)
  var temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (var i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    var item = temp.shift()
    if (item.id === id) return item
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (var c = 0; c < item.children.length; c++) {
        item.children[c].parentid = item.id
      }
      temp = item.children.concat(temp)
    }
    // 删除此项children
    delete item.children
  }
  return {}
}