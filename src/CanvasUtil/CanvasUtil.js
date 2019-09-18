// CanvasUtil canvas操作

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

var CanvasUtil = {
  cropImg: function (opts = {}) {
    // 参数校验
    var errMsg = ''
    if (isNaN(opts.x)) {
      errMsg = 'SeedsUI Error:CanvasUtil.cropImg裁切方法x参数不正确'
      console.warn(errMsg)
      return errMsg
    }
    if (isNaN(opts.y)) {
      errMsg = `SeedsUI Error:CanvasUtil.cropImg,${window._seeds_lang['method'] || '方法'}y${window._seeds_lang['wrong_parameter'] || '参数不正确'}`
      console.warn(errMsg)
      return errMsg
    }
    if (isNaN(opts.width)) {
      errMsg = `SeedsUI Error:CanvasUtil.cropImg,${window._seeds_lang['method'] || '方法'}width${window._seeds_lang['wrong_parameter'] || '参数不正确'}`
      console.warn(errMsg)
      return errMsg
    }
    if (isNaN(opts.height)) {
      errMsg = `SeedsUI Error:CanvasUtil.cropImg,${window._seeds_lang['method'] || '方法'}width${window._seeds_lang['wrong_parameter'] || '参数不正确'}`
      console.warn(errMsg)
      return errMsg
    }
    var suffix = opts.suffix || 'image/png'
    var quality = opts.quality || 0.92
    // 开始裁切
    var canvas = document.getElementById('imgcrop_canvas')
    if (!canvas) {
      canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'imgcrop_canvas')
      document.body.appendChild(canvas)
    }
    var ctx = canvas.getContext('2d')
    canvas.width = opts.width;
    canvas.height = opts.height;
    var img = new Image()
    img.src = opts.src
    img.crossOrigin = 'Anonymous'
    img.addEventListener('load', function () {
      ctx.drawImage(img, opts.x, opts.y, opts.width, opts.height, 0, 0, opts.width, opts.height)
      // 成功回调
      try {
        if (opts.onSuccess) opts.onSuccess(canvas.toDataURL(suffix, quality))
      } catch (error) {
        if (opts.onError) opts.onError(error)
      }
    }, false)
  }
}

export default CanvasUtil