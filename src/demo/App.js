import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Tabbar from '../lib/Tabbar';
import ApiAxios from '../lib/ApiAxios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0'
    }
  }
  componentDidMount() {
    ApiAxios.setLogOut(() => {
      console.log(1)
    })
    ApiAxios.logOut('haha')
  }
  onClick = () => {
    console.log(this.refs.$handsign.state.instance.save())
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  changeDate = () => {
    this.setState({
      value: '2018-08-08'
    })
  }
  onHide = () => {
    this.setState({
      show: false
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Container>
        <input type="button" value="按钮" onClick={this.onClick}/>
        <Tabbar tiled sndCaptionStyle={{color: 'yellow'}} list={[{caption: '标题', sndcaption: '副标题副标题副标题副标题副标题'}, {caption: '标题', sndcaption: '副标题'}, {caption: '标题', sndcaption: '副标题'}, {caption: '标题', sndcaption: '副标题'}]}/>
      </Container>
    </Page>
  }
};
