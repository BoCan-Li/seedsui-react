'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Imgmark = function Imgmark(container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    loadingClass: 'imgmark-loading',
    errorClass: 'imgmark-error',
    activeClass: 'active',

    src: '',
    data: [],
    strokeStyle: '#00ff00',
    lineWidth: 3,

    suffix: 'image/png',
    quality: 0.92
  };
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  var s = this;
  s.params = params;
  s.container = typeof container === 'string' ? document.querySelector(container) : container;
  if (!s.container) {
    console.log('SeedsUI Error : HandSign container不存在，请检查页面中是否有此元素');
    return;
  }
  s.loadingContainer = s.container.parentNode.querySelector('.' + s.params.loadingClass) || null;
  s.errorContainer = s.container.parentNode.querySelector('.' + s.params.errorClass) || null;
  s.ctx = s.container.getContext('2d');
  s.stageInfo = s.container.getBoundingClientRect();
  s.path = {
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
    /* ----------------------
    Model Method
    ---------------------- */
  };s.setData = function (data) {
    if (data) {
      s.params.data = data;
    }
  };
  s.setStrokeStyle = function (strokeStyle) {
    if (strokeStyle) {
      s.params.strokeStyle = strokeStyle;
    }
  };
  s.setLineWidth = function (lineWidth) {
    if (lineWidth) {
      s.params.lineWidth = lineWidth;
    }
  };
  s.setSuffix = function (suffix) {
    if (suffix) {
      s.params.suffix = suffix;
    }
  };
  s.setQuality = function (quality) {
    if (quality) {
      s.params.quality = quality;
    }
  };
  /* ----------------------
  Method
  ---------------------- */
  // 清除
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.container.width, s.container.height);
  };
  // 保存签名
  s.save = function () {
    return s.container.toDataURL(s.params.suffix, s.params.quality);
  };
  // 绘制图片
  s.draw = function (img, data) {
    if (!img) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img');
      return;
    }
    if (!data) {
      console.log('SeedsUI Error:ImgMark执行draw缺少img');
      return;
    }
    s.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (item.strokeStyle) s.ctx.strokeStyle = item.strokeStyle;else s.ctx.strokeStyle = s.params.strokeStyle;
        s.ctx.strokeRect(item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1);
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
  };
  s.update = function () {
    if (s.params.src) {
      var img = new Image();
      img.setAttribute("crossOrigin", 'Anonymous');
      img.src = s.params.src;
      img.addEventListener('load', s.onLoad, false);
      img.addEventListener('error', s.onError, false);
    }
  };
  /* ----------------------
  Events
  ---------------------- */
  s.onLoad = function (e) {
    var target = e.target;
    // 显隐
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass);
    if (s.errorContainer) s.errorContainer.classList.remove(s.params.activeClass);
    s.container.classList.add(s.params.activeClass);
    // 绘图
    s.container.width = target.width;
    s.container.height = target.height;
    s.draw(target, s.params.data);
    // 缩小
    var scale = s.params.height / target.height;
    s.container.style.WebkitTransform = 'scale(' + scale + ') translate(-50%,-50%)';
    s.container.style.WebkitTransformOrigin = '0 0';
  };
  s.onError = function () {
    if (s.loadingContainer) s.loadingContainer.classList.remove(s.params.activeClass);
    if (s.errorContainer) s.errorContainer.classList.add(s.params.activeClass);
    s.container.classList.remove(s.params.activeClass);
  };
  // 主函数
  s.init = function () {
    s.update();
  };

  s.init();
};

exports.default = Imgmark;
module.exports = exports['default'];