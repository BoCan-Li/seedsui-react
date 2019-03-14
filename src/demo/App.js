import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import LotteryWheel from '../lib/LotteryWheel';
import Device from '../lib/Device';
import imgGold from './wheel/gold.png';
import imgGift from './wheel/gift.png';
import imgBorder from './wheel/border.png';
import imgPointer from './wheel/pointer.png';

const data = [
  {bgFillStyle: '#ffcd76', text: '大奖', icon: imgGift},
  {text: '100积分', icon: imgGold},
  {bgFillStyle: '#ffcd76', text: '200积分', icon: imgGold},
  {text: '300积分', icon: imgGold},
  {bgFillStyle: '#ffcd76', text: '400积分', icon: imgGold},
  {text: '500积分', icon: imgGold},
  {bgFillStyle: '#ffcd76', text: '600积分', icon: imgGold},
  {text: '700积分', icon: imgGold}
];

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  play = () => {
    this.$lotterywheel.instance.play(3);
  }
  onReset = () => {
    this.$lotterywheel.instance.reset();
    setTimeout(() => {
      this.$lotterywheel.instance.play(2);
    }, 10)
  }
  render() {
    const containerWidth = Device.screenWidth;
    const wrapperWidth = containerWidth * 0.85;
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <div className="lotterywheel-container" style={{width: containerWidth + 'px', height: containerWidth + 'px'}}>
          <LotteryWheel ref={(el) => {this.$lotterywheel = el;}} width={wrapperWidth} height={wrapperWidth} data={data}/>
          <img className="lotterywheel-border" src={imgBorder} alt=""/>
          <img className="lotterywheel-pointer" src={imgPointer} alt="" onClick={this.play}/>
        </div>
        <input type="button" value="复位" onClick={this.onReset}/>
      </Container>
    </Page>
  }
};
