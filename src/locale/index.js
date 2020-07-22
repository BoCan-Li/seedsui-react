// 此库主要用于非组件的js中, 使用locale('变量{0}, 变量{1}', ['替换变量0', '替换变量1'])获取value值
export default function (key, variable) {
  let locale = {}
  try {
    // 国际化文件
    if (localStorage.getItem('_seedsui_locale')) {
      locale = JSON.parse(localStorage.getItem('_seedsui_locale')) || {}
    } else {
      locale = require(`./zh_CN.js`)
      if (locale.default) locale = locale.default;
    }
  } catch (error) {
    console.log(error)
  }
  // 获取key的值
  if (key) {
    let value = locale[key] || '';
    if (value && variable && Array.isArray(variable)) {
      for (let i = 0; i < variable.length; i++) {
        if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue;
        value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i]);
      }
    }
    return value;
  }
  return locale
}
