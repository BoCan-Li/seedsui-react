import MapUtil from './../MapUtil';
import GeoUtil from './../GeoUtil';
import Bridge from './../Bridge';
// let self = null;

export default {
  mapUtil: null,
  // 标记
  markers: null,
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
  initMap: function (center, onLoad) {
    self = this
    const mapUtil = new MapUtil('Id-MapLocateNow-MapContainer', {
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
      self.mapUtil = mapUtil;
      if (onLoad) onLoad(e);
    }, false)
  },
  // 标记: 绘制标记
  drawMarkers: function (points) {
    if (!this.mapUtil) {
      setTimeout(() => {
        this.drawMarkers(points);
      }, 500);
      return;
    }
    if (this.markers) {
      this.mapUtil.clearOverlays(this.markers);
    }
    this.markers = [];
    let bdPoints = [];
    for (let point of points) {
      let bdPoint = GeoUtil.coordtransform(point);
      bdPoints.push(bdPoint);
      this.markers.push(this.drawMarker(bdPoint));
    }
    setTimeout(() => {
      this.mapUtil.centerToPoints(bdPoints);
      console.log('绘制标记完成');
    }, 500);
  },
  drawMarker: function (bdPoint) {
    if (!bdPoint) {
      console.error('绘制标记: 定位坐标错误');
      return null;
    }
    let marker = this.mapUtil.drawMarker(bdPoint, {
      options: {
        iconStyle: {
          width: '16px',
          height: '27px',
          backgroundImage: `url(//res.waiqin365.com/d/seedsui/mapview/location_red_shadow.png)`
        }
      }
    });
    return marker;
  },
  // 圆形: 绘制标签
  drawLabel: function (point, radius) {
    if (!this.mapUtil) {
      setTimeout(() => {
        this.drawLabel(point, radius);
      }, 500);
      return;
    }
    if (!this.label) {
      this.label = this.mapUtil.drawLabel(point, `半径${radius}米`, {
        offset: {
          width: 0,
          height: 14
        },
        style: {
          pointerEvents: 'none',
        }
      })
    } else {
      this.label.setPosition(point)
      this.label.setContent(`半径${Math.trunc(radius, 2)}米`)
    }
  },
  // 绘制圆形
  drawCircle: function (point, radius) {
    var self = this;
    if (!point || point.length !== 2) return;
    if (!radius) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawCircle(point, radius);
      }, 500);
      return;
    }

    let circle = self.mapUtil.drawCircle(GeoUtil.coordtransform(point), radius)
    if (!circle) return;
    let bdPoint = GeoUtil.coordtransform(point);
    circle.setCenter(bdPoint)

    setTimeout(() => {
      self.mapUtil.centerToCircle(circle, {
        zoomFactor: -1
      })
    }, 300);
    self.circle = circle;
    console.log('绘制圆形完成');
    self.drawLabel(point, radius)
  },
  // 绘制多边形
  drawPolygon: function (polygon) {
    var self = this
    if (!polygon || !polygon.length) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawPolygon(polygon);
      }, 500);
      return;
    }
    self.polygon = self.mapUtil.drawPolygon(polygon)
    self.mapUtil.centerToPoints(polygon)
    console.log('绘制多边形完成');
  },
  /**
   * 地区
   */
  drawDistrict: function (districtName) {
    var self = this
    if (!districtName) return
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawDistrict(districtName);
      }, 500);
      return;
    }
    self.mapUtil.drawBoundary(districtName, null, {
      success: (res) => {
        self.district = res.bdPolygons;
        self.districtPolygons = res.polygons;
        self.mapUtil.centerToPoints(res.bdPolygonsPath);
        console.log('绘制区域完成');
      },
      fail: (err) => {
        Bridge.showToast(`暂无${districtName}的边界数据`, {mask: false});
      }
    });
  },
  destroy: function () {
    // var self = this;
    // console.log('移除标注');
    // 清空地图标注
    // self.mapUtil.clearOverlays();
    // 标记
    // self.markers = null;
    // // 标签
    // self.label = null;
    // // 地区
    // self.district = null;
    // self.districtPolygons = null;
    // // 多边形
    // self.polygon = null;
    // // 圆形
    // self.circle = null;
  }
}
