import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Checkbox} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      checked: true,
      value: ''
    }
  }
  componentDidMount () {
  }
  onClick = (checked) => {
    this.setState({
      checked: !checked
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Checkbox checked={this.state.checked} caption="设为默认" value={this.state.value} style={{display: 'block'}} onClick={(e) => this.onClick(e.target.getAttribute('data-checked') === 'true')}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
