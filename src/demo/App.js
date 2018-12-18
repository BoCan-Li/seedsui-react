import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import InputText from '../lib/InputText';

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
    console.log(value);
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
  onChangeBarcode = () => {
    this.setState({
      value: '1234'
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <InputText valueBindProp clear placeholder="文本框" value={this.state.value} onChange={this.onChange}/>
        <input type="button" value="haha" onClick={this.onChangeBarcode}></input>
        <InputText placeholder="文本框" clear value="fdsada"/>
      </Container>
    </Page>
  }
};
