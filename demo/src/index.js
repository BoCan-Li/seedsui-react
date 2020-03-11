import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, ConfigProvider, InputDate, Player, InputText, Carrousel} from '../../src';
import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      locale: zhCN
    }
  }
  componentDidMount () {
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
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
