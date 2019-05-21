import React, { Component } from 'react';
import styled from 'styled-components';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';
import Bridge from './../lib/Bridge';
import MapUtil from './../lib/MapUtil';
import GeoUtils from './../lib/MapUtil/GeoUtils.js';
const { BMap } = window
var greinerHormann = require('polygon-clipping');

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ButtonDraw = styled.div`
  position: absolute;
  width: 92px;
  height: 32px;
  line-height: 32px;
  top: 20px;
  right: 20px;
  z-index: 1;
  border-radius: 2px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
  cursor: pointer;
  background: #fff;
`

const redMapStyle = {
  strokeColor: '#f53e2d',
  strokeWeight: 1,
  strokeOpacity: 0.8,
  strokeStyle: 'solid',
  fillColor: '#f53e2d',
  fillOpacity: 0.6
}

var redMap = {}
var grayMap = {}
var blueMap = {}

class App extends Component {
  static mapUtil = {}
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    Bridge.debug = true
    this.mapUtil = new MapUtil('map');
    this.initMap();
  }
  // 添加鼠标绘制工具监听事件，用于获取绘制结果
  initMap = () => {
    if (this.mapUtil && this.mapUtil.drawingManager) {
      this.mapUtil.showScale();
      this.mapUtil.showNavigation();
      this.mapUtil.drawingManager.addEventListener('overlaycomplete', this.drawBlue);
      this.drawRed();
    }
  }
  // 绘制总区域
  drawRed = () => {
    var id = 'red-' + new Date().getTime();
    this.mapUtil.drawBoundary({
      area: '江苏省南京市',
      styleOptions: redMapStyle,
      onSuccess: (res) => {
        redMap[id] = res.polygons;
        this.mapUtil.map.setViewport(res.polygonsPath);
        this.drawGray();
      },
      onError: (msg) => {
        alert(msg)
      }
    });
  }
  // 绘制禁用区域
  drawGray = () => {
    const data = [
      {lng: 118.911769, lat: 31.99776},
      {lng: 118.700201, lat: 31.99776},
      {lng: 118.697901, lat: 31.860468},
      {lng: 118.90947, lat: 31.856542},
      {lng: 118.911769, lat: 31.99776},
      {lng: 118.700201, lat: 31.99776}
    ];
    var id = 'black-' + new Date().getTime();
    const shape = this.mapUtil.drawPolygon({
      points: data,
      styleOptions: {fillColor: '#888', strokeColor: '#888'},
      onSuccess: () => {
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    grayMap[id] = shape
    // test
    var point = new BMap.Point(118.794487, 31.950711);
    this.mapUtil.drawMarker({
      point: point
    });

    console.log(GeoUtils.isPointInPolygon(point, shape.so))
  }
  // 手动绘制可选区域
  drawBlue = (e) => {
    const polygon = e.overlay;
    var id = 'blue-' + new Date().getTime();
    const shape = this.mapUtil.drawPolygon({
      polygon: polygon,
      onSuccess: (res, polygonPoints) => {
        blueMap[id] = polygonPoints
        // 取差差
        this.resetFenceArea(id, polygon);
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    blueMap[id] = shape
    this.addContextMenu(id, shape)
  }
  // 启用手动绘制
  enableManualDraw = () => {
    this.mapUtil.enableManualDraw()
  }
  // 添加右键, id用于获取和删除覆盖物值班表和
  addContextMenu(id, overlay){
    this.mapUtil.addContextMenu(overlay, {
        menus: [
        {
          text: '删除',
          handler: () => {
            if (confirm('您确定要删除吗')) {
              this.mapUtil.map.removeOverlay(overlay)
              if (blueMap.has(id)) blueMap.delete(id)
            }
          }
        }
      ]
    })
  }
  // 灰色区域区差集
  grayMerge = (overlay) => {
    console.log(overlay.so)
    // 与灰色区域取差集
    var polygons = [];
    for (let grayOverlay of Object.values(grayMap)) {
      if (GeoUtils.contains(overlay.so, grayOverlay.so) || GeoUtils.contains(grayOverlay.so, overlay.so)) {
        return '多边形区域相互包含';
      }
      // 裁切
      var source = overlay.so.map((point) => {return [point.lng, point.lat]});
      var clip = grayOverlay.so.map((point) => {return [point.lng, point.lat]});
      var arr = greinerHormann.difference([source], [clip]);
      if (arr && arr.length && arr[0] && arr[0][0]) {
        console.log(arr[0][0])
        var polygon = this.mapUtil.pointsToPolygon(arr[0][0]);
        polygons.push(polygon);
      }
    }
    return polygons;
  }
  // 红色区域取交集
  redMerge = (overlay) => {
    // 与灰色区域取差集
    var polygons = [];
    for (var redOverlays of Object.values(redMap)) {
      for (var redOverlay of redOverlays) {
        // 裁切
        var source = overlay.so.map((point) => {return [point.lng, point.lat]});
        var clip = redOverlay.so.map((point) => {return [point.lng, point.lat]});
        var arr = greinerHormann.intersection([source], [clip]);
        console.log('红色裁切:' + source);
        console.log(arr);
        if (arr && arr.length && arr[0] && arr[0][0]) {
          console.log(arr[0][0])
          var polygon = this.mapUtil.pointsToPolygon(arr[0][0]);
          console.log(polygon)
          polygons.push(polygon);
          return polygons;
        }
      }
    }
    return polygons;
  }
  // 绘制指定区域
  resetFenceArea = (id, overlay) => {
    console.log(overlay)
    if (GeoUtils.isSelfInter(overlay)) {
      this.mapUtil.map.removeOverlay(overlay);
      delete blueMap[id];
      alert('多边形自相交');
      return;
    }
    // 灰色区域合并
    let polygons = this.grayMerge(overlay) || [];
    if (typeof polygons === 'string') {
      alert(polygons)
      this.mapUtil.map.removeOverlay(overlay);
      delete blueMap[id]
      return
    }
    // 红色区域合并
    for (let polygon of (polygons.length ? polygons : [overlay])) {
      let current = this.redMerge(polygon);
      if (current) polygons = polygons.concat(current);
    }
    if (!polygons.length) return;

    console.log('结果:');
    console.log(polygons);
    this.mapUtil.map.removeOverlay(overlay);
    for (let polygon of polygons) {
      console.log('绘制:');
      console.log(polygon);
      this.mapUtil.drawPolygon({polygon: polygon});
    }

    // overlays.push(newlay);
    // if (this.canViewAll === '0' && [...redMap.values()].length > 0) { // 红色区域取并集
    //   overlays = [...redMap.values()];
    //   for (i = 0; i < overlays.length; i++) {
    //     var pa = [];
    //     pa.push(overlays[i].so);
    //     var pb = [];
    //     pb.push(newlay.so);
    //     var paa = new Array([]);

    //     paa['_latlngs'] = pa;
    //     var pbb = new Array([]);
    //     pbb['_latlngs'] = pb;
    //     tmppoly = greinerHormann.intersection(paa, pbb);
    //     if (tmppoly) {
    //       newlay = this.mapUtil.pointsToPolygon(tmppoly);
    //     }
    //   }
    // }
    // this.mapUtil.map.removeOverlay(overlay);
    // var id = 'blue-' + new Date().getTime();
    // var pg = this.mapUtil.drawPolygon({
    //   points: newlay.so,
    //   styleOptions: {fillColor: '#0c8eff', strokeColor: '#0c8eff'},
    //   onSuccess: () => {
    //   },
    //   onError: (msg) => {
    //     alert(msg)
    //   }
    // });
    // grayMap[id] = pg;
    // blueMap[id] = pg;
    // this.addContextMenu(id, pg);
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <MapContainer id="map"></MapContainer>
          <ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw>
        </Container>
      </Page>
    );
  }
}

export default App;
