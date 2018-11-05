import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import InputWaiqin from '../lib/InputWaiqin';
import VideoUploader from '../lib/VideoUploader';
import WqVideoRecord from './WqVideoRecord';

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
  onClickCancel = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickSubmit = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickVideo = (args) => {
    Bridge.previewVideo({src: args.src});
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <WqVideoRecord id="1234" style={{margin: '10px 12px 10px 16px'}}/>
        <InputWaiqin placeholder="选两项" chooseType="getCustomer" chooseParams={{tradeType: '2,3'}}/>
        <VideoUploader list={[
          {
            src: 'http://res.waiqin365.com/video/v2001.MP4',
            thumb: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg',
            onClick: this.onClickVideo
          }
        ]}/>
        <a href="http://172.31.1.187:3001?isFromApp=confirm">跳转</a>
      </Container>
    </Page>
  }
};
