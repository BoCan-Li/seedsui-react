import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputPre} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '333',
      list: [
        {
          key: '1',
          value: '111'
        },
        {
          key: '2',
          value: '222'
        },
        {
          key: '3',
          value: '333'
        }
      ]
    }
  }
  componentDidMount () {
    
  }
  onClick = (e, value) => {
    console.log(e.target)
    console.log(value)
  }
  onChange = (e, value) => {
    console.log(e.target)
    console.log(value)
    this.setState({
      value: value
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <InputPre
          maxLength={11}
          valueBindProp
          value={this.state.value}
          onChange={this.onChange}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
