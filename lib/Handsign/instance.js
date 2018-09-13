'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Handsign = function Handsign(container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    strokeStyle: '#000',
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
  s.width = s.container.width;
  s.height = s.container.height;
  s.ctx = s.container.getContext('2d');
  s.stage_info = s.container.getBoundingClientRect();
  s.path = {
    beginX: 0,
    beginY: 0,
    endX: 0,
    endY: 0
    /* ----------------------
    Events
    ---------------------- */
  };s.preventDefault = function (e) {
    e.preventDefault();
  };
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener';
    s.container[action]('touchstart', s.onTouchStart, false);
    s.container[action]('touchmove', s.onTouchMove, false);
    s.container[action]('touchend', s.onTouchEnd, false);
    s.container[action]('touchcancel', s.onTouchEnd, false);
  };
  // attach、detach事件
  s.attach = function () {
    s.events();
  };
  s.detach = function () {
    s.events(true);
  };
  s.onTouchStart = function (e) {
    s.container.addEventListener('touchmove', s.preventDefault, false);
    window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
    s.ctx.strokeStyle = s.params.strokeStyle;
    s.ctx.lineWidth = s.params.lineWidth;
    s.ctx.beginPath();
    s.ctx.moveTo(e.changedTouches[0].clientX - s.stage_info.left, e.changedTouches[0].clientY - s.stage_info.top);
    s.path.beginX = e.changedTouches[0].clientX - s.stage_info.left;
    s.path.beginY = e.changedTouches[0].clientY - s.stage_info.top;
  };
  s.onTouchMove = function (e) {
    s.ctx.lineTo(e.changedTouches[0].clientX - s.stage_info.left, e.changedTouches[0].clientY - s.stage_info.top);
    s.path.endX = e.changedTouches[0].clientX - s.stage_info.left;
    s.path.endY = e.changedTouches[0].clientY - s.stage_info.top;
    s.ctx.stroke();
  };
  s.onTouchEnd = function (e) {
    s.container.removeEventListener('touchmove', s.preventDefault, false);
  };
  /* ----------------------
  Method
  ---------------------- */
  // 获取设备缩放比率
  s.getPixelRatio = function () {
    var context = s.ctx;
    var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  // 清除签名
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.width, s.height);
  };
  // 是否画过
  s.isDrew = function () {
    var blank = document.createElement('canvas');
    blank.width = s.container.width;
    blank.height = s.container.height;
    if (s.container.toDataURL() === blank.toDataURL()) return false;
    return true;
  };
  // 保存签名
  s.save = function () {
    // 如果已经画过了,则返回base64,如果没有画过,则返回空
    if (s.isDrew()) {
      return s.container.toDataURL(s.params.suffix, s.params.quality);
    } else {
      return '';
    }
  };
  // 计算top left bottom center的位置
  s.calcPosition = function (w, h, pos) {
    var posArr = pos.split(' ').map(function (item, index) {
      var x = 0;
      var y = 0;
      // 如果是数字
      if (!isNaN(item)) {
        if (index === 0) return { x: item };
        if (index === 1) return { y: item };
      }
      // 如果是字符串
      if (item === 'top') return { y: 0 };
      if (item === 'left') return { x: 0 };
      if (item === 'right') {
        x = s.width < w ? 0 : s.width - w;
        return { x: x };
      }
      if (item === 'bottom') {
        y = s.height < h ? 0 : s.height - h;
        return { y: y };
      }
      if (item === 'center') {
        x = (s.width - w) / 2;
        return { x: x };
      }
      if (item === 'middle') {
        y = (s.height - h) / 2;
        return { y: y };
      }
      return { x: 0, y: 0 };
    });
    var posJson = {
      x: 0,
      y: 0
    };
    posArr.forEach(function (item) {
      if (item.x) {
        posJson.x = item.x;
      } else if (item.y) {
        posJson.y = item.y;
      }
    });
    return {
      x: posJson.x || 0,
      y: posJson.y || 0
    };
  };
  // 绘制图片
  s.drawImg = function (imgSrc, opts) {
    if (!imgSrc) {
      console.log('SeedsUI Error:手写签名drawImg缺少imgSrc');
      return;
    }
    var imgW = opts.width || 100;
    var imgH = opts.height || 100;
    var imgP = opts.position || 'bottom right';

    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imgSrc;
    img.onload = function () {
      var sx = 0; // 剪切的 x 坐标
      var sy = 0; // 剪切的 y 坐标
      var width = imgW || img.width; // 使用的图像宽度
      var height = imgH || img.height; // 使用的图像高度
      var swidth = img.width; // 剪切图像的宽度
      var sheight = img.height; // 剪切图像的高度
      var pos = s.calcPosition(width, height, imgP); // 画布上放置xy坐标
      s.ctx.drawImage(img, sx, sy, swidth, sheight, pos.x, pos.y, width, height);
      // 成功回调
      if (opts.onSuccess) opts.onSuccess();
    };
  };
  // 绘制文字
  s.drawFont = function (text, opts) {
    if (!text) {
      console.log('SeedsUI Error:手写签名drawFont缺少文字');
      return;
    }
    var fontSize = opts.fontSize || 15;
    var fontFamily = opts.fontFamily || 'microsoft yahei';
    var fontPosition = opts.position || 'bottom center';
    var fontStyle = opts.color || 'rgba(0, 0, 0, 1)';
    if (isNaN(fontSize)) {
      console.log('SeedsUI Error:文字大小请输入数字类型');
      return;
    }
    var height = fontSize;
    var width = text.length * height;
    var pos = s.calcPosition(width, height, fontPosition); // 画布上放置xy坐标
    var calcY = pos.y === 0 ? Number(pos.y) + Number(height) : Number(pos.y) + Number(height) - 5; // 文字垂直位置有整个高度的偏差
    // 写字
    s.ctx.font = fontSize + 'px ' + fontFamily;
    s.ctx.fillStyle = fontStyle;
    s.ctx.fillText(text, pos.x, calcY);
  };
  // 主函数
  s.init = function () {
    s.attach();
  };

  s.init();
};

exports.default = Handsign;
module.exports = exports['default'];