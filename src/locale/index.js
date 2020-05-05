// 此库主要用于非组件的js中, 使用locale('id')获取value值
export default function (key) {
  let locale = {}
  try {
    if (localStorage.getItem('_seedsui_locale')) {
      locale = JSON.parse(localStorage.getItem('_seedsui_locale')) || {}
    }
  } catch (error) {
    console.log(error)
  }
  if (key) return locale[key] || ''
  return locale
}
