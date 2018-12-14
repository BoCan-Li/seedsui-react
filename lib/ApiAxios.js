'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios 默认配置
// axios.defaults.timeout = 5000
_axios2.default.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8';

// 构建get请求参数, get请求需要把url和data拼接起来
// require (PrototypeObject.js)
function buildGetUrl(url, params) {
  if (!params || Object.isEmptyObject(params)) {
    return url;
  }
  if (typeof params === 'string') {
    return url + '?' + params;
  }
  if (Object.type(params) === 'json') {
    return url + '?' + Object.params(params);
  }
  return url;
}

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
  request: function request(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 设置method
    var method = params.method === 'get' ? 'get' : 'post';
    // 设置头
    var head = params.head || {};
    // 设置options
    var options = params.options || {};
    // 设置data
    var data = params.data || {};
    return (0, _axios2.default)((0, _extends3.default)({
      url: method === 'get' ? buildGetUrl(url, data) : url,
      method: method,
      headers: (0, _extends3.default)({}, head),
      data: method === 'get' ? null : data
    }, options));
  },
  post: function post(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return this.request(url, (0, _assign2.default)({}, params, { method: 'post' }));
  },
  get: function get(url, params) {
    return this.request(url, (0, _assign2.default)({}, params, { method: 'get' }));
  },
  all: function all(requests) {
    var _this = this;

    // requests: [{url: '', params: {}}]
    var methods = requests.map(function (request) {
      return _this.request(request.url, request.params);
    });
    return _axios2.default.all(methods);
  }

  // 响应拦截器
};_axios2.default.interceptors.response.use(function (response) {
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