import React, { Component } from 'react';
import ImgLazyInstance from '../lib/ImgLazy/instance';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Grid from '../lib/Grid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imglazy: null
    }
  }
  componentDidMount() {
    var lazy = new ImgLazyInstance({
      overflowContainer: this.$elDrag.$el
    });
    setTimeout(() => {
      lazy.load();
    }, 2000);
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
      <Container ref={(el) => {this.$elDrag = el;}}>
        <Grid lazyLoad className="border-b" col="4" iconClassName="size40" iconDefaultImgStyle={{borderRadius: '100%'}} list={[{caption: '111', iconSrc: 'https://api.map.baidu.com/images/weather/night/yin.png'}]}/>
      </Container>
    </PagePull>
  }
};
