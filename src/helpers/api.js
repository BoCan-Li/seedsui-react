import axios from 'axios'
// import 'utils/object.js'

/* -------------------
axios 配置
------------------- */
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8'

const env = process.env.NODE_ENV

if (env === 'development') {
  axios.defaults.baseURL = ' http://172.31.3.96:8080/api'
  axios.defaults.withCredentials = true
}
// 请求拦截器
function buildGetUrl (url, params) {
  var result = Object.params(params)
  if (result) return url + '?' + result
  return url
}
axios.interceptors.request.use(config => {
  let conf = config
  if (config.method === 'get') {
    conf.url = buildGetUrl(config.url, config.data)
    conf.data = ''
  }
  return conf
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  let result = response.data || response
  if (typeof result === 'string') {
    try {
      return JSON.parse(result)
    } catch (error) {
      console.log('result转换JSON失败' + error)
      return result
    }
  }
  return result
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 跳转到登录页面
        alert('401' + error.response.data.message)
        break
      default:
        alert(error.response)
    }
  }
  return Promise.reject(error)
})

export default axios
