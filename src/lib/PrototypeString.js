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
window.String.prototype.fromASCII = function () {
  return this.replace(/(\\u)(\w{1,4})/gi, function ($0) {
    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)))
  })
}
// 转为unicode编码
window.String.prototype.toUnicode = function () {
  var value = ''
  for (var i = 0; i < this.length; i++)
    value += '&#' + this.charCodeAt(i) + ';'
  return value
}
window.String.prototype.fromUnicode = function () {
  return this.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16))
  })
}
// 转为UTF8编码
window.String.prototype.toUTF8 = function () {
  var value = ''
  for (var i = 0; i < this.length; i++) {
    value += '&#x' + left_zero_4(parseInt(this.charCodeAt(i), 10).toString(16)) + ';'
  }
  return value
}
window.String.prototype.fromUTF8 = function () {
  return this.replace(/(&#)(\d{1,6});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2"), 10))
  })
}
// 转为URI编码
window.String.prototype.toURI = function () {
  return encodeURI(this)
}
window.String.prototype.fromURI = function () {
  return decodeURI(this)
}
// 转为URI全编码
window.String.prototype.toURIComponent = function () {
  return encodeURIComponent(this)
}
window.String.prototype.fromURIComponent = function () {
  return decodeURIComponent(this)
}
// 地址栏编码,地址栏不允许有一些特殊字符,例如%,可用此方法规避此问题
window.String.prototype.encode = function () {
  return this.toASCII()
}
window.String.prototype.decode = function () {
  return this.fromASCII()
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
  if (!this.length) return false
  var idExpr = /^#([\w-]*)$/ // 匹配id(#id)
  var match = idExpr.exec(this)
  if(!match || !match[1]){
    return false
  }
  return true
}
// 判断是否是合法的日期 YYYY-MM-DD
window.String.prototype.isDate = function (split) {
  return new RegExp(`^[0-9]{4}${split || '-'}[0-9]{2}${split || '-'}[0-9]{2}$`).test(this)
}
// 判断是否是合法的月份 yyyy-MM
window.String.prototype.isMonth = function (split) {
  return new RegExp(`^[0-9]{4}${split || '-'}[0-9]{2}$`).test(this)
}
// 判断是否是日期格式 YYYY-MM-DD hh:mm:ss 或 YYYY-MM-DD hh:mm
window.String.prototype.isDateTime = function (split) {
  return new RegExp(`^[0-9]{4}${split || '-'}[0-9]{2}${split || '-'}[0-9]{2}\\s[0-9]{2}:[0-9]{2}(:[0-9]{2})?$`).test(this)
}
// 判断是否是时间格式 hh:mm 或 hh:mm:ss
window.String.prototype.isTime = function () {
  return new RegExp(`^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$`).test(this)
}
// 转换成日期
window.String.prototype.toDate = function (dateSplit) {
  var date = new Date()
  var dateStrArr = [date.getFullYear(), date.getMonth(), date.getDate()]
  var timeStrArr = [date.getHours(), date.getMinutes(), date.getSeconds()]
  if (this.isDate()) {
    dateStrArr = this.split(dateSplit || '-')
  } else if (this.isDateTime()) {
    var tempDateStrArr = this.split(dateSplit || '-')
    var tempTimeStrArr = tempDateStrArr[2].split(' ')[1].split(':')
    dateStrArr[0] = tempDateStrArr[0]
    dateStrArr[1] = tempDateStrArr[1]
    dateStrArr[2] = tempDateStrArr[2].split(' ')[0]
    timeStrArr[0] = tempTimeStrArr[0]
    timeStrArr[1] = tempTimeStrArr[1]
    timeStrArr[2] = tempTimeStrArr[2] || timeStrArr[2]
  } else if (this.isMonth()) {
    tempDateStrArr = this.split(dateSplit || '-')
    dateStrArr[0] = tempDateStrArr[0]
    dateStrArr[1] = tempDateStrArr[1]
  } else if (this.isTime()) {
    tempTimeStrArr = this.split(':')
    timeStrArr[0] = tempTimeStrArr[0]
    timeStrArr[1] = tempTimeStrArr[1]
    timeStrArr[2] = tempTimeStrArr[2] || timeStrArr[2]
  }
  date.setYear(dateStrArr[0])
  date.setMonth(dateStrArr[1] - 1, dateStrArr[2])
  date.setHours(timeStrArr[0], timeStrArr[1], timeStrArr[2])
  return date
}
// 判断是否包含class名称
window.String.prototype.hasClass = function (name) {
  var classStr = this
  if (this.indexOf('class=') > -1) {
    var res = classStr.match(/class=["'](.*)["']/)
    if (res[1]) {
      classStr = res[1]
    } else {
      classStr = ''
    }
  }
  var names = classStr.split(' ')
  for (var i = 0; i < names.length; i++) {
    if (names[i] === name) return true
  }
  return false
}
// 添加class名称
window.String.prototype.addClass = function (name) {
  var str = String(this)
  var className = 'class="' + name + '"'
  if (this.indexOf('class=') > -1) { // 如果有class,并且class名称不存在,则增加class
    var res = this.match(/class=["'](.*)["']/)
    if (res[1] && !res[1].hasClass(name)) { // 新增class不存在,则新增
      className = 'class="' + res[1] + ' ' + name + '"'
      str = str.replace(/class=["'](.*)["']/, className)
      return str
    }
    return str
  } else { // 如果没有class,则创建一个class
    res = str.match(/<\w+/)
    if (res[0]) {
      return str.replace(/<\w+/, res[0] + ' ' + className)
    }
    return str
  }
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
  if (!this.length) return false
  var idExpr = /^#([\w-]*)$/
  var match = idExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是queryClass
window.String.prototype.isQueryClass = function () {
  if (!this.length) return false
  var classExpr = /^\.([\w-]*)$/
  var match = classExpr.exec(this)
  if (match && match.length > 0) {
    return match[1]
  }
  return false
}
// 判断是否是query标签
window.String.prototype.isTag = function () {
  if (!this.length) return false
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
// 密码等级
String.charType = function (char) {
  if (char >= 48 && char <= 57) return 'number' // 数字
  if (char >= 65 && char <= 90) return 'capitalize' // 大写
  if (char >= 97 && char <= 122) return 'lowercase' // 小写
  else return 'other'
}
window.String.prototype.safeLvl = function () {
  if (this.length > 0 && this.length < 6) return 1
  var mode = {}
  for (var i = 0; i < this.length; i++) {
    mode[String.charType(this.charCodeAt(i))] = ''
  }
  return Object.values(mode).length
}