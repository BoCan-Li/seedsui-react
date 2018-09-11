import React, { Component } from 'react';
import {Timepart, InputText, Page, Header, Container, Titlebar} from '../lib';

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
        <Titlebar caption="SeedsUI" rButtons={[{caption: 'haha'}]}/>
      </Header>
      <Container>
        <Timepart disabledTimes={[{startTime: "08:00", endTime: "10:00", className: null, data: 'haha'}, {startTime: '20:00', endTime: '22:00'}]} customTimes={[{startTime: "12:00", endTime: "14:00"}]} multiple/>
        <InputText/>
      </Container>
    </Page>
  }
};
