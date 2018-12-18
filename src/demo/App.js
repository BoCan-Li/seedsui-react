import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import InputDate from '../lib/InputDate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: '2121'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  showPicker = () => {
    this.setState({
      show: true
    })
  }
  hidePicker = (e) => {
    console.log(e);
    this.setState({
      show: false
    })
  }
  onClickSubmit = (e) => {
    console.log(e);
    this.setState({
      value: e.activeText,
      show: false
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <InputDate pickerShow={this.state.show} valueBindProp value={this.state.value} onClick={this.showPicker} onClickSubmit={this.onClickSubmit} onClickCancel={this.hidePicker} onClickMask={this.hidePicker} placeholder="xx"/>
        <InputDate placeholder="ss"/>
      </Container>
    </Page>
  }
};
