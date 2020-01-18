// 此库主要用于非组件的js中, 使用getLocaleValue('key')获取value值
export default (key) => {
  let locale = {}
  try {
    if (localStorage.getItem('_seedsui_locale')) {
      locale = JSON.parse(localStorage.getItem('_seedsui_locale')) || {}
    }
  } catch (error) {
    console.log(error)
  }
  return locale[key] || ''
}

