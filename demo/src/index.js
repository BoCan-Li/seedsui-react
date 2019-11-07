import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Marquee} from '../../src'
const list = [
  {
    key: '1',
    value: '标题标题'
  },
  {
    key: '2',
    value: '标题标题2'
  },
  {
    key: '3',
    value: '标题标题3'
  }
]

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
        <Marquee
          className="horizontal"
          list={list}
          step={48}
          contentStyle={{height: '38px', padding: '5px 0'}}
          contentClassName="flex flex-center nowrap2"
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
