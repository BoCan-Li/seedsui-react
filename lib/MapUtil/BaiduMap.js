'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BaiduMap 百度地图使用库
var BaiduMap = function BaiduMap(id, params) {
  if (!document.querySelector('#' + id)) {
    console.log('SeedsUI Error：未找到BaiduMap的DOM对象，请检查id是否存在');
    return;
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
      color: 'red',
      fontSize: '12px',
      height: '20px',
      lineHeight: '20px',
      fontFamily: '微软雅黑'
      /*  callback
      onSubmit:function(selected)
      */
    } };
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }

  // BaiduMap
  var s = this;

  // Params
  s.params = params;

  s.map = null;
  s.drawingManager = null;
  var _window = window,
      BMap = _window.BMap,
      BMapLib = _window.BMapLib,
      BMAP_ANCHOR_BOTTOM_LEFT = _window.BMAP_ANCHOR_BOTTOM_LEFT,
      BMAP_ANCHOR_BOTTOM_RIGHT = _window.BMAP_ANCHOR_BOTTOM_RIGHT,
      BMAP_ANCHOR_TOP_RIGHT = _window.BMAP_ANCHOR_TOP_RIGHT,
      BMAP_DRAWING_POLYGON = _window.BMAP_DRAWING_POLYGON,
      BMAP_NAVIGATION_CONTROL_ZOOM = _window.BMAP_NAVIGATION_CONTROL_ZOOM;

  // 渲染地图

  s.createMap = function () {
    s.map = new BMap.Map('map');
    s.map.centerAndZoom(new BMap.Point(116.404, 39.915), 12); // 初始化地图,设置中心点坐标和地图级别
    s.map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
    s.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  };
  s.createMap();

  // 创建鼠标绘制管理类
  s.createDrawingManager = function () {
    s.drawingManager = new BMapLib.DrawingManager(s.map, {
      isOpen: false, // 是否开启绘制模式
      drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
        offset: new BMap.Size(5, 5) // 偏离值
      },
      circleOptions: s.params.styleOptions, // 圆的样式
      polylineOptions: s.params.styleOptions, // 线的样式
      polygonOptions: s.params.styleOptions, // 多边形的样式
      rectangleOptions: s.params.styleOptions // 矩形的样式
    });
  };
  s.createDrawingManager();

  /* --------------------
  多边形算法工具类
  -------------------- */

  /* --------------------
  Method
  -------------------- */
  // 显示放大缩小控件
  s.showScale = function () {
    s.map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }));
  };
  // 显示标尺控件
  s.showNavigation = function () {
    s.map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }));
  };
  // 启用手动绘制
  s.enableManualDraw = function (type) {
    if (s.drawingManager) {
      s.drawingManager.open();
      s.drawingManager.setDrawingMode(type || BMAP_DRAWING_POLYGON); // 默认多边形
    }
  };
  // 自动切换到有覆盖物的视图
  s.autoViewport = function () {
    var overlays = s.map.getOverlays();
    var points = [];
    for (var i = 0; i < overlays.length; i++) {
      var overlay = overlays[i];
      if (overlay instanceof BMap.Polygon) {
        points = points.concat(overlay.getPath());
      }
    }
    s.map.setViewport(points);
  };
  // 绘制指定区域
  // function resetFenceArea (overlay) {
  //   var newlay = overlay;

  //   if (WqMapLib.WqGeoUtils.isSelfInter(overlay)){
  //       map.removeOverlay(overlay);
  //       fh.alert('多边形自相交');
  //       return;
  //   }
  //   var overlays = grayMap.values();
  //   for (var i = overlays.length - 1; i >= 0; i --) {
  //       if (WqMapLib.WqGeoUtils.isContainer(overlays[i],overlay)){
  //           map.removeOverlay(overlay);
  //           fh.alert("多边形区域相互包含")
  //           return;
  //       }
  //       var tmppoly = WqMapLib.WqGeoUtils.addContainPoint(overlays[i],newlay);
  //       var tmpp = JSON.stringify(newlay.so);
  //       while( JSON.stringify(tmppoly) != tmpp){
  //           tmpp = JSON.stringify(tmppoly);
  //           //需要把点转成polygon
  //           var polygonlines = convertPolygon(tmppoly);
  //           tmppoly = WqMapLib.WqGeoUtils.addContainPoint(overlays[i],polygonlines);
  //       }

  //       var tmp = JSON.stringify(tmppoly);
  //       tmppoly = WqMapLib.WqGeoUtils.removeContainPoint(overlays[i],tmppoly);
  //       while( JSON.stringify(tmppoly) != tmp){
  //           tmp = JSON.stringify(tmppoly)
  //           tmppoly = WqMapLib.WqGeoUtils.removeContainPoint(overlays[i],tmppoly);
  //       }

  //       //开始判断oldline是否有点在newline中
  //       newlay = convertPolygon(tmppoly);
  //   }
  //   overlays.push(newlay);
  //   if (canViewAll == '0' && redMap.values().length > 0) { // 红色区域取并集
  //       var overlays = redMap.values();
  //       for (var i = 0; i < overlays.length; i++) {
  //           var pa = [];
  //           pa.push(overlays[i].so);
  //           var pb = [];
  //           pb.push(newlay.so);
  //           var paa = new Array();

  //           paa['_latlngs'] = pa;
  //           var pbb = new Array();
  //           pbb['_latlngs'] = pb;
  //           var tmppoly = greinerHormann.intersection(paa, pbb);
  //           if (tmppoly) {
  //               newlay = pointsToPolygon(tmppoly);
  //           }
  //       }
  //   }
  //   map.removeOverlay(overlay);
  //   var id = 'blue-' + new Date().getTime(), pg = polygon(newlay.so, '#0c8eff');
  //   grayMap.put(id, pg);
  //   blueMap.put(id, pg);
  //   addContextMenu(id, pg);
  // }
  // 绘制省市区域
  s.drawBoundary = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {area: '江苏省南京市建邺区', styleOptions: {}, onSuccess: func(), onError: func()}
    var boundary = new BMap.Boundary();
    if (!options.area) {
      console.warn('请传入area, 例如“江苏省南京市建邺区”');
      options.onError && options.onError('请传入area, 例如“江苏省南京市建邺区”');
      return;
    }
    boundary.get(options.area, function (res) {
      // 获取行政区域
      var count = res.boundaries.length; // 行政区域的点有多少个
      if (count === 0) {
        console.warn('未能获取当前输入行政区域');
        options.onError && options.onError('未能获取当前输入行政区域');
        return;
      }
      var polygons = [];
      var polygonsPath = [];
      for (var i = 0; i < count; i++) {
        polygons[i] = new BMap.Polygon(res.boundaries[i], options.styleOptions || s.params.styleOptions);
        s.map.addOverlay(polygons[i]); // 添加覆盖物
        polygonsPath = polygonsPath.concat(polygons[i].getPath());
      }
      // s.map.setViewport(pointArray) //调整视野
      options.onSuccess && options.onSuccess((0, _extends3.default)({}, res, { polygons: polygons, polygonsPath: polygonsPath }));
    });
    return boundary;
  };
  // 绘制多边形
  s.drawPolygon = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {polygon: Object, points: [], styleOptions: {}}
    var polygon = null;
    if (options.polygon && (0, _keys2.default)(options.polygon) && (0, _keys2.default)(options.polygon).length) {
      polygon = options.polygon;
      if (options.styleOptions) {
        // 设置多边型的边线颜色，参数为合法的CSS颜色值
        if (options.styleOptions.strokeColor) polygon.setStrokeColor(options.styleOptions.strokeColor);
        // 设置多边形边线的宽度，取值为大于等于1的整数
        if (options.styleOptions.strokeWeight) polygon.setStrokeWeight(options.styleOptions.strokeWeight);
        // 设置圆形的边线透明度，取值范围0 - 1
        if (options.styleOptions.strokeOpacity) polygon.setStrokeOpacity(options.styleOptions.strokeOpacity);
        // 设置圆形边线样式为实线或虚线，取值solid或dashed
        if (options.styleOptions.strokeStyle) polygon.setStrokeStyle(options.styleOptions.strokeStyle);
        // 设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
        if (options.styleOptions.fillColor) polygon.setFillColor(options.styleOptions.fillColor);
        // 设置矢量图标填充透明度,opacity范围0~1
        if (options.styleOptions.fillOpacity) polygon.setFillOpacity(options.styleOptions.fillOpacity);
      }
    } else if (Array.isArray(options.points) && options.points.length) {
      polygon = new BMap.Polygon(options.points, options.styleOptions || s.params.styleOptions);
    }
    if (polygon) {
      s.map.addOverlay(polygon); // 添加覆盖物
      options.onSuccess && options.onSuccess(polygon);
    } else {
      console.warn('drawPolygon: 请传入参数{polygon: {}}或者{points: []}');
      options.onError && options.onError('drawPolygon: 请传入参数{polygon: {}}或者{points: []}');
    }
    return polygon;
  };
  // 绘制Label
  s.drawLabel = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {point: {}, styleOptions: {}}
    if (!options.point) {
      console.warn('drawLabel: 请传入参数{point: }');
      options.onError && options.onError('drawLabel: 请传入参数{point: }');
      return;
    }
    var opts = {
      position: options.point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(0, 0) // 设置文本偏移量
    };
    var label = new BMap.Label((0, _stringify2.default)(options.point), opts); // 创建文本标注对象
    label.setStyle(options.styleOptions || s.params.labelStyleOptions);
    s.map.addOverlay(label);
    options.onSuccess && options.onSuccess(label);
    return label;
  };
  // 绘制标记
  s.drawMarker = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // {point: {lng: ,lat: }, styleOptions: {}}
    if (!options.point) {
      console.warn('drawMarker: 请传入参数{point: }');
      options.onError && options.onError('drawMarker: 请传入参数{point: }');
      return;
    }
    if (!options.point.lng || !options.point.lat) {
      console.warn('drawMarker: 请传入正确的参数{point: {lng: ,lat: }}');
      options.onError && options.onError('drawMarker: 请传入正确的参数{point: {lng: ,lat: }}');
      return;
    }
    var point = new BMap.Point(options.point.lng, options.point.lat);
    var marker = new BMap.Marker(point, {
      icon: new BMap.Icon(options.icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAwCAMAAABHcohdAAAAOVBMVEUAAAAMjv8Njv8NkP8Nj/8MkP8Nkf8gn/8Nj/8Njv8Mj/8Mj/8Mjv+ZmZn////n8/+Nyv8hj+8vkeUvlTkDAAAADHRSTlMA5oyFdlM8CPPZv6h2+xS8AAAAs0lEQVQ4y+2TWw6EIAxFaQUEvDOo+1/sIFEjKDSZb89vD7TpQ12wHLxzPrBVD4yacEJ6rOOGUECmjA+4MVzjEx6YqvedPwwSc4xzbZi9ftri30Rt0JgFjUTchIgKnQVqC5T7BxQpCraeMnAWeYOTENAhJMH3BJ8E1xOcLMgp5CK5J3BuVAe7t7oF7cNqoo9xN6DxWJgGRlo5aWmltZcORz69O5bXBVhWtqrFJ6PUK7zCv8IP6rMmSWrDD8kAAAAASUVORK5CYII=', new BMap.Size(16, 24), {
        imageSize: new BMap.Size(16, 24) // 设置偏移量
      })
    }, {
      offset: new BMap.Size(8, 12)
    });
    s.map.addOverlay(marker);
    options.onSuccess && options.onSuccess(marker);
    return marker;
  };
  // 添加右键菜单
  s.addContextMenu = function (overlay) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // options: {menus: [{text: '', handler: func()}]}
    if (!overlay) {
      console.warn('addContextMenu: 请传入overlay');
      options.onError && options.onError('addContextMenu: 请传入overlay');
      return;
    }
    if (!options.menus || !Array.isArray(options.menus) || !options.menus[0] || !options.menus[0].text) {
      console.warn('addContextMenu: 请传入参数{menus: [{text: \'\', handler: func()}]}');
      options.onError && options.onError('addContextMenu: 请传入参数{menus: [{text: \'\', handler: func()}]}');
      return;
    }
    var markerMenu = new BMap.ContextMenu();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
            index = _step$value[0],
            opt = _step$value[1];

        markerMenu.addItem(new BMap.MenuItem(opt.text || '菜单', function () {
          opt.handler(opt, index);
        }));
      };

      for (var _iterator = (0, _getIterator3.default)(options.menus.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    overlay.addContextMenu(markerMenu);
    return markerMenu;
  };
};

exports.default = BaiduMap;
module.exports = exports['default'];