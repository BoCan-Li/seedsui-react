import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, Bridge, InputLocation, ApiAxios, Share} from '../../src';


class Demo extends Component {
  constructor(props){
    super(props);
  }
  async componentDidMount () {
    Bridge.debug = true
  }
  state = {
    value: ''
  }
  
  onChange = (e, value) => {
    console.log(e.target);
    this.setState({
      value
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <InputLocation value={this.state.value} placeholder="请点击获取位置信息" onChange={this.onChange}/>
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
