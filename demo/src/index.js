import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputPicker} from '../../src'

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
  onChange = (e, value, option) => {
    console.log(e.target)
    console.log(value, option)
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
        <InputPicker
          list={this.state.list}
          valueBindProp
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
          pickerProps={{
            maskAttribute: {
              style: {zIndex: '11'},
              className: "bg-white"
            }
          }}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
