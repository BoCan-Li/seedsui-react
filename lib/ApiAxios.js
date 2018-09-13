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

var _Bridge = require('./Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios 默认配置
// axios.defaults.timeout = 5000
// 设置头
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
  var data = '';
  try {
    data = JSON.parse(config.data);
  } catch (e) {
    data = config.data;
  }
  if (data && data.data) {
    conf.data = data.data;
  }
  // 设置头
  var head = '';
  if (data && data.head) {
    head = config.data.head;
    (0, _keys2.default)(head).forEach(function (key) {
      var value = head[key];
      conf.headers[key] = value;
    });
  }
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
        _Bridge2.default.logOut(error.response.data.message);
        break;
      default:
      // alert(JSON.stringify(error.response))
    }
  }
  return _promise2.default.reject(error);
});

// 封装成Api类
function buildParams(params) {
  if (params && !params.data) return { data: params };
  return params;
}
var Api = {
  setBaseURL: function setBaseURL(baseURL) {
    _axios2.default.defaults.baseURL = baseURL;
  },
  post: function post(url, params) {
    return _axios2.default.post(url, params);
  },
  get: function get(url, params) {
    var newParams = buildParams(params);
    return _axios2.default.get(url, newParams);
  },
  all: function all(requests) {
    var _this = this;

    var methods = requests.map(function (request) {
      if (request.method === 'post') {
        return _this.post(request.url, request.data || null);
      } else {
        return _this.get(request.url, request.data || null);
      }
    });
    return _axios2.default.all(methods);
  }
};
exports.default = Api;
module.exports = exports['default'];