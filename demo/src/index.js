import React, {Component} from 'react'
import {render} from 'react-dom'
import pdfsrc from './../assets/pdfview.js'

import {Page, Header, Titlebar, Container, PDFView} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <PDFView src={'/demo/assets/pdfview.pdf'} cMapUrl="/demo/assets/cmaps/"/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
