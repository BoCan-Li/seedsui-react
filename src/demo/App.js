import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import NumBox from '../lib/NumBox';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      $overflowContainer: null
    }
  }
  componentDidMount() {
    Bridge.debug = true;
    this.setState({
      $overflowContainer: this.$el ? this.$el.parentNode : null
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <NumBox/>
      </Container>
    </Page>
  }
};
