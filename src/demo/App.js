import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Player from '../lib/Player';
import VideoUploader from '../lib/VideoUploader';

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
  
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <Player src="http://res.waiqin365.com/video/v2001.MP4" poster="https://static.zcool.cn/git_z/z/common/images/svg/logo.svg"/>
        <VideoUploader list={[
          {
            src: 'http://res.waiqin365.com/video/v2001.MP4',
            thumb: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg'
          }
        ]}/>
      </Container>
    </Page>
  }
};
