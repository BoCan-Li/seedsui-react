import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputWaiqin from '../lib/InputWaiqin';
import InputLocation from '../lib/InputLocation';
import InputText from '../lib/InputText';
import Bridge from '../lib/Bridge';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      value: ''
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value, opt) => {
    this.setState({
      id: Object.type(opt) === 'array' ? opt.map((item) => {return item.id}).join(',') : opt.id,
      value: value
    })
  }
  onClick = (value, args) => {
    console.log(value, args);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <InputWaiqin chooseType="getCustomer" valueBindProp chooseParams={{tradeType: ''}} onChange={this.onChange} value={this.state.value} valueForKey={this.state.id} placeholder="客户单择"/>
        <InputWaiqin chooseType="getCustomerMore" chooseParams={{tradeType: ''}} placeholder="客户多择"/>
        <InputWaiqin chooseType="getContact" placeholder="全部员工"/>
        <InputWaiqin chooseType="getContact" chooseParams={{aclType: '0'}} placeholder="下属员工"/>
        <InputWaiqin chooseType="getLocationMap" placeholder="地图"/>
        <InputLocation placeholder="定位" onChange={this.onChange}/>
        <InputText clearStyle={{height: '42px'}} args="haha" clear placeholder="文本框" liconClassName="icon-rdo-minus-fill color-primary" onClickLicon={this.onClick}/>
      </Container>
    </Page>
  }
};
