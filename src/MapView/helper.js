import MapUtil from './../MapUtil';
import GeoUtil from './../GeoUtil';
import Bridge from './../Bridge';
import locale from './../locale' // 国际化

export default {
  mapUtil: null,
  // 是否中断未完成的绘制
  abort: false,
  // 标记
  markers: null,
  marker: null,
  // 标签
  label: null,
  // 地区
  district: null,
  districtPolygons: null,
  // 多边形
  polygon: null,
  // 圆形
  circle: null,
  // 初始化地图
  initMap: function (container, center, callback) {
    var self = this
    Bridge.showLoading();
    const mapUtil = new MapUtil(container, {
      // 缩放导航
      navigation: {
        position: 'bottom-right',
        type: 'zoom'
      },
      // 中心位置
      center: {
        center: center
      }
    });
    mapUtil.map.addEventListener('load', (e) => {
      Bridge.hideLoading();
      window.clearTimeout(self.loadTimeout);
      // 加载完成开始绘制
      self.mapUtil = mapUtil;
      console.log('初始化地图完成')
      callback(mapUtil);
    }, false)
    // 超时处理
    if (self.loadTimeout) window.clearTimeout(self.loadTimeout);
    self.loadTimeout = setTimeout(() => {
      Bridge.hideLoading();
      callback(locale('hint_map_init_timeout') || '初始化地图超时, 请检查当前网络是否稳定');
    }, 20000);
  },
  // 标记: 绘制全部标记
  drawMarkers: function (points) {
    var self = this;
    if (!points || !points.length) {
      console.error('绘制标记: 定位坐标参数不能为空');
      return null;
    }
    if (self.abort) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawMarkers(points);
      }, 500);
      return;
    }
    if (self.markers && self.markers.length === points.length) { // 更新标记
      for (let [index, point] of points.entries()) {
        self.drawMarker(point, self.markers[index]);
      }
    } else { // 绘制标记
      if (self.markers) {
        self.mapUtil.clearOverlays(self.markers);
      }
      self.markers = [];
      for (let point of points) {
        let marker = self.drawMarker(point);
        self.markers.push(marker);
      }
    }
    setTimeout(() => {
      let bdPoints = [];
      for (let marker of self.markers) {
        bdPoints.push(marker.getPosition());
      }
      self.mapUtil.centerToPoints(bdPoints);
      console.log('绘制标记完成');
    }, 500);
    return self.markers;
  },
  // 标记: 绘制标记, 更新原marker, 则传入marker
  drawMarker: function (point, marker) {
    var self = this;
    self.marker = marker;
    let bdPoint = GeoUtil.coordtransform(point);
    bdPoint = self.mapUtil.pointToBdPoint(bdPoint); // eslint-disable-line
    if (!bdPoint) {
      console.error('绘制标记: 定位坐标错误');
      return null;
    }
    if (!self.marker) {
      self.marker = self.mapUtil.drawMarker(bdPoint, {
        options: {
          iconStyle: {
            width: '16px',
            height: '27px',
            backgroundImage: `url(//res.waiqin365.com/d/seedsui/mapview/location_red_shadow.png)`
          }
        }
      });
    } else {
      self.marker.setPosition(bdPoint)
    }
    return self.marker;
  },
  // 圆形: 绘制标签
  drawLabel: function (point, radius) {
    var self = this;
    if (self.abort) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawLabel(point, radius);
      }, 500);
      return;
    }
    let bdPoint = GeoUtil.coordtransform(point);
    bdPoint = this.mapUtil.pointToBdPoint(bdPoint);
    if (!self.label) {
      self.label = self.mapUtil.drawLabel(bdPoint, locale('radius_of_m', [radius]) || `半径${radius}米`, {
        offset: {
          width: 0,
          height: 14
        },
        style: {
          pointerEvents: 'none',
        }
      })
    } else {
      self.label.setPosition(bdPoint)
      self.label.setContent(locale('radius_of_m', [Math.trunc(radius, 2)]) || `半径${Math.trunc(radius, 2)}米`)
    }
  },
  // 绘制圆形
  drawCircle: function (point, radius) {
    var self = this;
    if (self.abort) return;
    if (!point || point.length !== 2) {
      console.log(`point参数${JSON.stringify(point)}格式不正确, 请传入[lng, lat]`)
      return;
    }
    if (!radius) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawCircle(point, radius);
      }, 500);
      return;
    }
    let bdPoint = GeoUtil.coordtransform(point);
    bdPoint = this.mapUtil.pointToBdPoint(bdPoint);
    if (self.circle) {
      self.circle.setCenter(bdPoint)
    } else {
      self.circle = self.mapUtil.drawCircle(bdPoint, radius)
    }
    if (!self.circle) return;
    setTimeout(() => {
      self.mapUtil.centerToCircle(self.circle, {
        zoomFactor: -1
      })
    }, 300);
    console.log('绘制圆形完成');
    self.drawLabel(point, radius)
  },
  // 绘制多边形
  drawPolygon: function (polygon) {
    var self = this;
    if (self.abort) return;
    if (!polygon || !polygon.length) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawPolygon(polygon);
      }, 500);
      return;
    }
    let bdPolygons = polygon.map((point) => {
      return GeoUtil.coordtransform(point);
    })
    if (self.polygon) {
      self.mapUtil.clearOverlay(self.polygon)
    }
    self.polygon = self.mapUtil.drawPolygon(bdPolygons)
    self.mapUtil.centerToPoints(bdPolygons)
    console.log('绘制多边形完成');
  },
  /**
   * 地区
   */
  drawDistrict: function (districtName) {
    var self = this;
    if (self.abort) return;
    if (!districtName) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawDistrict(districtName);
      }, 500);
      return;
    }
    if (self.district) {
      self.mapUtil.clearOverlays(self.district)
    }
    self.mapUtil.drawBoundary(districtName, null, {
      success: (res) => {
        self.district = res.bdPolygons;
        self.districtPolygons = res.polygons;
        self.mapUtil.centerToPoints(res.bdPolygonsPath);
        console.log('绘制区域完成');
      },
      fail: (err) => {
        Bridge.showToast(locale('hint_map_no_boundary_data', [districtName]) || `暂无${districtName}的边界数据`, {mask: false});
      }
    });
  },
  destroy: function () {
    var self = this;
    console.log('移除标注');
    self.mapUtil = null;
    // 标记
    self.markers = null;
    // 标签
    self.label = null;
    // 地区
    self.district = null;
    self.districtPolygons = null;
    // 多边形
    self.polygon = null;
    // 圆形
    self.circle = null;
  }
}