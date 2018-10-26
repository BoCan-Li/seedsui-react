import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Carrousel from '../lib/Carrousel';
import Titlebar from '../lib/Titlebar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      list: [
        {
          id: '1',
          src: 'http://res.waiqin365.com/video/v2001.MP4',
          type: 'video'
        }
      ]
      
    }
  }
  componentDidMount() {
    // 适配刘海屏和andriod5.0以下的手机
    var num = 0.0007;
    console.log(Number(num.toFixed(0)));
    console.log(Math.Calc.toFixed(num, 0, true, true))
    console.log(Math.Calc.toDigits(num, 0))
  }
  onChange = () => {
  }
  onClick = (s, e) => {
    console.log(s.target)
    e.stopPropagation()
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Carrousel style={{top: '44px'}} onChange={this.onChange} onClick={this.onClick}>
        <Container>
          <Carrousel stopPropagation={true} loop enableOnChange={false} list={[{img: 'http://www.waiqin365.com/p/upload/www/201810/17153207o8m8.jpg'}, {img: 'http://www.waiqin365.com/p/upload/www/201810/17153207o8m8.jpg'}]}/>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
          <p>第一页</p>
        </Container>
        <Container>
        <p>第二页</p>
        </Container>
      </Carrousel>
    </Page>
  }
};
