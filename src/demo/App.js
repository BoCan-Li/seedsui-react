import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import InputWaiqin from '../lib/InputWaiqin';


export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(new Date().format('YYYY') + 'Q' + new Date().format('Q'))
  }
  render() {
    const defaultDate = new Date()
    defaultDate.nextMonth();
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <InputWaiqin chooseType="getCustomer" chooseParams={{tradeType: '2'}} className="border-b" valueBindProp placeholder="请选择" riconClassName="shape-arrow-right sm" style={{paddingRight: '10px'}}/>
      </Container>
    </Page>
  }
};
