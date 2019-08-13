import React, { Component } from 'react';
import {Page, Header, Titlebar, Container, InputPhone, NumBox} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      value: ''
    }
  }
  componentDidMount () {
    // Device.adapterIPhoneX();
  }
  onChange = (value) => {
    this.setState({
      value: value
    })
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <InputPhone maxLength="11" digits="2"/>
          <NumBox value={this.state.value} onChange={this.onChange}/>
        </Container>
      </Page>
    );
  }
}

export default App;
