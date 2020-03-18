import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, Bridge, InputLocation, QRCode, Share} from '../../src';


const Logo = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '50px',
  height: '50px',
  marginLeft: '-25px',
  marginTop: '-25px',
}

class Demo extends Component {
  constructor(props){
    super(props);
  }
  async componentDidMount () {
    Bridge.debug = true
    setTimeout(() => {
      this.setState({
        style: {color: 'red'}
      })
      setTimeout(() => {
        this.setState({
          text: ''
        })
      }, 2000);
    }, 1000);
  }
  state = {
    style: {color: 'black'},
    text: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=0&spn=0&di=7040&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1035415831%2C1465727770&os=2036467054%2C2328224179&simid=4030878874%2C470441821&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3B6zan0c_z%26e3Bv54AzdH3FkkfAzdH3Fp5rtv_z%26e3Bwfrx%3Ft1%3Dd8ln08c&gsm=1&islist=&querylist='
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
        <QRCode style={this.state.style} text={this.state.text}>
          <img style={Logo} alt="" src="//res.waiqin365.com/d/dinghuo365/logo.png"/>
        </QRCode>
      </Container>
      <Share className="button lg primary" config={config}>分享</Share>
    </Page>
  }
}
function loadBd(){
  window.BMAP_PROTOCOL = "https";
  window.BMap_loadScriptTime = (new Date).getTime();
  document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
}
// loadBd();
Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
