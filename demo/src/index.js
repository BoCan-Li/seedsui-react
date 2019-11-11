import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Marquee, Bridge} from '../../src'

const list = [
  {
    key: '1',
    value: '标题标题1'
  },
  {
    key: '2',
    value: '标题标题2'
  }
]

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '12341234'
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (e, value) => {
    this.setState({
      value: value
    })
  }
  onClick = (...params) => {
    console.log(...params)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <Marquee
          list={list}
          onClick={this.onClick}
          step={48}
          contentAttribute={{
            style: {height: '38px', padding: '5px 0'},
            className: 'flex flex-center nowrap2'
          }}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
