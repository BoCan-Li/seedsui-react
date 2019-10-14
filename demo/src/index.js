import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Vott} from '../../src'

class Demo extends Component {
  componentDidMount () {
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
          <Vott/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
