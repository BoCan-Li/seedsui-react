import React, { Component } from 'react';
import Page from 'components/seedsui/Page';
import Header from 'components/seedsui/Header';
import Titlebar from 'components/seedsui/Titlebar';
import Container from 'components/seedsui/Container';
import Handsign from 'components/seedsui/Handsign';
import Button from 'components/seedsui/Button';
import Toast from 'components/seedsui/Toast';
import ImgStamp from './stamp.png';

export default class HandsignDemo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toastMsg: '',
      toastShow: false,
      saveSrc: ''
    }
  }
  componentDidMount = () => {
  }
  componentWillUnmount() {
  }
  showMsg = (msg) => {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.setState({
      toastMsg: msg,
      toastShow: true
    });
    this.timeout = setTimeout(() => {
      this.setState({
        toastShow: false
      });
    }, 2000);
  }
  addImg = () => {
    this.$handsign.state.instance.drawImg(ImgStamp, {
			width: 100,
			height: 100,
			position: 'right bottom'
		})
  }
  addText = () => {
    this.$handsign.state.instance.drawFont('本人已对帐单确认无误', {
      fontSize: 16,
      position: 'bottom center'
    })
  }
  save = () => {
    var data = this.$handsign.state.instance.save();
    console.log(data);
    this.setState({
      saveSrc: data
    })
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="手写签名"/>
        </Header>
        <Container>
          <Handsign className="group" width={`${window.innerWidth}`} ref={(el) => {this.$handsign = el;}}/>
          <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.addImg}>添加图片水印</Button>
          <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.addText}>添加文字水印</Button>
          <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.save}>保存</Button>
          {this.state.saveSrc && <img alt="" src={this.state.saveSrc}/>}
        </Container>
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle"/>
      </Page>
    )
  }
}
