// BaiduMap 百度地图使用库
var BaiduMap = function (id, params) {
  if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据
  if (!document.querySelector('#' + id)) {
    console.log('SeedsUI Error：未找到BaiduMap的DOM对象，请检查id是否存在')
    return
  }
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    styleOptions: {
      strokeColor: '#0C8EFF', //边线颜色
      strokeWeight: 1, //边线的宽度，以像素为单位
      strokeOpacity: 0.8, //边线透明度，取值范围0 - 1
      strokeStyle: 'solid', //边线的样式，solid或dashed
      fillColor: '#0C8EFF', //填充颜色。当参数为空时，圆形将没有填充效果
      fillOpacity: 0.6 //填充的透明度，取值范围0 - 1
    },
    labelStyleOptions: {
      color : 'red',
      fontSize : '12px',
      height : '20px',
      lineHeight : '20px',
      fontFamily: '微软雅黑'
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
  多边形算法工具类
  -------------------- */
  
  /* --------------------
  Method
  -------------------- */
  // 格式化points, 将[[lng, lat], [lng, lat]]转为[{lng: '', lat: ''}]
  s.formatPoints = function (points) {
    if (!points || !Array.isArray(points)) return []
    if (JSON.stringify(points).indexOf('lng') !== -1) return points
    if (!Array.isArray(points[0]) || !points[0][0] || !points[0][1]) return []
    return points.map(function (point) {
      var lng = point[0]
      var lat = point[1]
      if (point[0] < point[1]) {
        lng = point[1]
        lat = point[0]
      }
      return {
        lng,lat
      }
    })
  }
  // 显示放大缩小控件
  s.showScale = function () {
    s.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}))
  }
  // 显示标尺控件
  s.showNavigation = function () {
    s.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}))
  }
  // 启用手动绘制
  // 设置当前的绘制模式，参数DrawingType，为5个可选常量: 
  // BMAP_DRAWING_MARKER 画点 
  // BMAP_DRAWING_CIRCLE 画圆 
  // BMAP_DRAWING_POLYLINE 画线 
  // BMAP_DRAWING_POLYGON 画多边形 
  // BMAP_DRAWING_RECTANGLE 画矩形
  // circlecomplete(overlay) {Circle} 绘制圆完成后，派发的事件接口
  // markercomplete(overlay) {Marker} 绘制点完成后，派发的事件接口
  // overlaycomplete(e) {Event Object} 鼠标绘制完成后，派发总事件的接口
  // polygoncomplete(overlay) {Polygon} 绘制多边形完成后，派发的事件接口
  // polylinecomplete(overlay) {Polyline} 绘制线完成后，派发的事件接口
  // rectanglecomplete(overlay) {Polygon} 绘制矩形完成后，派发的事件接口
  s.enableManualDraw = function (type) {
    if (s.drawingManager) {
      s.drawingManager.open()
      s.drawingManager.setDrawingMode(type || BMAP_DRAWING_POLYGON) // 默认多边形
    }
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
  // 点转多边形points:[[lng, lat], [lng, lat]]
  s.pointsToPolygon = function (argPoints) {
    var points = s.formatPoints(argPoints);
    var ps = []
    for (var point of points) {
      ps.push(new BMap.Point(point.lng, point.lat))
    }
    return new BMap.Polygon(ps)
  }
  // 点转多边形points:[[ [lng, lat], [lng, lat] ], [ [lng, lat], [lng, lat] ]]
  s.pointsToPolygons = function (argPointss) {
    let polygons = []
    for (let i = 0; i < argPointss.length; i++) {
      let polygon = s.pointsToPolygon(argPointss[i])
      polygons.push(polygon)
    }
    return polygons
  }
  // 绘制省市区域
  s.drawBoundary = function (options = {}) { // {area: '江苏省南京市建邺区', styleOptions: {}, onSuccess: func(), onError: func()}
    var boundary = new BMap.Boundary()
    if (!options.area) {
      console.warn(`${window._seeds_lang['pass_in'] || '请传入'}area, ${window._seeds_lang['hint_for_example_address'] || '例如“江苏省南京市建邺区”'}`)
      options.onError && options.onError(`${window._seeds_lang['pass_in'] || '请传入'}area, ${window._seeds_lang['hint_for_example_address'] || '例如“江苏省南京市建邺区”'}`)
      return
    }
    boundary.get(options.area, function (res) { // 获取行政区域
      var count = res.boundaries.length // 行政区域的点有多少个
      if (count === 0) {
        console.warn(`${window._seeds_lang['hint_pass_in_correct_parameters'] || '请传入正确的参数'}area`)
        options.onError && options.onError(`${window._seeds_lang['hint_pass_in_correct_parameters'] || '请传入正确的参数'}area`)
        return
      }
      var polygons = []
      var polygonsPath = []
      for (var i = 0; i < count; i++) {
        polygons[i] = new BMap.Polygon(res.boundaries[i], options.styleOptions || s.params.styleOptions)
        s.map.addOverlay(polygons[i]) // 添加覆盖物
        polygonsPath = polygonsPath.concat(polygons[i].getPath())
      }
      // s.map.setViewport(pointArray) //调整视野
      options.onSuccess && options.onSuccess({...res, polygons, polygonsPath})
    })
    return boundary
  }
  // 绘制多边形
  s.drawPolygon = function (options = {}){ // {polygon: Object, points: [], styleOptions: {}}
    var polygon = null
    if (options.polygon && Object.keys(options.polygon) && Object.keys(options.polygon).length) {
      polygon = options.polygon
      if (!options.styleOptions) options.styleOptions = {}
      // 设置多边型的边线颜色，参数为合法的CSS颜色值
      polygon.setStrokeColor(options.styleOptions.strokeColor || s.params.styleOptions.strokeColor)
      // 设置多边形边线的宽度，取值为大于等于1的整数
      polygon.setStrokeWeight(options.styleOptions.strokeWeight || s.params.styleOptions.strokeWeight)
      // 设置圆形的边线透明度，取值范围0 - 1
      polygon.setStrokeOpacity(options.styleOptions.strokeOpacity || s.params.styleOptions.strokeOpacity)
      // 设置圆形边线样式为实线或虚线，取值solid或dashed
      polygon.setStrokeStyle(options.styleOptions.strokeStyle || s.params.styleOptions.strokeStyle)
      // 设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
      polygon.setFillColor(options.styleOptions.fillColor || s.params.styleOptions.fillColor)
      // 设置矢量图标填充透明度,opacity范围0~1
      polygon.setFillOpacity(options.styleOptions.fillOpacity || s.params.styleOptions.fillOpacity)
    } else if (Array.isArray(options.points) && options.points.length) {
      polygon = new BMap.Polygon(s.formatPoints(options.points), options.styleOptions || s.params.styleOptions)
    }
    if (polygon) {
      s.map.addOverlay(polygon) // 添加覆盖物
      options.onSuccess && options.onSuccess(polygon)
    } else {
      console.warn(`drawPolygon: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{polygon: {}}${window._seeds_lang['or'] || '或者'}{points: []}`)
      options.onError && options.onError(`drawPolygon: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{polygon: {}}${window._seeds_lang['or'] || '或者'}{points: []}`)
    }
    return polygon
  }
  // 绘制多边形
  s.drawPolygons = function (options = []){ // [{polygon: Object, points: [], styleOptions: {}}]
    let polygons = []
    for (let option of options) {
      polygons.push(s.drawPolygon(option))
    }
    return polygons
  }
  // 绘制Label
  s.drawLabel = function (options = {}){ // {point: {}, styleOptions: {}}
    if (!options.point) {
      console.warn(`drawLabel: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{point: }`)
      options.onError && options.onError(`drawLabel: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{point: }`)
      return
    }
    var opts = {
      position: options.point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(0, 0) // 设置文本偏移量
    }
    var label = new BMap.Label(JSON.stringify(options.point), opts) // 创建文本标注对象
    label.setStyle(options.styleOptions || s.params.labelStyleOptions);
    s.map.addOverlay(label)
    options.onSuccess && options.onSuccess(label)
    return label
  }
  // 绘制标记
  s.drawMarker = function (options = {}){ // {point: {lng: ,lat: }, styleOptions: {}}
    if (!options.point) {
      console.warn(`drawMarker: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{point: }`)
      options.onError && options.onError(`drawMarker: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{point: }`)
      return
    }
    if (!options.point.lng || !options.point.lat) {
      console.warn(`drawMarker: ${window._seeds_lang['hint_pass_in_correct_parameters'] || '请传入正确的参数'}{point: {lng: ,lat: }}`)
      options.onError && options.onError(`drawMarker: ${window._seeds_lang['hint_pass_in_correct_parameters'] || '请传入正确的参数'}{point: {lng: ,lat: }}`)
      return
    }
    var point = new BMap.Point(options.point.lng, options.point.lat)
    var marker = new BMap.Marker(point,
      {
        icon: new BMap.Icon(
          options.icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAMAAABHcohdAAAAOVBMVEUAAAAMjv8Njv8NkP8Nj/8MkP8Nkf8gn/8Nj/8Njv8Mj/8Mj/8Mjv+ZmZn////n8/+Nyv8hj+8vkeUvlTkDAAAADHRSTlMA5oyFdlM8CPPZv6h2+xS8AAAAs0lEQVQ4y+2TWw6EIAxFaQUEvDOo+1/sIFEjKDSZb89vD7TpQ12wHLxzPrBVD4yacEJ6rOOGUECmjA+4MVzjEx6YqvedPwwSc4xzbZi9ftri30Rt0JgFjUTchIgKnQVqC5T7BxQpCraeMnAWeYOTENAhJMH3BJ8E1xOcLMgp5CK5J3BuVAe7t7oF7cNqoo9xN6DxWJgGRlo5aWmltZcORz69O5bXBVhWtqrFJ6PUK7zCv8IP6rMmSWrDD8kAAAAASUVORK5CYII=',
          new BMap.Size(16,24),
          {
            imageSize: new BMap.Size(16, 24) // 设置偏移量
          }
        )
      },
      {
        offset: new BMap.Size(8, 12)
      }
    )
    s.map.addOverlay(marker)
    options.onSuccess && options.onSuccess(marker)
    return marker
  }
  // 添加右键菜单
  s.addContextMenu = function (overlay, options = {}){ // options: {menus: [{text: '', handler: func()}]}
    if (!overlay) {
      console.warn(`addContextMenu: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}overlay`)
      options.onError && options.onError(`addContextMenu: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}overlay`)
      return
    }
    if (!options.menus || !Array.isArray(options.menus) || !options.menus[0] || !options.menus[0].text) {
      console.warn(`addContextMenu: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}pass_in_parameters'] || '请传入参数'}{menus: [{text: \'\', handler: func()}]}`)
      options.onError && options.onError(`addContextMenu: ${window._seeds_lang['hint_pass_in_parameters'] || '请传入参数'}{menus: [{text: \'\', handler: func()}]}`)
      return
    }
    var markerMenu = new BMap.ContextMenu()
    for (let [index, opt] of options.menus.entries()) {
      markerMenu.addItem(new BMap.MenuItem(opt.text || (window._seeds_lang['menu'] || '菜单'), function () {
        opt.handler(opt, index)
      }))
    }
    overlay.addContextMenu(markerMenu)
    return markerMenu
  }
}

export default BaiduMap
