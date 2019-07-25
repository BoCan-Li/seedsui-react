import React, { Component } from 'react';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Titlebar from './../lib/Titlebar';
import Dragrefresh from './../lib/Dragrefresh';
import Bridge from './../lib/Bridge';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: -2, // hasMore: 0.无更多数据 1.数据加载完成 404.一条数据都没有, -1. 加载错误, -2. 重置状态,为了后面可以更新DOM
      list: []
    }
  }
  componentDidMount () {
    this.loadData();
    Bridge.tel('1234');
  }
  // 下拉刷新配置
  onTopRefresh = () => {
    console.log('头部刷新');
    this.loadData(false);
  }
  onBottomRefresh = () => {
    console.log('底部刷新');
    this.loadData(true);
  }
  loadData = () => {
    let list = this.state.list;
    let hasMore = -2; // hasMore: 0.无更多数据, 1.头部刷新完成, 2.底部刷新完成, 404.一条数据都没有, -2. 重置状态,为了后面可以更新DOM
    this.setState({
      hasMore: -2 // 先重置状态, 后面再会触发react更新
    });
    setTimeout(() => {
      let serList = [];
      for (let i = 1; i <= 20; i++) {
        serList.push(i);
      }
      // 拼接数据
      list = list.concat(serList);
      hasMore = 404;
      // 如果数据大于100, 则完成加载
      if (list.length >= 100) {
        hasMore = 0;
      }
      // 更新DOM
      this.setState({
        list,
        hasMore
      });
    }, 1000);
  }
  onScroll = (e) => {
    console.log(e.currentTarget.scrollTop);
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Dragrefresh
          showNoData={false}
          moveTimeout={1000}
          ref={(el) => {this.$elDrag = el;}}
          hasMore={this.state.hasMore}
          onTopRefresh={this.onTopRefresh}
          onBottomRefresh={this.onBottomRefresh}
          bottomErrorCaption="点击重新加载"
          onClickBottomError={this.onBottomRefresh}
          onScroll={this.onScroll}
        >
          {this.state.list.map((item, index) => {
            return <div className="flex flex-middle" style={{height: '44px'}} key={index}>{item}</div>
          })}
        </Dragrefresh>
      </Page>
    );
  }
}

export default App;
