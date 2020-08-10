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
  tempMarker: null,
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
      self.drawTempMarker(false);
      // 拖拽点
      mapUtil.map.addEventListener('dragstart', () => {
        if (self.tempMarker) {
          self.tempMarker.classList.remove('hide');
        }
        if (self.marker) {
          self.marker.setOffset(new BMap.Size(10000, 10000))
        }
      });
      mapUtil.map.addEventListener('dragend', async (e) => {
        if (self.tempMarker) {
          self.tempMarker.classList.add('hide');
        }
        if (!self.marker) return;
        self.marker.setOffset(new BMap.Size(0, 0))
        let bdPoint = mapUtil.map.getCenter();
        self.marker.setPosition(bdPoint);
        let point = [bdPoint.lng, bdPoint.lat];
        point = GeoUtil.coordtransform(point, 'bd09', 'gcj02')
        const result = await Bridge.getAddress({ // 只支持gcj02
          latitude: point[1],
          longitude: point[0]
        });
        // const address = result && result.address ? result.address : ''
        if (self.onDragEnd) {
          self.onDragEnd(result)
        }
      });
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
    if (self.markers) {
      self.mapUtil.clearOverlays(self.markers);
    }
    self.markers = [];
    for (let point of points) {
      let marker = self.drawMarker(point);
      self.markers.push(marker);
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
  // 绘制临时标记, 用于拖动
  drawTempMarker: function (show) {
    var self = this;
    if (!self.tempMarker) {
      self.tempMarker = document.createElement('span');
      self.tempMarker.className = 'map-marker-center';
      self.mapUtil.container.appendChild(self.tempMarker);
    }
    if (show) {
      self.tempMarker.classList.remove('hide')
    } else {
      self.tempMarker.classList.add('hide')
    }
  },
  // 标记: 绘制标记, 更新原marker, 则传入marker
  initMarker: async function (point) {
    var self = this;
    if (!point) {
      console.error('绘制标记: 定位坐标参数不能为空');
      return null;
    }
    if (self.abort) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.initMarker(point);
      }, 500);
      return;
    }
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
      self.marker.setPosition(bdPoint);
    }
    // 只绘制一个定位到地图中心点
    self.mapUtil.centerToPoints(bdPoint);
    // 地址逆解析
    let gcjPoint = [bdPoint.lng, bdPoint.lat];
    gcjPoint = GeoUtil.coordtransform(point, 'bd09', 'gcj02')
    const result = await Bridge.getAddress({ // 只支持gcj02
      latitude: gcjPoint[1],
      longitude: gcjPoint[0]
    });
    // const address = result && result.address ? result.address : ''
    if (self.onDragEnd) {
      self.onDragEnd(result)
    }
    return self.marker;
  },
  destroy: function () {
    var self = this;
    console.log('移除标注');
    self.mapUtil = null;
    // 标记
    self.markers = null;
    self.marker = null;
  }
}
