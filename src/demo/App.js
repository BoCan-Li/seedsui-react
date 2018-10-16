import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import VideoUploader from '../lib/VideoUploader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      list: [
        {
          id: '1',
          src: 'http://res.waiqin365.com/video/v2001.MP4',
          type: 'video'
        }
      ]
      
    }
  }
  componentDidMount() {
  }
  onChagne = (e) => {
    var input = e.target;
    var file = input.files && input.files[0] ? input.files[0] : null;
    console.log(file);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <VideoUploader list={this.state.list}caption={"拍照上传"} showUpload showDelete showCount onChange={this.onChange} max={15} sourceType={['camera']}/>
      </Container>
    </Page>
  }
};
