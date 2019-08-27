import React, { Component } from 'react';
import {Page, Header, Titlebar, Container, InputNumber, Bridge} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmoji: false,
      value: '',
      readOnly: false
    }
  }
  componentDidMount () {
    if (Bridge.qmfpay) Bridge.qmfpay({}, (res) => {
      if (res.resultCode !== '0000') {
        console.log(res)
        let resultInfo = res.resultInfo;
        if (resultInfo && typeof resultInfo === 'string') {
          try {
            resultInfo = JSON.parse(resultInfo);
          } catch (err) {
            console.log('JSON.parse(resultInfo)失败');
          }
        }
        Bridge.showToast(resultInfo && resultInfo.resultMsg ? resultInfo.resultMsg : '支付失败', {mask: false});
      }
    });
  }
  onChange = (value) => {
    this.setState({
      value: value,
      readOnly: value > 100
    })
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <InputNumber maxLength="11" clear/>
        </Container>
      </Page>
    );
  }
}

export default App;
