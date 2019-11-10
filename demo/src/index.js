import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Button, Bridge} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (e, value) => {
    console.log(e.target);
    this.setState({
      value
    })
  }
  onClick = (e) => {
    console.log(e.target)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <Button className="lg primary">提交</Button>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
