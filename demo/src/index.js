import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, PDFView} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      pictures: []
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        pictures: ["/demo/assets/pdfview.png"]
      })
    }, 2000);
	}
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <PDFView pictures={this.state.pictures} nodataHTML="hh"/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
