import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, ConfigProvider, InputDate, Player, InputText, Carrousel, QRCode} from '../../src';
import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

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
    this.state = {
      color: {color: 'green'},
      locale: zhCN
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        color: {color: 'red'}
      })
    }, 3000);
  }
  useZh = () => {
    this.setState({
      locale: zhCN
    });
  }
  useEn = () => {
    this.setState({
      locale: enUS
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <input type="button" value="英文" onClick={this.useEn}/>
        <input type="button" value="中文" onClick={this.useZh}/>
        <ConfigProvider portal={document.getElementById('demo')} locale={this.state.locale}>
          <InputDate type="datetime"/>
        </ConfigProvider>
        <Player
          src={`//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/voice.mp4`}
          style={{width: '319px'}}>
          <img alt="" src="//res.waiqin365.com/d/waiqin365_h5/leaflet/voice/page2.png" style={{width: '319px'}}/>
        </Player>
        <div onClick={() => Bridge.showConfirm('1')}>
          <InputText placeholder="hh"/>
        </div>
        <Carrousel pagination>
          <div style={{paddingBottom: '20px'}}>
            <ul className="menus">
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/ffxy.png" className="width-full height-full" /></i><p>付费协议</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/hetong.png" className="width-full height-full" /></i><p>我的合同</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/hdzx.png" className="width-full height-full" /></i><p>活动查询</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/mendian_collect.png" className="width-full height-full" /></i><p>收藏商品</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/mendian_often_buy.png" className="width-full height-full" /></i><p>常购商品</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/duizhangdan.png" className="width-full height-full" /></i><p>对账单</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/mendian_task.png" className="width-full height-full" /></i><p>奖励任务</p></li>
              <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/feedback.png" className="width-full height-full" /></i><p>投诉反馈</p></li>
            </ul>
          </div>
          <ul className="menus">
            <li><i className="icon size40 bg-no-img"><img src="https://image-test.waiqin365.com/emserver/icon/quanhuishou.png" className="width-full height-full" /></i><p>券回收查询</p></li>
          </ul>
        </Carrousel>
        <QRCode style={this.state.color} text="https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%9B%BE%E7%89%87&hs=2&pn=0&spn=0&di=7040&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=1035415831%2C1465727770&os=2036467054%2C2328224179&simid=4030878874%2C470441821&adpicid=0&lpn=0&ln=30&fr=ala&fm=&sme=&cg=&bdtype=0&oriquery=%E5%9B%BE%E7%89%87&objurl=http%3A%2F%2Fa3.att.hudong.com%2F68%2F61%2F300000839764127060614318218_950.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3B6zan0c_z%26e3Bv54AzdH3FkkfAzdH3Fp5rtv_z%26e3Bwfrx%3Ft1%3Dd8ln08c&gsm=1&islist=&querylist=">
          <img style={Logo} alt="" src="//res.waiqin365.com/d/dinghuo365/logo.png"/>
        </QRCode>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
