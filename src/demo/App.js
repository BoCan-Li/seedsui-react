import React, { Component } from 'react';
import styled from 'styled-components';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';
import Bridge from './../lib/Bridge';
import MapUtil from './../lib/MapUtil';
import GeoUtils from './../lib/MapUtil/GeoUtils.js';
const { greinerHormann, BMap } = window

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

var redMap = new Map()
var grayMap = new Map()
var blueMap = new Map()

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
        redMap.set(id, res.polygons);
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
    const data = [{"lng":118.861177,"lat":32.003639},{"lng":118.799086,"lat":31.976199},{"lng":118.693302,"lat":31.936985},{"lng":118.881874,"lat":31.856542},{"lng":118.966961,"lat":31.936985}];
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
    grayMap.set(id, shape);
  }
  // 手动绘制可选区域
  drawBlue = (e) => {
    const polygon = e.overlay;
    var id = 'blue-' + new Date().getTime();
    const shape = this.mapUtil.drawPolygon({
      polygon: polygon,
      onSuccess: (res, polygonPoints) => {
        console.log('绘制完成');
        blueMap.set(id, polygonPoints);
        // 取差差
        this.resetFenceArea(polygon);
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    blueMap.set(id, shape);
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
  // 绘制指定区域
  resetFenceArea = (overlay) => {
    var newlay = overlay;
    if (GeoUtils.isSelfInter(overlay)) {
      this.mapUtil.map.removeOverlay(overlay);
      alert('多边形自相交');
      return;
    }
    console.log(grayMap)
    var overlays = [...grayMap.values()];
    for (var i = overlays.length - 1; i >= 0; i--) {
      if (GeoUtils.isContainer(overlays[i], overlay)) {
        this.mapUtil.map.removeOverlay(overlay);
        alert("多边形区域相互包含")
        return;
      }
      var tmppoly = GeoUtils.addContainPoint(overlays[i], newlay);
      var tmpp = JSON.stringify(newlay.so);
      while (JSON.stringify(tmppoly) !== tmpp) {
        tmpp = JSON.stringify(tmppoly);
        //需要把点转成polygon
        var polygonlines = new BMap.Polygon(tmppoly);
        tmppoly = GeoUtils.addContainPoint(overlays[i], polygonlines);
      }

      var tmp = JSON.stringify(tmppoly);
      tmppoly = GeoUtils.removeContainPoint(overlays[i], tmppoly);
      while (JSON.stringify(tmppoly) !== tmp) {
        tmp = JSON.stringify(tmppoly)
        tmppoly = GeoUtils.removeContainPoint(overlays[i], tmppoly);
      }

      //开始判断oldline是否有点在newline中
      newlay = new BMap.Polygon(tmppoly);
    }
    overlays.push(newlay);
    if (this.canViewAll === '0' && [...redMap.values()].length > 0) { // 红色区域取并集
      overlays = [...redMap.values()];
      for (i = 0; i < overlays.length; i++) {
        var pa = [];
        pa.push(overlays[i].so);
        var pb = [];
        pb.push(newlay.so);
        var paa = new Array([]);

        paa['_latlngs'] = pa;
        var pbb = new Array([]);
        pbb['_latlngs'] = pb;
        tmppoly = greinerHormann.intersection(paa, pbb);
        if (tmppoly) {
          newlay = this.mapUtil.pointsToPolygon(tmppoly);
        }
      }
    }
    this.mapUtil.map.removeOverlay(overlay);
    var id = 'blue-' + new Date().getTime();
    var pg = this.mapUtil.drawPolygon({
      points: newlay.so,
      styleOptions: {fillColor: '#0c8eff', strokeColor: '#0c8eff'},
      onSuccess: () => {
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    grayMap.set(id, pg);
    blueMap.set(id, pg);
    this.addContextMenu(id, pg);
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
