import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Carrousel from '../lib/Carrousel';
import Titlebar from '../lib/Titlebar';
import FastClick from '../lib/FastClick';

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
    FastClick.attach(document.getElementById('root'));
  }
  onChange = () => {
    console.log(1)
  }
  onClick = () => {
    console.log(2)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Carrousel style={{top: '44px'}} onChange={this.onChange}>
        <Container>
          <Carrousel enableOnChange={false} list={[{img: 'http://www.waiqin365.com/p/upload/www/201810/17153207o8m8.jpg'}, {img: 'http://www.waiqin365.com/p/upload/www/201810/17153207o8m8.jpg'}]}/>
          <p onClick={this.onClick}>第一页</p>
        </Container>
        <Container>
        <p onClick={this.onClick}>第二页</p>
        </Container>
      </Carrousel>
    </Page>
  }
};
