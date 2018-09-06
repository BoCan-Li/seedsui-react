import React, { Component } from 'react';
import {Bridge, Page, Header, Container, Alert, Titlebar, Button} from '../lib';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogShow: false
    }
  }
  componentDidMount () {
  }
  hideDialog = () => {
    this.setState({
      dialogShow: false
    })
  }
  showDialog = () => {
    Bridge.showAlert('hahah')
  }
  render() {
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Button className="primary" onClick={this.showDialog}>显示</Button>
        <Alert show={this.state.dialogShow} iconClassName="icon-rdo-ok-fill" submitCaption="好的，我已知晓" caption="提交成功，请线下及时完成支付！" onClickSubmit={()=> {}} onClickCancel={this.hideDialog}></Alert>
      </Container>
    </Page>
  }
};
