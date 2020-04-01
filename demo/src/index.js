import React, {Component} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {Page, Header, Titlebar, Container, Bridge, InputLocation, InputDistrict} from '../../src';

class Demo extends Component {
  constructor(props){
    super(props);
  }
  async componentDidMount () {
  }
  state = {
    value: ''
  }
  
  onChange = (e, value) => {
    console.log(e.event)
    this.setState({
      value: value
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        {/* <InputLocation placeholder="地址"/> */}
        <InputDistrict
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          value="江苏省-南京市-建邺区"
          pickerProps={{
            maskAttribute: {
              style: {zIndex: '11'}
            }
          }}
        />
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
