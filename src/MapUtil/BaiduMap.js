// BaiduMap 百度地图使用库
// 引入 PrototypeObject.js: Object.getUnitNum
// 引入 PrototypeString.js: Object.getUnitNum方法中使用toNumber()
import locale from './../locale'

/**
  * 初始化百度地图
  * @param {String} id 用于s.map = new BMap.Map(id)
  * @param {Object} params 见defaults
  */
var BaiduMap = function (id, params) {
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
  // 常量
  /* eslint-disable */
  const {
    BMap, BMapLib = {},
    BMAP_ANCHOR_BOTTOM_LEFT, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_TOP_RIGHT,
    BMAP_DRAWING_POLYGON, BMAP_NAVIGATION_CONTROL_ZOOM,
    BMAP_STATUS_SUCCESS, BMAP_STATUS_TIMEOUT, BMAP_STATUS_UNKNOWN_LOCATION, BMAP_STATUS_PERMISSION_DENIED,
    BMAP_ANCHOR_TOP_LEFT, BMAP_NAVIGATION_CONTROL_LARGE
  } = window
  /* eslint-enable */
  // 鼠标绘制管理实例
  s.drawingManager = null
  // 地图实例
  s.map = null
  if (id) {
    s.map = new BMap.Map(id)
  }
  /**
    * 获取当前地理位置
    * @param {Object} params
    * params: {
    *   type {String}: 'wgs84'|'gcj02'坐标类型微信默认使用国际坐标'wgs84',
    *   cache {Number}: 默认10分钟缓存防重复定位, 单位毫秒
    *   success {Function}: function ({
    *     latitude: '纬度', longitude: '经度', speed:'速度', accuracy:'位置精度',
    *     province: '省', city: '市', district: '区', street: '街道', address: '详情地址'
    *   }),
    *   fail {Function}: function ()
    * }
    */
  s.getLocation = function (options = {}) {
    console.log('调用定位...')
    var geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(function (res) {
      if (!res) { // 如果返回结果为null的话, 则返回
        console.log('没有开启定位权限')
        if (options.fail) options.fail(`${locale('hint_location_failed') || '定位失败,请检查定位权限是否开启'}`)
        return
      }
      const status = this.getStatus()
      if (status === BMAP_STATUS_SUCCESS) { // 定位成功
        const result = {
          errMsg: `${locale('hint_location_success') || '定位成功'}`,
          latitude: res.point.lat,
          longitude: res.point.lng,
          speed: null,
          accuracy: null,
          province: res.address.province,
          city: res.address.city,
          district: res.address.district,
          street: res.address.street,
          streetNumber: res.address.street_number
        }
        result.address = (result.province || '') + (result.city ? ' ,' + result.city : '') + (result.district ? ' ,' + result.district : '') + (result.street ? ' ,' + result.street : '')
        if (options.success) options.success(result)
      } else if (status === BMAP_STATUS_TIMEOUT) { // 定位超时
        console.log('定位超时')
        options.fail({errMsg: `${locale('hint_location_timeout') || '定位超时'}`})
      } else {
        console.log('定位失败')
        // BMAP_STATUS_UNKNOWN_LOCATION, BMAP_STATUS_PERMISSION_DENIED
        if (options.fail) options.fail(`${locale('hint_location_failed') || '定位失败,请检查定位权限是否开启'}`)
      }
    }, {
      enableHighAccuracy: true, // 是否要求浏览器获取最佳效果，同浏览器定位接口参数。默认为false
      timeout: 5000, // 超时事件，单位为毫秒。默认为10秒
      maximumAge: options.cache || 60000, // 允许返回指定事件内的缓存结果，单位为毫秒。如果为0，则每次请求都获取最新的定位结果。默认为10分钟
      SDKLocation: false // 是否开启SDK辅助定位
    })

    // 添加定位控件
    // var geolocationControl = new BMap.GeolocationControl()
    // geolocationControl.addEventListener('locationSuccess', function (res) {
    //   // e.addressComponent.province
    //   console.log(res)
    //   if (options.success) options.success({errMsg: res.message})
    // })
    // geolocationControl.addEventListener('locationError', function (res) {
    //   if (options.fail) options.fail({errMsg: res.message})
    // })
    // s.map.addControl(geolocationControl)
  }

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

  /**
    * 地图显示城市
    * @param {Object} options {
    *  {String || Point} center 地名或者坐标点, 默认北京的坐标
    *  {Number} zoom 如果center为地名时可以忽略此参数, 如果是坐标点则需要设置它3-19级, 默认18级
    * }
    * @return {Void}
    */
  s.centerAndZoom = function (options = {}) {
    if (!options.center && !options.currentPosition) {
      return
    }
    // 默认定位到南京
    let center = options.center || new BMap.Point(118.787066, 32.007779)
    let zoom = options.zoom || 12
    s.map.centerAndZoom(center, zoom)
    // 设置自动定位
    if (options.currentPosition) {
      s.getLocation({
        success: (res) => {
          if (res.longitude && res.latitude) {
            center = new BMap.Point(res.longitude, res.latitude)
          }
          s.map.centerAndZoom(center, zoom)
        },
        fail: () => {
          s.map.centerAndZoom(center, zoom)
        }
      })
    }
  }
  /**
    * 自动切换到有覆盖物的视图
    * @return {Void}
    */
  s.centerToOverlays = function () {
    var overlays = s.map.getOverlays()
    var points = []
    for(var i = 0; i < overlays.length; i++) {
      var overlay = overlays[i]
      if (overlay instanceof BMap.Polygon) { // 多边形
        points = points.concat(overlay.getPath())
      } else if (overlay instanceof BMap.Marker) { // 标记
        points = points.concat(overlay.point)
      }
    }
    s.map.setViewport(points)
  }
  /**
    * 坐标转换
    * @param {Array} points [[lng, lat], [lng, lat]]
    * @param {String} type 'wgs84 | gcj02'
    * @return {Promise} result: {status: 0 成功, points 百度坐标}
    */
  s.formatPoints = function (points, type = 'gcj02') {
    return new Promise((resolve) => {
      points = points.map((point) => {
        return new BMap.Point(point[0], point[1])
      })
      var convertor = new BMap.Convertor()
      if (type === 'wgs84') {
        convertor.translate(points, 1, 5, (result) => {
          resolve(result)
        })
      } else if (type === 'gcj02') {
        convertor.translate(points, 3, 5, (result) => {
          resolve(result)
        })
      } else {
        resolve({status: -1, points: points})
      }
    })
  }
  /**
    * 地址逆解析
    * @param {Array} point [lng, lat]
    * @param {String} type 'wgs84 | gcj02'
    * @return {Promise} result: {status: 0 成功, points 百度坐标}
    */
  s.getAddress = function (point, type) {
    return new Promise(async (resolve) => {
      // 格式化坐标
      const fmtResult =  await s.formatPoints([point], type)
      if (fmtResult.status !== 0) return
      // 逆解析
      var geocoder = new BMap.Geocoder()
      geocoder.getLocation(fmtResult.points[0], (result) => {
        resolve(result)
      })
    })
  }
  /**
    * 本地搜索
    * @param {String} city 城市名称
    * @param {Number} lvl 地图显示级别
    * @return {Void}
    */
  s.search = function (options = {}) {
    const local = new BMap.LocalSearch(s.map, {
      pageCapacity: options.rows || 20,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          var res = []
          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            const item = results.getPoi(i);
            res.push({
              id: item.uid,
              title: item.title,
              address: item.address,
              point: item.point,
              tel: item.phoneNumber,
              mobile: item.phoneNumber,
              city: item.city,
              province: item.province,
              postcode: item.postcode,
              isAccurate: item.isAccurate,
              tags: item.tags
            });
          }
          if (options.success) options.success({code: '1', data: {list: res}});
        } else {
          if (options.fail) options.fail({code: '0', message: '查询失败'})
        }
      },
      panel: options.panelId || null // 结果面板id
    })
    local.search(options.keyword)
    return local
  }
  /**
    * px转坐标, 老版的百度地图不是用坐标而是px
    * @param {Object} px {x: , y: }
    * @return {Point} 格式{lng: , lat: }
    */
  s.pxToPoint = function (px) {
    if (!px) return null
    return new BMap.MercatorProjection().pointToLngLat(new BMap.Pixel(px.x, px.y))
  }
  /**
    * 格式化points, 将[[lng, lat], [lng, lat]]转为[{lng: '', lat: ''}]
    * @param {Points} points 点集合, 格式[[lng, lat], [lng, lat]]
    * @return {Points} 格式[{lng: '', lat: ''}]
    */
  s.pointsToPoints = function (points) {
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
  /**
    * 通俗偏移量转为Size对象
    * @param {Object} wh {
        width: 0,
        height: 0
      }
    * @return {Size} 表示一个矩形区域的大小
    */
  s.whToSize = function (wh = {}) {
    if (wh instanceof BMap.Size) {
      return wh
    }
    if (wh && !isNaN(wh.width) && !isNaN(wh.height)) {
      return new BMap.Size(wh.width, wh.height)
    }
    return null
  }
  /**
    * 两个值的数字字符串转成宽高数字
    * @param {Object} position '0 0'
    * @return {Object} {width: 0, height: 0}
    */
  s.positionToWh = function (position) {
    let wh = position.split(' ')
    let w = null
    let h = null
    if (wh.length > 1) {
      w = Object.getUnitNum(wh[0])
      h = Object.getUnitNum(wh[1])
    } else { // 只有一个值
      w = Object.getUnitNum(wh[0])
    }
    return {
      width: w || 0,
      height: h || 0
    }
  }
  /**
    * html转成InfoWindow
    * @param {String} html
    * @param {InfoWindowOptions} options 参考http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference_3_0.html#a3b8
    * @return {InfoWindow} 窗口信息
    */
  s.htmlToInfoWindow = function (html, options) {
    if (!html) return null
    return new BMap.InfoWindow(html, options)
  }
  /**
    * 根据背景url()取出中间的url
    * @param {String} backgroundImage 'url()'
    * @return {String} 返回url
    */
  s.getUrlByBackgroundImage = function (backgroundImage = '') {
    let match = backgroundImage.match(/^url\((.+)\)$/)
    if (match && match.length && match[1]) {
      return match[1]
    }
    return ''
  }
  /**
    * 通俗style对象转成Icon对象
    * @param {Object} style {
        marginTop: 0, // 图标的定位点相对于图标左上角的偏移值
        marginLeft: 0,
        width: 16,
        height: 24,
        backgroundPosition: 'x y', // 仅支持x与y组合的方式控制位置
        backgroundSize: 'width height', // 仅支持宽高大小
        backgroundImage: 'url()',
      }
    * @return {Size} 表示一个矩形区域的大小
    */
  s.styleToIcon = function (style = {}, infoStyle = {}) {
    // marginTop和marginLeft
    let marginTop = Object.getUnitNum(style.marginTop)
    let marginLeft = Object.getUnitNum(style.marginLeft)
    let anchor = s.whToSize({width: marginTop || 0, height: marginLeft || 0})
    // width和height
    let width = Object.getUnitNum(style.width)
    let height = Object.getUnitNum(style.height)
    if (!width) width = 16
    if (!height) height = 24
    let size = s.whToSize({width: width, height: height})
    // backgroundPosition
    let imageOffset = null
    if (style.backgroundPosition) {
      let bgWh = s.s.positionToWh(style.backgroundPosition)
      imageOffset = s.whToSize({width: bgWh.width, height: bgWh.height})
    }
    // backgroundSize
    let imageSize = s.whToSize({width: width, height: height})
    if (style.backgroundSize) {
      let bgWh = s.s.positionToWh(style.backgroundSize)
      imageOffset = s.whToSize({width: bgWh.width || width, height: bgWh.height || height})
    }
    // backgroundImage
    let imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAMAAABHcohdAAAAOVBMVEUAAAAMjv8Njv8NkP8Nj/8MkP8Nkf8gn/8Nj/8Njv8Mj/8Mj/8Mjv+ZmZn////n8/+Nyv8hj+8vkeUvlTkDAAAADHRSTlMA5oyFdlM8CPPZv6h2+xS8AAAAs0lEQVQ4y+2TWw6EIAxFaQUEvDOo+1/sIFEjKDSZb89vD7TpQ12wHLxzPrBVD4yacEJ6rOOGUECmjA+4MVzjEx6YqvedPwwSc4xzbZi9ftri30Rt0JgFjUTchIgKnQVqC5T7BxQpCraeMnAWeYOTENAhJMH3BJ8E1xOcLMgp5CK5J3BuVAe7t7oF7cNqoo9xN6DxWJgGRlo5aWmltZcORz69O5bXBVhWtqrFJ6PUK7zCv8IP6rMmSWrDD8kAAAAASUVORK5CYII='
    if (style.backgroundImage) {
      imageUrl = s.getUrlByBackgroundImage(style.backgroundImage)
    }

    // window容器的marginTop和marginLeft
    let infoWindowAnchor = s.whToSize({width: infoStyle.marginLeft || 0, height: infoStyle.marginTop || 0})

    return new BMap.Icon(imageUrl, size, {
      anchor: anchor,
      size: size,
      imageOffset: imageOffset,
      imageSize: imageSize,
      imageUrl: imageUrl,
      infoWindowAnchor: infoWindowAnchor
    })
  }
  /**
    * 通俗偏移量转为Size对象
    * @param {Object} point {
        lng: ,
        lat: 
      }
    * @return {Point} 表示一个矩形区域的大小
    */
  s.pointToPoint = function (point = {}) {
    if (point instanceof BMap.Point) {
      return point
    }
    if (point && point.lng && point.lat) {
      return new BMap.Point(point.lng, point.lat)
    }
    return null
  }
  /**
    * 通俗位置转换成百度认识的位置字段
    * @param {String} position 通俗位置
    * @return {ControlAnchor} 百度位置字段
    */
  s.positionToAnchor = function (position) {
    // 位置
    let anchor = null
    switch (position) {
      case 'top-left':
        anchor = BMAP_ANCHOR_TOP_LEFT
        break
      case 'top-right':
        anchor = BMAP_ANCHOR_TOP_RIGHT
        break
      case 'bottom-left':
        anchor = BMAP_ANCHOR_BOTTOM_LEFT
        break
      case 'bottom-right':
        anchor = BMAP_ANCHOR_BOTTOM_RIGHT
        break
      default:
        anchor = BMAP_ANCHOR_TOP_LEFT
    }
    return anchor
  }
  /**
    * 显示距离比例控件
    * @param {Object} options {
    * position {String}: 'top-left | top-right | bottom-left | bottom-right' 通俗位置
    * offset {Object}: {width: Number, height: Number} 
    * success {Function}: function(ScaleControl)
    * }
    */
  s.showDistance = function (options = {}) {
    // 位置
    const anchor = s.positionToAnchor(options.position)
    // 偏移量
    let offset = s.whToSize(options.offset)
    // 实例
    const scaleControl = new BMap.ScaleControl({
      anchor: anchor,
      offset: offset
    })
    s.map.addControl(scaleControl)
    // Return
    return scaleControl
  }
  /**
    * 显示缩放控件
    * @param {Object} options {
    * position {String}: 'top-left | top-right | bottom-left | bottom-right' 通俗位置
    * offset {Object}: {width: Number, height: Number} 
    * success {Function}: function(NavigationControl)
    * }
    */
  s.showNavigation = function (options = {}) {
    // 位置
    let anchor = s.positionToAnchor(options.position)
    // 偏移量
    let offset = s.whToSize(options.offset)
    // 类型
    let type = null
    switch (options.type) {
      case 'zoom':
        type = BMAP_NAVIGATION_CONTROL_ZOOM
        break
      case 'large':
        type = BMAP_NAVIGATION_CONTROL_LARGE
        break
      default:
        type = BMAP_NAVIGATION_CONTROL_LARGE
    }
    // 是否显示级别提示信息
    const showZoomInfo = options.showZoomInfo || false
    // 定位按钮, 启用会多出个定位按钮
    let enableGeolocation = false
    if (typeof options.enableGeolocation === 'boolean') {
      enableGeolocation = options.enableGeolocation
    }
    // 实例
    const navigationControl = new BMap.NavigationControl({
      anchor: anchor,
      offset: offset,
      type: type,
      showZoomInfo: showZoomInfo,
      enableGeolocation: enableGeolocation
    })
    s.map.addControl(navigationControl)
    // Return
    return navigationControl
  }
  /**
    * 清除覆盖物
    */
  s.clearOverlays = function () {
    s.map.clearOverlays()
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
  
  // 点转多边形points:[[lng, lat], [lng, lat]]
  s.pointsToPolygon = function (argPoints) {
    var points = s.pointsToPoints(argPoints);
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
  s.drawBoundary = function (options = {}) { // {area: '江苏省南京市建邺区', styleOptions: {}, success: func(), fail: func()}
    var boundary = new BMap.Boundary()
    if (!options.area) {
      console.warn(`${locale('hint_pass_in_parameters') || '请传入参数'}area, ${locale('hint_for_example_address') || '例如“江苏省南京市建邺区”'}`)
      options.fail && options.fail({
        errMsg: `${locale('hint_pass_in_parameters') || '请传入参数'}area, ${locale('hint_for_example_address') || '例如“江苏省南京市建邺区”'}`
      })
      return
    }
    boundary.get(options.area, function (res) { // 获取行政区域
      var count = res.boundaries.length // 行政区域的点有多少个
      if (count === 0) {
        console.warn(`${locale('hint_pass_in_correct_parameters') || '请传入正确的参数'}area`)
        options.fail && options.fail({
          errMsg: `${locale('hint_pass_in_correct_parameters') || '请传入正确的参数'}area`
        })
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
      options.success && options.success({...res, polygons, polygonsPath})
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
      polygon = new BMap.Polygon(s.pointsToPoints(options.points), options.styleOptions || s.params.styleOptions)
    }
    if (polygon) {
      s.map.addOverlay(polygon) // 添加覆盖物
      options.success && options.success(polygon)
    } else {
      console.warn(`drawPolygon: ${locale('hint_pass_in_parameters') || '请传入参数'}{polygon: {}}${locale('or') || '或者'}{points: []}`)
      options.fail && options.fail({
        errMsg: `drawPolygon: ${locale('hint_pass_in_parameters') || '请传入参数'}{polygon: {}}${locale('or') || '或者'}{points: []}`
      })
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
      console.warn(`drawLabel: ${locale('hint_pass_in_parameters') || '请传入参数'}{point: }`)
      options.fail && options.fail({
        errMsg: `drawLabel: ${locale('hint_pass_in_parameters') || '请传入参数'}{point: }`
      })
      return
    }
    var opts = {
      position: options.point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(0, 0) // 设置文本偏移量
    }
    var label = new BMap.Label(JSON.stringify(options.point), opts) // 创建文本标注对象
    label.setStyle(options.styleOptions || s.params.labelStyleOptions);
    s.map.addOverlay(label)
    return label
  }

  
  /**
    * 绘制标记
    * @param {Object} options {
        point {Point}: {lng: ,lat: },
        marker {Object}: 
        {
          offset: {width: , height: }
          icon: {backgroundImage: url(), backgroundSize: ''}
          enableMassClear: Boolean	是否在调用map.clearOverlays清除此覆盖物，默认为true
          enableDragging: Boolean	是否启用拖拽，默认为false
          enableClicking: Boolean	是否响应点击事件。默认为true
          raiseOnDrag: Boolean	拖拽标注时，标注是否开启离开地图表面效果。默认为false
          draggingCursor: String	拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
          rotation: Number	旋转角度
          shadow: Icon	阴影图标
          title: String	鼠标移到marker上的显示内容
        },
        info {}
    * }
    * @return {Marker} 标记对象
    */
  s.drawMarker = function (options = {}){ // {point: {lng: ,lat: }, marker: {}, info: {}}
    // 绘制位置
    const point = s.pointToPoint(options.point)
    if (!point) return
    // 绘制图标
    if (!options.marker) options.marker = {}
    if (!options.info) options.info = {}
    const {offset, iconStyle, ...markerOptions} = options.marker
    const marker = new BMap.Marker(point,
      {
        offset: s.whToSize(offset),
        icon: s.styleToIcon(iconStyle, options.info.style),
        ...markerOptions
      }
    )
    s.map.addOverlay(marker)
    // 点击显示弹框
    if (options.onClick) {
      marker.addEventListener('click', function (e) {
        options.onClick(e)
      })
    }
    return marker
  }
  // 添加右键菜单
  s.addContextMenu = function (overlay, options = {}){ // options: {menus: [{text: '', handler: func()}]}
    if (!overlay) {
      console.warn(`addContextMenu: ${locale('hint_pass_in_parameters') || '请传入参数'}overlay`)
      options.fail && options.fail({
        errMsg: `addContextMenu: ${locale('hint_pass_in_parameters') || '请传入参数'}overlay`
      })
      return
    }
    if (!options.menus || !Array.isArray(options.menus) || !options.menus[0] || !options.menus[0].text) {
      console.warn(`addContextMenu: ${locale('hint_pass_in_parameters') || '请传入参数'}{menus: [{text: "", handler: func()}]}`)
      options.fail && options.fail({
        errMsg: `addContextMenu: ${locale('hint_pass_in_parameters') || '请传入参数'}{menus: [{text: "", handler: func()}]}`
      })
      return
    }
    var markerMenu = new BMap.ContextMenu()
    for (let [index, opt] of options.menus.entries()) {
      markerMenu.addItem(new BMap.MenuItem(opt.text || (locale('menu') || '菜单'), function () {
        opt.handler(opt, index)
      }))
    }
    overlay.addContextMenu(markerMenu)
    return markerMenu
  }
  // 渲染地图
  s.initMap = function () {
    if (!BMap) {
      console.error('请先引入百度地图api: <script src="//api.map.baidu.com/api?v=3.0&ak=xxx&s=1"></script>')
      return
    }
    if (!s.map) return
    // 缩放导航
    if (s.params.navigation) {
      s.showNavigation(s.params.navigation)
    }
    // 中心位置
    if (s.params.center) {
      s.centerAndZoom(s.params.center)
    }
    // 开启鼠标滚轮缩放
    s.map.enableScrollWheelZoom(true)
  }
  s.initMap()
}


BaiduMap.load = function (params = {}) {
  // window.BMAP_PROTOCOL = "https";
  // window.BMap_loadScriptTime = (new Date).getTime();
  // document.write(`<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=${params.ak}&services=&t=20200415105918"></script>`);
  return new Promise((resolve) => {
    if (window.BMap) { // eslint-disable-line
      resolve(true)
      if (params.success) params.success()
      return
    }
    if (!params.ak) {
      resolve('请在传入地图的密钥MapUtil.load({ak: ""})')
      if (params.fail) params.fail({errMsg: '请在传入地图的密钥MapUtil.load({ak: ""})'})
      return
    }
    window.BMAP_PROTOCOL = 'https';
    window.BMap_loadScriptTime = (new Date).getTime()
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    script.src = `https://api.map.baidu.com/getscript?v=3.0&ak=${params.ak}&services=&t=20200415105918`
    document.body.appendChild(script)
    script.onload = function () {
      resolve(true)
      if (params.success) params.success()
    }
    script.onerror = function (err) {
      resolve('加载地图失败')
      if (params.fail) params.fail({errMsg: '加载地图失败', err: err})
    }
  });
}

export default BaiduMap
