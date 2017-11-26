import axios from 'axios'
import 'utils/object.js'

/* -------------------
axios 配置
------------------- */
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const env = process.env.NODE_ENV

if (env === 'development') {
  axios.defaults.baseURL = ' http://172.31.3.96:8080'
  axios.defaults.withCredentials = true
}
// 请求拦截器
/* axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
}) */
// 响应拦截器
/* axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 跳转到登录页面
        alert(error.response.data.message)
    }
  }
  return Promise.reject(error)
}) */

/* -------------------
导出实例化类
------------------- */
class Api {
  buildGetUrl (url, params) {
    var result = Object.params(params)
    if (result) return url + '?' + result
    return url
  }
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(this.buildGetUrl(url, params)).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}
export default new Api()
