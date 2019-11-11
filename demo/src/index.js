import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, OnOff, Bridge} from '../../src'

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
      checked: false
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
  onClick = (e, checked) => {
    this.setState({
      checked: !checked
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <OnOff caption="全选" checked={this.state.checked} onClick={this.onClick} onAttribute={{caption: '开'}} offAttribute={{caption: '关'}}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
