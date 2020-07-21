// 此库主要用于非组件的js中, 使用locale('id{0}', ['替换{0}值'])获取value值
export default function (key, variable) {
  let locale = {}
  try {
    if (localStorage.getItem('_seedsui_locale')) {
      locale = JSON.parse(localStorage.getItem('_seedsui_locale')) || {}
    }
  } catch (error) {
    console.log(error)
  }
  // 获取key的值
  if (key) {
    let value = locale[key] || '';
    if (variable && Array.isArray(variable)) {
      for (let i = 0; i < variable.length; i++) {
        if (typeof variable[i] !== 'number' && typeof variable[i] !== 'boolean' && typeof variable[i] !== 'string') continue;
        value = value.replace(new RegExp(`\\{${i}\\}`, 'g'), variable[i]);
      }
    }
    return value;
  }
  return locale
}
