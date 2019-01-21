import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import MenuTree from '../lib/MenuTree';

const menus = [
	{
		id: '1',
		name: '测试数据1',
		children: [
			{
        id: 'a',
        name: '测试数据1-a'
      },
      {
        id: 'b',
        name: '测试数据1-b',
        children: [
          {
            id: 'I',
            name: '测试数据1-b-I'
          },
          {
            id: 'II',
            name: '测试数据1-b-II'
          }
        ]
      }
		]
	}
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Bridge.debug = true;
    console.log(menus.flattenTree())
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <MenuTree list={menus}/>
      </Container>
    </Page>
  }
};
