import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import InputWaiqin from '../lib/InputWaiqin';
import InputDate from '../lib/InputDate';
import VideoUploader from '../lib/VideoUploader';
import WqVideoRecord from './WqVideoRecord';
import WqImgUpload from './WqImgUpload';
import Progress from '../lib/Progress';
import Timeline from '../lib/Timeline';
import InputSelect from '../lib/InputSelect';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picList: [{upload: true, id: '43213421', thumb: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', src: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg'}],
      id: '',
      value: '',
      color: "#c72a1d",
      date: '',
      date_name: ''
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onWqPhotoChange = (list) => {
    console.log(list)
    this.setState({
      picList: list
    });
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
  onChangeColor = () => {
    this.setState({
      color: 'green'
    })
  }
  onChange = (value, option) => {
    console.log(value)
    console.log(option)
    this.setState({
      date: value,
      date_name: option.map((item, index) => {
        return item.value
      }).join('-')
    });
  }
  render() {
    const {picList} = this.state;
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
        <InputDate type="date" valueBindProp value={this.state.date_name} valueForKey={this.state.date} placeholder="选日期" onChange={this.onChange}/>
        <WqImgUpload list={picList} onChange={this.onWqPhotoChange}/>
        <Progress percentage={200}/>
        <Timeline list={[
          {
            active: true,
            content: <div style={{paddingBottom: '10px'}}>第一个</div>,
            children: <hr style={{paddingBottom: '10px'}}/>
          },
          {
            active: false,
            content: <div style={{paddingBottom: '10px'}}>第二个</div>
          }
        ]}/>
        <InputSelect placeholder="haha" split="," valueForKey="1,2" multiple list={[
          {
            key: '1',
            value: '1呀'
          },
          {
            key: '2',
            value: '2呀'
          },
          {
            key: '3',
            value: '3呀'
          }
        ]}/>
      </Container>
    </Page>
  }
};
