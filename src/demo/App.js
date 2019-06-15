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
    this.mapUtil.drawBoundary({
      area: '江苏省南京市',
      styleOptions: redMapStyle,
      onSuccess: (res) => {
        redMap['red-nanjing'] = res.polygons;
        this.mapUtil.map.setViewport(res.polygonsPath);
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    this.mapUtil.drawBoundary({
      area: '江苏省镇江市',
      styleOptions: redMapStyle,
      onSuccess: (res) => {
        redMap['red-zhengjiang'] = res.polygons;
        this.mapUtil.map.setViewport(res.polygonsPath);
      },
      onError: (msg) => {
        alert(msg)
      }
    });
  }
  // 手动绘制可选区域
  drawBlue = (e) => {
    const polygon = e.overlay;
    var id = 'blue-' + new Date().getTime();
    const shape = this.mapUtil.drawPolygon({
      polygon: polygon,
      onSuccess: () => {
        // 判断多边形是否合法
        if (GeoUtils.isSelfInter(polygon)) {
          this.mapUtil.map.removeOverlay(polygon);
          alert('多边形自相交');
          return;
        }
        this.mapUtil.map.removeOverlay(polygon);
        // 添加到map中
        console.log('添加到blueMap中');
        console.log(polygon);
        blueMap[id] = polygon;
        // 绘制的坐标点
        var source = polygon.so.map((point) => {return [point.lng, point.lat]});
        console.log('绘制的坐标点');
        console.log(source);
        let pointss = this.redMerge([source]);
        console.log('取与红色区域的交集');
        console.log(pointss);
        // 绘制交集
        for (let points of pointss) {
          var polygons = this.mapUtil.pointsToPolygons(points);
          polygons = polygons.map((polygon) => {
            return {
              polygon: polygon,
            }
          });
          console.log('多边形');
          console.log(polygons);
          this.mapUtil.drawPolygons(polygons);
        }

        // if (points && points.length && points[0] && points[0][0]) {
        //   console.log(arr[0][0])
        //   var polygon = this.mapUtil.pointsToPolygon(arr[0][0]);
        //   console.log(polygon)
        //   polygons.push(polygon);
        //   return polygons;
        // }
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
  // 红色区域取交集
  redMerge = (source) => {
    // 与灰色区域取差集
    var polygons = [];
    for (var redOverlays of Object.values(redMap)) {
      for (var redOverlay of redOverlays) {
        // 必须分开裁切, 一次性裁切会报错
        var clip = redOverlay.so.map((point) => {return [point.lng, point.lat]});
        var result = greinerHormann.intersection(source, [clip]);
        if (result && result.length) polygons.push(result[0]);
      }
    }
    return polygons;
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
