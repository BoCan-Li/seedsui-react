import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, InputDate, Bridge, ConfigProvider, Share} from '../../src';
import Context from '../../src/Context';
import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

class Demo extends Component {
  constructor(props){
    super(props);
  }
  async componentDidMount () {
  }
  state = {
    language: 'zh_CN'
  }
  
  useZh = () => {
    this.setState({
      language: 'zh_CN'
    });
  }
  useEn = () => {
    this.setState({
      language: 'en_US'
    });
  }
  
  render() {
    let config = {
      title: `订货分享标题`, // 分享标题
      desc: `订货分享副标题`, // 分享描述
      link: `${window.location.origin}/_react_/inviteRegister`, // 分享链接
      imgUrl: 'http://res.waiqin365.com/d/wework/icon/logo.png' // 分享封面
    }
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <input type="button" value="英文" onClick={this.useEn}/>
        <input type="button" value="中文" onClick={this.useZh}/>
        <Context portal={document.getElementById('demo')} language={this.state.language}>
          <InputDate type="datetime"/>
          <Share className="button lg primary" config={config}>分享</Share>
        </Context>
      </Container>
    </Page>
  }
}
// function loadBd(){
//   window.BMAP_PROTOCOL = "https";
//   window.BMap_loadScriptTime = (new Date).getTime();
//   document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
// }
// loadBd();
Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
