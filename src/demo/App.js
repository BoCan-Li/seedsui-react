import React, { Component } from 'react';
import {Page, Header, Titlebar, Container, InputNumber} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      value: '',
      readOnly: false
    }
  }
  componentDidMount () {
    // Device.adapterIPhoneX();
    console.log((86745000).toDateByMilli('hour'))
  }
  onChange = (value) => {
    this.setState({
      value: value,
      readOnly: value > 100
    })
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <InputNumber maxLength="11" clear/>
        </Container>
      </Page>
    );
  }
}

export default App;
