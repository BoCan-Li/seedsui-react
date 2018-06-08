// 转为json，目的是字符串去重
window.String.prototype.toJson = function (split) {
  var array = this.split(split)
  var json = {}
  for (var i in array) {
    var ary = array[i]
    json[ary] ? (json[ary]++) : (json[ary] = 1)
  }
  return json
}
function left_zero_4(str) {
  if (str && str.length === 2) {
    return '00' + str
  }
  return str
}
// 转为ASCII编码
window.String.prototype.toASCII = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) {
    value += '\\u' + left_zero_4(parseInt(this.charCodeAt(i), 10).toString(16))
  }
  return value
}
// 转为unicode编码
window.String.prototype.toUnicode = function () {
  var value = '';
  for (var i = 0; i < this.length; i++)
    value += '&#' + this.charCodeAt(i) + ';';
  return value;
}
// 转为UTF8编码
window.String.prototype.toUTF8 = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) {
    value += '&#x' + left_zero_4(parseInt(this.charCodeAt(i), 10).toString(16)) + ';'
  }
  return value
}
// 转为URI编码
window.String.prototype.toURI = function () {
  return encodeURI(this)
}
// 转为URI全编码
window.String.prototype.toURIComponent = function () {
  return encodeURIComponent(this)
}
// ASCII,unicode,UTF8解码
window.String.prototype.decode = function () {
  var str = this
  str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)))
  })
  str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16))
  })
  str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2"), 10))
  })
  return decodeURIComponent(str)
}

// 去除字符串左右两端的空格
window.String.prototype.trim = function (trimPos) {
  if (trimPos === 'left') {
    return this.replace(/(^\s*)/g, '')
  } else if (trimPos === 'right') {
    return this.replace(/(\s*$)/g, '')
  }
  return this.replace(/(^\s*)|(\s*$)/g, '')
}

// 判断是否是#的形式
window.String.prototype.isQueryId = function () {
  var idExpr = /^#([\w-]*)$/ // 匹配id(#id)
  var match = idExpr.exec(this)
  if(!match || !match[1]){
    return false
  }
  return true
}
// 判断是否是合法的日期
window.String.prototype.isDate = function () {
  var patt = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' // yyyy-MM-dd
  if (new RegExp(patt).test(this)) return true
  return false
}
// 判断是否是合法的月份
window.String.prototype.isMonth = function () {
  var patt = '^[0-9]{4}-[0-9]{2}$' // yyyy-MM
  if (new RegExp(patt).test(this)) return true
  return false
}
// 判断是否是日期格式
window.String.prototype.isDateTime = function () {
  var patts = [
    '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$', // yyyy-MM-dd HH:mm
    '^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$' // yyyy-MM-dd HH:mm:ss
  ]
  for (var i in patts) {
    if (new RegExp(patts[i]).test(this)) return true
  }
  return false
}
// 判断是否是时间格式
window.String.prototype.isTime = function () {
  var patts = [
    '^[0-9]{2}:[0-9]{2}$', // HH:mm
    '^[0-9]{2}:[0-9]{2}:[0-9]{2}$' // HH:mm:ss
  ]
  for (var i in patts) {
    if (new RegExp(patts[i]).test(this)) return true
  }
  return false
}
// 判断是否包含class名称
window.String.prototype.hasClass = function (name) {
  var names = this.split(' ')
  for (var i = 0; i < names.length; i++) {
    if (names[i] === name) return true
  }
  return false
}

// 清除img字符串的"https:"和"http:", 例如‘<img src="http:’转换后‘<img src="’
window.String.prototype.clearImgProtocol = function () {
  return this.replace(/<img\s+src="https:/gim, '<img src="').replace(/<img\s+src="http:/gim, '<img src="')
}

// 清除字符串的"https:"和"http:"
window.String.prototype.clearProtocol = function () {
  return this.replace(/https:/gim, '').replace(/http:/gim, '')
}

// 判断是否是queryId
window.String.prototype.isQueryId = function () {
  var idExpr = /^#([\w-]*)$/
  var match = idExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是queryClass
window.String.prototype.isQueryClass = function () {
  var classExpr = /^\.([\w-]*)$/
  var match = classExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是query标签
window.String.prototype.isTag = function () {
  var tagExpr = /^<(\w+)\s*.*\/\w*>$/im
  var match = tagExpr.exec(this)
  if (match && match.length > 0) {
    return true
  }
  return false
}
// 获取指定后缀的数值(允许是小数和整数),例如:'44px'.getUnitValue() / '44em'.getUnitValue('em')
window.String.prototype.getUnitValue = function (argSuffix) {
  // 默认后缀为px
  var suffix = argSuffix || 'px'
  var patt=new RegExp('^[+-]?(0|([1-9][0-9]*))(.[0-9]?)' + suffix + '$');
  if (patt.test(this)) {
    return this.substring(0, this.indexOf(suffix))
  }
  return 0
}
