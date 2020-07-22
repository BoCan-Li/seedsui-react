// CameraRecorder
var CameraRecorder = {
  recorder: null, // 录制器
  recorderFile: null, // 录制完成文件
  stream: null, // 视频流
  timer: null, // 计时
  timerEl: null, // 计时元素
  onStop: null, // 当前停止录制回调
  onStopInit: null, // 初始化时停止录制回调, 当调用stopRecord传入回调时, 此回调将被覆盖
  // 关闭媒体流
  closeStream: function (stream) {
    if (!stream) return
    if (typeof stream.stop === 'function') {
      stream.stop()
    } else {
      let trackList = [stream.getAudioTracks(), stream.getVideoTracks()]
      for (let i = 0; i < trackList.length; i++) {
        let tracks = trackList[i];
        if (tracks && tracks.length > 0) {
          for (let j = 0; j < tracks.length; j++) {
            let track = tracks[j]
            if (typeof track.stop === 'function') {
              track.stop()
            }
          }
        }
      }
    }
  },
  /**
    * 打开摄像头, 并监听录制结束事件
    * @param {Object} params
    * {
    *   {Object} constraints: 限制条件
    *   {DOM} video: video元素
    *   {DOM} timer: 计时元素
    *   {Function} onOpened: func(e, stream)已打开摄像头回调
    *   {Function} onStop: func(e)结束录制回调
    *   {Function} onError: func(e, {errMsg: ''})错误回调
    * }
    * @param {String} type 'wgs84 | gcj02'
    * @return {Object} 
    */
	init: function (params = {}) {
    const self = this
    const {constraints = {}, video, timer, onOpened, onStop, onError} = params
    self.onStopInit = onStop
    self.onStop = onStop
    self.timerEl = timer
    if (!video) {
      if (onError) onError({target: video}, {errMsg: 'No params "video"'})
			return
    }
		if (navigator.mediaDevices === undefined) {
      if (onError) onError({target: video}, {errMsg: 'mediaDevices not supported'})
			return
		}
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
		if (!navigator.getUserMedia) {
      if (onError) onError({target: video}, {errMsg: 'getUserMedia not supported'})
			return
    }
    const width = (window.innerWidth || window.screen.width || window.screen.availWidth)
    const height = (window.innerHeight || window.screen.height || window.screen.availHeight)
    video.width = width
    video.height = height
		navigator.getUserMedia({
			audio: constraints.audio || true,
			video: constraints.video || {
				width: width,
				height: height
			},
			...constraints
		}, (stream) => {
      // 流放入video
      video.srcObject = stream
			video.onloadedmetadata = function(e) {
				if (onOpened) onOpened(e, {stream: stream})
      }
      // 录制器
      self.stream = stream
      self.recorder = new MediaRecorder(stream)
      let chunks = [] // 数据块, 用于构建recorderFile
      // 录制器: 数据可用
      self.recorder.ondataavailable = function (e) {
        self.recorder.blobs.push(e.data)
        chunks.push(e.data)
      }
      // 录制器: 结束录制
      self.recorder.blobs = []
      self.recorder.onstop = function (e) {
        self.recorderFile = new Blob(
          chunks,
          {
            'type': self.recorder.mimeType
          }
        )
        chunks = []
        if (self.onStop) self.onStop(e, self.getFile())
      }
		}, (err) => {
      if (onError) onError({target: video}, {errMsg: 'The following error occurred: ' + err.name})
		})
  },
  startTimer: function (timerEl) {
    if (!timerEl) return
    let t = 0
    this.timer = setInterval(() => {
      t += 1000
      // 将毫秒数转成时分
      let hours = parseInt(t / 3600000)
      let minutes = parseInt((t % 3600000) / 60000)
      let seconds = (t % 60000 ) / 1000
      let timeStr = ''
      // 显示时
      if (hours > 1 || minutes > 59) {
        timeStr = (hours < 10 ? '0' + hours : hours) + ':'
      }
      // 显示分
      if (minutes > 0) {
        timeStr += (minutes < 10 ? '0' + minutes : minutes) + ':'
      } else {
        timeStr += '00:'
      }
      // 显示秒
      if (seconds > 0) {
        timeStr += (seconds < 10 ? '0' + seconds : seconds)
      } else {
        timeStr += '00'
      }
      timerEl.innerHTML = timeStr
    }, 100)
  },
  // 开始录制
  startRecord: function () {
    const self = this
    self.recorder.start()
    self.startTimer(self.timerEl)
  },
  // 结束录制
  stopRecord: function (callback) {
    const self = this
    if (callback) {
      self.onStop = callback
    } else if (callback === false || callback === null) {
      self.onStop = null
    } else {
      self.onStop = self.onStopInit
    }
    // 终止计时
    if (self.timer) window.clearInterval(self.timer)
    if (self.recorder && self.recorder.state === 'recording') {
      // 终止录制器
      self.recorder.stop()
    }
    // 关闭媒体流
    self.closeStream(self.stream)
  },
  // 生成file用于提交表单
  getFile: function () {
    const self = this
    var file = new File([self.recorderFile], 'msr-' + (new Date).toISOString().replace(/:|\./g, '-') + '.mp4', {
        type: 'video/mp4'
    })
    return file
  }
}

export default CameraRecorder
