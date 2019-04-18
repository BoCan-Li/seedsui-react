// BaiduMap 百度地图使用库
var BaiduMap = function (id, params) {
  if (!document.querySelector('#' + id)) {
    console.log('SeedsUI Error：未找到BaiduMap的DOM对象，请检查id是否存在')
    return
  }
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    styleOptions: {
      strokeColor: '#0C8EFF', //边线颜色。
      strokeWeight: 1, //边线的宽度，以像素为单位。
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
      strokeStyle: 'solid', //边线的样式，solid或dashed。
      fillColor: '#0C8EFF', //填充颜色。当参数为空时，圆形将没有填充效果。
      fillOpacity: 0.6 //填充的透明度，取值范围0 - 1。
    }
    /*  callback
    onSubmit:function(selected)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }

  // BaiduMap
  var s = this

  // Params
  s.params = params
  
  s.map = null
  s.drawingManager = null
  const {
    BMap, BMapLib,
    BMAP_ANCHOR_BOTTOM_LEFT, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_TOP_RIGHT,
    BMAP_DRAWING_POLYGON, BMAP_NAVIGATION_CONTROL_ZOOM
  } = window

  // 渲染地图
  s.createMap = function () {
    s.map = new BMap.Map('map')
    s.map.centerAndZoom(new BMap.Point(116.404, 39.915), 12) // 初始化地图,设置中心点坐标和地图级别
    s.map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
    s.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
  }
  s.createMap()

  // 创建鼠标绘制管理类
  s.createDrawingManager = function () {
    s.drawingManager = new BMapLib.DrawingManager(s.map, {
      isOpen: false, // 是否开启绘制模式
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
        offset: new BMap.Size(5, 5), // 偏离值
      },
      circleOptions: s.params.styleOptions, // 圆的样式
      polylineOptions: s.params.styleOptions, // 线的样式
      polygonOptions: s.params.styleOptions, // 多边形的样式
      rectangleOptions: s.params.styleOptions // 矩形的样式
    })
  }
  s.createDrawingManager()

  /* --------------------
  Method
  -------------------- */
  // 显示放大缩小控件
  s.showScale = function () {
    s.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}))
  }
  // 显示标尺控件
  s.showNavigation = function () {
    s.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}))
  }
  // 启用手动绘制
  s.enableManualDraw = function (type) {
    if (s.drawingManager) {
      s.drawingManager.open()
      s.drawingManager.setDrawingMode(type || BMAP_DRAWING_POLYGON) // 默认多边形
    }
  }
  // 绘制省市区域
  s.drawBoundary = function (options = {}) { // {area: '江苏省南京市建邺区', styleOptions: {}, onSuccess: func(), onError: func()}
    var boundary = new BMap.Boundary()
    if (!options.area) {
      options.onError && options.onError('请传入area, 例如“江苏省南京市建邺区”')
      return
    }
    boundary.get(options.area, function (res) { // 获取行政区域
      var count = res.boundaries.length // 行政区域的点有多少个
      if (count === 0) {
        options.onError && options.onError('未能获取当前输入行政区域')
        return
      }
      var polygonPoints = []
      for (var i = 0; i < count; i++) {
        var polygon = new BMap.Polygon(res.boundaries[i], options.styleOptions || s.params.styleOptions)
        s.map.addOverlay(polygon) // 添加覆盖物
        polygonPoints = polygonPoints.concat(polygon.getPath())
      }
      // s.map.setViewport(pointArray) //调整视野
      options.onSuccess && options.onSuccess(res, polygonPoints)
    })
  }
  // 自动切换到有覆盖物的视图
  s.autoViewport = function () {
    var overlays = s.map.getOverlays()
    var points = []
    for(var i = 0; i < overlays.length; i++) {
      var overlay = overlays[i];
      if(overlay instanceof BMap.Polygon) {
        points = points.concat(overlay.getPath())
      }
    }
    s.map.setViewport(points)
  }
}

export default BaiduMap
