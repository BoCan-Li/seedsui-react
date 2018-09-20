import React, { Component } from 'react';
// import ImgLazyInstance from '../lib/ImgLazy/instance';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import List from '../lib/List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imglazy: null
    }
  }
  componentDidMount() {
  }
  onClick = (arg) => {
    console.log(arg)
    this.state.imglazy.load()
  }
  render() {
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Container>
        <List caption="商品" showAvatar lazyLoad avatarSrc="//image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320"/>
      </Container>
    </PagePull>
  }
};
