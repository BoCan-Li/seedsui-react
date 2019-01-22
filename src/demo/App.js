import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import MenuTree from '../lib/MenuTree';
import MenuTiled from '../lib/MenuTiled';
import Tree from '../lib/Tree';

const menus = [
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];
// const menus = [
// 	{
//     parentid: '-1',
// 		id: '1',
// 		name: '测试数据1',
// 		children: [
// 			{
//         id: 'a',
//         name: '测试数据1-a'
//       },
//       {
//         id: 'b',
//         name: '测试数据1-b',
//         children: [
//           {
//             id: 'I',
//             name: '测试数据1-b-I'
//           },
//           {
//             id: 'II',
//             name: '测试数据1-b-II'
//           }
//         ]
//       }
// 		]
// 	}
// ];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    }
  }
  componentDidMount() {
    Bridge.debug = true;
    setTimeout(() => {
      this.setState({
        menus: menus
      })
    }, 1000);
  }
  onClick = (s, item, isActived, isExtand, childrenCount) => {
    console.log(s)
    console.log(item)
    console.log('是否激活:' + isActived);
    console.log('展开状态:' + isExtand)
    console.log('子节点数:' + childrenCount)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <MenuTree list={this.state.menus} onClick={this.onClick} ref={(el) => {this.$menuTree = el}}/>
        <MenuTiled list={this.state.menus} onClick={this.onClick}/>
        <Tree list={this.state.menus} style={{height: '200px'}} onClick={this.onClick}/>
      </Container>
    </Page>
  }
};
