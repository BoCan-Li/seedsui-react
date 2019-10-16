import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Vott, PDFView} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      pictures: ['/demo/assets/test1.png', '/demo/assets/2.png']
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        pictures: ['/demo/assets/test1.png', '/demo/assets/test2.png']
      })
    }, 2000);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
          <PDFView pictures={this.state.pictures}/>
          {/* <Vott src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg"/> */}
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
