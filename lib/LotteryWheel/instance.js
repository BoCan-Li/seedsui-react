'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LotteryWheel = function LotteryWheel(container, params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    // 间隔
    spacing: 0,
    // 数据
    data: [], // [{text: '', icon: '', font: '', fontTop...同数据默认值}]
    // 数据默认值
    fontFamily: 'Arial',
    fontSize: 13,
    fontTop: 28,
    fontFillStyle: '#ef694f',

    bgFillStyle: '#ffdf7d',
    bgStrokeStyle: '#fa8b6e',
    bgLineWidth: 1,

    iconWidth: 42,
    iconHeight: 42,
    iconTop: 42,
    // 创建外层容器
    wrapperClass: 'lotterywheel-wrapper',
    // 保存
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
  // Canvas
  s.canvas = typeof container === 'string' ? document.querySelector(container) : container;
  if (!s.canvas) {
    console.log('SeedsUI Error : Lottery container不存在，请检查页面中是否有此元素');
    return;
  }
  s.width = s.canvas.width || 300;
  s.height = s.canvas.height || 300;
  // Wrapper, 包裹canvas, 用于在canvas同级创建文字和图片
  s.wrapper = null;
  s.createWrapper = function () {
    s.wrapper = document.createElement('div');
    s.wrapper.setAttribute('class', s.params.wrapperClass + ' animated');
    s.wrapper.style.width = s.width + 'px';
    s.wrapper.style.height = s.height + 'px';
    s.canvas.parentNode.replaceChild(s.wrapper, s.canvas);
    s.wrapper.appendChild(s.canvas);
  };
  s.create = function () {
    s.createWrapper();
  };
  s.create();
  s.ctx = s.canvas.getContext('2d');
  /* ----------------------
  Method
  ---------------------- */
  // 清除
  s.clear = function () {
    s.ctx.clearRect(0, 0, s.width, s.height);
  };
  // 获取设备缩放比率
  s.getPixelRatio = function () {
    var context = s.ctx;
    var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };
  // 封装扇形函数, 参数: x坐标、y坐标、半径、起始角、结束角、是否逆时针
  s.sector = function (x, y, radius, sAngle, eAngle, counterclockwise) {
    // 开始一条新路径
    s.ctx.beginPath();
    // 起始点移动到圆心
    s.ctx.moveTo(x, y);
    // 绘制圆弧
    s.ctx.arc(x, y, radius, sAngle, eAngle, counterclockwise);
    // 闭合路径
    s.ctx.closePath();
  };
  // 绘制背景-单个扇形
  s.drawCanvas = function (item, index) {
    var ratio = s.getPixelRatio();
    // 计算圆的半径与位置
    var xy = Math.min(s.width || 300, s.height || 300) / 2;
    var r = xy - (s.params.spacing || 0);
    // 设置背景样式
    s.ctx.strokeStyle = item.bgStrokeStyle || s.params.bgStrokeStyle;
    s.ctx.fillStyle = item.bgFillStyle || s.params.bgFillStyle;
    s.ctx.lineWidth = item.bgLineWidth || s.params.bgLineWidth;

    // 计算平均角度
    var deg = 360 / s.params.data.length; // 一槽的度数
    var rad = Math.PI / 180; // 一度的弧度
    var angle = rad * deg;

    // 计算开始和结束角, 使开始位置从正上方开始
    var startAngel = rad * -90 - angle / 2;
    var endAngel = startAngel + angle;

    // 设置中心点与旋转弧度
    s.ctx.translate(xy, xy);
    if (index !== 0) s.ctx.rotate(angle);
    s.ctx.translate(-xy, -xy);

    // 绘背景
    s.sector(xy, xy, r, startAngel, endAngel);
    s.ctx.stroke();
    s.ctx.fill();

    // 保存状态
    s.ctx.save();

    // 绘文字
    var fontSize = (item.fontSize || s.params.fontSize) * ratio;
    var fontFamily = item.fontFamily || s.params.fontFamily;
    var fontTop = (item.fontTop || s.params.fontTop) * ratio;
    s.ctx.font = fontSize + 'px ' + fontFamily;
    s.ctx.textAlign = 'center';
    s.ctx.textBaseline = 'middle';
    s.ctx.fillStyle = item.fontFillStyle || s.params.fontFillStyle;
    s.ctx.fillText(item.text || '', xy, fontTop);

    // 绘图片
    var img = s.imgs[index];
    if (img.getAttribute('data-complete') === '1') {
      var imgTop = (item.iconTop || s.params.iconTop) * ratio;
      var imgWidth = (item.iconWidth || s.params.iconWidth) * ratio;
      var imgHeight = (item.iconHeight || s.params.iconHeight) * ratio;
      s.ctx.drawImage(img, xy - imgWidth / 2, imgTop, imgWidth, imgHeight);
    }

    // 还原状态
    s.ctx.restore();
  };
  // 防止失真, 在高分屏上, 所以要放大2倍绘制, 再缩小2倍
  s.update = function () {
    // 放大2倍
    var ratio = s.getPixelRatio();
    s.width = s.width * ratio;
    s.height = s.height * ratio;
    s.canvas.width = s.width;
    s.canvas.height = s.height;
    s.ctx.width = s.width;
    s.ctx.height = s.height;
    // 缩小2倍
    s.canvas.style.WebkitTransform = 'scale(' + 1 / ratio + ')';
    s.canvas.style.WebkitTransformOrigin = 'left top';
  };
  s.update();
  /* ----------------------
  Imgs, 先用img标签加载图片, 加载完成后再绘制canvas, 目的是为了解决跨域的问题
  ---------------------- */
  // 绘制图片, 解决canvas跨域的问题
  s.imgs = [];
  s.initImgs = function () {
    if (!s.params.data || !s.params.data.length) return;
    s.imgs = [];
    for (var i = 0; i < s.params.data.length; i++) {
      var item = s.params.data[i];
      var img = document.createElement('img');
      img.src = item.icon;
      img.style.display = 'none';
      document.body.append(img);
      img.addEventListener('load', s.onIconLoad, false);
      img.addEventListener('error', s.onIconError, false);
      s.imgs.push(img);
    }
  };
  // 全部加载完成后, 再绘制图片
  s.imgsCompleteDraw = function () {
    var complete = s.imgs.filter(function (img) {
      return img.getAttribute('data-complete');
    });
    if (complete.length === s.imgs.length) {
      console.log('图片加载完成, 开始绘制');
      s.draw();
    }
  };
  s.onIconLoad = function (e) {
    e.target.setAttribute('data-complete', '1');
    // 全部加载完成后, 再绘制图片
    s.imgsCompleteDraw();
  };
  s.onIconError = function (e) {
    e.target.setAttribute('data-complete', '-1');
    // 全部加载完成后, 再绘制图片
    s.imgsCompleteDraw();
  };
  /* ----------------------
  Main
  ---------------------- */
  // 绘制canvas
  s.draw = function () {
    if (!s.params.data || !s.params.data.length) return;
    s.reset();
    s.clear();
    // 保存初始状态
    s.ctx.save();
    for (var i = 0; i < s.params.data.length; i++) {
      s.drawCanvas(s.params.data[i], i);
    }
  };
  // 复位
  s.reset = function () {
    s.wrapper.classList.remove('animated');
    s.wrapper.style.WebkitTransform = 'rotate(0deg)';
    // 还原初始状态
    if (s.ctx) s.ctx.restore();
  };
  // 转动转盘
  s.play = function (count) {
    if (!s.params.data || !s.params.data.length) return;
    var baseRotate = 2160; // 转6圈, 4秒
    var rotate = count * (360 / s.params.data.length);

    s.wrapper.classList.add('animated');
    s.wrapper.style.WebkitTransform = 'rotate(' + (baseRotate - rotate) + 'deg)';
  };
  // 主函数
  s.init = function () {
    s.initImgs();
  };

  s.init();
};

exports.default = LotteryWheel;
module.exports = exports['default'];