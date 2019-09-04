'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DB 本地数据库
var DB = function () {
  function checkManifest() {
    window.addEventListener('updateready', function (e) {
      console.log('离线缓存状态：' + window.applicationCache.status);
      if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache();
        if (window.confirm('发现此manifest文件有更新，是否更新？')) {
          window.location.reload();
        }
      } else {
        console.log('manifest文件没有变化');
      }
    }, false);
  }
  function stringifyData(val) {
    if (typeof val === 'number') {
      return '_number:' + val.toString();
    }
    if (typeof val === 'boolean') {
      return '_boolean:' + val.toString();
    }
    if (!val) {
      return '';
    }
    if (typeof val === 'string') {
      return val;
    }
    if (val instanceof Function) {
      return '_function:' + val.toString();
    }
    if (val instanceof Object) {
      return '_json:' + (0, _stringify2.default)(val);
    }
  }
  function parseData(val) {
    if (!val) {
      return null;
    }
    if (val.indexOf('_number:') === 0) {
      return Number(val.replace(/^_number:/, ''));
    }
    if (val.indexOf('_boolean:') === 0) {
      return Boolean(val.replace(/^_boolean:/, ''));
    }
    if (val.indexOf('_function:') === 0) {
      return val.replace(/^_function:/, '');
    }
    if (val.indexOf('_json:') === 0) {
      return JSON.parse(val.replace(/^_json:/, ''));
    }
    return val;
  }
  var store = window.localStorage;
  var session = window.sessionStorage;
  return {
    // application cache
    checkManifest: checkManifest,

    setStore: function setStore(key, val) {
      store.setItem(key.toString(), stringifyData(val));
    },
    getStore: function getStore(key) {
      if (typeof key === 'number') {
        return parseData(store.key(key));
      }
      return parseData(store.getItem(key));
    },
    getAllStore: function getAllStore() {
      return store.valueOf();
    },
    removeStore: function removeStore(key) {
      store.removeItem(key);
    },
    clearStore: function clearStore() {
      store.clear();
    },

    setSession: function setSession(key, value) {
      session.setItem(key.toString(), stringifyData(value));
    },
    getSession: function getSession(key) {
      if (typeof key === 'number') {
        return parseData(session.key(key));
      }
      return parseData(session.getItem(key));
    },
    getAllSession: function getAllSession() {
      return session.valueOf();
    },
    removeSession: function removeSession(key) {
      session.removeItem(key);
    },
    clearSession: function clearSession() {
      session.clear();
    },
    setCookie: function setCookie(key, value, second) {
      var cookieStr = key + '=' + escape(value);
      if (second) {
        var expires = new Date();
        expires.setTime(expires.getTime() + second * 1000);
        cookieStr += ';expires=' + expires.toGMTString();
      }
      document.cookie = cookieStr;
    },
    getCookie: function getCookie(key) {
      var arrCookie = document.cookie.split('; ');
      //遍历cookie数组, 处理每个cookie对
      for (var i = 0, item; item = arrCookie[i++];) {
        // eslint-disable-line
        var arrItem = item.split("=");
        //找到名称为userId的cookie，并返回它的值 
        if (String(key) === arrItem[0]) {
          return unescape(arrItem[1]);
        }
      }
      return null;
    },
    removeCookie: function removeCookie(key) {
      var expires = new Date();
      expires.setTime(expires.getTime() - 1);
      var val = this.getCookie(key);
      if (val != null) {
        document.cookie = key + '=' + val + 'expires=' + expires.toGMTString();
      }
    },
    clearCookie: function clearCookie() {
      alert('抱歉，cookie不可以全部清空!');
    }
  };
}();

exports.default = DB;
module.exports = exports['default'];