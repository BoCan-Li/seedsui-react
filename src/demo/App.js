import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import Emoji from '../lib/Emoji';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showEmoji: true
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value) => {
    this.setState({
      value: value
    })
  }
  render() {
    const {value} = this.state;
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <Emoji show={this.state.showEmoji} onChange={this.onChange} value={value}/>
      </Container>
    </Page>
  }
};
