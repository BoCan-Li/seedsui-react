"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* @fileoverview GeoUtils类提供若干几何算法，用来帮助用户判断点与矩形、
* 圆形、多边形线、多边形面的关系,并提供计算折线长度和多边形的面积的公式。 从地球半径开始为百度地图，上面是自己封装的
* 地址http://api.map.baidu.com/library/GeoUtils/1.2/docs/symbols/src/BMapLib_GeoUtils.js.html
* 基于Baidu Map API 1.2。
*
* @author Baidu Map Api Group 
* @version 1.2
*/

var GeoUtils = window.GeoUtils = GeoUtils || {};
(function () {
  /**
    * 计算两个多边形相交并添加点
    * @param {Polygon} oldpoly 多边形对象
    * @param {Polygon} newpoly 多边形对象
    * @returns {Array} 返回newpoly的新的点
    */
  GeoUtils.addContainPoint = function (oldpoly, newpoly) {
    // 开始判断oldpoly是否有点在newpoly中，并添加相应的点
    var arr = [];
    var oldpoints = oldpoly.so;
    var inpoly = false;
    for (var i = 0; i < oldpoints.length; i++) {
      if (GeoUtils.isPointInPolygon(oldpoints[i], newpoly)) {
        inpoly = true;
        break;
      }
    }
    if (!inpoly) {
      return newpoly.so;
    }

    for (var i = 0; i < oldpoints.length; i++) {
      if (GeoUtils.isPointInPolygon(oldpoints[i], newpoly)) {
        // 有一个点在多边形内,这时候需要找到前后两个交点，然后添加点
        // 向上找到一个不在多边形内的点，
        var innipoints = [];
        var mlastindex = 0;
        innipoints.push(oldpoints[i]);
        for (var j = i - 1; j > -oldpoints.length; j--) {
          var mlastindex = j;
          if (j < 0) {
            mlastindex = oldpoints.length + j;
          }
          if (!GeoUtils.isPointInPolygon(oldpoints[mlastindex], newpoly)) {
            innipoints.splice(0, 0, oldpoints[mlastindex]);
            break;
          } else {
            innipoints.splice(0, 0, oldpoints[mlastindex]);
          }
        }
        // 向下找到一个不在多边形内的点，
        var mnextindex = 0;
        for (var j = i + 1; j < i + oldpoints.length; j++) {
          var mnextindex = j;
          if (j >= oldpoints.length) {
            mnextindex = j - oldpoints.length;
          }
          if (!GeoUtils.isPointInPolygon(oldpoints[mnextindex], newpoly)) {
            innipoints.push(oldpoints[mnextindex]);
            break;
          } else {
            innipoints.push(oldpoints[mnextindex]);
          }
        }

        var lastcrossPoint = GeoUtils.getCrossPoint(innipoints[0], innipoints[1], newpoly);
        var nextcrossPoint = GeoUtils.getCrossPoint(innipoints[innipoints.length - 2], innipoints[innipoints.length - 1], newpoly);
        innipoints.splice(0, 1, lastcrossPoint);
        innipoints.splice(innipoints.length - 1, 1, nextcrossPoint);
        //已经找到所有的点，等待替换
        var tnewpoints = [];
        for (var t = 0; t < newpoly.so.length; t++) {
          tnewpoints.push(newpoly.so[t]);
        }
        //遍历确保第一个不在多边形之内
        var step = tnewpoints.length;
        var sp = 0;
        while (sp < step) {
          sp++;
          if (GeoUtils.isPointInPolygon(tnewpoints[0], oldpoly)) {
            tnewpoints.push(tnewpoints[0]);
            tnewpoints.splice(0, 1);
          } else {
            break;
          }
        }
        tnewpoints.push(tnewpoints[0]);
        for (var t = 0; t < tnewpoints.length; t++) {
          if (!(tnewpoints[t] && tnewpoints[t + 1])) {
            continue;
          }
          var crossPoint = GeoUtils.onSegment(tnewpoints[t], tnewpoints[t + 1], innipoints[0]);
          if (crossPoint) {
            //找到第一个交点，判断那个点在之外
            if (GeoUtils.isPointInPolygon(tnewpoints[t], oldpoly)) {
              //第一个点在多边形内
              if (GeoUtils.isPointInPolygon(tnewpoints[t + 1], oldpoly)) {//第二个点也在多边形内，不可能

              } else {
                //第一个在多边形内，第二个在多边形外
                //反方向添加数据
                //添加数据之前需要把在多边形内的点先删掉
                for (var tp = arr.length - 1; tp >= 0; tp--) {
                  if (GeoUtils.isPointInPolygon(arr[tp], oldpoly)) {
                    arr.splice(tp, 1);
                  } else {
                    break;
                  }
                }
                for (var tp = innipoints.length - 1; tp >= 0; tp--) {
                  arr.push(innipoints[tp]);
                }
                var out = false;
                for (var findex = t + 1; findex < tnewpoints.length - 1; findex++) {

                  if (!out && GeoUtils.isPointInPolygon(tnewpoints[findex], oldpoly)) {} else {
                    out = true;
                    arr.push(tnewpoints[findex]);
                  }
                }
                break;
              }
            } else {
              if (GeoUtils.isPointInPolygon(tnewpoints[t + 1], oldpoly)) {
                //第一个点在多边形外，第二个在多边形内
                arr.push(tnewpoints[t]);
                for (var tp = 0; tp < innipoints.length; tp++) {
                  arr.push(innipoints[tp]);
                }
                var out = false;
                for (var findex = t + 1; findex < tnewpoints.length - 1; findex++) {

                  if (!out && GeoUtils.isPointInPolygon(tnewpoints[findex], oldpoly, false)) {} else {
                    out = true;
                    arr.push(tnewpoints[findex]);
                  }
                }
                break;
              } else {
                //两个都在多边形外
                arr.push(tnewpoints[t]);
                if (GeoUtils.getDistance(tnewpoints[t], innipoints[0]) < GeoUtils.getDistance(tnewpoints[t], innipoints[innipoints.length - 1])) {
                  for (var tp = 0; tp < innipoints.length; tp++) {
                    arr.push(innipoints[tp]);
                  }
                } else {
                  for (var tp = innipoints.length - 1; tp >= 0; tp--) {
                    arr.push(innipoints[tp]);
                  }
                }
                for (var findex = t + 1; findex < tnewpoints.length - 1; findex++) {
                  arr.push(tnewpoints[findex]);
                }
                break;
              }
            }
          } else {
            arr.push(tnewpoints[t]);
          }
        }
        break;
      }
    }
    return arr;
  };

  /**
   * 计算两个多边形相交并去掉一个点
   */
  GeoUtils.removeContainPoint = function (oldpoly, newpoly) {
    //开始判断newpoly是否有点在oldpoly中，这种情况包括两个互相包含的情况
    var inpoly = false;
    for (var i = 0; i < newpoly.length; i++) {
      if (GeoUtils.isPointInPolygon(newpoly[i], oldpoly)) {
        inpoly = true;
        break;
      }
    }
    if (!inpoly) {
      //开始处理共线情况
      var arr = newpoly;
      var ft = arr[0];
      var lt = arr[arr.length - 1];
      arr.push(ft);
      arr.splice(0, 0, lt);

      var arrt = [];
      for (var i = 1; i <= arr.length - 2; i++) {
        if (GeoUtils.isPointOnPolygon(arr[i - 1], oldpoly) && GeoUtils.isPointOnPolygon(arr[i + 1], oldpoly) && GeoUtils.isPointOnPolygon(arr[i], oldpoly)) {
          if (GeoUtils.isPointInPolygon(GeoUtils.getMiddlePoint(arr[i + 1], arr[i]), oldpoly) || GeoUtils.isPointInPolygon(GeoUtils.getMiddlePoint(arr[i - 1], arr[i]), oldpoly)) {
            //{
          } else {
            arrt.push(arr[i]);
          }
        } else {
          arrt.push(arr[i]);
        }
      }

      return arrt;
    }
    //遍历确保第一个不在多边形之内
    var step = newpoly.length;
    var sp = 0;
    while (sp < step) {
      sp++;
      if (GeoUtils.isPointInPolygon(newpoly[0], oldpoly)) {
        newpoly.push(newpoly[0]);
        newpoly.splice(0, 1);
      } else {
        break;
      }
    }

    var arr = [];
    for (var i = 0; i < newpoly.length; i++) {
      if (GeoUtils.isPointInPolygon(newpoly[i], oldpoly)) {
        // 有一个点在多边形内,这时候取上下两个点，根据上下两个点的情况来去掉当前点
        var lastpointindex = i - 1;
        if (lastpointindex < 0) {
          lastpointindex = newpoly.length - 1;
        }
        var nextpointindex = i + 1;
        if (nextpointindex >= newpoly.length) {
          nextpointindex = 0;
        }
        var lastcrossPoint = GeoUtils.getCrossPoint(newpoly[lastpointindex], newpoly[i], oldpoly);
        var nextcrossPoint = GeoUtils.getCrossPoint(newpoly[i], newpoly[nextpointindex], oldpoly);
        if (lastcrossPoint) {
          //上一个点存在交点
          if (nextcrossPoint) {
            //下一个也存在交点,需要把当前点用两个点替换
            if (GeoUtils.isPointOnPolygon(newpoly[lastpointindex], oldpoly) && GeoUtils.isPointOnPolygon(newpoly[nextpointindex], oldpoly)) {
              //arr.push(lastcrossPoint)
            } else {
              arr.push(lastcrossPoint);
              arr.push(nextcrossPoint);
            }
          } else {
            //上一个点存在交点，下一个点不存在交点
            arr.push(lastcrossPoint);
          }
        } else {
          //上一个点不存在交点，
          if (nextcrossPoint) {
            //下一个点存在交点
            arr.push(nextcrossPoint);
          } else {//都不存在交点
            //去掉这个点，什么都不做
          }
        }
        for (var j = i + 1; j < newpoly.length; j++) {
          arr.push(newpoly[j]);
        }
        break;
      } else {
        arr.push(newpoly[i]);
      }
    }

    //去重
    for (var i = arr.length - 1; i > 0; i--) {
      if (arr[i] == arr[i - 1]) {
        arr.splice(i, 1);
      }
    }
    if (arr[arr.length - 1] == arr[0]) {
      arr.splice(0, 1);
    }
    return arr;
  };

  GeoUtils.getMiddlePoint = function (start, end) {
    return new BMap.Point((start.lng + end.lng) / 2, (start.lat + end.lat) / 2);
  };

  GeoUtils.isContainer = function (oldpoly, newpoly) {
    var container = 0;
    for (var i = 0; i < newpoly.so.length; i++) {
      if (WqMapLib.GeoUtils.isPointInPolygon(newpoly.so[i], oldpoly)) {
        container++;
      } else {
        break;
      }
    }
    if (container == newpoly.so.length) {
      return true;
    }
    container = 0;
    for (var i = 0; i < oldpoly.so.length; i++) {
      if (WqMapLib.GeoUtils.isPointInPolygon(oldpoly.so[i], newpoly)) {
        container++;
      } else {
        break;
      }
    }
    if (container == oldpoly.so.length) {
      return true;
    }
  };

  /**
   *  判断是否自相交
   */
  GeoUtils.isSelfInter = function (overlay) {
    var newLine = GeoUtils.overlayToLine(overlay.so);
    for (var i = 0; i < newLine.length; i++) {
      for (var j = i + 1; j < newLine.length; j++) {
        var crossPoint = GeoUtils.segmentsSelfing(newLine[i].start, newLine[i].end, newLine[j].start, newLine[j].end);
        if (crossPoint) {
          // 是否有相交点*
          return true;
        }
      }
    }
    return false;
  };

  /**
   * 获取一个线段与多边形的相交点
   */
  GeoUtils.getCrossPoint = function (start, end, overlay) {
    var oldline = GeoUtils.overlayToLine(overlay.so);
    for (var i = 0; i < oldline.length; i++) {
      var crossPoint = GeoUtils.segmentsIntr(start, end, oldline[i].start, oldline[i].end);
      if (crossPoint) {
        break;
      }
    }
    return crossPoint;
  };

  /**
   * 点集合转线
   */
  GeoUtils.overlayToLine = function (arr) {
    var lines = [];
    for (var i = 0; i < arr.length - 1; i++) {
      lines.push({
        start: arr[i],
        end: arr[i + 1]
      });
    }
    lines.push({
      start: arr[arr.length - 1],
      end: arr[0]
    });
    return lines;
  };

  /**
   * 判断点是否在矩形内
   */
  GeoUtils.isPointInRect = function (point, bounds) {
    //检查类型是否正确
    if (!(point instanceof BMap.Point) || !(bounds instanceof BMap.Bounds)) {
      return false;
    }
    var sw = bounds.getSouthWest(); //西南脚点
    var ne = bounds.getNorthEast(); //东北脚点
    return point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat;
  };

  /**
   *  判断点是否多边形的顶点或者边上
   */
  GeoUtils.isPointOnPolygon = function (point, polygon) {
    //检查类型
    if (!(point instanceof BMap.Point) || !(polygon instanceof BMap.Polygon)) {
      return false;
    }
    //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
    var polygonBounds = polygon.getBounds();
    if (!GeoUtils.isPointInRect(point, polygonBounds)) {
      return false;
    }
    var pts = polygon.getPath(); //获取多边形点
    //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
    //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
    //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。
    var N = pts.length;
    var boundOrVertex = true; //如果点位于多边形的顶点或边上，不算做点在多边形内，直接返回false
    var intersectCount = 0; //cross points count of x
    var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
    var p1, p2; //neighbour bound vertices
    var p = point; //测试点

    p1 = pts[0]; //left vertex
    for (var i = 1; i <= N; ++i) {
      //check all rays
      if (p.equals(p1)) {
        return boundOrVertex; //p is an vertex
      }
      p2 = pts[i % N]; //right vertex
      if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) {
        //ray is outside of our interests
        p1 = p2;
        continue; //next ray left point
      }
      if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) {
        //ray is crossing over by the algorithm (common part of)
        if (p.lng <= Math.max(p1.lng, p2.lng)) {
          //x is before of ray
          if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) {
            //overlies on a horizontal ray
            return boundOrVertex;
          }

          if (p1.lng == p2.lng) {
            //ray is vertical
            if (p1.lng == p.lng) {
              //overlies on a vertical ray
              return boundOrVertex;
            } else {
              //before ray
              ++intersectCount;
            }
          } else {
            //cross point on the left side
            var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng; //cross point of lng
            if (Math.abs(p.lng - xinters) < precision) {
              //overlies on a ray
              return boundOrVertex;
            }

            if (p.lng < xinters) {
              //before ray
              ++intersectCount;
            }
          }
        }
      } else {
        //special case when ray is crossing through the vertex
        if (p.lat == p2.lat && p.lng <= p2.lng) {
          //p crossing over p2
          var p3 = pts[(i + 1) % N]; //next vertex
          if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) {
            //p.lat lies between p1.lat & p3.lat
            ++intersectCount;
          } else {
            intersectCount += 2;
          }
        }
      }
      p1 = p2; //next ray left point
    }
    if (intersectCount % 2 == 0) {
      //偶数在多边形外
      return false;
    } else {
      //奇数在多边形内
      return false;
    }
  };

  /**
   *  判断点是否在线上
   */
  GeoUtils.onSegment = function (curPt, nextPt, point) {
    // 首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
    if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) && point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
      // 判断点是否在直线上公式
      var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - (nextPt.lng - point.lng) * (curPt.lat - point.lat);
      if (precision < 2e-10 && precision > -2e-10) {
        // 实质判断是否接近0
        return true;
      }
    }
    return false;
  };

  /**
   *求两条线段所在直线的交点, 再判断交点是否在两条线段上.
   *求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
   *然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
   */
  GeoUtils.segmentsIntr = function (a, b, c, d) {
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng);
    if (denominator == 0) {
      return false;
    }
    // 线段所在直线的交点坐标 (lat , lng)
    var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng) + (b.lng - a.lng) * (d.lat - c.lat) * a.lat - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator;
    var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat) + (b.lat - a.lat) * (d.lng - c.lng) * a.lng - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator;

    /** 2 判断交点是否在两条线段上 **/
    if (
    // 交点在线段1上
    (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
    // 且交点也在线段2上
    && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0) {
      // 返回交点p
      return new BMap.Point(lng, lat);
    }
    //否则不相交
    return false;
  };

  /**
   *求两条线段所在直线的交点, 再判断交点是否在两条线段上.
   *求直线交点时 可通过直线的一般方程 ax+by+c=0 求得
   *然后根据交点的与线段端点的位置关系来判断交点是否在线段上.
   */
  GeoUtils.segmentsSelfing = function (a, b, c, d) {
    if (GeoUtils.onSegment(a, b, c)) {
      return false;
    }
    if (GeoUtils.onSegment(a, b, d)) {
      return false;
    }
    if (GeoUtils.onSegment(c, d, a)) {
      return false;
    }
    if (GeoUtils.onSegment(c, d, b)) {
      return false;
    }
    /** 1 解线性方程组, 求线段交点. **/
    // 如果分母为0 则平行或共线, 不相交
    var denominator = (b.lng - a.lng) * (d.lat - c.lat) - (a.lat - b.lat) * (c.lng - d.lng);
    if (denominator == 0) {
      return false;
    }
    // 线段所在直线的交点坐标 (lat , lng)
    var lat = ((b.lat - a.lat) * (d.lat - c.lat) * (c.lng - a.lng) + (b.lng - a.lng) * (d.lat - c.lat) * a.lat - (d.lng - c.lng) * (b.lat - a.lat) * c.lat) / denominator;
    var lng = -((b.lng - a.lng) * (d.lng - c.lng) * (c.lat - a.lat) + (b.lat - a.lat) * (d.lng - c.lng) * a.lng - (d.lat - c.lat) * (b.lng - a.lng) * c.lng) / denominator;

    /** 2 判断交点是否在两条线段上 **/
    if (
    // 交点在线段1上
    (lat - a.lat) * (lat - b.lat) <= 0 && (lng - a.lng) * (lng - b.lng) <= 0
    // 且交点也在线段2上
    && (lat - c.lat) * (lat - d.lat) <= 0 && (lng - c.lng) * (lng - d.lng) <= 0) {
      // 返回交点p
      return true;
    }
    //否则不相交
    return false;
  };

  /**
   * 线段是否相交
   * seg: [{ lat: xxx, lng: xxx }, { lat: xxx, lng: xxx }]
   * */
  GeoUtils.isSegmentsIntersectant = function (segA, segB) {
    var abc = (segA[0].lat - segB[0].lat) * (segA[1].lng - segB[0].lng) - (segA[0].lng - segB[0].lng) * (segA[1].lat - segB[0].lat);
    var abd = (segA[0].lat - segB[1].lat) * (segA[1].lng - segB[1].lng) - (segA[0].lng - segB[1].lng) * (segA[1].lat - segB[1].lat);
    if (abc * abd >= 0) {
      return false;
    }
    var cda = (segB[0].lat - segA[0].lat) * (segB[1].lng - segA[0].lng) - (segB[0].lng - segA[0].lng) * (segB[1].lat - segA[0].lat);
    var cdb = cda + abc - abd;
    return !(cda * cdb >= 0);
  };

  /**
    * 地球半径
    */
  var EARTHRADIUS = 6370996.81;

  /**
    * 判断点是否在矩形内
    * @param {Point} point 点对象
    * @param {Bounds} bounds 矩形边界对象
    * @returns {Boolean} 点在矩形内返回true,否则返回false
    */
  GeoUtils.isPointInRect = function (point, bounds) {
    //检查类型是否正确
    if (!(point instanceof BMap.Point) || !(bounds instanceof BMap.Bounds)) {
      return false;
    }
    var sw = bounds.getSouthWest(); //西南脚点
    var ne = bounds.getNorthEast(); //东北脚点
    return point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat;
  };

  /**
    * 判断点是否在圆形内
    * @param {Point} point 点对象
    * @param {Circle} circle 圆形对象
    * @returns {Boolean} 点在圆形内返回true,否则返回false
    */
  GeoUtils.isPointInCircle = function (point, circle) {
    //检查类型是否正确
    if (!(point instanceof BMap.Point) || !(circle instanceof BMap.Circle)) {
      return false;
    }

    //point与圆心距离小于圆形半径，则点在圆内，否则在圆外
    var c = circle.getCenter();
    var r = circle.getRadius();

    var dis = GeoUtils.getDistance(point, c);
    if (dis <= r) {
      return true;
    } else {
      return false;
    }
  };

  /**
    * 判断点是否在折线上
    * @param {Point} point 点对象
    * @param {Polyline} polyline 折线对象
    * @returns {Boolean} 点在折线上返回true,否则返回false
    */
  GeoUtils.isPointOnPolyline = function (point, polyline) {
    //检查类型
    if (!(point instanceof BMap.Point) || !(polyline instanceof BMap.Polyline)) {
      return false;
    }

    //首先判断点是否在线的外包矩形内，如果在，则进一步判断，否则返回false
    var lineBounds = polyline.getBounds();
    if (!this.isPointInRect(point, lineBounds)) {
      return false;
    }

    //判断点是否在线段上，设点为Q，线段为P1P2 ，
    //判断点Q在该线段上的依据是：( Q - P1 ) × ( P2 - P1 ) = 0，且 Q 在以 P1，P2为对角顶点的矩形内
    var pts = polyline.getPath();
    for (var i = 0; i < pts.length - 1; i++) {
      var curPt = pts[i];
      var nextPt = pts[i + 1];
      //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
      if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) && point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
        //判断点是否在直线上公式
        var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) - (nextPt.lng - point.lng) * (curPt.lat - point.lat);
        if (precision < 2e-10 && precision > -2e-10) {
          //实质判断是否接近0
          return true;
        }
      }
    }

    return false;
  };

  /**
    * 判断点是否多边形内
    * @param {Point} point 点对象
    * @param {Polyline} polygon 多边形对象
    * @returns {Boolean} 点在多边形内返回true,否则返回false
    */
  GeoUtils.isPointInPolygon = function (point, polygon) {
    //检查类型
    if (!(point instanceof BMap.Point) || !(polygon instanceof BMap.Polygon)) {
      return false;
    }

    //首先判断点是否在多边形的外包矩形内，如果在，则进一步判断，否则返回false
    var polygonBounds = polygon.getBounds();
    if (!this.isPointInRect(point, polygonBounds)) {
      return false;
    }

    var pts = polygon.getPath(); //获取多边形点

    //下述代码来源：http://paulbourke.net/geometry/insidepoly/，进行了部分修改
    //基本思想是利用射线法，计算射线与多边形各边的交点，如果是偶数，则点在多边形外，否则
    //在多边形内。还会考虑一些特殊情况，如点在多边形顶点上，点在多边形边上等特殊情况。

    var N = pts.length;
    var boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true
    var intersectCount = 0; //cross points count of x 
    var precision = 2e-10; //浮点类型计算时候与0比较时候的容差
    var p1, p2; //neighbour bound vertices
    var p = point; //测试点

    p1 = pts[0]; //left vertex        
    for (var i = 1; i <= N; ++i) {
      //check all rays            
      if (p.equals(p1)) {
        return boundOrVertex; //p is an vertex
      }

      p2 = pts[i % N]; //right vertex            
      if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) {
        //ray is outside of our interests                
        p1 = p2;
        continue; //next ray left point
      }

      if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) {
        //ray is crossing over by the algorithm (common part of)
        if (p.lng <= Math.max(p1.lng, p2.lng)) {
          //x is before of ray                    
          if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) {
            //overlies on a horizontal ray
            return boundOrVertex;
          }

          if (p1.lng == p2.lng) {
            //ray is vertical                        
            if (p1.lng == p.lng) {
              //overlies on a vertical ray
              return boundOrVertex;
            } else {
              //before ray
              ++intersectCount;
            }
          } else {
            //cross point on the left side                        
            var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng; //cross point of lng                        
            if (Math.abs(p.lng - xinters) < precision) {
              //overlies on a ray
              return boundOrVertex;
            }

            if (p.lng < xinters) {
              //before ray
              ++intersectCount;
            }
          }
        }
      } else {
        //special case when ray is crossing through the vertex                
        if (p.lat == p2.lat && p.lng <= p2.lng) {
          //p crossing over p2                    
          var p3 = pts[(i + 1) % N]; //next vertex                    
          if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) {
            //p.lat lies between p1.lat & p3.lat
            ++intersectCount;
          } else {
            intersectCount += 2;
          }
        }
      }
      p1 = p2; //next ray left point
    }

    if (intersectCount % 2 == 0) {
      //偶数在多边形外
      return false;
    } else {
      //奇数在多边形内
      return true;
    }
  };

  /**
    * 将度转化为弧度
    * @param {degree} Number 度     
    * @returns {Number} 弧度
    */
  GeoUtils.degreeToRad = function (degree) {
    return Math.PI * degree / 180;
  };

  /**
    * 将弧度转化为度
    * @param {radian} Number 弧度     
    * @returns {Number} 度
    */
  GeoUtils.radToDegree = function (rad) {
    return 180 * rad / Math.PI;
  };

  /**
    * 将v值限定在a,b之间，纬度使用
    */
  function _getRange(v, a, b) {
    if (a != null) {
      v = Math.max(v, a);
    }
    if (b != null) {
      v = Math.min(v, b);
    }
    return v;
  }

  /**
    * 将v值限定在a,b之间，经度使用
    */
  function _getLoop(v, a, b) {
    while (v > b) {
      v -= b - a;
    }
    while (v < a) {
      v += b - a;
    }
    return v;
  }

  /**
    * 计算两点之间的距离,两点坐标必须为经纬度
    * @param {point1} Point 点对象
    * @param {point2} Point 点对象
    * @returns {Number} 两点之间距离，单位为米
    */
  GeoUtils.getDistance = function (point1, point2) {
    //判断类型
    if (!(point1 instanceof BMap.Point) || !(point2 instanceof BMap.Point)) {
      return 0;
    }

    point1.lng = _getLoop(point1.lng, -180, 180);
    point1.lat = _getRange(point1.lat, -74, 74);
    point2.lng = _getLoop(point2.lng, -180, 180);
    point2.lat = _getRange(point2.lat, -74, 74);

    var x1, x2, y1, y2;
    x1 = GeoUtils.degreeToRad(point1.lng);
    y1 = GeoUtils.degreeToRad(point1.lat);
    x2 = GeoUtils.degreeToRad(point2.lng);
    y2 = GeoUtils.degreeToRad(point2.lat);

    return EARTHRADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
  };

  /**
    * 计算折线或者点数组的长度
    * @param {Polyline|Array<Point>} polyline 折线对象或者点数组
    * @returns {Number} 折线或点数组对应的长度
    */
  GeoUtils.getPolylineDistance = function (polyline) {
    //检查类型
    if (polyline instanceof BMap.Polyline || polyline instanceof Array) {
      //将polyline统一为数组
      var pts;
      if (polyline instanceof BMap.Polyline) {
        pts = polyline.getPath();
      } else {
        pts = polyline;
      }

      if (pts.length < 2) {
        //小于2个点，返回0
        return 0;
      }

      //遍历所有线段将其相加，计算整条线段的长度
      var totalDis = 0;
      for (var i = 0; i < pts.length - 1; i++) {
        var curPt = pts[i];
        var nextPt = pts[i + 1];
        var dis = GeoUtils.getDistance(curPt, nextPt);
        totalDis += dis;
      }

      return totalDis;
    } else {
      return 0;
    }
  };

  /**
    * 计算多边形面或点数组构建图形的面积,注意：坐标类型只能是经纬度，且不适合计算自相交多边形的面积
    * @param {Polygon|Array<Point>} polygon 多边形面对象或者点数组
    * @returns {Number} 多边形面或点数组构成图形的面积
    */
  GeoUtils.getPolygonArea = function (polygon) {
    //检查类型
    if (!(polygon instanceof BMap.Polygon) && !(polygon instanceof Array)) {
      return 0;
    }
    var pts;
    if (polygon instanceof BMap.Polygon) {
      pts = polygon.getPath();
    } else {
      pts = polygon;
    }

    if (pts.length < 3) {
      //小于3个顶点，不能构建面
      return 0;
    }

    var totalArea = 0; //初始化总面积
    var LowX = 0.0;
    var LowY = 0.0;
    var MiddleX = 0.0;
    var MiddleY = 0.0;
    var HighX = 0.0;
    var HighY = 0.0;
    var AM = 0.0;
    var BM = 0.0;
    var CM = 0.0;
    var AL = 0.0;
    var BL = 0.0;
    var CL = 0.0;
    var AH = 0.0;
    var BH = 0.0;
    var CH = 0.0;
    var CoefficientL = 0.0;
    var CoefficientH = 0.0;
    var ALtangent = 0.0;
    var BLtangent = 0.0;
    var CLtangent = 0.0;
    var AHtangent = 0.0;
    var BHtangent = 0.0;
    var CHtangent = 0.0;
    var ANormalLine = 0.0;
    var BNormalLine = 0.0;
    var CNormalLine = 0.0;
    var OrientationValue = 0.0;
    var AngleCos = 0.0;
    var Sum1 = 0.0;
    var Sum2 = 0.0;
    var Count2 = 0;
    var Count1 = 0;
    var Sum = 0.0;
    var Radius = EARTHRADIUS; //6378137.0,WGS84椭球半径 
    var Count = pts.length;
    for (var i = 0; i < Count; i++) {
      if (i == 0) {
        LowX = pts[Count - 1].lng * Math.PI / 180;
        LowY = pts[Count - 1].lat * Math.PI / 180;
        MiddleX = pts[0].lng * Math.PI / 180;
        MiddleY = pts[0].lat * Math.PI / 180;
        HighX = pts[1].lng * Math.PI / 180;
        HighY = pts[1].lat * Math.PI / 180;
      } else if (i == Count - 1) {
        LowX = pts[Count - 2].lng * Math.PI / 180;
        LowY = pts[Count - 2].lat * Math.PI / 180;
        MiddleX = pts[Count - 1].lng * Math.PI / 180;
        MiddleY = pts[Count - 1].lat * Math.PI / 180;
        HighX = pts[0].lng * Math.PI / 180;
        HighY = pts[0].lat * Math.PI / 180;
      } else {
        LowX = pts[i - 1].lng * Math.PI / 180;
        LowY = pts[i - 1].lat * Math.PI / 180;
        MiddleX = pts[i].lng * Math.PI / 180;
        MiddleY = pts[i].lat * Math.PI / 180;
        HighX = pts[i + 1].lng * Math.PI / 180;
        HighY = pts[i + 1].lat * Math.PI / 180;
      }
      AM = Math.cos(MiddleY) * Math.cos(MiddleX);
      BM = Math.cos(MiddleY) * Math.sin(MiddleX);
      CM = Math.sin(MiddleY);
      AL = Math.cos(LowY) * Math.cos(LowX);
      BL = Math.cos(LowY) * Math.sin(LowX);
      CL = Math.sin(LowY);
      AH = Math.cos(HighY) * Math.cos(HighX);
      BH = Math.cos(HighY) * Math.sin(HighX);
      CH = Math.sin(HighY);
      CoefficientL = (AM * AM + BM * BM + CM * CM) / (AM * AL + BM * BL + CM * CL);
      CoefficientH = (AM * AM + BM * BM + CM * CM) / (AM * AH + BM * BH + CM * CH);
      ALtangent = CoefficientL * AL - AM;
      BLtangent = CoefficientL * BL - BM;
      CLtangent = CoefficientL * CL - CM;
      AHtangent = CoefficientH * AH - AM;
      BHtangent = CoefficientH * BH - BM;
      CHtangent = CoefficientH * CH - CM;
      AngleCos = (AHtangent * ALtangent + BHtangent * BLtangent + CHtangent * CLtangent) / (Math.sqrt(AHtangent * AHtangent + BHtangent * BHtangent + CHtangent * CHtangent) * Math.sqrt(ALtangent * ALtangent + BLtangent * BLtangent + CLtangent * CLtangent));
      AngleCos = Math.acos(AngleCos);
      ANormalLine = BHtangent * CLtangent - CHtangent * BLtangent;
      BNormalLine = 0 - (AHtangent * CLtangent - CHtangent * ALtangent);
      CNormalLine = AHtangent * BLtangent - BHtangent * ALtangent;
      if (AM != 0) OrientationValue = ANormalLine / AM;else if (BM != 0) OrientationValue = BNormalLine / BM;else OrientationValue = CNormalLine / CM;
      if (OrientationValue > 0) {
        Sum1 += AngleCos;
        Count1++;
      } else {
        Sum2 += AngleCos;
        Count2++;
      }
    }
    var tempSum1, tempSum2;
    tempSum1 = Sum1 + (2 * Math.PI * Count2 - Sum2);
    tempSum2 = 2 * Math.PI * Count1 - Sum1 + Sum2;
    if (Sum1 > Sum2) {
      if (tempSum1 - (Count - 2) * Math.PI < 1) Sum = tempSum1;else Sum = tempSum2;
    } else {
      if (tempSum2 - (Count - 2) * Math.PI < 1) Sum = tempSum2;else Sum = tempSum1;
    }
    totalArea = (Sum - (Count - 2) * Math.PI) * Radius * Radius;

    return totalArea; //返回总面积
  };
})(); //闭包结束

exports.default = GeoUtils;
module.exports = exports["default"];