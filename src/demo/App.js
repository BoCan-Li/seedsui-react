import React, { Component } from 'react';
import styled from 'styled-components';
import MapUtil from './../lib/MapUtil';
import InputSelect from './../lib/InputSelect';

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
    this.state = {
      value: '',
      list: [
        {
          key: '1',
          value: '111'
        },
        {
          key: '2',
          value: '222'
        },
        {
          key: '3',
          value: '333'
        }
      ]
    }
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
        blueMap.set(id, polygonPoints);
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
  onChange = (value, option, args) => {
    console.log(value, option, args);
    this.setState({
      value: value
    });
  }
  render() {
    return (
      <div className="pages">
        {/* <MapContainer id="map"></MapContainer>
        <ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw> */}
        <InputSelect
          multiple
          list={this.state.list}
          valueBindProp
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          pickerMaskStyle={{zIndex: '11'}}
          pickerMaskClassName="bg-white"
        />
      </div>
    );
  }
}

export default App;
