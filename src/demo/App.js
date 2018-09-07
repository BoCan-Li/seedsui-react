import React, { Component } from 'react';
import {BiDoughnut, BiGauge, InputArea, Page, Header, Container, Titlebar} from '../lib';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShow: false
    }
  }
  componentDidMount () {
  }
  hideDialog = () => {
    this.setState({
      dialogShow: false
    })
  }
  showDialog = () => {
    this.setState({
      dialogShow: true
    })
  }
  render() {
    return <Page style={{backgroundColor: 'white'}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <InputArea placeholder="输入"/>
        <BiDoughnut className="warn" rotate={35} size={100} lineWidth={10}>haha</BiDoughnut>
        <BiGauge rotate={360}>haha</BiGauge>
      </Container>
    </Page>
  }
};
