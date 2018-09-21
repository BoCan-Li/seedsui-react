import React, { Component } from 'react';
import ImgLazyInstance from '../lib/ImgLazy/instance';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Dragrefresh from '../lib/Dragrefresh';
import Titlebar from '../lib/Titlebar';
import Grid from '../lib/Grid';
import ImgUploader from '../lib/ImgUploader';
import List from '../lib/List';

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
    var lazy = new ImgLazyInstance({
      overflowDragrefresh: this.$elDrag.$el
    });
    setTimeout(() => {
      this.setState({
        hasMore: 1
      });
    }, 2000);
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
    const {alumb} = this.state;
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Dragrefresh lazyLoad hasMore={this.state.hasMore} ref={(el) => {this.$elDrag = el;}}>
        <Grid lazyLoad onClickDelete={this.onClick} className="border-b" col="4" iconClassName="size40" iconDefaultImgStyle={{borderRadius: '100%'}} list={[{iconBadgeCaption: '111', caption: '111', iconSrc: 'https://image-test.waiqin365.com/emserver/icon/mendian_task.png'}, {caption: '222', iconSrc: 'http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320'}]}/>
        <ImgUploader showUpload showDelete showCount caption="图片上传" max={5} onChange={this.onChange} list={alumb}/>
        <List caption="111" lazyLoad showThumbnail thumbnailSrc="http://image-test.waiqin365.com/8100630123350000887/bas_pd/201801/5066464767803150144.jpg?x-oss-process=style/zk320"/>
      </Dragrefresh>
    </PagePull>
  }
};
