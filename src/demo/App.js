import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Handsign from '../lib/Handsign';


export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(new Date().format('YYYY') + 'Q' + new Date().format('Q'))
  }
  save = () => {
    if (!this.$handsign.instance.isDrew) {
      console.log('没有画过');
      return;
    }
    if (this.$handsign.instance.blank()) {
      console.log('空白');
      return;
    }
    const sign_pic = this.$handsign.instance.save();
    console.log(sign_pic);
  }
  clear = () => {
    this.$handsign.instance.clear()
  }
  drawBg = () => {
    this.$handsign.instance.drawBackgroundColor('#ffffff')
  }
  render() {
    const defaultDate = new Date()
    defaultDate.nextMonth();
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <Handsign suffix="image/jpeg" ref={(el) => {this.$handsign = el;}} width={300} strokeStyle="#c72a1d" height={300}/>
        <input type="button" value="绘制背景" onClick={this.drawBg}/>
        <input type="button" value="保存" onClick={this.save}/>
        <input type="button" value="清除" onClick={this.clear}/>
      </Container>
    </Page>
  }
};
