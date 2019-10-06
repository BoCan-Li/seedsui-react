import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container} from '../../src'
import go from 'gojs';

class Demo extends Component {
  componentDidMount () {
    // 后面很多用到该变量来初始化diagram
    let $ = go.GraphObject.make;
    let diagram = $(go.Diagram, document.getElementById('myDiagramDiv'),
      {
        // 'initialContentAlignment': go.Spot.Center,
        'isEnabled': true,  // 是否可拖拽，默认为是
        // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone,
        // 'allowLink': false,   
        // 'allowMove': false,
        // 'allowRelink': false,  // 由于项目只想展示数据，我禁用了大部分图像交互操作，具体可参看官网API
        // 'layout': $(go.TreeLayout, {angle: 0, arrangement: go.TreeLayout.ArrangementHorizontal}),      // angle可控制图像展示方向
        // 'undoManager.isEnabled': true,
        // Model ChangedEvents get passed up to component users
        'ChangedSelection': function(e) {
            console.log(e);
        }
    });
    // 创建图
    // var diagram = new go.Diagram("myDiagramDiv");
    // 创建节点 节点中元素的排列方式是 Panel.Auto
    var node = new go.Node(go.Panel.Auto);
    // 创建图形
    var shape = new go.Shape();
    // 定义图形属性
    shape.figure = "Rectangle";
    shape.fill = "lightblue";
    shape.strokeWidth = 2;
    shape.stroke = 'gray';
    // 将图形加到节点
    node.add(shape);
    // 将节点加到图
    diagram.add(node);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
          <div id="myDiagramDiv" style={{border: 'solid 1px blue', width: '400px', height: '150px'}}></div>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
