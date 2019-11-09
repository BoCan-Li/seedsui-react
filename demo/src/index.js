import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputDate} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount () {
    
  }
  onChange = (e, value) => {
    console.log(e.target)
    this.setState({
      value: value
    });
  }
  onError = (e, msg) => {
    console.log(e)
    console.log(msg);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <InputDate
          valueBindProp
          min={new Date().format('YYYY-MM-DD')}
          onError={this.onError}
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          pickerProps={{
            maskAttribute: {
              style: {
                zIndex: '11'
              }
            }
          }}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
