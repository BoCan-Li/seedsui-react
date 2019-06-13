/**
* @fileoverview GeoUtils类整合外勤和百度提供的若干几何算法，用来帮助用户判断点与矩形
*/

const { BMap } = window

var GeoUtils = {};
(function () {

  /**
    * 是否是不合法的经纬度
    * @param {Point} point 含经纬度点
    * @returns {Boolean}
    */
  GeoUtils.isNullPoint = function (point) {
    var precision = 2e-10
    if ((Math.abs(point.lng) < precision) && ((Math.abs(point.lat) < precision))) {
      return true
    } else {
      return false
    }
  }

  /**
    * 是否是相同的点
    * @param {Point} start 开始点
    * @param {Point} end 开始点
    * @returns {Boolean}
    */
   GeoUtils.isPointEqual = function (start, end) {
    var precision = 2e-8
    if ((Math.abs(start.lng - end.lng) < precision) && ((Math.abs(start.lat - end.lat) < precision))) {
      return true
    } else {
      return false
    }
  }

  /**
    * 获取两个坐标间的中心点
    * @param {Point} start 开始点
    * @param {Point} end 开始点
    * @returns {Point}
    */
  GeoUtils.getMiddlePoint = function (start, end) {
    return new BMap.Point((start.lng + end.lng) / 2, (start.lat + end.lat) / 2)
  }

  /**
    * 判断两个多边形是否相交
    * @param {Overlay} overlay 覆盖物
    * @returns {Boolean}
    */
  GeoUtils.isSelfInter = function (overlay) {
    var newLine = GeoUtils.overlayToLine(overlay.so)
    for (var i = 0; i < newLine.length; i++) {
      for (var j = i + 1; j < newLine.length; j++) {
        var crossPoint = GeoUtils.segmentsSelfing(newLine[i].start, newLine[i].end, newLine[j].start, newLine[j].end)
        if (crossPoint) { // 是否有相交点*
          return true
        }
      }
    }
    return false
  }

  /**
    * 求两条线段所在直线的交点, 再判断交点是否在两条线段上.
    * 求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
    * 然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
    * @param {Point} a
    * @param {Point} b
    * @param {Point} c
    * @param {Point} d
    * @returns {BPoint, Boolean} 返回相交点, 没有相交, 则返回false
    */
  GeoUtils.segmentsIntr = function (a, b, c, d) { /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng)
    if (denominator === 0) {
      return false
    }
    // 线段所在直线的交点坐标 (lat , lng)
    var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng) + (b.lng - a.lng) * (d.lat - c.lat) * a.lat - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator
    var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat) + (b.lat - a.lat) * (d.lng - c.lng) * a.lng - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator

    /** 2 判断交点是否在两条线段上 **/
    if (
      // 交点在线段1上
      (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
      // 且交点也在线段2上
      && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0) {
      // 返回交点p
      return new BMap.Point(lng, lat)
    }
    // 否则不相交
    return false
  }


  /**
    * 求两条线段所在直线的交点, 再判断交点是否在两条线段上.
    * 求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
    * 然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
    * @param {Point} a
    * @param {Point} b
    * @param {Point} c
    * @param {Point} d
    * @returns {BPoint, Boolean} 返回相交点, 没有相交, 则返回false
    */
  GeoUtils.segmentsSelfing = function (a, b, c, d) {
    if (GeoUtils.onSegment(a, b, c)) {
      return false
    }
    if (GeoUtils.onSegment(a, b, d)) {
      return false
    }
    if (GeoUtils.onSegment(c, d, a)) {
      return false
    }
    if (GeoUtils.onSegment(c, d, b)) {
      return false
    }
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng)
    if (denominator === 0) {
      return false
    }
    // 线段所在直线的交点坐标 (lat , lng)
    var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng)
      + (b.lng - a.lng) * (d.lat - c.lat) * a.lat
      - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator
    var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat)
      + (b.lat - a.lat) * (d.lng - c.lng) * a.lng
      - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator
    
    /** 2 判断交点是否在两条线段上 **/
    if (
      // 交点在线段1上
      (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
      // 且交点也在线段2上
      && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0
    ) {
      // 返回交点p
      return true
    }
    // 否则不相交
    return false
  }

  /**
    * 获取一个线段与多边形的相交点
    * @param {Point} start 点
    * @param {Point} end 点
    * @param {Overlay} overlay 覆盖物
    * @returns {Boolean}
    */
  GeoUtils.getCrossPoint = function (start, end, overlay) {
    var oldline = GeoUtils.overlayToLine(overlay.so)
    for (var i = 0; i < oldline.length; i++) {
      var crossPoint = GeoUtils.segmentsIntr(start, end, oldline[i].start, oldline[i].end)
      if (crossPoint) {
        break
      }
    }
    return crossPoint
  }


  /**
    * 线段是否相交
    * @param {Point} segA 多边形对象
    * @param {Point} segB 多边形对象
    * @returns {Boolean}
    */
  GeoUtils.isSegmentsIntersectant = function (segA, segB) {
    const abc = (segA[0].lat - segB[0].lat) * (segA[1].lng - segB[0].lng) - (segA[0].lng - segB[0].lng) * (segA[1].lat - segB[0].lat)
    const abd = (segA[0].lat - segB[1].lat) * (segA[1].lng - segB[1].lng) - (segA[0].lng - segB[1].lng) * (segA[1].lat - segB[1].lat)
    if (abc * abd >= 0) {
      return false
    }
    const cda = (segB[0].lat - segA[0].lat) * (segB[1].lng - segA[0].lng) - (segB[0].lng - segA[0].lng) * (segB[1].lat - segA[0].lat)
    const cdb = cda + abc - abd
    return !(cda * cdb >= 0)
  }

  /**
    * 点集合转线
    * @param {Array<Point>} arr 点集合
    * @returns {Line}
    */
  GeoUtils.overlayToLine = function (arr) {
    var lines = []
    for (var i = 0; i < arr.length - 1; i++) {
      lines.push({
        start: arr[i],
        end: arr[i + 1]
      })
    }
    lines.push({
      start: arr[arr.length - 1],
      end: arr[0]
    })
    return lines
  }
  

  /**
    * 计算两个多边形相交并去掉一个点, 使用
    * @param {Polygon} oldpoly 多边形对象
    * @param {Polygon} newpoly 多边形对象
    * @returns {Array} 返回newpoly的新的点
    */
  GeoUtils.removeContainPoint = function (oldpoly, newpoly) {
    // 开始判断newpoly是否有点在oldpoly中，这种情况包括两个互相包含的情况
    var inpoly = false
    for (var i = 0; i < newpoly.length; i++) {
      if (GeoUtils.isPointInPolygon(newpoly[i], oldpoly)) {
        inpoly = true
        break
      }
    }
    if (!inpoly) {
      // 开始处理共线情况
      var arr = newpoly
      var ft = arr[0]
      var lt = arr[arr.length - 1]
      arr.push(ft)
      arr.splice(0, 0, lt)

      var arrt = []
      for (i = 1; i <= arr.length - 2; i++) {
        if ((GeoUtils.isPointOnPolygon(arr[i - 1], oldpoly)) && (GeoUtils.isPointOnPolygon(arr[i + 1], oldpoly)) && (GeoUtils.isPointOnPolygon(arr[i], oldpoly))) {
          if ((GeoUtils.isPointInPolygon(GeoUtils.getMiddlePoint(arr[i + 1], arr[i]), oldpoly)) || (GeoUtils.isPointInPolygon(GeoUtils.getMiddlePoint(arr[i - 1], arr[i]), oldpoly))) {
            //
          } else {
            arrt.push(arr[i])
          }
        } else {
          arrt.push(arr[i])
        }
      }
      // 去重
      for (i = arrt.length - 1; i > 0; i--) {
        if (arrt[i] === arrt[i - 1]) {
          arrt.splice(i, 1)
        }
      }
      if (arrt[arrt.length - 1] === arrt[0]) {
        arrt.splice(0, 1)
      }
      return arrt
    }
    // 遍历确保第一个不在多边形之内
    var step = newpoly.length
    var sp = 0
    while (sp < step) {
      sp++
      if (GeoUtils.isPointInPolygon(newpoly[0], oldpoly)) {
        newpoly.push(newpoly[0])
        newpoly.splice(0, 1)
      } else {
        break
      }
    }

    arr = []
    for (i = 0; i < newpoly.length; i++) {
      if (GeoUtils.isPointInPolygon(newpoly[i], oldpoly)) {
        // 有一个点在多边形内,这时候取上下两个点，根据上下两个点的情况来去掉当前点
        var lastpointindex = i - 1
        if (lastpointindex < 0) {
          lastpointindex = newpoly.length - 1
        }
        var nextpointindex = i + 1
        if (nextpointindex >= newpoly.length) {
          nextpointindex = 0
        }
        var lastcrossPoint = GeoUtils.getCrossPoint(newpoly[lastpointindex], newpoly[i], oldpoly)
        var nextcrossPoint = GeoUtils.getCrossPoint(newpoly[i], newpoly[nextpointindex], oldpoly)
        if (lastcrossPoint) { // 上一个点存在交点
          if (nextcrossPoint) { // 下一个也存在交点,需要把当前点用两个点替换
            if ((GeoUtils.isPointOnPolygon(newpoly[lastpointindex], oldpoly)) && (GeoUtils.isPointOnPolygon(newpoly[nextpointindex], oldpoly))) {
              // arr.push(lastcrossPoint)
            } else {
              arr.push(lastcrossPoint)
              arr.push(nextcrossPoint)
            }
          } else { // 上一个点存在交点，下一个点不存在交点
            arr.push(lastcrossPoint)
          }
        } else { // 上一个点不存在交点，
          if (nextcrossPoint) { //下一个点存在交点
            arr.push(nextcrossPoint)
          } else { // 都不存在交点
            // 去掉这个点，什么都不做
          }
        }
        for (var j = i + 1; j < newpoly.length; j++) {
          arr.push(newpoly[j])
        }
        break
      } else {
        arr.push(newpoly[i])
      }
    }

    // 去重
    // 去掉异常点
    for (i = arr.length - 1; i > 0; i--) {
      if (GeoUtils.isNullPoint(arr[i])) {
        arr.splice(i, 1)
      }
    }
    // 去重
    for (i = arr.length - 1; i > 0; i--) {
      if (GeoUtils.isPointEqual(arr[i], arr[i - 1])) {
        arr.splice(i, 1)
      }
    }

    if (GeoUtils.isPointEqual(arr[arr.length - 1], arr[0])) {
      arr.splice(0, 1)
    }
    return arr
  }


  /**
    * 判断点是否多边形的顶点或者边上
    * @param {Point} point
    * @param {Polygon} polygon
    * @returns {Boolean}
    */
  GeoUtils.isPointOnPolygon = function (point, polygon) {
    // 检查类型
    if (!(point instanceof BMap.Point) || !(polygon instanceof BMap.Polygon)) {
      return false
    }
    // 首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
    var polygonBounds = polygon.getBounds()
    if (!GeoUtils.isPointInRect(point, polygonBounds)) {
      return false
    }
    var pts = polygon.getPath() // 获取多边形点
    // 下述代码来源：http:// paulbourke.net/geometry/insidepoly/，进行了部分修改
    // 基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
    // 在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
    /* eslint-disable */
    var N = pts.length
    var boundOrVertex = true // 如果点位于多边形的顶点或边上，不算做点在多边形内，直接返回false
    var intersectCount = 0// cross points count of x
    var precision = 2e-10 // 浮点类型计算时候与0比较时候的容差
    var p1, p2// neighbour bound vertices
    var p = point // 测试点

    p1 = pts[0] // left vertex
    for (var i = 1; i <= N; ++i) { // check all rays
      if (p.equals(p1)) {
        return boundOrVertex // p is an vertex
      }
      p2 = pts[i % N] // right vertex
      if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) { // ray is outside of our interests
        p1 = p2
        continue // next ray left point
      }
      if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) { // ray is crossing over by the algorithm (common part of)
        if (p.lng <= Math.max(p1.lng, p2.lng)) { // x is before of ray
          if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) { // overlies on a horizontal ray
            return boundOrVertex
          }

          if (p1.lng == p2.lng) { // ray is vertical
            if (p1.lng == p.lng) { // overlies on a vertical ray
              return boundOrVertex
            } else { // before ray
              ++intersectCount
            }
          } else { // cross point on the left side
            var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng // cross point of lng
            if (Math.abs(p.lng - xinters) < precision) { // overlies on a ray
              return boundOrVertex
            }

            if (p.lng < xinters) { // before ray
              ++intersectCount
            }
          }
        }
      } else { // special case when ray is crossing through the vertex
        if (p.lat == p2.lat && p.lng <= p2.lng) {// p crossing over p2
          var p3 = pts[(i + 1) % N] // next vertex
          if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) { // p.lat lies between p1.lat & p3.lat
            ++intersectCount
          } else {
            intersectCount += 2
          }
        }
      }
      p1 = p2 // next ray left point
    }
    /* eslint-enable */
    if (intersectCount % 2 === 0) { // 偶数在多边形外
      return false
    } else { // 奇数在多边形内
      return false
    }
  }



  /**
    * 判断点是否在线上
    * @param {Point} curPt
    * @param {Point} nextPt
    * @param {Point} point
    * @returns {Boolean}
    */
  GeoUtils.onSegment = function (curPt, nextPt, point) {
    // 首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
    if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) && point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
      // 判断点是否在直线上公式
      var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - (nextPt.lng - point.lng) * (curPt.lat - point.lat)
      if (precision < 2e-10 && precision > -2e-10) { // 实质判断是否接近0
        return true
      }
    }
    return false
  }

  

  /**
    * 判断点是否多边形内
    * @param {Point} point 点对象
    * @param {Array<Point>} points 多边形的点
    * @returns {Boolean} 点在多边形内返回true,否则返回false
    */
  GeoUtils.isPointInPolygon = function (argPoint = {}, argPoints = []) {
    if (!argPoint.lng || !argPoint.lat || !Array.isArray(argPoints)) {
      return false
    }
    var point = [argPoint.lng, argPoint.lat];
    var vs = [];
    for (var po of argPoints) {
      if (!po.lng || !po.lat) return false;
      vs.push([po.lng, po.lat]);
    }
    // 以下代码来自
    // https://github.com/substack/point-in-polygon

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];

      var intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
    * 判断两个多边形是否包含
    * @param {Array<Point>} points 多边形的点
    * @param {Array<Point>} points 多边形的点
    * @returns {Boolean}
    */
   GeoUtils.contains = function (insidePoints, outsidePoints) {
    var contains = 0
    for (var i = 0; i < insidePoints.length; i++) {
      if (GeoUtils.isPointInPolygon(insidePoints[i], outsidePoints)) {
        contains++
      } else {
        break
      }
    }
    if (contains === insidePoints.length) {
      return true
    }
    return false
  }
})();

export default GeoUtils
