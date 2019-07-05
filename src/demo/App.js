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
    Bridge.debug = true;
    this.showAlert();
    setTimeout(() => {
      Bridge.showAlert('确定吗?', {
        success: (e) => {
          e.hide();
        },
        fail: (e) => {
          e.hide();
        }
      })
    }, 2000);
  }
  showAlert = () => {
    Bridge.showAlert('确定吗?', {
      success: (e) => {
        e.hide();
      },
      fail: (e) => {
        e.hide();
      },
      buttonSubmitClass: 'alert-submit button color-primary',
      buttonSubmitHTML: '哈哈',
      buttonCancelHTML: '呵呵'
    })
  }
  onPhotoChange = (list) => {
    this.setState({
      list: list
    })
  }
  onChooseBefore = () => {
    return new Promise((relsove) => {
      console.log('1');
      relsove(true);
    });
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
