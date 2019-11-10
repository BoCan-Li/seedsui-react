import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputStar} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0
    }
  }
  componentDidMount () {
  }
  onChange = (e, value) => {
    this.setState({
      value
    })
  }
  onError = (e, error) => {
    console.log(error)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <InputStar
          min={3}
          value={this.state.value}
          onChange={this.onChange}
          onError={this.onError}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
