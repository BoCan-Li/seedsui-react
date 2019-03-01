import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import Device from '../lib/Device';
import Popover from '../lib/Popover';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverStyle: {top: '44px', right: '12px'},
      popoverClassName: 'top-left',
      popoverShow: false
    }
  }
  componentDidMount() {
  }
  // 更多操作
  showPopover = (e) => {
    if (!e.target) {
      Bridge.showToast('没有元素, 无法查看更多', {mask: false});
      return;
    }
    const clientRect = e.target.getBoundingClientRect();
    // 如果超过屏幕的的4/3, 则向上弹
    const screenHeight = Device.screenHeight;
    let popoverStyle = {top: Math.Calc.add(clientRect.y, 28) + 'px', left: clientRect.x + 'px'};
    let popoverClassName = 'top-left';
    if (clientRect.y / screenHeight > 0.75) {
      popoverStyle = {bottom: Math.Calc.add(Math.Calc.subtract(screenHeight, clientRect.y), 6) + 'px', left: clientRect.x + 'px'};
      popoverClassName = 'bottom-left';
    }
    this.setState({
      popoverStyle: popoverStyle,
      popoverClassName: popoverClassName,
      popoverShow: true
    });
  }
  hidePopover = () => {
    this.setState({
      popoverShow: false
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <input type="button" value="显示" onClick={this.showPopover} style={{position: 'absolute', left: '50%', top: '20px'}}/>
      </Container>
      {/* 更多操作 */}
      <Popover show={this.state.popoverShow} className={this.state.popoverClassName} style={this.state.popoverStyle} onClickMask={this.hidePopover}>
        操作操作<br/>
        操作操作<br/>
        操作操作<br/>
        操作操作<br/>
        操作操作
      </Popover>
    </Page>
  }
};
