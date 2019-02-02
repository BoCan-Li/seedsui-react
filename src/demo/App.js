import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import NumBoxPopPointer from '../lib/NumBoxPopPointer';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  
  onChagne = (val) => {
    this.setState({
      value: val
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <NumBoxPopPointer min={1} value={this.state.value} onChange={this.onChagne} required={false} className="lg" style={{width: '200px'}}/>
      </Container>
    </Page>
  }
};
