import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import Dropdown from '../lib/Dropdown';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: '1',
          name: '全部盘点',
          data: [
            {id: '1', name: '全部盘点'},
            {id: '1-2', name: '部分盘点'}
          ]
        }, {
          id: '2',
          name: '分类',
          data: [
            {id: '2', name: '全部'},
            {
              id: '2-2',
              name: '水杯',
              children: [
                {id: '2-2', name: '全部'},
                {id: '2-2-2', name: '象印'},
                {id: '2-2-3', name: '膳魔师'},
                {id: '2-2-4', name: '虎牌'}
              ]
            },
            {id: '2-3', name: '电脑'}
          ]
        }
      ]
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChangeDropdown = (tabs) => {
    var items = Object.clone(this.state.items);
    tabs.forEach((item, index) => {
      items[index].id = item.id;
      items[index].name = item.name;
    });
    this.setState({
      items: items
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <Dropdown portal={document.getElementById('root')} list={this.state.items} onChange={this.onChangeDropdown}/>
      </Container>
    </Page>
  }
};
