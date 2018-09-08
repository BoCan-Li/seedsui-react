import React, { Component } from 'react';
import {Timepart, Page, Header, Container, Titlebar} from '../lib';

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
  render() {
    return <Page style={{backgroundColor: 'white'}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Timepart/>
      </Container>
    </Page>
  }
};
