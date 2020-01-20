import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, NumBox} from '../../src';


class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount () {
  }
  onChangeNum = (e, val) => {
    this.setState({
      value: val
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        <NumBox
          className="lg"
          digits={2}
          min={0}
          max={4}
          required
          value={this.state.value}
          onChange={this.onChangeNum}
        />
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
