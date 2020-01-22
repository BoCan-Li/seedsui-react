import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge} from '../../src';

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    Bridge.showLoading({caption: '1'})
    setTimeout(() => {
      Bridge.showLoading({caption: '2'})
    }, 1000);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
        
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
