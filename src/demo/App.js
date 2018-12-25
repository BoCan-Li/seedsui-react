import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import NumBoxPopPointer from '../lib/NumBoxPopPointer';
import InputPhone from '../lib/InputPhone';
import WqImgUpload from './components/WqImgUpload';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: '5.00'
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
        <NumBoxPopPointer min={0} digits={2} max="5.00" value={this.state.value} onChange={this.onChange} onBlur={() => {console.log('1')}} unit="箱"/>
        <InputPhone/>
        <WqImgUpload/>
        <WqImgUpload/>
        <WqImgUpload/>
        <WqImgUpload/>
        <WqImgUpload/>
        <WqImgUpload/>
        <WqImgUpload/>
      </Container>
    </Page>
  }
};
