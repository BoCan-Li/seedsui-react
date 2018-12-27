import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Carrousel from '../lib/Carrousel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: '5.00'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Carrousel list={[
        {img: 'http://image-test.waiqin365.com/7101765025922582426/stdmendian/info/201810/9079949586690731451.jpg'},
        {img: 'http://image-test.waiqin365.com/7101765025922582426/stdmendian/info/201807/6921639949729265798.jpg'},
        {img: 'http://image-test.waiqin365.com/7101765025922582426/stdmendian/info/201807/8964506760533595658.jpg'},
        {img: 'http://image-test.waiqin365.com/7101765025922582426/stdmendian/info/201807/6695434300157512708.jpg'},
        {img: 'http://image-test.waiqin365.com/7101765025922582426/stdmendian/info/201810/9079949586690731451.jpg'}
      ]} autoplay={5000} pagination loop/>
    </Page>
  }
};
