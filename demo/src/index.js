import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, PDFView} from '../../src'
import pdfsrc from './../assets/pdfview.js';
// const pictures = ['/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png', '/demo/assets/pdfview.png']

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '1'
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (e, value) => {
    console.log(value)
    this.setState({
      value
    })
  }
  onClear = (...params) => {
    console.log(...params)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <PDFView src={pdfsrc} cMapUrl="/demo/assets/cmaps/" params={{rows: 2}}/>
        {/* <PDFView pictures={pictures} params={{rows: 0}}/> */}
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
