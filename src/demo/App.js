import React, { Component } from 'react';
import {Page, Header, Titlebar, Container, Emoji} from './../lib';

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
  onSubmit = (value) => {
    console.log(value)
    alert(value);
  }
  toggleEmoji = () => {
    this.setState((prevState) => {
      return {
        showEmoji: !prevState.showEmoji
      }
    })
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <Emoji
            autoFocus
            show={this.state.showEmoji}
            onChange={this.onChange}
            value={this.state.value}
            onClickMask={this.toggleEmoji}
            onClickSubmit={this.onSubmit}
          />
          <input type="button" value="显隐" onClick={this.toggleEmoji}/>
        </Container>
      </Page>
    );
  }
}

export default App;
