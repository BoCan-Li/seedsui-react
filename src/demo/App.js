import React, { Component } from 'react';
import Alert from '../lib/Alert';
import Timepart from '../lib/Timepart';
import InputText from '../lib/InputText';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dialogShow: false
    }
  }
  componentDidMount () {
    var date = new Date();
    date.nextDate();
    console.log(date);
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
        <Alert show caption="hehe" submitClassName="disabled" onClickSubmit={() => {}} onClickCancel={() => {}}/>
        <Timepart disabledTimes={[{startTime: "08:00", endTime: "10:00", className: null, data: 'haha'}, {startTime: '20:00', endTime: '22:00'}]} customTimes={[{startTime: "12:00", endTime: "14:00"}]} multiple/>
        <InputText/>
      </Container>
    </Page>
  }
};
