import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Notice} from '../../src'

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
        <Notice content="aa" contentHTML='<p>hh</p>'/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
