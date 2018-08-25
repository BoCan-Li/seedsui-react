import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeTab} from 'store/modules/carrouselPage.js';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Tabbar from 'components/seedsui/Tabbar/Tabbar.jsx';
import Carrousel from 'components/seedsui/Carrousel/Carrousel.jsx';
import Notice from 'components/seedsui/Notice/Notice.jsx';

@connect(state => ({
  tabs: state.carrouselPage.tabs,
  tabsActiveIndex: state.carrouselPage.tabsActiveIndex,
}), {
  changeTab
})
export default class CarrouselPage extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    tabsActiveIndex: PropTypes.number,
    changeTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      speed: 300, // 轮播页的动画速度
    };
  }
  componentDidMount = () => {
    // 如果是返回,则不刷新数据
    if (this.props.history.action === 'POP') {
      if (this.props.tabActiveIndex !== 0) {
        this.setState({
          speed: 0
        });
        setTimeout(() => {
          this.setState({
            speed: 300
          });
        }, 300);
      }
      return;
    }
  }
  componentWillUnmount() {
  }
  onClickTab = (item, index) => {
    this.props.changeTab(index);
  }
  onSlideEnd = (e) => {
    this.props.changeTab(e.activeIndex);
  }
  render() {
    const {tabs, tabsActiveIndex} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption="轮播页"/>
          <Tabbar list={tabs} activeIndex={tabsActiveIndex} onClick={this.onClickTab}/>
        </Header>
        <Carrousel speed={this.state.speed} className="carrousel-page" style={{top: '84px'}} onChange={this.onSlideEnd} activeIndex={tabsActiveIndex}>
          {/* 第一页 */}
          <div>
            <Notice caption="第一页" iconClassName="notice-icon-nodata"/>
          </div>
          {/* 第二页 */}
          <div>
            <Notice caption="第二页" iconClassName="notice-icon-nodata"/>
          </div>
        </Carrousel>
      </Page>
    )
  }
}
