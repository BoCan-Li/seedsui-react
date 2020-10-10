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
        self.showTempMarker();
        self.hideMarker();
      });
      mapUtil.map.addEventListener('dragend', async (e) => {
        self.hideTempMarker();
        if (!self.marker) return;
        // 获取中心点, 并绘制坐标点
        let point = self.getCenterPoint(self.marker);
        // 显示坐标点
        self.showMarker();
        // 地址逆解析
        let result = await self.getAddress(point);
        if (self.onDragEnd) {
          self.onDragEnd(result)
        }
      });
    }, false)
    // 超时处理
    if (self.loadTimeout) window.clearTimeout(self.loadTimeout);
    self.loadTimeout = setTimeout(() => {
      Bridge.hideLoading();
      callback(locale('初始化地图超时, 请检查当前网络是否稳定', 'hint_map_init_timeout'));
    }, 20000);
  },
  // 获取中心点
  getCenterPoint: function (marker) {
    var self = this;
    let bdPoint = self.mapUtil.map.getCenter();
    if (marker) marker.setPosition(bdPoint);
    let point = [bdPoint.lng, bdPoint.lat];
    return GeoUtil.coordtransform(point, 'bd09', 'gcj02')
  },
  // 绘制临时标记, 拖拽显示, 停止拖拽隐藏
  drawTempMarker: function (show) {
    var self = this;
    if (!self.tempMarker) {
      self.tempMarker = document.createElement('span');
      self.tempMarker.className = 'map-marker-center';
      self.mapUtil.container.appendChild(self.tempMarker);
    }
    if (show) {
      self.showTempMarker();
    } else {
      self.hideTempMarker();
    }
  },
  showTempMarker: function () {
    var self = this;
    if (self.tempMarker) {
      self.tempMarker.classList.remove('hide');
    }
  },
  hideTempMarker: function () {
    var self = this;
    if (self.tempMarker) {
      self.tempMarker.classList.add('hide');
    }
  },
  // 初始化标记, 并逆解析地址
  initMarker: async function (point, callback) {
    var self = this;
    if (!point) {
      console.error('初始化标记: 定位坐标参数不能为空');
      return null;
    }
    if (self.abort) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.initMarker(point, callback);
      }, 500);
      return;
    }

    // 绘制坐标点
    self.drawMarker(point);
    
    // 地址逆解析
    let result = await self.getAddress(point);
    if (callback) callback(result);
  },
  // 绘制坐标点
  drawMarker: function (point) {
    var self = this;
    if (!point) {
      console.error('绘制标记: 定位坐标参数不能为空');
      return null;
    }
    if (self.abort) return;
    if (!self.mapUtil) {
      setTimeout(() => {
        self.drawMarker(point);
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
  },
  hideMarker: function () {
    var self = this;
    if (self.marker) {
      self.marker.setOffset(new BMap.Size(10000, 10000))
    }
  },
  showMarker: function () {
    var self = this;
    if (self.marker) {
      self.marker.setOffset(new BMap.Size(0, 0))
    }
  },
  // 地址逆解析
  getAddress: async function (point) {
    return new Promise(async (resolve) => {
      const result = await Bridge.getAddress({ // 只支持gcj02
        latitude: point[1],
        longitude: point[0]
      });
      resolve(result)
    })
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
