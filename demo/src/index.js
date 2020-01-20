import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, PDFView} from '../../src';


class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount () {
  }
  onChangeNum = (e, val) => {
    this.setState({
      value: val
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <PDFView src={'/demo/assets/pdfview.pdf'} cMapUrl="/demo/assets/cmaps/" params={{rows: 3}}/>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
