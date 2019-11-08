import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputCity} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '新疆,乌鲁木齐市,天山区'
    }
  }
  componentDidMount () {
    
  }
  onChange = (value) => {
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
        <InputCity
          valueBindProp
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          pickerProps={{
            split: ',',
            maskAttribute: {
              style: {zIndex: '11'}
            }
          }}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
