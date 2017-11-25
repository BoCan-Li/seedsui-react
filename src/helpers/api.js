import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const env = process.env.NODE_ENV

if (env === 'development') {
  axios.defaults.baseURL = ' http://ip:8080'
  axios.defaults.withCredentials = true
}
// http request 拦截器
axios.interceptors.request.use(config => {
  // if (store.state.token) config.headers.Authorization = `token ${store.state.token}`
  return config
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 登录超时，跳转至登录页面
    }
  }
  return Promise.reject(error)
})
// http response 拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

const buildGetUrl = function (url, params) {
  var result = Object.params(params)
  if (result) return url + '?' + result
  return url
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(buildGetUrl(url, params)).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export function post (url, params) {
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
export default {
  // 模拟接口
  getMockData (params) {
    // 模拟响应数据
    var result = {}
    result.code = '1'
    result.data = []
    if (params.current === 3) {
      for (let i = 0; i < 3; i++) {
        result.data.push({
          name: '列表'
        })
      }
    } else if (params.current < 3) {
      for (let i = 0; i < params.limit; i++) {
        result.data.push({
          name: '列表'
        })
      }
    } else {
      result.data = []
    }
    // 模拟返回结果
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result)
      }, 1000)
    })
  },
  // 请求真实接口
  getData (params) {
    return post('xx.do', params)
  },
  // 微信初始配置请求
  wxConfig (params) {
    return post('/app/getSignature.action', params)
  }
}
