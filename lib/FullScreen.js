'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// FullScreen
var FullScreen = {
  // 是否支持全屏
  support: function support() {
    var requestFullscreen = document.body.requestFullscreen || document.body.webkitRequestFullscreen || document.body.mozRequestFullScreen || document.body.msRequestFullscreen;
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    return !!(requestFullscreen && fullscreenEnabled);
  },
  // 获取当前全屏的元素
  getFullscreenElement: function getFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || null;
  },
  // 是否全屏
  isFull: function isFull(el) {
    var target = el || document;
    return !!(target.webkitIsFullScreen || this.getFullscreenElement());
  },
  // 进入全屏
  enter: function enter(el) {
    var target = el || document.body;
    var requestMethod = target.requestFullScreen || target.webkitRequestFullScreen || target.mozRequestFullScreen || target.msRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(target);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      var wscript = new window.ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  },
  // 退出全屏
  exit: function exit(el) {
    var target = el || document;
    if (document.exitFullscreen) {
      target.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      target.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      target.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      target.msExitFullscreen();
    }
    return this;
  },
  // 切换
  toggle: function toggle(el) {
    if (this.isFull()) this.exit();else this.enter(el);
  },
  // 监听
  addHandler: function addHandler(element, handler) {
    var target = element || document;
    target.addEventListener('webkitfullscreenchange', handler, false);
    target.addEventListener('mozfullscreenchange', handler, false);
    target.addEventListener('fullscreenchange', handler, false);
    target.addEventListener('MSFullscreenChange', handler, false);
  }
};

exports.default = FullScreen;
module.exports = exports['default'];