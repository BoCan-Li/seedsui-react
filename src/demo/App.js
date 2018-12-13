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
      value: ''
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value) => {
    // console.log(value)
    this.setState({
      value
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <NumBox style={{width: '100%'}} value={this.state.value} min={0} max={10} digits={2} onChange={this.onChange}/>
      </Container>
    </Page>
  }
};
