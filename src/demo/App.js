import React, { Component } from 'react';
import {Page, Header, Footer, Titlebar, Tabbar, Badge, Container} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      tabs: [
        {
          icon: <i className="icon tab-icon icon-home"></i>,
          iconActive: <i className="icon tab-icon icon-search"></i>,
          caption: '首页',
          url: '/_react_/main/home'
        },
        {
          iconClassName: 'icon-grid',
          iconActiveClassName: 'icon-grid-fill',
          caption: '商品',
          url: '/_react_/main/goods'
        },
        {
          iconClassName: 'icon-cart',
          iconActiveClassName: 'icon-cart-fill',
          caption: '购物车',
          url: '/_react_/main/cart'
        },
        {
          iconClassName: 'icon-user',
          iconActiveClassName: 'icon-user-fill',
          caption: '我的',
          url: '/_react_/main/me'
        },
      ]
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
        iconSrc: '//res.waiqin365.com/d/dinghuo365/browser/chrome.png'
      }
    ]
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI" rButtons={rBtns}/>
        </Header>
        <Container>
        </Container>
        <Footer>
        <Tabbar style={{marginBottom: '2px', height: '80px'}} iconBadgeClassName="outline top right" className="tabbar-footer border-t" tiled activeIndex={this.state.activeIndex} list={tabs} onClick={this.onClickTab}/>
        </Footer>
      </Page>
    );
  }
}

export default App;
