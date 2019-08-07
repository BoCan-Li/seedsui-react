import React, { Component } from 'react';
import {Page, Header, Titlebar, Container, InputNumber, NumBox} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount () {
    console.log(Math.Calc.toFixed('100.00', 2))
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  onError = (err) => {
    console.log(err);
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <NumBox max="100" min="10" value={this.state.value} onChange={this.onChange} className="lg" digits="2" maxLength="11" onError={this.onError} clear style={{width: '200px'}}/>
          <InputNumber valueBindProp max="100" min="10" value={this.state.value} onChange={this.onChange} className="lg" maxLength="100" onError={this.onError} clear style={{width: '200px'}}/>
        </Container>
      </Page>
    );
  }
}

export default App;
