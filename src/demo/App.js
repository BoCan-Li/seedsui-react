import React, { Component } from 'react';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';
import ImgUploader from './../lib/ImgUploader';
import EventUtil from './../lib/EventUtil';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: '',
          src: '',
          thumb: '',
          serverId: ''
        }
      ]
    }
  }
  componentDidMount () {
    const target = document.getElementById('vconsoleHandler');
    EventUtil.addHandler(target, 'countclick', (e) => {
      console.log('count:' + e.count + ',code:' + e.code);
    })
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <ImgUploader
            onChooseBefore={this.onChooseBefore}
            caption="上传照片"
            showUpload
            showDelete
            list={this.state.list}
            onChange={this.onPhotoChange}
            chooseRepeat
          />
        </Container>
      </Page>
    );
  }
}

export default App;
