import React, { Component } from 'react';
import Timepart from '../lib/Timepart';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dialogShow: false
    }
  }
  componentDidMount () {
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  onSubmit = (value) => {
    console.log(value)
  }
  hideDialog = () => {
    this.setState({
      dialogShow: false
    })
  }
  showDialog = () => {
    this.setState({
      dialogShow: true
    })
  }
  onError = (err) => {
    Bridge.showToast(err.msg, {mask: false});
  }
  onChange = (times) => {
    console.log(times);
  }
  render() {
    return <Page style={{backgroundColor: 'white'}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: 'haha'}]}/>
      </Header>
      <Container>
        <Timepart onError={this.onError} onChange={this.onChange} multiple times={[{className: 'active', startTime: '08:00', endTime: '09:00', data: 'haha'}]}/>
      </Container>
    </Page>
  }
};
