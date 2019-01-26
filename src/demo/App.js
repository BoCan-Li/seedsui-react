import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import MenuTree from '../lib/MenuTree';

const menus = [
  {id: '2', name: '测试数据2', parentid: '-1'},
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: '2'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onClickMenu = (e, item, isActived, isExtand, childrenCount) => {
    console.log(e);
    console.log(item);
    console.log('激活:' + isActived);
    console.log('展开:' + isExtand);
    console.log('子项:' + childrenCount);
    if (!isActived) {
      this.setState({
        selectedId: item.id
      });
    }
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <MenuTree ref="$menutree" list={menus} selectedId={this.state.selectedId} onClick={this.onClickMenu}/>
      </Container>
    </Page>
  }
};
