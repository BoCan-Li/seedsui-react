import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Chat} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
	}
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
          <Chat
            icon={<div className="chat-author"> 
              <div className="chat-author-avatar"></div>
              {/* <div className="chat-author-name">作者</div> */}
            </div>}
          >
            内容
          </Chat>
          <Chat
            className="right"
            icon={<div className="chat-author"> 
              <div className="chat-author-avatar"></div>
              {/* <div className="chat-author-name">作者</div> */}
            </div>}
          >
            中华人民共和国中华人民共和国中华人民共和国中华人民共和国
          </Chat>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
