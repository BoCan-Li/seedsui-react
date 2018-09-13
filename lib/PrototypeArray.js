'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 兼容ES7的includes
if (!window.Array.prototype.includes) {
  window.Array.prototype.includes = function (searchElement) {
    return this.some(function (el) {
      return el === searchElement;
    });
  };
}

// 幂集 如:[1,2],返回[[1],[2],[1,2]]
window.Array.prototype.powerset = function () {
  var ps = [[]];
  for (var i = 0; i < this.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(this[i]));
    }
  }
  return ps;
};

// 二维数组转为一维数组
window.Array.prototype.toOneColumn = function () {
  var reg = /[\d\.]+\,([\d\.]+)/g; // eslint-disable-line
  return this.join(',').replace(reg, '$1').split(',');
};

// 包含，支持传数组包含数组
window.Array.prototype.contains = function (arg) {
  if (toString.call(arg) !== '[object Array]') {
    return this.indexOf(arg) > -1;
  }
  return this.filter(function (elem) {
    return arg.indexOf(elem) > -1;
  }).length === arg.length;
};

// 比较两个数组是否相同, 比较不了包含{x: 20}的数组
if (window.Array.prototype.equals) {
  console.warn('覆盖现有的window.Array.prototype.equals。 可能的原因：新的API定义了方法，存在框架冲突，或者在代码中包含了双重包含。');
}
window.Array.prototype.equals = function (array) {
  if (!array) return false;

  // 比较长度可以节省很多时间
  if (this.length !== array.length) return false;

  for (var i = 0; i < this.length; i++) {
    // 检查是否有嵌套的数组
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // 递归到嵌套数组中
      if (!this[i].equals(array[i])) return false;
    }
    // 检查是否有JSON数据,只比较一层
    else if (this[i] instanceof Object && array[i] instanceof Object) {
        for (var n in this[i]) {
          if (this[i][n] !== array[i][n]) return false;
        }
      } else if (this[i] !== array[i]) {
        // 警告 - 两个不同的对象实例永远不会相同：{x：20}!= {x：20}
        return false;
      }
  }
  return true;
};
// 从for-in循环隐藏方法
Object.defineProperty(window.Array.prototype, "equals", { enumerable: false });

// 判断数组中是否有重复数据,只能比较数字字符串
window.Array.prototype.isRepeatArray = function () {
  var arrStr = this.join(',') + ',';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(this), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (arrStr.replace(item + ',', '').indexOf(item + ',') >= 0) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
};
// 移除数组json中的项
window.Array.prototype.removeProperties = function (properties) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(this), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      for (var n in item) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(properties), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var property = _step3.value;

            if (n === property) delete item[n];
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return this;
};
// 将数组中的项都转成字符串
window.Array.prototype.toStringOption = function () {
  return this.map(function (item) {
    if ((typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) === 'object' || typeof item === 'function') return (0, _stringify2.default)(item);
    return item;
  });
};