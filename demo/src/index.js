import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, Bridge, InputDistrict, ApiAxios} from '../../src';

// 获取街道
function getStreet (districtId) {
  return new Promise((resolve) => {
    Bridge.showLoading();
    setTimeout(() => {
      Bridge.hideLoading();
      resolve([
        {
          "parentid": districtId,
          "value": "街道1",
          "key": "1",
        },
        {
          "parentid": districtId,
          "value": "街道2",
          "key": "2",
        }
      ])
      // resolve([])
      // resolve('错误')
    }, 500);
  })
}

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
  
  onChange = async (e, value, options) => {
    console.log(value)
    await this.setState({
      value: value
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <InputDistrict
          value={this.state.value}
          // type="district"
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          value={this.state.value}
          pickerProps={{
            getStreet: getStreet
          }}
        />
      </Container>
    </Page>
  }
}
function loadBd(){
  window.BMAP_PROTOCOL = "https";
  window.BMap_loadScriptTime = (new Date).getTime();
  document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
}
loadBd();
Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
