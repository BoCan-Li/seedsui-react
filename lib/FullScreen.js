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
  getElement: function getElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || null;
  },
  // 是否全屏
  isFull: function isFull() {
    return !!(document.webkitIsFullScreen || this.getElement());
  },
  // 进入全屏
  enter: function enter(el) {
    var element = el || document.body;
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== 'undefined') {
      var wscript = new window.ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  },
  // 退出全屏
  exit: function exit() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    return this;
  },
  // 切换
  toggle: function toggle(el) {
    if (this.isFull()) this.exit();else this.enter(el);
  }
};

exports.default = FullScreen;
module.exports = exports['default'];