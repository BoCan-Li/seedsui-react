import React, { Component } from 'react';
import styled from 'styled-components';
import Page from 'components/seedsui/Page';
import Header from 'components/seedsui/Header';
import Titlebar from 'components/seedsui/Titlebar';
import Attribute from 'components/seedsui/Attribute';
import Button from 'components/seedsui/Button';
import Container from 'components/seedsui/Container';

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

export default class Box extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
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
    this.$shrinkWrapper.style.WebkitTransform = `translateX(-${window.innerWidth}px)`;
  }
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="盒子模型"/>
        </Header>
        <Container>
            <Attribute name="flex-shrink" value={<Button className="small" style={{marginLeft: '8px'}} onClick={this.onClickShrink}>translateX</Button>} />
            <BlockBox style={{border: '0'}}>
              <div className="flex flex-shrink" style={{WebkitTransition: 'all 500ms'}} ref={(el) => {this.$shrinkWrapper = el;}}>
                <div style={{backgroundColor: '#f2f2f2', height: '70px'}}></div>
                <div style={{backgroundColor: '#aaa'}}></div>
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
        </Container>
      </Page>
    )
  }
}
