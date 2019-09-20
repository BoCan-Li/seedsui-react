// PDFView pdf文件预览
// import IScroll from './iscroll-zoom.js'
import PDFJS from 'pdfjs-dist'

var PDFView = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    containerClass: 'pdf-container',
    wrapperClass: 'pdf-wrapper',
    pageClass: 'pdf-page',
    canvasClass: 'pdf-page-canvas',
    imgClass: 'pdf-page-img',
    loadClass: 'pdf-page-load',

    source: '', // pdf地址
    zoom: true, // 放大缩小

    /*
    callbacks
    onInit:function(PDFView)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Slider
  var s = this

  // Params
  s.params = params

  // Container
  s.container = (typeof container === 'string' && container !== '') ? document.querySelector(container) : container
  if (!s.container) {
    console.warn('SeedsUI Error：未找到Container，请检查传入参数是否正确')
    return
  }

  // Wrapper
  s.wrapper = null

  // Iscroll
  s.iscroll = null
  
  // 创建DOM
  s.create = function () {
    s.container.innerHTML = ''

    s.wrapper = document.createElement('div')
    s.wrapper.setAttribute('class', s.params.wrapperClass)

    s.container.appendChild(s.wrapper)
  }
  // 更新DOM
  s.update = function () {
    if (!s.container) return

    s.wrapper = s.container.querySelector('.' + s.params.wrapperClass) || null

    if (!s.wrapper) {
      s.create()
    }
  }
  s.update()
  /* --------------------
  Methods
  -------------------- */
  // 带缩放的滚动控件
  s.initZoomScroll = function (container) {
    // s.iscroll = new IScroll(container, {
    //   zoom: true,
    //   scrollX: true,
    //   scrollY: true
    // })
  }
  // 创建一页
  s.createPage = function (container) {
    // page容器
    var page = document.createElement('div')
    page.setAttribute('class', s.params.pageClass)
    // canvas用于渲染pdf单页, 并生成img
    var canvas = document.createElement('canvas')
    canvas.setAttribute('class', s.params.canvasClass)
    page.appendChild(canvas);
    // img
    var img = document.createElement('img')
    img.setAttribute('class', s.params.imgClass)
    page.appendChild(img)
    // load
    var load = document.createElement('div')
    load.setAttribute('class', s.params.loadClass)
    page.appendChild(load)
    
    // 添加到容器
    if (container) container.appendChild(page)

    return page
  }

  // canvas转成Blob
  s.canvasToPng = function (canvas) {
    var dataURL = canvas.toDataURL('image/png', 1.0);
    return dataURL
  }
  // 加载PDF
  s.loadPDF = function () {
    if (!s.wrapper) {
      console.warn('SeedsUI Warn: wrapper为空')
      return
    }
    if (!s.params.source) return
    PDFJS.getDocument(s.params.source).then(function (pdf) {
      s.renderPDF(pdf)
    })
  }
  // 渲染PDF
  s.total = 0 // 总页数
  s.renderPDF = function (pdf) {
    s.loadCount = 0
    if (!s.wrapper) return

    s.total = pdf.numPages // 总页数
    for (let i = 1; i < s.total; i++) {
      pdf.getPage(i).then((page) => {
        let viewport = page.getViewport(1)
        // 创建页
        let pageDOM = s.createPage(s.wrapper)
        let canvas = pageDOM.querySelector('canvas')
        let img = pageDOM.querySelector('img')

        let context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        let renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          let pngbase64 = s.canvasToPng(canvas)
          img.src = pngbase64
          img.addEventListener('load', s.onLoad, false)
        })
      })
    }
  }
  // 加载完成事件
  s.loadCount = 0 // 完成页数
  s.onLoad = function (e) {
    // 全部加载完成
    s.loadCount++
    if (s.loadCount === s.total - 1) {
      // Callback onInit
      s.event = e
      if (s.params.onInit) s.params.onInit()
    }
    // 刷新iscroll
    // s.iscroll.refresh()
  }

  /* --------------------
  Init
  -------------------- */
  // 主函数
  s.init = function () {
    s.loadPDF()
    s.initZoomScroll(s.container)
  }
  // 执行主函数
  s.init()
  //  Return slider instance
  return s
}

export default PDFView
