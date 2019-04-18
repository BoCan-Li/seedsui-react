import React, { Component } from 'react';
import styled from 'styled-components';
import BaiduMap from './BaiduMap';
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


class App extends Component {
  static bmap = {}
  componentDidMount () {
    this.bmap = new BaiduMap('map');
    // 添加鼠标绘制工具监听事件，用于获取绘制结果
    if (this.bmap && this.bmap.drawingManager) {
      this.bmap.drawingManager.addEventListener('overlaycomplete', this.drawComplete);
      this.bmap.drawBoundary({
        area: '江苏省',
        onSuccess: (polygon) => {
          console.log(polygon.getPath())
        },
        onError: (msg) => {
          alert(msg)
        }
      })
    }
  }
  enableManualDraw = () => {
    this.bmap.enableManualDraw()
  }
  drawComplete = (e) => {
    console.log(e.overlay)
  }
  render() {
    return (
      <div>
        <MapContainer id="map"></MapContainer>
        <ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw>
      </div>
    );
  }
}

export default App;
