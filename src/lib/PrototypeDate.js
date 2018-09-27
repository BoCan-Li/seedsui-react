// DateUtil
window.Date.prototype.minuteMilliSecond = 60 * 1000
window.Date.prototype.hourMilliSecond = 60 * 60 * 1000
window.Date.prototype.dayMilliSecond = 24 * 60 * 60 * 1000
window.Date.prototype.weekMilliSecond = 7 * 24 * 60 * 60 * 1000

/*
  * 年操作
  * */
// 年
window.Date.prototype.year = function (year) {
  if (year) this.setYear(year)
  return this.getFullYear().toString()
}
// 上一年
window.Date.prototype.prevYear = function (count) {
  this.setYear(this.getFullYear() - (count || 1))
  return this
}
// 下一年
window.Date.prototype.nextYear = function (count) {
  this.setYear(this.getFullYear() + (count || 1))
  return this
}
// 是否是闰年
window.Date.prototype.isLeap = function () {
  var year = this.getFullYear()
  return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
}
// 当年第一天
window.Date.prototype.firstYearDate = function () {
  this.setMonth(0, 1)
  return this
}
// 当年最后一天
window.Date.prototype.lastYearDate = function () {
  this.setMonth(11, 31)
  return this
}
// 返回当月共多少天
window.Date.prototype.getYearDate = function () {
  return this.isLeap() ? 366 : 365
}

/*
  * 季操作
  * */
// 季, 返回:0.季度,1.季度第一天,2.季度最后一天
window.Date.prototype.season = function (argCount) {
  var count = argCount || Math.ceil((this.getMonth() + 1) / 3)
  // 修改月
  this.setMonth(count * 3 - 3, 1)
  return count
}
// 上一季
window.Date.prototype.prevSeason = function (count) {
  // 获得当前季的第一个月
  this.setMonth(this.getMonth() - (3 * (count || 1)), 1)
  return Math.ceil((this.getMonth() + 1) / 3)
}
// 下一季
window.Date.prototype.nextSeason = function (count) {
  // 获得当前季的第一个月
  this.setMonth(this.getMonth() + (3 * (count || 1)), 1)
  return Math.ceil((this.getMonth() + 1) / 3)
}
// 第一季
window.Date.prototype.firstSeason = function () {
  this.season(1)
  return 1
}
// 第四季
window.Date.prototype.lastSeason = function () {
  this.season(4)
  return 4
}
// 当季第一天
window.Date.prototype.firstSeasonDate = function () {
  var count = Math.ceil((this.getMonth() + 1) / 3)
  this.setYear(this.getFullYear())
  this.setMonth(count * 3 - 3, 1)
  return this
}
// 当季最后一天
window.Date.prototype.lastSeasonDate = function () {
  var count = Math.ceil((this.getMonth() + 1) / 3)
  this.setYear(this.getFullYear())
  this.setMonth(count * 3, 0)
  return this
}
// 返回当季共多少天
window.Date.prototype.getSeasonDate = function () {
  // 季度
  var count = Math.ceil((this.getMonth() + 1) / 3)
  // 平闰年2月的差别
  if (count === 1) return this.isLeap() ? 91 : 90
  if (count === 2) return 91
  if (count === 3 || count === 4) return 92
}
/*
  * 月操作
  * */
// 月, 参数:1-12或者字符串'yyyy-MM', 如果当前日期大于目标月最大日期,则取目标月最大日期
window.Date.prototype.month = function (month) {
  var targetYear = null // 目标年份
  var targetMonth = null // 目标月份
  var targetMaxDate = null
  // 如果有值,则修改为目标月份
  if (month) {
    if (/^\d{1,2}$/.test(month)) {
      targetMonth = month - 1
      targetMaxDate = new Date(this.getFullYear(), targetMonth + 1, 0).getDate()
      if (this.getMonthDate() > targetMaxDate) {
        this.setMonth(targetMonth, targetMaxDate)
      } else {
        this.setMonth(targetMonth)
      }
    } else if (/^(\d{4}).(\d{1,2})/.test(month)) {
      var arr = month.match(/^(\d{4}).(\d{1,2})/)
      targetYear = Number(arr[1])
      targetMonth = arr[2] - 1
      targetMaxDate = new Date(targetYear, targetMonth + 1, 0).getDate()
      if (this.getMonthDate() > targetMaxDate) {
        this.setYear(targetYear)
        this.setMonth(targetMonth, targetMaxDate)
      } else {
        this.setYear(targetYear)
        this.setMonth(targetMonth)
      }
    }
  }
  var num = this.getMonth() + 1
  return num < 10 ? '0' + num : num
}
// 上一月
window.Date.prototype.prevMonth = function (count) {
  var targetMonth = this.getMonth() - (count || 1)
  var targetMaxDate = new Date(this.getFullYear(), targetMonth + 1, 0).getDate()
  if (this.getDate() > targetMaxDate) {
    this.setMonth(targetMonth, targetMaxDate)
  } else {
    this.setMonth(targetMonth)
  }
  return targetMonth < 10 ? '0' + targetMonth : targetMonth
}
// 下一月
window.Date.prototype.nextMonth = function (count) {
  var targetMonth = this.getMonth() + (count || 1)
  var targetMaxDate = new Date(this.getFullYear(), targetMonth + 1, 0).getDate()
  if (this.getDate() > targetMaxDate) {
    this.setMonth(targetMonth, targetMaxDate)
  } else {
    this.setMonth(targetMonth)
  }
  return targetMonth < 10 ? '0' + targetMonth : targetMonth
}
// 一月
window.Date.prototype.firstMonth = function () {
  this.setMonth(0)
  return '01'
}
// 十二月
window.Date.prototype.lastMonth = function () {
  this.setMonth(11)
  return '12'
}
// 当月第一天
window.Date.prototype.firstMonthDate = function () {
  this.setDate(1)
  return this
}
// 当月最后一天
window.Date.prototype.lastMonthDate = function () {
  this.setMonth(this.getMonth() + 1, 0)
  return this
}
// 返回当月共多少天
window.Date.prototype.getMonthDate = function () {
  return new Date(this.getFullYear(), this.getMonth() + 1, '0').getDate()
}

/*
  * 周操作
  * */
// 周几,参数:zh_cn
window.Date.prototype.day = function (language) {
  var chDay = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日' }
  if (language === 'zh_cn') {
    return chDay[this.getDay()]
  }
  return this.getDay()
}
// 周数
window.Date.prototype.week = function (count) {
  // 当年的1月1日
  var january1 = new Date(this.getFullYear(), 0, 1)
  var january1Day = january1.getDay()
  if (january1Day === 0) january1Day = 7
  // 如果传入周数,则设置周数
  if (count) {
    this.setTime(january1.getTime() + (this.weekMilliSecond * count))
    return count
  }
  // 计算当前天到1月1号相差周数
  var num = Math.ceil((this.getTime() - january1.getTime()) / this.weekMilliSecond)
  return num
}
// 上一周
window.Date.prototype.prevWeek = function (count) {
  this.setTime(this.getTime() - (this.weekMilliSecond * (count || 1)))
  return this
}
// 下一周
window.Date.prototype.nextWeek = function (count) {
  this.setTime(this.getTime() + (this.weekMilliSecond * (count || 1)))
  return this
}
// 周日,日历都是从周日开始的
window.Date.prototype.sunday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() - this.dayMilliSecond * day)
  return this
}
// 周一
window.Date.prototype.monday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (1 - day))
  return this
}
// 周二
window.Date.prototype.tuesday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (2 - day))
  return this
}
// 周三
window.Date.prototype.wednesday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (3 - day))
  return this
}
// 周四
window.Date.prototype.thursday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (4 - day))
  return this
}
// 周五
window.Date.prototype.friday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (5 - day))
  return this
}
// 周六
window.Date.prototype.saturday = function () {
  var day = this.getDay()
  this.setTime(this.getTime() + this.dayMilliSecond * (6 - day))
  return this
}
/*
  * 日操作
  * */
// 日
window.Date.prototype.date = function (date) {
  if (date) this.setDate(date)
  var num = this.getDate()
  return num < 10 ? '0' + num : num
}
// 上一天
window.Date.prototype.prevDate = function (count) {
  this.setTime(this.getTime() - (this.dayMilliSecond * (count || 1)))
  return this
}
// 下一天
window.Date.prototype.nextDate = function (count) {
  this.setTime(this.getTime() + (this.dayMilliSecond * (count || 1)))
  return this
}

/*
  * 时操作
  * */
// 时
window.Date.prototype.hour = function (hour) {
  if (hour) this.setHours(hour)
  var num = this.getHours()
  return num < 10 ? '0' + num : num
}
// 上一小时
window.Date.prototype.prevHour = function (count) {
  this.setTime(this.getTime() - (this.hourMilliSecond * (count || 1)))
  return this
}
// 下一小时
window.Date.prototype.nextHour = function (count) {
  this.setTime(this.getTime() + (this.hourMilliSecond * (count || 1)))
  return this
}
/*
  * 分操作
  * */
// 分
window.Date.prototype.minute = function (minute) {
  if (minute) this.setMinutes(minute)
  var num = this.getMinutes()
  return num < 10 ? '0' + num : num
}
// 上一分钟
window.Date.prototype.prevMinute = function (count) {
  this.setTime(this.getTime() - (this.minuteMilliSecond * (count || 1)))
  return this
}
// 下一分钟
window.Date.prototype.nextMinute = function (count) {
  this.setTime(this.getTime() + (this.minuteMilliSecond * (count || 1)))
  return this
}
// 返回当前分钟的下档位时间
window.Date.prototype.nextMinuteSpace = function (argSpace) {
  var space = argSpace ? argSpace : 5 // 间隔
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.ceil(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum, 10) + 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this.minute()
}
// 返回当前分钟的上档位时间
window.Date.prototype.prevMinuteSpace = function (argSpace) {
  var space = argSpace ? argSpace : 5 // 间隔
  var minute = this.getMinutes() // 分钟
  var hasRemainder = minute % space === 0 // 是否有余数

  var percentNum = Math.floor(minute / space) // 档位
  percentNum = hasRemainder ? parseInt(percentNum, 10) - 1 : percentNum

  var result = percentNum * space // 根据档位计算结果
  this.setMinutes(result)
  return this.minute()
}
/*
  * 比较操作
  * */
// 比较Date对象,返回相差天时分秒等信息
window.Date.prototype.diff = function (date) {
  var dateStart = this // 开始时间
  var dateEnd = date // 结束时间

  var secondMilli = 1000 // 一分钟的毫秒数
  var minuteMilli = 60 * secondMilli // 一分钟的毫秒数
  var hourMilli = 60 * minuteMilli // 一小时的毫秒数
  var dayMilli = 24 * hourMilli // 一天的毫秒数

  var timeDiff = dateEnd.getTime() - dateStart.getTime() // 毫秒差

  // 计算出相差天数
  var daysDiff = Math.floor(timeDiff / dayMilli)
  // 计算出剩余小时数
  var dayMilliRemainder = timeDiff % dayMilli
  var hoursDiff = Math.floor(dayMilliRemainder / hourMilli)
  // 计算剩余分钟数
  var minuteMilliRemainder = dayMilliRemainder % hourMilli
  var minutesDiff = Math.floor(minuteMilliRemainder / minuteMilli)
  // 计算剩余秒数
  var secondMilliRemainder = minuteMilliRemainder % minuteMilli
  var secondsDiff = Math.round(secondMilliRemainder / secondMilli)

  // 计算相差小时数
  var hoursAllDiff = Math.floor(timeDiff / hourMilli)
  // 计算相差分钟数
  var minutesAllDiff = Math.floor(timeDiff / minuteMilli)
  // 计算相差秒数
  var secondsAllDiff = Math.floor(timeDiff / secondMilli)

  return {
    days: daysDiff,
    hours: hoursDiff,
    minutes: minutesDiff,
    seconds: secondsDiff,
    hoursAll: hoursAllDiff,
    minutesAll: minutesAllDiff,
    secondsAll: secondsAllDiff
  }
}
// 比较年月日时分秒，大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareDateTime = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setSeconds(0, 0)
  date2.setSeconds(0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
// 比较年月日,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareDate = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
// 比较年月,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareMonth = function (date) {
  var date1 = new Date(this)
  var date2 = new Date(date)
  date1.setDate(0)
  date1.setHours(0, 0, 0, 0)
  date2.setDate(0)
  date2.setHours(0, 0, 0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
// 比较时分,格式:hh:mm,大于返回1,等于返回0,小于返回-1
window.Date.prototype.compareTime = function (date) {
  var date1 = new Date(this)
  date1.setYear(0)
  date1.setMonth(0, 0)
  date1.setSeconds(0, 0)
  var date2 = new Date()
  if (date instanceof Date) {
    date2 = date
  } else if (/^[0-9]{2}:[0-9]{2}$/.test(date)) {
    date2.setHours(date.split(':')[0], date.split(':')[1], 0, 0)
  } else {
    console.log('请传入hh:mm的字符串,或者一个Date对象')
    return false
  }
  date2.setYear(0)
  date2.setMonth(0, 0)
  var t1 = date1.getTime()
  var t2 = date2.getTime()

  if (t1 === t2) return 0
  return t1 > t2 ? 1 : -1
}
/*
  * 返回时效,例如:new Date().expires('today'),返回
  * 参数: Date | String(小时数 | 'today')
  * 返回: Date (增加时效后的日期)
  * */
window.Date.prototype.expires = function (expires) {
   // 如果没传参数, 默认返回2小时后的时效
  if (!expires) {
    this.nextHour(2)
    return this
  }
  // 如果参数是日期
  if (expires instanceof Date === true) {
    // 如果小于当前时间, 则返回设置的时效日期
    if (expires.compareDateTime(this) === 1) {
      return expires
    }
    return this
  }
  // 如果参数是小时
  if (!isNaN(expires)) {
    this.nextHour(expires)
    return this
  }
  // 如果参数是今天
  if (expires === 'today') {
    this.setHours(0, 0, 0, 0)
    this.nextDate()
    return this
  }
}

/*
  * 格式化
  * */
// 格式化日期,参数:yyyy-MM-dd hh:mm:ss WW EE
window.Date.prototype.format = function (fmtModel) {
  var fmt = typeof fmtModel === 'string' ? fmtModel : 'yyyy-MM-dd hh:mm:ss'
  var year = this.getFullYear()
  var month = this.getMonth() + 1
  var date = this.getDate()
  var hour = this.getHours()
  var minute = this.getMinutes()
  var second = this.getSeconds()
  var weeksCount = this.week()
  var week = this.day('zh_cn')

  var dateJson = {
    'M+': month,
    'd+': date,
    'h+': hour,
    'm+': minute,
    's+': second,
    'W+': weeksCount,
    'E+': week
  }
  if (/(y+)/.test(fmt)) { // 匹配年
    fmt = fmt.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length))
  }
  for (var k in dateJson) { // 逐个匹配
    // '('+ k +')'=(M+)、(d+)、(h+)...
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateJson[k]) : (('00' + dateJson[k]).substr(('' + dateJson[k]).length)))
    }
  }
  return fmt
}

/*
  * 日历操作
  * */
// 月数据
window.Date.prototype.getMonthData = function () { // 获得本月日历, 返回42天
  // 月头的位置
  var firstDay = new Date(this).firstMonthDate()
  var firstDayIndex = firstDay.getDay()
  // 根据起始毫秒数，逐天增加天数
  var startDayMs = firstDay.getTime() - this.dayMilliSecond * firstDayIndex

  var data = []
  // 生成月
  for (var i = 0; i < 42; i++) {
    data.push(new Date())
    if (i === 0) data[0].setTime(startDayMs)
    else data[i].setTime(data[i - 1].getTime() + this.dayMilliSecond)

    // 设置当年标识isCurrent
    data[i].isCurrent = false
    if (data[i].month() === this.month()) data[i].isCurrent = true
  }
  return data
}
window.Date.prototype.getPrevMonthData = function () { // 获得上月日历
  var date = new Date(this)
  date.prevMonth()
  return date.getMonthData()
}
window.Date.prototype.getNextMonthData = function () { // 获得下月日历
  var date =  new Date(this)
  date.nextMonth()
  return date.getMonthData()
}
window.Date.prototype.getCalendarData = function () { // 获取三个月的日历数据
  var data = this.getPrevMonthData().concat(this.getMonthData()).concat(this.getNextMonthData())
  // 设置选中项与选中行
  // 当前日期+当月第一天的周几=选中位置(由于索引是从0开始的,所以在后面要再减掉1)
  var activeIndex =  this.getDate() + new Date(this).firstMonthDate().getDay()
  // 用Math.floor(位置/7)获取行数
  data.activeRowIndex = Math.floor(activeIndex/7)
  // 上个月日历42天+当月位置=当前位置
  data.activeIndex = activeIndex + 41
  return data
}

window.Date.prototype.getPrevMonth = function (count) { // 获得前几个月日期
  if (count) {
    var months = []
    var tempDate = new Date(this)
    for (var i = 0; i < count; i++) {
      tempDate.prevMonth()
      var prevMonth = new Date(tempDate)
      months.push(prevMonth)
    }
    return months
  }
  var date = new Date(this)
  date.prevMonth()
  return date
}

// 周数据
window.Date.prototype.getWeekData = function () { // 获得本周日历, 返回7天
  var date = new Date(this)
  var sunday = date.sunday()
  var data = []
  for (var i = 0; i < 7; i++) {
    data.push(new Date(sunday.getTime() + this.dayMilliSecond * i))
  }
  return data
}
window.Date.prototype.getPrevWeekData = function () { // 获得上周日历
  var date = new Date(this)
  date.prevWeek()
  return date.getWeekData()
}
window.Date.prototype.getNextWeekData = function () { // 获得下周日历
  var date = new Date(this)
  date.nextWeek()
  return date.getWeekData()
}

window.Date.prototype.getPrevWeek = function (count) { // 获得前几个周日期
  if (count) {
    var days = []
    var tempDate = new Date(this)
    for (var i = 0; i < count; i++) {
      tempDate.prevWeek()
      var prevWeek = new Date(tempDate)
      days.push(prevWeek)
    }
    return days
  }
  var date = new Date(this)
  date.prevDate()
  return date
}

// 天数据
window.Date.prototype.getPrevDate = function (count) { // 获得前几个天日期
  if (count) {
    var dates = []
    var tempDate = new Date(this)
    for (var i = 0; i < count; i++) {
      tempDate.prevDate()
      var prevDate = new Date(tempDate)
      dates.push(prevDate)
    }
    return dates
  }
  var date = new Date(this)
  date.prevDate()
  return date
}

// 字符串转成日期对象
window.Date.parse = function (str, type) {
  var date = new Date()
  if (type === 'time') {
    if (/^[0-9]{2}:[0-9]{2}$/.test(str)) {
      date.setHours(str.split(':')[0], str.split(':')[1], 0)
    }
    return date
  }
  if (type === 'date') {
    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(str)) {
      date.setYear(str.split('-')[0])
      date.setMonth(str.split('-')[1], str.split('-')[2])
    }
    return date
  }
  if (type === 'month') {
    if (/^[0-9]{4}-[0-9]{2}$/.test(str)) {
      date.setYear(str.split('-')[0])
      date.setMonth(str.split('-')[1])
    }
    return date
  }
  if (type === 'datetime') {
    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}$/.test(str)) { // eslint-disable-line
      var strArr = str.split(' ')
      var str1 = strArr[0]
      var str2 = strArr[1]
      date.setYear(str1.split('-')[0])
      date.setMonth(str1.split('-')[1], str1.split('-')[2])
      date.setHours(str2.split(':')[0], str2.split(':')[1], 0)
    }
    return date
  }
}