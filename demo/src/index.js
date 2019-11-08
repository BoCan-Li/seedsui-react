import React, {Component} from 'react'
import {render} from 'react-dom'
import pdfsrc from './../assets/pdfview.js'

import {Page, Header, Titlebar, Container, Emoji} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      showEmoji: false,
      value: ''
    }
  }
  componentDidMount () {
    
  }
  onChange = (value) => {
    console.log(value)
    this.setState({
      value: value
    })
  }
  
  toggleEmoji = () => {
    this.setState((prevState) => {
      return {
        showEmoji: !prevState.showEmoji
      }
    })
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
      <Emoji
      portal={document.body}
  autoFocus
  show={this.state.showEmoji}
  onChange={this.onChange}
  value={this.state.value}
  maskAttribute={{onClick: this.toggleEmoji}}
/>
<input type="button" value="显隐" onClick={this.toggleEmoji}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
