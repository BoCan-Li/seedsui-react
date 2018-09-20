import React, { Component } from 'react';
import Actionsheet from '../lib/Actionsheet';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputRange from '../lib/InputRange';
import Bridge from '../lib/Bridge';
import Timepart from '../lib/Timepart';
import Carrousel from '../lib/Carrousel';
import InputDate from '../lib/InputDate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveIndex: 0,
      value: '',
      show: true
    }
  }
  componentDidMount() {
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  onSubmit = (value) => {
    console.log(value)
  }
  hideDialog = () => {
    this.setState({
      show: false
    })
  }
  showDialog = () => {
    this.setState({
      show: true
    })
  }
  onError = (err) => {
    Bridge.showToast(err.msg, { mask: false });
  }
  onChange = (times) => {
    console.log(times);
  }
  onClick = (item, i) => {
    console.log(item, i)
  }
  onShowedLeft = (s) => {
    var target = s.target.previousSibling.children[0];
    if (target.innerHTML === '未读') {
      target.innerHTML = '已读';
      target.classList.add('disabled');
      s.hide();
    } else {
      target.innerHTML = '未读';
      target.classList.remove('disabled');
      s.hide();
    }
  }
  render() {
    const list = [
      {
        caption: '菜单'
      },
      {
        caption: '菜单'
      }
    ]
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Container>
        <InputDate/>
        <Carrousel style={{height: '100px', backgroundColor: '#ff8800'}} list={[
          {img: 'https://api.map.baidu.com/images/weather/night/yin.png'},
          {img: 'https://api.map.baidu.com/images/weather/night/yin.png'}
        ]}/>
        <Timepart/>
        <InputRange style={{margin: '100px 12px'}}/>
        <Actionsheet show={this.state.show} list={list} onClick={this.onClick} onClickMask={this.hideDialog} onClickCancel={this.hideDialog}/>
      </Container>
    </PagePull>
  }
};
