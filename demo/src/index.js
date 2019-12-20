import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Photos} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [{
        id: '1',
        thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
        src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
      },{
        id: '2',
        thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
        src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
      }]
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onClick = (...params) => {
    console.log(...params)
  }
  onChoose = (...params) => {
    console.log(...params)
  }
  onDelete = (...params) => {
    console.log(...params)
  }
  onFile = (...params) => {
    console.log(...params)
  }
  render() {
    const {fee} = this.state;
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Photos
          list={this.state.list}
          onFile={this.onFile}
          onChoose={this.onChoose}
          onDelete={this.onDelete}
          onClick={this.onClick}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
