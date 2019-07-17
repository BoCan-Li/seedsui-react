import React, { Component } from 'react';
import Bridge from './../lib/Bridge';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';
import ImgUploader from './../lib/ImgUploader';


class App extends Component {
  static mapUtil = {}
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
    if (Bridge.onHistoryBack) {
      Bridge.onHistoryBack(() => {
        Bridge.showAlert('呵呵');
        return false;
      })
    }
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
