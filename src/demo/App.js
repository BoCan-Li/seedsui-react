import React, { Component } from 'react';
import ImgLazyInstance from '../lib/ImgLazy/instance';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
// import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Progress from '../lib/Progress';
import Dragrefresh from '../lib/Dragrefresh';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imglazy: null
    }
  }
  componentDidMount() {
    // var imglazy = new ImgLazyInstance({
    //   overflowContainer: document.getElementById('art'),
    //   load: 'scroll'
    // })
    // this.setState({
    //   imglazy
    // })
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
      <Dragrefresh lazyLoad>
        <Progress value="50" onClick={this.onClick}/>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/yin.png" style={{height: '200px'}}></div>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/mai.png" style={{height: '200px'}}></div>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/qiangshachenbao.png" style={{height: '200px'}}></div>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/yangsha.png" style={{height: '200px'}}></div>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/fuchen.png" style={{height: '200px'}}></div>
        <div data-load-src="https://api.map.baidu.com/images/weather/night/daxuezhuanbaoxue.png" style={{height: '200px'}}></div>
      </Dragrefresh>
    </PagePull>
  }
};
