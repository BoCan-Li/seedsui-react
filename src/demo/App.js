import React, { Component } from 'react';
import styled from 'styled-components';
import MapUtil from './../lib/MapUtil';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Titlebar from './../lib/Titlebar';
import Dragrefresh from './../lib/Dragrefresh';

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
      hasMore: -2, // hasMore: 0.无更多数据, 1.头部刷新完成, 2.底部刷新完成, 404.一条数据都没有, -1. 加载错误, -2. 重置状态,为了后面可以更新DOM
      list: []
    }
  }
  componentDidMount () {
    this.mapUtil = new MapUtil('map');
    this.initMap();
    this.loadData();
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
  // 下拉刷新配置
  onTopRefresh = () => {
    console.log('头部刷新');
    this.loadData(false);
  }
  onBottomRefresh = () => {
    console.log('底部刷新');
    this.loadData(true);
  }
  loadData = (isNext) => {
    let list = this.state.list;
    let hasMore = -2; // hasMore: 0.无更多数据, 1.头部刷新完成, 2.底部刷新完成, 404.一条数据都没有, -2. 重置状态,为了后面可以更新DOM
    this.setState({
      hasMore: -2 // 先重置状态, 后面再会触发react更新
    });
    setTimeout(() => {
      let serList = [];
      for (let i = 1; i <= 20; i++) {
        serList.push(i);
      }
      if (isNext) { // 下一页
        list = list.concat(serList);
        hasMore = 2;
      } else { // 第一页
        list = serList;
        hasMore = 1;
      }
      if (list.length >= 100) {
        hasMore = 0;
      }
      // 更新DOM
      this.setState({
        list,
        hasMore
      });
    }, 1000);
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        {/* <MapContainer id="map"></MapContainer>
        <ButtonDraw onClick={this.enableManualDraw}>划分区域</ButtonDraw> */}
        <Dragrefresh
          moveTimeout={1000}
          endRefresh
          ref={(el) => {this.$elDrag = el;}}
          hasMore={this.state.hasMore}
          onTopRefresh={this.onTopRefresh}
          onBottomRefresh={this.onBottomRefresh}
        >
          {this.state.list.map((item, index) => {
            return <div className="flex flex-middle" style={{height: '44px'}} key={index}>{item}</div>
          })}
        </Dragrefresh>
      </Page>
    );
  }
}

export default App;
