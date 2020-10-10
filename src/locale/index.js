// 此库主要用于非组件的js中, 使用locale('备注', '变量{0}, 变量{1}', ['替换变量0', '替换变量1'])获取value值
export default function (remark, key, variable) {
  let locale = {}
  try {
    // 国际化文件
    if (localStorage.getItem('_seedsui_locale')) {
      locale = JSON.parse(localStorage.getItem('_seedsui_locale')) || {}
    } else {
      console.log(remark, key, variable)
      console.log('没有配置国际化, 默认读取国际化文件zh_CN')
      locale = require(`./zh_CN.js`) // 默认国际化文件, en_US和zh_CN
      if (locale.default) locale = locale.default
      if (locale && Object.keys(locale).length) localStorage.setItem('_seedsui_locale', JSON.stringify(locale))
    }
  } catch (error) {
    console.log(error)
  }
  // 获取key的值
  if (key) {
    let value = locale[key] || ''
    if (value && variable && Array.isArray(variable) && variable.length) {
      for (let i = 0; i < variable.length; i++) {
        if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue
        value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i])
      }
    }
    return value || remark || key
  }
  // 如果有remark, 没有key, 则返回remark
  if (remark) {
    return remark
  }
  return locale
}
