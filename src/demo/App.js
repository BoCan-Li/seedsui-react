import React, { Component } from 'react';
import styled from 'styled-components';
import MapUtil from './../lib/MapUtil';
// import greinerHormann from 'greiner-hormann';
// import WqMapLib from './maplib/wqgeoutils.js';


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
    this.mapUtil = new MapUtil('map');
    this.initMap();
  }
  // 添加鼠标绘制工具监听事件，用于获取绘制结果
  initMap = () => {
    if (this.mapUtil && this.mapUtil.drawingManager) {
      this.mapUtil.showScale();
      this.mapUtil.showNavigation();
      this.mapUtil.drawingManager.addEventListener('overlaycomplete', this.drawComplete);
      // this.drawRed();
      this.drawGray();
    }
  }
  // 绘制总区域
  drawRed = () => {
    var id = 'red-' + new Date().getTime();
    const shape = this.mapUtil.drawBoundary({
      area: '江苏省南京市',
      styleOptions: redMapStyle,
      onSuccess: (res, polygonPoints) => {
        grayMap.set(id, polygonPoints);
        this.mapUtil.map.setViewport(polygonPoints)
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    redMap.set(id, shape);
  }
  // 绘制禁用区域
  drawGray = () => {
    const data = [{"lng":118.861177,"lat":32.003639},{"lng":118.799086,"lat":31.976199},{"lng":118.693302,"lat":31.936985},{"lng":118.881874,"lat":31.856542},{"lng":118.966961,"lat":31.936985}];
    var id = 'black-' + new Date().getTime();
    const shape = this.mapUtil.drawPolygon({
      points: data,
      styleOptions: {fillColor: '#434244', strokeColor: '#434244'},
      onSuccess: (res, polygonPoints) => {
        grayMap.set(id, polygonPoints);
        this.mapUtil.map.setViewport(polygonPoints)
      },
      onError: (msg) => {
        alert(msg)
      }
    });
    grayMap.set(id, shape);
    this.addContextMenu(id, shape)
  }
  // 启用手动绘制
  enableManualDraw = () => {
    this.mapUtil.enableManualDraw()
  }
  drawComplete = (e) => {
    console.log(JSON.stringify(e))
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
              if (grayMap.has(id)) grayMap.delete(id)
            }
          }
        }
      ]
    })
  }
  onChange = (value, option, args) => {
    console.log(value, option, args);
    this.setState({
      value: value
    });
  }
  render() {
    return (
      <div className="pages">
        <MapContainer id="map"></MapContainer>
        <ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw>
      </div>
    );
  }
}

export default App;
