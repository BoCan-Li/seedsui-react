import React, { Component } from 'react';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Dragrefresh from '../lib/Dragrefresh';
import Titlebar from '../lib/Titlebar';
import Grid from '../lib/Grid';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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
    // if (!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && / baiduboxapp/i.test(navigator.userAgent)) {
    //   window.location.replace('bdbox://utils?action=sendIntent&minver=7.4¶ms=%7B%22intent%22%3A%22weixin%3A%2F%2Fdl%2Fbusiness%2F%3Fticket%3Dt59a2235a3662135bfb0e8f7edccc22c5%23wechat_redirect%23wechat_redirect%23Intent%3Bend%22%7D');
    // } else {
    //   window.location.replace('weixin://dl/business/?ticket=t59a2235a3662135bfb0e8f7edccc22c5#wechat_redirect#wechat_redirect');
    // }
  }
  onClick = (arg) => {
    console.log(arg)
    this.refs.$counter.play();
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  render() {
    // const list = [
    //   {
    //     key: '1',
    //     value: '111'
    //   },
    //   {
    //     key: '2',
    //     value: '222'
    //   },
    //   {
    //     key: '3',
    //     value: '333'
    //   }
    // ];
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Dragrefresh hasMore={this.state.hasMore} ref={(el) => {this.$elDrag = el;}}>
        <Grid list={this.state.alumb} onClickDelete={() => {}} iconBoxClassName="size100" iconClassName="size100"/>
      </Dragrefresh>
    </PagePull>
  }
};
