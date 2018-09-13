'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ajax
var Ajax = {
  xhr: function xhr(config) {
    var xhr = new window.XMLHttpRequest();
    var url = config.url;
    var data = config.data || {};
    var success = config.success;
    var error = config.error;
    var params = Object.params(data);
    var type = config.type || 'GET';
    var contentType = config.contentType;
    var token = config.token;
    var extra = config.extra;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText);
          success(res, extra);
        } else {
          error && error();
        }
      }
    };
    // 鉴权
    if (token) xhr.setRequestHeader('Authorization', token);
    // post | get
    if (type === 'POST') {
      xhr.open(type, url, true);
      xhr.setRequestHeader('Content-type', contentType || 'application/json');
      if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
        xhr.send(params);
      } else {
        xhr.send((0, _stringify2.default)(data));
      }
    } else {
      if (url.indexOf('?') === -1) {
        url += '?' + params;
      } else {
        url += '&' + params;
      }
      xhr.open(type, url, true);
      xhr.send(null);
    }
  },
  fetchData: function fetchData(url, config) {
    // config = req, type, contentType, token
    // 显示loading
    // ob.$emit('ajaxLoading', true)
    return new _promise2.default(function (resolve, reject) {
      Ajax.xhr({
        url: url,
        data: config.req || {},
        type: config.type || null,
        contentType: config.contentType || null,
        token: config.token || null,
        success: function success(data) {
          if (data.code === '1') {
            resolve(data);
          } else {
            reject(data);
          }
          // 关闭loading
          // ob.$emit('ajaxLoading', false)
        },
        error: function error(err) {
          reject(err);
          // 关闭loading
          // ob.$emit('ajaxLoading', false)
        }
      });
    });
  }
};

exports.default = Ajax;
module.exports = exports['default'];