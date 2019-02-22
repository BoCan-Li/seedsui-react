import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import MenuTiled from '../lib/MenuTiled';


const mockmenus = [
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
      selectedId: '1',
      menus: mockmenus
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  clearMenus = () => {
    this.setState({
      menus: []
    });
  }
  addMenus = () => {
    this.setState({
      menus: mockmenus
    });
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <MenuTiled ref="$menutree" list={this.state.menus} selectedId={this.state.selectedId} onClick={this.onClickMenu}/>
        <input type="button" value="置空" onClick={this.clearMenus}/>
        <input type="button" value="显示" onClick={this.addMenus}/>
      </Container>
    </Page>
  }
};
