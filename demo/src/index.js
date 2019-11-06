import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Alert} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false
    }
  }
  componentDidMount () {
  }
  onClick = () => {
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Alert
          show={this.state.show}
          style={{color: 'green'}}
          className="transition-duration-0"
          maskAttribute={{className: "transition-duration-0"}}
          portal={document.body}
          submitAttribute={{onClick: this.onClick, className: 'primary', disabled: false}}
          cancelAttribute={{onClick: this.onClick}}
          captionAttribute={{style: {padding: '30px 12px 5px 12px'}}}
          contentAttribute={{style: {padding: '15px 12px 20px 12px'}}}
        >
          <div>hhh</div>
        </Alert>
        <input type="button" value="显隐" onClick={this.onClick}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
