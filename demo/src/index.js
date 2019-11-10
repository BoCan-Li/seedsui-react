import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputPicker, Bridge} from '../../src'

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
  onChange = (...params) => {
    console.log(...params)
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
        <InputPicker placeholder="点击选择地区" onClick={this.onClick} onChange={this.onChange}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
