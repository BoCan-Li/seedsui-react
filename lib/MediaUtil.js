'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// MediaUtil 多媒体控件
var MediaUtil = {
  /* ---------------------------
    Methods
    --------------------------- */
  audio: function audio(src) {
    return new Audio(src);
  },
  getFileURL: function getFileURL(file) {
    // 临时路径, file = input.files[0]
    var url = null;
    if (window.createObjcectURL !== undefined) {
      url = window.createOjcectURL(file);
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  getFileSize: function getFileSize(file) {
    // 文件大小
    return file.size;
  },
  getFileType: function getFileType(file) {
    // 文件类型
    return file.type;
  },
  getFileBase64: function getFileBase64(file, callback) {
    // 转成base64
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  },
  convertTime: function convertTime(duration) {
    // 将毫秒转成分秒
    if (isNaN(duration)) return 0;
    var d = (duration / 60).toString().split('.');
    var digits = d[1] ? (d[1] * 6).toString().substr(0, 2) : '00';
    var integer = d[0];
    return integer + ':' + digits;
  },
  convertSize: function convertSize(bytes) {
    // 转换成KB或者MB, 先*1000再/1000是为了防止精度丢失
    if (isNaN(bytes)) return 0;
    if (bytes > 1024 * 1024) return (Math.round(bytes * 1000 / (1024 * 1024)) / 1000).toString() + 'MB';
    return (Math.round(bytes * 1000 / 1024) / 1000).toString() + 'KB';
  },
  resume: function resume(target) {
    if (target.paused) {
      target.play();
    } else {
      target.pause();
    }
  },
  loop: function loop(target, _loop) {
    target.loop = _loop || false;
  },
  autoplay: function autoplay(target, _autoplay) {
    target.autoplay = _autoplay || false;
  },
  isReady: function isReady(target) {
    // 0.没有数据不能播放 1.当前帧已下载完成 2.可以播放 3.播放可继续而且应该不会中断
    if (target.readyState !== 4) {
      return false;
    }
    return true;
  },
  toggleFullScreen: function toggleFullScreen(target) {
    // audio不支持全屏, 兼容性差
    if (target.requestFullscreen) {
      target.exitFullscreen();
    } else {
      target.requestFullscreen();
    }
  },
  duration: function duration(target) {
    if (!this.isReady(target)) return;
    return target.duration;
  },
  currentTime: function currentTime(target, time) {
    if (!this.isReady(target)) return;
    if (!isNaN(time)) {
      target.currentTime = time;
    }
    return time;
  },
  volume: function volume(target, _volume) {
    if (!isNaN(_volume)) {
      target.volume = _volume;
    }
    return target.volume;
  },
  volumeLvl: function volumeLvl(target) {
    var volnumber = target.volume;
    if (volnumber === 0) {
      return 0;
    } else if (volnumber > 0 && volnumber < 0.3) {
      return 1;
    } else if (volnumber > 0.3 && volnumber < 0.6) {
      return 2;
    } else if (volnumber > 0.6 && volnumber < 0.9) {
      return 3;
    } else {
      return 4;
    }
  },
  rate: function rate(target, _rate) {
    // 设置播放速度，默认为1.0秒
    if (!isNaN(_rate)) {
      target.defaultPlaybackRate = _rate;
    }
    return target.defaultPlaybackRate;
  },
  isSupport: function isSupport(suffix) {
    // 是否支持此视频
    var maybeMedia = '';
    var probablyMedia = '';
    switch (suffix) {
      // 音频
      case 'aac':
        maybeMedia = 'audio/mp4';
        probablyMedia = 'audio/mp4; codecs="mp4a.40.2"';
        break;
      case 'vorbis':
        maybeMedia = 'audio/ogg';
        probablyMedia = 'audio/ogg; codecs="vorbis"';
        break; // 后缀通常为ogg
      case 'wav':
        maybeMedia = 'audio/wav';
        probablyMedia = 'audio/wav; codecs="1"';
        break;
      // 视频
      case 'h.264':
        maybeMedia = 'video/mp4';
        probablyMedia = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        break; // 后缀通常为mpg4、mp4、mov
      case 'theora':
        maybeMedia = 'video/ogg';
        probablyMedia = 'video/ogg; codecs="theora"';
        break; // 后缀通常为ogg
      case 'webm':
        maybeMedia = 'video/webm';
        probablyMedia = 'video/webm; codecs="vp8, vorbis"';
        break; // 后缀通常为webm
      default:
        maybeMedia = 'audio/mpeg';
        probablyMedia = 'audio/mpeg';
    }
    var player = document.createElement('video');
    if (maybeMedia !== '' && probablyMedia !== '' && (player.canPlayType(maybeMedia) || player.canPlayType(probablyMedia))) {
      return true;
    }
    return false;
  }
  /* ---------------------------
    Events
    --------------------------- */
  // dataunavailable // 因为没有数据不能播放，readyState值为0
  // canshowcurrentframe // 当前帧已下载完成，readyState值为1
  // canplay // 可以播放时，readyState值为2
  // canplaythrough // 播放可继续，而且应该不会中断，readyState值为3
  // load // 媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
  // loadeddata // 媒体的第一帧已加载完成
  // loadedmetadata // 媒体的元数据已加载完成
  // loadstart // 下载已开始
  // progress // 正在下载
  // abort // 下载中断
  // stalled // 浏览器尝试下载，但未接收到数据
  // error // 下载发生网络错误
  // emptied // 网络连接关闭
  // empty // 发生错误阻止了媒体下载
  // play // 准备播放
  // playing // 正在播放
  // timeupdate // 当前时间被不合理或意外的方式更新
  // pause // 暂停
  // waiting // 播放暂停，等待下载更多数据
  // ended // 媒体已播放至末尾，播放停止
  // volumechange // 更改音量事件
  // ratechange // 更改播放速度事件
  // seeked // 搜索结束
  // seeking // 正在移动到新位置
};

exports.default = MediaUtil;
module.exports = exports['default'];