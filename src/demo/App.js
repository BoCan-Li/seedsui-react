import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import MenuTree from '../lib/MenuTree';

const menus = [
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: '1', name: '测试数据1', parentid: '-1'},
];
// const menus = [
//   {id: '1', name: '测试数据1', parentid: '-1'},
//   {id: '2', name: '测试数据2', parentid: '-1'},
//   {id: '3', name: '测试数据3', parentid: '-1'},
//   {id: 'a', name: '测试数据1-a', parentid: '1'},
//   {id: 'b', name: '测试数据1-b', parentid: '1'},
//   {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
//   {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
// ];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Bridge.debug = true;
    console.log(menus.deepTree());
  }
  onClickMenu = (e, item, isActived, extandStatus, childrenCount) => {
    console.log(e, item, isActived, extandStatus, childrenCount);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
        <div id="idTreeBar" className="tree-bar"></div>
      </Header>
      <Container>
        <MenuTree list={menus.deepTree()} onClick={this.onClickMenu}/>
      </Container>
    </Page>
  }
};
