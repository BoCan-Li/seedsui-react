'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 封装成Api类
var Api = {
  onError: function onError(error) {
    console.warn(error);
  },
  logOut: function logOut() {
    console.warn('401, 您已被挤下线, 需要重新登录, 可是您未设置ApiAxios.setLogOut方法');
  },
  setLogOut: function setLogOut(fn) {
    this.logOut = fn;
  },
  setBaseURL: function setBaseURL(baseURL) {
    _axios2.default.defaults.baseURL = baseURL;
  },
  post: function post(url, params) {
    return (0, _axios2.default)({
      url: url,
      method: 'post',
      data: params
    });
  },
  get: function get(url, params) {
    return (0, _axios2.default)({
      url: url,
      method: 'get',
      data: params
    });
  },
  all: function all(requests) {
    var _this = this;

    // [{url: '', method: 'post|get', params: {}}]
    var methods = requests.map(function (request) {
      if (request.method === 'post') {
        return _this.post(request.url, request.params || null);
      } else {
        return _this.get(request.url, request.params || null);
      }
    });
    return _axios2.default.all(methods);
  }

  // axios 默认配置
  // axios.defaults.timeout = 5000
}; // require (PrototypeObject.js)
_axios2.default.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8';

// 构建get请求参数
function buildGetUrl(url, params) {
  var result = Object.params(params);
  if (result) return url + '?' + result;
  return url;
}

// 请求拦截器
_axios2.default.interceptors.request.use(function (config) {
  var conf = Object.clone(config);
  // 设置请求数据
  var req = {};
  try {
    req = JSON.parse(config.data);
  } catch (e) {
    req = config.data;
  }
  if (req && req.data) {
    conf.data = req.data;
  }
  // 设置头
  var head = {};
  if (req && req.head) {
    head = req.head;
    (0, _keys2.default)(head).forEach(function (key) {
      var value = head[key];
      conf.headers[key] = value;
    });
  }
  // 设置options
  var options = {};
  if (req && req.options) {
    options = req.options;
    (0, _keys2.default)(options).forEach(function (key) {
      var value = options[key];
      conf[key] = value;
    });
  }
  // 设置get请求
  if (config.method === 'get') {
    conf.url = buildGetUrl(conf.url, conf.data);
  }
  return conf;
}, function (error) {
  return _promise2.default.reject(error);
});

// 响应拦截器
_axios2.default.interceptors.response.use(function (response) {
  var result = response.data || response;
  if (typeof result === 'string') {
    try {
      return JSON.parse(result);
    } catch (error) {
      console.log('result转换JSON失败' + error);
      return result;
    }
  }
  return result;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 跳转到登录页面
        if (Api.logOut) Api.logOut(error.response.data.message);
        break;
      default:
        if (Api.onError) Api.onError(error);
    }
  }
  return _promise2.default.reject(error);
});

exports.default = Api;
module.exports = exports['default'];