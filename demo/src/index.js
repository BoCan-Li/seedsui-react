import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, Bridge, Carrousel, InputLocation} from '../../src';

class Demo extends Component {
  constructor(props){
    super(props);
  }
  async componentDidMount () {
  }
  state = {
    show: false,
    menus: []
  }
  
  changeMenus = (show) => {
    if (show) {
      this.setState({
        show: show,
        menus: [
          <div style={{paddingBottom: '20px'}}>
            <ul className="menus">
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/quanhuishou.png)`, backgroundSize: '100%'}}></div></i><p>券回收查询</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/ffxy.png)`, backgroundSize: '100%'}}></div></i><p>付费协议</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/sale_return.png)`, backgroundSize: '100%'}}></div></i><p>销售退货</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/hdzx.png)`, backgroundSize: '100%'}}></div></i><p>活动查询</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_collect.png)`, backgroundSize: '100%'}}></div></i><p>收藏商品</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_often_buy.png)`, backgroundSize: '100%'}}></div></i><p>常购商品</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/duizhangdan.png)`, backgroundSize: '100%'}}></div></i><p>对账单</p></li>
              <li><i className="icon size40 bg-no-img">
                <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_task.png)`, backgroundSize: '100%'}}></div></i><p>奖励任务</p></li>
            </ul>
          </div>
        ]
      })
    } else {
      this.setState({
        show: show,
        menus: [<div style={{paddingBottom: '20px'}}>
          <ul className="menus">
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/hdzx.png)`, backgroundSize: '100%'}}></div></i><p>活动查询</p></li>
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_collect.png)`, backgroundSize: '100%'}}></div></i><p>收藏商品</p></li>
          </ul>
        </div>,
        <div style={{paddingBottom: '20px'}}>
          <ul className="menus">
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/hdzx.png)`, backgroundSize: '100%'}}></div></i><p>活动查询</p></li>
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_collect.png)`, backgroundSize: '100%'}}></div></i><p>收藏商品</p></li>
          </ul>
        </div>,
        <div style={{paddingBottom: '20px'}}>
          <ul className="menus">
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/hdzx.png)`, backgroundSize: '100%'}}></div></i><p>活动查询</p></li>
            <li><i className="icon size40 bg-no-img">
              <div className="bg-transparent width-full height-full" style={{backgroundImage: `url(https://image-test.waiqin365.com/emserver/icon/mendian_collect.png)`, backgroundSize: '100%'}}></div></i><p>收藏商品</p></li>
          </ul>
        </div>]
      });
    }
  }

  render() {
    const {
      menus
    } = this.state;
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        {menus.length && <Carrousel pagination={menus.length > 1} style={{backgroundColor: 'red'}}>
          {menus.map((menu) => {
            return menu
          })}
        </Carrousel>}
        <input type="button" onClick={() => this.changeMenus(!this.state.show)} value="修改"/>
        <InputLocation/>
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
