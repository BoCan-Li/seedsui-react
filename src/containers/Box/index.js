import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {changeTab} from 'store/modules/box.js';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Tabbar from 'components/seedsui/Tabbar/Tabbar.jsx';
import Attribute from 'components/seedsui/Attribute/Attribute.jsx';
import Button from 'components/seedsui/Button/Button.jsx';
import Carrousel from 'components/seedsui/Carrousel/Carrousel.jsx';

const BlockBox = styled.div`
  height: 150px;
  background-color: white;
  border: 1px solid white;
  box-sizing: border-box;
  overflow:hidden;
`;
const Block = styled.div`
  width: 70px;
  height: 70px;
  background-color: #f2f2f2;
  border: 1px solid white;
  box-sizing: border-box;
`;

@connect(state => ({
  tabs: state.box.tabs,
  tabsActiveIndex: state.box.tabsActiveIndex,
}), {
  changeTab
})
export default class Box extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    tabsActiveIndex: PropTypes.number,
    changeTab: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
  }
  componentWillUnmount() {
  }
  onClickTab = (item, index) => {
    this.props.changeTab(index);
  }
  onSlideEnd = (e) => {
    this.props.changeTab(e.activeIndex);
  }
  onClickShrink = (e) => {
    this.shrinkWrapper.style.WebkitTransform = `translateX(-${window.innerWidth}px)`;
  }
  render() {
    const {tabs, tabsActiveIndex} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption="盒子模型"/>
          <Tabbar list={tabs} activeIndex={tabsActiveIndex} onClick={this.onClickTab}/>
        </Header>
        <Carrousel className="carrousel-page" style={{top: '84px'}} onChange={this.onSlideEnd} activeIndex={tabsActiveIndex}>
          {/* 第一页 */}
          <div>
            <Attribute name="box-left"/>
            <BlockBox className="box box-left">
              <Block/>
            </BlockBox>
            <Attribute name="box-center"/>
            <BlockBox className="box box-center">
              <Block/>
            </BlockBox>
            
            <Attribute name="box-right"/>
            <BlockBox className="box box-right">
              <Block/>
            </BlockBox>
            
            <Attribute name="box-top"/>
            <BlockBox className="box box-top">
              <Block/>
            </BlockBox>

            <Attribute name="box-middle"/>
            <BlockBox className="box box-middle">
              <Block/>
            </BlockBox>
            
            <Attribute name="box-bottom"/>
            <BlockBox className="box box-bottom">
              <Block/>
            </BlockBox>
            
            <Attribute name="box-middlecenter"/>
            <BlockBox className="box box-middlecenter">
              <Block/>
            </BlockBox>
            
            <Attribute name="box-vertical"/>
            <BlockBox className="box box-vertical">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="box-horizontal"/>
            <BlockBox className="box box-horizontal">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>
          </div>
          {/* 第二页 */}
          <div>
            <Attribute name="flex-shrink" value={<Button className="small" style={{marginLeft: '8px'}} onClick={this.onClickShrink}>translateX</Button>} />
            <BlockBox style={{border: '0'}}>
              <div className="flex flex-shrink" ref={(el) => {this.shrinkWrapper = el;}}>
                <div style={{backgroundColor: '#7DB9DE', height: '70px'}}></div>
                <div style={{backgroundColor: '#51A8DD'}}></div>
              </div>
            </BlockBox>

            <Attribute name="flex-left"/>
            <BlockBox className="flex flex-left">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-center"/>
            <BlockBox className="flex flex-center">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-right"/>
            <BlockBox className="flex flex-right">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-top"/>
            <BlockBox className="flex flex-top">
              <Block/>
            </BlockBox>

            <Attribute name="flex-middle"/>
            <BlockBox className="flex flex-middle">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-bottom"/>
            <BlockBox className="flex flex-bottom">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-middlecenter"/>
            <BlockBox className="flex flex-middlecenter">
              <Block/>
            </BlockBox>
            
            <Attribute name="flex-vertical"/>
            <BlockBox className="flex flex-vertical">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-vertical-reverse"/>
            <BlockBox className="flex flex-vertical-reverse">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-horizontal"/>
            <BlockBox className="flex flex-horizontal">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-horizontal-reverse"/>
            <BlockBox className="flex flex-horizontal-reverse">
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-between"/>
            <BlockBox className="flex flex-between">
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-around"/>
            <BlockBox className="flex flex-around">
              <Block/>
              <Block/>
            </BlockBox>

            <Attribute name="flex-vertical-stretch"/>
            <BlockBox className="flex flex-vertical-stretch">
              <Block style={{height: 'auto'}}/>
              <Block style={{height: 'auto'}}/>
            </BlockBox>
          </div>
        </Carrousel>
      </Page>
    )
  }
}
