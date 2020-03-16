// require (PrototypeObject.js), 使用了isEmptyObject、params
import axios from 'axios'

// axios 默认配置
// axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

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

// jsonp上传
function jsonp (url) {
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result) => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = `${url}&callback=jsonCallBack`
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}

// 表单上传
function formUpload (url, originFile) {
  return new Promise((resolve) => {
    const frameId = '_seedsui_iframe_id_';
    if (document.getElementById(frameId)) {
      resolve({
        code: '0',
        message: '任务进行中, 请按顺序上传'
      })
      return
    }
    if (!originFile) { // file文件框
      resolve({
        code: '0',
        message: '没有找到options.file, 无法上传'
      })
      return
    }
    // file
    var file = originFile.cloneNode(true)
    // iframe
    var iframe = document.createElement('iframe')
    iframe.setAttribute('id', frameId)
    iframe.setAttribute('name', frameId)
    document.body.appendChild(iframe)
    // form
    var form = document.createElement('form')
    form.setAttribute('action', axios.defaults.baseURL + url)
    form.setAttribute('method', 'POST')
    form.enctype = 'multipart/form-data'
    form.setAttribute('target', frameId)
    form.appendChild(file)
    document.body.appendChild(form)
    form.submit()
    document.getElementById(frameId).addEventListener('load', () => {
      // 构建数据
      var response = {}
      var io = document.getElementById(frameId)
      try {
        if (io.contentWindow) {
          response.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null
          response.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document
        } else {
          if (io.contentDocument) {
            response.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null
            response.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document
          }
        }
        // 返回数据转成json
        try {
          resolve(JSON.parse(response.responseText))
        } catch (error) {
          console.log('result转换JSON失败' + error)
          resolve({
            code: '0',
            message: '返回数据格式异常, 请稍后再试'
          })
        }
      } catch (err) {
        console.log(err)
        resolve({
          code: '0',
          message: '上传异常, 请稍后再试'
        })
      }
      document.body.removeChild(form)
      document.body.removeChild(iframe)
    }, false)
  })
}

// 封装成Api类
const Api = {
  fail: function (error) {
    console.warn(error)
  },
  setBaseURL: function (baseURL) {
    axios.defaults.baseURL = baseURL
  },
  request: function (url, params = {}) {
    let {method, head, data, ...options} = params
    // 设置method
    if (method !== 'get' && method !== 'post' && method !== 'jsonp' && method !== 'upload' && method !== 'form-upload') method = 'get'
    // 如果是表单文件上传
    if (method === 'form-upload') {
      return formUpload(url, options.file)
    }
    // 如果是jsonp, 则其它参数都没有意义了
    if (method === 'jsonp') {
      return jsonp(url)
    }
    // 如果是上传文件
    if (method === 'upload') {
      if (!options.file) { // file文件框
        console.warn('没有找到options.file, 无法上传')
        return new Promise((resolve) => {
          resolve({
            code: '0',
            message: '没有找到options.file, 无法上传'
          })
        })
      }
      head = {'Content-Type': 'multipart/form-data'}
      method = 'POST'
      // 上传数据
      let formData = new FormData()
      formData.append('file', options.file.files[0])
      data = formData
    }
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
  get: function (url, params = {}) {
    return this.request(url, Object.assign({}, params ,{method: 'get'}))
  },
  all: function (requests) { // requests: [{url: '', params: {}}]
    const methods = requests.map((request) => {
      return this.request(request.url, request.params)
    })
    return axios.all(methods)
  },
  jsonp: function (url, params = {}) {
    return this.request(url, Object.assign({}, params, {method: 'jsonp'}))
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
  if (Api.fail) Api.fail({errMsg: error})
  return Promise.reject(error)
})

export default Api
