import React, { Component } from 'react';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Dragrefresh from '../lib/Dragrefresh';
import Titlebar from '../lib/Titlebar';
import Loading from '../lib/Loading';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: -2,
      alumb: [
        {id: '1', thumb: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'},
        {id: '2', thumb: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'},
        {id: '3', thumb: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'},
        {id: '4', thumb: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'},
        {id: '5', thumb: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'}
      ]
    }
  }
  componentDidMount() {
  }
  onClick = (arg) => {
    console.log(arg)
  }
  onChange = (arg) => {
    console.log(arg)
    this.setState({
      alumb: arg
    })
  }
  render() {
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Dragrefresh lazyLoad hasMore={this.state.hasMore} ref={(el) => {this.$elDrag = el;}}>
      <Loading type="custom" caption="" iconSrc="//res.waiqin365.com/d/dinghuo365/loading.gif"/>
      </Dragrefresh>
    </PagePull>
  }
};
