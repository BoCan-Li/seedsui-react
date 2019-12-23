import React, {Component} from 'react'
import {render} from 'react-dom'
import pdfsrc from './../assets/pdfview.js'

import {Page, Header, Titlebar, Container, Bridge, PDFView} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onLoad = (s) => {
    console.log(s)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <PDFView zoom={false} src={pdfsrc} cMapUrl="/demo/assets/cmaps/" params={{rows: 3, onLoad: this.onLoad}}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
