import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Carrousel} from '../../src';

const imgList1 = [
  {
    bg: 'http://thumbs.dreamstime.com/b/%E5%A4%A9%E9%99%85%E6%B5%B7%E6%B5%B7%E6%B4%8B%E5%92%8C%E8%93%9D%E5%A4%A9%E8%83%8C%E6%99%AF%E5%AE%89%E9%9D%99-100160983.jpg'
  },
  {
    bg: 'http://photo.tuchong.com/24951/f/32312037.jpg'
  }
]
const imgList2 = [
  {
    bg: 'http://youimg1.c-ctrip.com/target/tg/616/052/178/ceeddf2de3a74df184bcacc9e6b3123c.jpg'
  },
  {
    bg: 'http://img1.cache.netease.com/catchpic/4/45/45F29E5ABA21EBBE1E8B50C2FA6D8EB4.jpg'
  }
]

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgList: imgList1
    }
  }
  componentDidMount () {
    Bridge.previewImage({urls: ['http://thumbs.dreamstime.com/b/%E5%A4%A9%E9%99%85%E6%B5%B7%E6%B5%B7%E6%B4%8B%E5%92%8C%E8%93%9D%E5%A4%A9%E8%83%8C%E6%99%AF%E5%AE%89%E9%9D%99-100160983.jpg']})
    setTimeout(() => {
      Bridge.previewImage({urls: ['http://photo.tuchong.com/24951/f/32312037.jpg']})
    }, 2000);
  }
  onCarrouselChange = async (e) => {
    console.log(e.activeIndex)
    await this.setState({
      activeIndex: e.activeIndex
    });
    console.log(e);
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
      <Carrousel
  list={this.state.imgList}
  style={{height: '300px'}}
  pagination
  loop
  activeIndex={this.state.activeIndex}
  onChange={this.onCarrouselChange}
/>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
