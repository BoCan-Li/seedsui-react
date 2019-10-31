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
      <div className="chat-time" style={{margin: '10px'}}>
            <div className="chat-time-text">2016-05-12 16:25</div>
          </div>
          <Chat
            icon={<div className="chat-author"> 
              <div className="chat-author-avatar" style={{backgroundImage: 'url(//res.waiqin365.com/d/dinghuo365/customer.png)'}}></div>
              <div className="chat-author-name">作者</div>
            </div>}
          >
          你们的这个碗的价格实在太贵了，我上次买了一批货，很多顾客都抱怨，要求退货！！！
          </Chat>
          <Chat
            className="right"
            caption="苏州天天批发"
            icon={<div className="chat-author"> 
              <div className="chat-author-avatar" style={{backgroundImage: 'url(//res.waiqin365.com/d/dinghuo365/service.png)'}}></div>
              <div className="chat-author-name">作者</div>
            </div>}
          >
          您好，这个碗是我们公司的高端艺术碗，由于是意大利设计师进行设计，因此定价比较高。我们公司有7天无条件退货服务，请拨打400-3456-7890进行退货操作。谢谢！
          </Chat>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
