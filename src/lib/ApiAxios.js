// require (PrototypeObject.js)
import axios from 'axios'

// 封装成Api类
const Api = {
  onError: function (error) {
    console.warn(error)
  },
  logOut: function () {
    console.warn('401, 您已被挤下线, 需要重新登录, 可是您未设置ApiAxios.setLogOut方法')
  },
  setLogOut: function (fn) {
    this.logOut = fn
  },
  setBaseURL: function (baseURL) {
    axios.defaults.baseURL = baseURL
  },
  post: function (url, params) {
    return axios({
      url: url,
      method: 'post',
      data: params
    })
  },
  get: function (url, params) {
    return axios({
      url: url,
      method: 'get',
      data: params
    })
  },
  all: function (requests) { // [{url: '', method: 'post|get', params: {}}]
    const methods = requests.map((request) => {
      if (request.method === 'post') {
        return this.post(request.url, request.params || null)
      } else {
        return this.get(request.url, request.params || null)
      }
    })
    return axios.all(methods)
  }
}

// axios 默认配置
// axios.defaults.timeout = 5000
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
  var req = {}
  try {
    req = JSON.parse(config.data)
  } catch (e) {
    req = config.data
  }
  if (req && req.data) {
    conf.data = req.data
  }
  // 设置头
  var head = {}
  if (req && req.head) {
    head = req.head
    Object.keys(head).forEach(key => {
      var value = head[key]
      conf.headers[key] = value
    })
  }
  // 设置options
  var options = {}
  if (req && req.options) {
    options = req.options
    Object.keys(options).forEach(key => {
      var value = options[key]
      conf[key] = value
    })
  }
  // 设置get请求
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
      case 401: // 401 跳转到登录页面
        if (Api.logOut) Api.logOut(error.response.data.message)
        break
      default:
        if (Api.onError) Api.onError(error)
    }
  }
  return Promise.reject(error)
})

export default Api
