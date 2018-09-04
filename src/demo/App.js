import React, { Component } from 'react';
import {Bridge, Page, Header, Container, Alert, Titlebar} from '../lib';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  render() {
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Alert show iconClassName="icon-rdo-ok" submitCaption="好的，我已知晓" caption="提交成功，请线下及时完成支付！" onClickSubmit={()=> {}}><p className="text-center">提交成功，请线下及时完成支付！</p></Alert>
      </Container>
    </Page>
  }
};
