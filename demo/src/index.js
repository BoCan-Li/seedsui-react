import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputLocation, Bridge} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '1'
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (e, value) => {
    console.log(value)
    this.setState({
      value
    })
  }
  onClear = (...params) => {
    console.log(...params)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <InputLocation value={this.state.value} placeholder="请点击获取位置信息" onChange={this.onChange}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
