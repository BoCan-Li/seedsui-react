import React, {Component} from 'react'
import {render} from 'react-dom'
import pdfsrc from './../assets/pdfview.js'

import {Page, Header, Titlebar, Container, Bridge, PDFView} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageElements: [
        {
          page: 0,
          x: 10,
          y: 10,
          HTML: '<input type="text"/>'
        }
      ]
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onLoad = (s) => {
    console.log('宽:' + s.width + ', 高:' + s.height + ' 除以比例' + s.scale + ' 等于宽:' + s.pageWidth +  ' 高:' + s.pageHeight);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <PDFView zoom={false} src={pdfsrc} cMapUrl="/demo/assets/cmaps/" params={{rows: 3, onLoad: this.onLoad, pageElements: this.state.pageElements}}/>
        {/* <PDFView pictures={["/demo/assets/pdfview.png"]} params={{rows: 3, onLoad: this.onLoad}}/> */}
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
