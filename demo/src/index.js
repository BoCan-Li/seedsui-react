import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Vott} from '../../src'

class Demo extends Component {
  // 创建矩形
  createRect = (attr) => {
    var svg = this.createSvg('svg', {
      'style': 'width:100%;height:100%;',
      'viewBox': '0 0 100 100'
    });
    
    var circle = this.createSvg('rect', {  
      'x': '1',  
      'y': '1',  
      'width': '20',
      'height': '20', 
      'style': 'fill:#ff6666;stroke-width:1;stroke:rgb(255,0,0)'
    });
    svg.appendChild(circle);
    return svg;
  }
  // 创建svg相关元素  
  createSvg = (tag, attr) => {
    if (!document.createElementNS) return // 防止IE8报错  
    var svg = document.createElementNS('http://www.w3.org/2000/svg', tag)
    for (var key in attr) {
      switch (key) {
        case 'xlink:href': // 文本路径添加属性特有
          svg.setAttributeNS('http://www.w3.org/1999/xlink', key, attr[key])
          break
        default:
          svg.setAttribute(key, attr[key])
      }
    }
    return svg;
  }
  componentDidMount () {
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
          <Vott/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
