import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Badge} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
  }
  onClick = (e) => {
    console.log(e.target)
    var src = e.target.getAttribute('data-src');
    Bridge.previewVideo({src: src});
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <Badge limit={0}>100000asdf0</Badge>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
