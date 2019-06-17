import React, { Component } from 'react';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';

class App extends Component {
  static mapUtil = {}
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          
        </Container>
      </Page>
    );
  }
}

export default App;
