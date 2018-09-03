import React, { Component } from 'react';
import {Bridge, Page, Header, Container, Alert, Titlebar, Progress} from '../lib';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    try {
      Bridge.config({debug: true, onSuccess: () => {console.log(2)}});
    }
    catch(err) {
      console.log(1)
    }
  }
  render() {
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Alert></Alert>
        <Progress percentage={50}/>
      </Container>
    </Page>
  }
};
