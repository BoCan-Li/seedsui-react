import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Alert} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      pictures: []
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        pictures: ["/demo/assets/pdfview.png"]
      })
    }, 2000);
  }
  onClick = (e) => {
    e.hide()
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Alert show className="bg-primary" style={{color: 'red'}} portal={document.body} duration={0} submitAttribute={{onClick: this.onSubmit, className: 'primary', disabled: false}} cancelAttribute={{onClick: this.onCancel}} captionAttribute={{style: {padding: '30px 12px 5px 12px'}}} contentAttribute={{style: {padding: '15px 12px 20px 12px'}}}>
          <div>hhh</div>
        </Alert>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
