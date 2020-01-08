import React, {Component} from 'react'
import {render} from 'react-dom'
// import pdfsrc from './../assets/pdfview.js'

import {Page, Header, Titlebar, Container, Bridge, PDFView, Button, Device} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageElements: [
        {
          page: 1,
          x: 10,
          y: 10,
          HTML: '<input type="text"/>'
        },{
          page: 5,
          x: 10,
          y: 10,
          HTML: '<input type="text"/>'
        }
      ]
    }
  }
  componentDidMount () {
    // setTimeout(() => {
      // this.setState({
      //   pageElements: [
      //     {
      //       page: 2,
      //       x: 10,
      //       y: 10,
      //       HTML: '<input type="text"/>'
      //     },{
      //     page: 4,
      //     x: 10,
      //     y: 10,
      //     HTML: '<input type="text"/>'
      //   }]
      // })
    // }, 5000);
  }
  onLoad = (s) => {
    console.log('宽:' + s.width + ', 高:' + s.height + ' 除以比例' + s.scale + ' 等于宽:' + s.pageWidth +  ' 高:' + s.pageHeight);
  }
  submit = () => {
    // 格式化为[{page: 0, x: 0, y: 0, value: ''}]
    let elements = (this.refs.$PDFView.instance.getPageElements() || []).map((element) => {
      return {
        page: element.page,
        x: element.x,
        y: element.y,
        value: element.$el ? element.$el.children[0].value || '' : ''
      }
    });
    console.log(elements)
  }
  hide = () => {
    Bridge.setTitle({
      visiable: '0'
    });
  }
  open = () => {
    Bridge.openWindow({
      title: '外勤365',
      url: 'http://172.31.0.167:3000?isFromApp=1&sub=1'
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        {Device.getUrlParameter('sub') === '1' && <Button onClick={this.hide}>隐藏标题</Button>}
        {Device.getUrlParameter('sub') !== '1' && <Button onClick={this.open}>打开新窗口</Button>}
        {/* <PDFView
          ref="$PDFView"
          zoom={false}
          src={pdfsrc}
          cMapUrl="/demo/assets/cmaps/"
          params={{rows: 3, onLoad: this.onLoad, pageElements: this.state.pageElements}}
        /> */}
      </Container>
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
