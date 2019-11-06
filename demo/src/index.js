import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, PDFView} from '../../src'
import pdfsrc from './../assets/pdfview.js'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      src: '/demo/assets/pdfview.pdf'
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        src: pdfsrc
      })
    }, 2000);
  }
  onLoadPDF = () => {
    console.log('加载PDF完成')
  }
  onInitPDF = () => {
    console.log('开始加载PDF')
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <PDFView src={this.state.src} cMapUrl="/demo/assets/cmaps/" params={{onLoad: this.onLoadPDF, onInit: this.onInitPDF}}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
