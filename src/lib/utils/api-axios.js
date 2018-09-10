import axios from 'axios'
import Bridge from './../Bridge'
// axios 默认配置
// axios.defaults.timeout = 5000
// 设置头
axios.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8'

// 构建get请求参数
function buildGetUrl (url, params) {
  var result = Object.params(params)
  if (result) return url + '?' + result
  return url
}
// 请求拦截器
axios.interceptors.request.use(config => {
  var conf = Object.clone(config)
  // 设置请求数据
  var data = ''
  try {
    data = JSON.parse(config.data)
  } catch (e) {
    data = config.data
  }
  if (data && data.data) {
    conf.data = data.data
  }
  // 设置头
  var head = ''
  if (data && data.head) {
    head = config.data.head
    Object.keys(head).forEach(key => {
      var value = head[key]
      conf.headers[key] = value
    })
  }
  if (config.method === 'get') {
    conf.url = buildGetUrl(conf.url, conf.data)
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
        Bridge.logOut(error.response.data.message)
        break
      default:
        // alert(JSON.stringify(error.response))
    }
  }
  return Promise.reject(error)
})

// 封装成Api类
function buildParams (params) {
  if (params && !params.data) return {data: params}
  return params
}
const Api = {
  setBaseURL: function (baseURL) {
    axios.defaults.baseURL = baseURL
  },
  post: function (url, params) {
    return axios.post(url, params)
  },
  get: function (url, params) {
    const newParams = buildParams(params)
    return axios.get(url, newParams)
  },
  all: function (requests) {
    const methods = requests.map((request) => {
      if (request.method === 'post') {
        return this.post(request.url, request.data || null)
      } else {
        return this.get(request.url, request.data || null)
      }
    })
    return axios.all(methods)
  }
}
export default Api
