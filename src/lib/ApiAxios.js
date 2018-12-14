// require (PrototypeObject.js)
import axios from 'axios'

// axios 默认配置
// axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8'

// 构建get请求参数, get请求需要把url和data拼接起来
function buildGetUrl (url, params) {
  if (!params || Object.isEmptyObject(params)) {
    return url
  }
  if (typeof params === 'string') {
    return url + '?' + params
  }
  if (Object.type(params) === 'json') {
    return url + '?' + Object.params(params)
  }
  return url
}

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
  request: function (url, params = {}) {
    // 设置method
    var method = params.method === 'get' ? 'get' : 'post'
    // 设置头
    var head = params.head || {}
    // 设置options
    var options = params.options || {}
    // 设置data
    var data = params.data || {}
    return axios({
      url: method === 'get' ? buildGetUrl(url, data) : url,
      method: method,
      headers: {
        ...head
      },
      data: method === 'get' ? null : data,
      ...options
    })
  },
  post: function (url, params = {}) {
    return this.request(url, Object.assign({}, params, {method: 'post'}))
  },
  get: function (url, params) {
    return this.request(url, Object.assign({}, params ,{method: 'get'}))
  },
  all: function (requests) { // requests: [{url: '', params: {}}]
    const methods = requests.map((request) => {
      return this.request(request.url, request.params)
    })
    return axios.all(methods)
  }
}

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
