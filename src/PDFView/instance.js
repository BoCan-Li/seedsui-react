// PDFView pdf文件预览
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
    loadHTML: '加载中',
    errorClass: 'pdf-page-error',
    errorHTML: '文件加载失败',
    nodataClass: 'pdf-page-nodata',
    nodataHTML: '暂无数据',
    hideClass: 'hide',

    pictures: '', // 图片地址
    src: '', // pdf地址
    cMapUrl: '',

    pageAttr: 'data-page', // 图片页数, 从0开始
    completeAttr: 'data-complete', // 完成加载, data-complete=0代表加载错误, =1代码加载正确

    pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js',
    pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js',

    rows: 5,

    pageElements: null, // page内子元素
    /*
    callbacks
    onInit:function(PDFView)
    onPageLoad:function(PDFView)
    onLoad:function(PDFView)
    */
  }
  // pageElements = [{
  //   page: 0,
  //   x: 0,
  //   y: 0,
  //   element: <input/>
  //   ...其它属性将透传
  // }]
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
  
  // 创建DOM
  s.create = function () {
    s.container.innerHTML = ''

    s.wrapper = document.createElement('div')
    s.wrapper.setAttribute('class', s.params.wrapperClass)

    s.container.appendChild(s.wrapper)
  }
  // 更新params
  s.updateParams = function (params = {}) {
    for (var param in params) {
      s.params[param] = params[param]
    }
  }
  // 更新DOM
  s.update = function (params) {
    if (!s.container) return

    s.wrapper = s.container.querySelector('.' + s.params.wrapperClass) || null

    if (!s.wrapper) {
      s.create()
    }

    // 重新加载
    if (s.init) {
      s.wrapper.innerHTML = ''
      s.updateParams(params)
      s.init()
    }
  }
  s.update()
  /* --------------------
  Methods
  -------------------- */
  // base64编码转成流
  s.convertBase64ToBinary = function (base64) {
    var raw = window.atob(base64) // 这个方法在ie内核下无法正常解析。
    var rawLength = raw.length
    // 转换成pdf.js能直接解析的Uint8Array类型
    var array = new Uint8Array(new ArrayBuffer(rawLength))
    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i) & 0xff
    }
    return array
  }
  // 计算宽高比例
  s.scale = 1
  s.updateScale = function () {
    s.scale = s.container.clientWidth / s.width
  }
  // 互斥显示一页中的指定元素: canvas、img、load、error
  s.showPageElement = function (pageDOM, elementName) {
    var elements = {}
    // 隐藏canvas
    elements.canvas = pageDOM.querySelector('.' + s.params.canvasClass)
    elements.canvas.classList.add(s.params.hideClass)
    // 隐藏img
    elements.img = pageDOM.querySelector('.' + s.params.imgClass)
    elements.img.classList.add(s.params.hideClass)
    // 隐藏load
    elements.load = pageDOM.querySelector('.' + s.params.loadClass)
    elements.load.classList.add(s.params.hideClass)
    elements.load.innerHTML = s.params.loadHTML
    // 隐藏error
    elements.error = pageDOM.querySelector('.' + s.params.errorClass)
    elements.error.classList.add(s.params.hideClass)
    elements.error.innerHTML = s.params.errorHTML
    // 隐藏nodata
    elements.nodata = pageDOM.querySelector('.' + s.params.nodataClass)
    elements.nodata.classList.add(s.params.hideClass)
    elements.nodata.innerHTML = s.params.nodataHTML
    // 显示指定的元素
    if (elements[elementName]) elements[elementName].classList.remove(s.params.hideClass)
  }
  // 创建一页
  s.createPage = function () {
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
    load.innerHTML = s.params.loadHTML
    page.appendChild(load)
    // error
    var error = document.createElement('div')
    error.setAttribute('class', s.params.errorClass + ' ' + s.params.hideClass)
    error.innerHTML = s.params.errorHTML
    page.appendChild(error)
    // nodata
    var nodata = document.createElement('div')
    nodata.setAttribute('class', s.params.nodataClass + ' ' + s.params.hideClass)
    nodata.innerHTML = s.params.nodataHTML
    page.appendChild(nodata)
    
    // 添加到容器
    if (s.wrapper) s.wrapper.appendChild(page)

    return page
  }
  // 显示暂无数据
  s.showNoData = function () {
    // Callback onLoad
    if (s.params.onLoad) s.params.onLoad(s)
    // 页面显示暂无数据
    s.wrapper.innerHTML = ''
    var pageDOM = s.createPage()
    s.showPageElement(pageDOM, 'nodata')
  }

  // canvas转成图片
  s.canvasToPng = function (canvas) {
    var dataURL = canvas.toDataURL('image/png', 1.0);
    return dataURL
  }
  // 加载
  s.load = function () {
    if (!s.wrapper) {
      console.warn('SeedsUI Warn: wrapper为空')
      return
    }
    // 过滤无效的图片
    if (s.params.pictures) {
      s.pictures = s.params.pictures.filter(function (picture) {
        if (picture) return true
        return false
      })
    }
    if (s.pictures && s.pictures.length) { // Img加载
      s.loadImg()
    } else if (s.params.src) { // PDF加载
      s.loadPDF()
    } else {
      s.showNoData()
    }
  }
  // 加载PDF的库
  s.loadPDF = function () {
    if (!s.params.pdfLib || !s.params.pdfWorkLib) {
      console.log('SeedsUI: 请先加载pdf资源库')
      return
    }
    try {
      var scriptPdf = document.createElement('script')
      scriptPdf.type = 'text/javascript'
      scriptPdf.src = s.params.pdfLib
      
      var scriptPdfWork = document.createElement('script')
      scriptPdfWork.type = 'text/javascript'
      scriptPdfWork.src = s.params.pdfWorkLib
      document.body.appendChild(scriptPdf)
      document.body.appendChild(scriptPdfWork)
      var loadCount = 0
      scriptPdf.onload = function () {
        if (!loadCount) loadCount = 1
        else loadCount++
        if (loadCount === 2) {
          s.initPDF()
        }
      }
      scriptPdfWork.onload = function () {
        if (!loadCount) loadCount = 1
        else loadCount++
        if (loadCount === 2) {
          s.initPDF()
        }
      }
    } catch (error) {
      console.log('SeedsUI: pdfjs库加载失败')
      console.log(error)
      s.showNoData()
    }
  }
  // 初始化pdf文件
  s.pdf = null
  s.initPDF = function () {
    // 设置cMapUrl, 解决中文不显示的问题
    if (s.params.cMapUrl) {
      PDFJS.cMapUrl = s.params.cMapUrl
      PDFJS.cMapPacked = true
    }
    // 地址访问, 发请求获取地址
    var param = s.params.src
    // base64访问, 直接读取data, 不需要发请求
    if (s.params.src.indexOf('data:application/pdf;base64,') === 0) {
      var data = s.params.src.replace('data:application/pdf;base64,', '')
      data = s.convertBase64ToBinary(data)
      param = {
        data: data
      }
    }
    PDFJS.getDocument(param).then(function (pdf) {
      if (!s.wrapper) return

      s.pdf = pdf // 设置pdf
      s.total = s.pdf.numPages // 总页数
      s.rows = s.params.rows > s.total ? s.total : s.params.rows

      s.addPages()
    }).catch(function (error) {
      console.log('SeedsUI: pdf格式不正确')
      console.log(error)
      s.showNoData()
    })
  }

  // 加载图片
  s.loadImg = function () {
    s.total = s.pictures.length
    s.rows = s.params.rows > s.total ? s.total : s.params.rows
    
    s.addPages()
  }

  // 加载下一页, 索引从1开始
  s.addPages = function () {
    if (s.page * s.rows >= s.total) {
      console.log('pdf所有页面加载完成, 不需要再加载了')
      return
    }
    s.page++
    s.completeCount = 0
    let index = 1 // 起始索引
    let rows = s.rows // 每页显示条数
    let len = s.total // 结束索引
    if (rows) { // 如果有rows则走分页
      len = s.page * rows
      index = len - rows + 1
      if (len > s.total) len = s.total
    }
    for (let i = index; i <= len; i++) {
      // 图片分页
      if (s.pictures) {
        // 创建页
        var pageDOM = s.createPage()
        pageDOM.setAttribute(s.params.pageAttr, i)
        var img = pageDOM.querySelector('img')
        // 设置图片路径
        img.src = s.pictures[i - 1]
        img.addEventListener('load', s.onLoad, false)
        img.addEventListener('error', s.onError, false)
        continue;
      }
      // pdf文件分页
      s.pdf.getPage(i).then((page) => {
        let viewport = page.getViewport(1)
        // 创建页
        let pageDOM = s.createPage()
        pageDOM.setAttribute(s.params.pageAttr, i)
        let canvas = pageDOM.querySelector('canvas')

        let context = canvas.getContext('2d')
        // 设置canvas的宽高
        canvas.height = viewport.height
        canvas.width = viewport.width
        s.width = canvas.width
        s.height = canvas.height
        s.updateScale()
        s.pageWidth = canvas.width * s.scale
        s.pageHeight = canvas.height * s.scale
        pageDOM.style.width = s.pageWidth + 'px'
        pageDOM.style.height = s.pageHeight + 'px'
        canvas.style.WebkitTransform = `scale(${s.scale})`
        canvas.style.WebkitTransformOrigin = `0 0`

        let renderContext = {
          canvasContext: context,
          viewport: viewport
        }
        let renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          s.onLoad({target: canvas})
        }).catch((err) => {
          s.onLoad({target: canvas}, true)
          console.log('SeedsUI: 渲染PDF第' + i + '页失败')
          console.log(err)
        })
      }).catch((err) => {
        s.completeCount++
        console.log('SeedsUI: 读取PDF第' + i + '页失败')
        console.log(err)
      })
    }
  }
  // 加载完成或失败事件
  s.total = 0 // 总页数
  s.page = 0 // 当前页数, 因为当执行addPages或者addPages时会先s.page++, 实际页数是从1开始的
  s.rows = 0
  s.completeCount = 0 // 完成页数
  s.onLoad = function (e, isError) {
    var target = e.target // canvas或者img
    var targetType = target.tagName === 'IMG' ? 'img' : 'canvas'
    var pageDOM = target.parentNode
    var index = pageDOM ? pageDOM.getAttribute(s.params.pageAttr) : 'page'
    // 显示此页Error层
    if (isError) {
      console.log('第' + index + '页加载失败')
      pageDOM && pageDOM.setAttribute(s.params.completeAttr, '0') // 0为加载失败
      s.showPageElement(target.parentNode, 'error')
    } else {
      console.log('第' + index + '页加载完成')
      pageDOM && pageDOM.setAttribute(s.params.completeAttr, '1') // 1为加载成功
      s.showPageElement(target.parentNode, targetType)
      if (targetType === 'img') { // 图片类型需要设置原始宽高比例, 以方便外界调用计算
        s.width = target.naturalWidth
        s.height = target.naturalHeight
        s.pageWidth = pageDOM.clientWidth
        s.pageHeight = pageDOM.clientHeight
        s.updateScale()
      }
    }
    s.event = e
    // Callback onPageLoad
    if (s.params.onPageLoad) s.params.onPageLoad(s)
    // 全部加载完成回调
    s.completeCount++
    if (s.completeCount === (s.rows || s.total)) { // 如果有分页走分页比较
      // Callback onLoad
      if (s.params.onLoad) s.params.onLoad(s)
    }
  }
  // 图片加载失败事件
  s.onError = function (e) {
    s.onLoad(e, true)
  }
  /* --------------------
  Init
  -------------------- */
  // 主函数
  s.init = function () {
    s.load()
    // Callback onInit
    if (s.params.onInit) s.params.onInit(s)
  }
  // 执行主函数
  s.init()
  //  Return slider instance
  return s
}

export default PDFView
