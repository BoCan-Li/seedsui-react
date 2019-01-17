import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import MenuTiled from '../lib/MenuTiled';
import Bridge from '../lib/Bridge';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onClickMenu = (item, isActived, extandStatus, childrenCount) => {
		console.log(item, isActived, extandStatus, childrenCount);
	}
  render() {
		const activeMenuId = '';
		// const menus = [
		// 	{
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
    const menus = [
      {id: '1', name: '测试数据1', parentid: '-1'},
      {id: 'a', name: '测试数据1-a', parentid: '1'},
      {id: 'b', name: '测试数据1-b', parentid: '1'},
      {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
      {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
    ];
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
				<MenuTiled list={menus.deepTree()} activeId={activeMenuId} onClick={this.onClickMenu}/>
      </Container>
    </Page>
  }
};
