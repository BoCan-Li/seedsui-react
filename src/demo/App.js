import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputText from '../lib/InputText';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount() {
  }
  onChagne = (val) => {
    // this.setState({
    //   value: val
    // })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: '裁切' , onClick: this.onSubmit}]} />
      </Header>
      <Container>
        <InputText value={this.state.value} clear onChange={this.onChagne}/>
      </Container>
    </Page>
  }
};
