import React, { Component } from 'react';
import {Page, Header, Footer, Titlebar, Tabbar, Badge, Container, Dropdown} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      tabs: [
        {
          icon: <i className="icon tab-icon icon-home"></i>,
          iconActive: <i className="icon tab-icon icon-search"></i>,
          name: '首页',
          url: '/_react_/main/home'
        },
        {
          iconClassName: 'icon-grid',
          iconActiveClassName: 'icon-grid-fill',
          name: '商品',
          url: '/_react_/main/goods'
        },
        {
          iconClassName: 'icon-cart',
          iconActiveClassName: 'icon-cart-fill',
          name: '购物车',
          url: '/_react_/main/cart'
        },
        {
          iconClassName: 'icon-user',
          iconActiveClassName: 'icon-user-fill',
          name: '我的',
          url: '/_react_/main/me'
        },
      ],
      dropdownList: [{"id":"","name":"分类","data":[{"id":"","name":"全部","children":[]}]},{"id":"","name":"品牌","data":[{"id":"","name":"全部"},{"id":"康师傅","name":"康师傅"},{"id":"雀巢","name":"雀巢"},{"id":"其他","name":"其他"},{"id":"美汁源","name":"美汁源"},{"id":"可口","name":"可口"},{"id":"宏宝莱","name":"宏宝莱"},{"id":"康师傅饮料","name":"康师傅饮料"},{"id":"百事","name":"百事"},{"id":"卫岗","name":"卫岗"},{"id":"百饮","name":"百饮"},{"id":"乐事","name":"乐事"},{"id":"","name":""},{"id":"康师傅方便面","name":"康师傅方便面"},{"id":"蒙牛","name":"蒙牛"},{"id":"伊利","name":"伊利"},{"id":"三只松鼠","name":"三只松鼠"}]},{"id":"","name":"筛选","data":[{"id":"","name":"全部"},{"id":"new","name":"新品"},{"id":"importance","name":"重点"}]}]
    }
  }
  componentDidMount () {
  }
  onClickTab = (item, index) => {
    this.setState({
      activeIndex: index
    });
  }
  render() {
    const tabs = this.state.tabs.map((item, index) => {
      if (index === 0) {
        let iconClassName = item.icon.props.className;
        let iconActiveClassName = item.iconActive.props.className;
        item.icon = <i className={iconClassName}>
          <Badge className="badge outline top right">2</Badge>
        </i>;
        item.iconActive = <i className={iconActiveClassName}>
          <Badge className="badge outline top right">2</Badge>
        </i>;
      }
      return item
    })
    const rBtns = [
      {
        iconClassName: 'icon-fav-fill',
        iconStyle: {WebkitTransform: 'rotate(180deg)'}
      }
    ]
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI" rButtons={rBtns}/>
          <Dropdown portal={this.state.$page} list={this.state.dropdownList}/>
        </Header>
        <Container>
        </Container>
        <Footer>
        <Tabbar style={{marginTop: '2px', height: '80px'}} iconBadgeClassName="outline top right" className="tabbar-footer border-t" tiled activeIndex={this.state.activeIndex} list={tabs} onClick={this.onClickTab}/>
        </Footer>
      </Page>
    );
  }
}

export default App;
