import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputRange from '../lib/InputRange';
import Bridge from '../lib/Bridge';
import ListPull from '../lib/ListPull';
import Button from '../lib/Button';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dialogShow: false
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
      dialogShow: false
    })
  }
  showDialog = () => {
    this.setState({
      dialogShow: true
    })
  }
  onError = (err) => {
    Bridge.showToast(err.msg, { mask: false });
  }
  onChange = (times) => {
    console.log(times);
  }
  onClick = (item, buttonItem) => {
    console.log(item)
    console.log(buttonItem)
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
        container: <div className="border-b" style={{padding: '12px'}}><p>haha</p><small>haha</small></div>,
        lButtons: [
          {value: '未读', className: 'info', args: 'unread', style: {padding: '0 12px'}}
        ],
        rButtons: [
          {value: '收藏', className: 'warn', args: 'fav', style: {padding: '0 12px'}},
          {value: '删除', className: 'cancel', args: 'del', style: {padding: '0 12px'}}
        ]
      },
      {
        container: <div className="border-b" style={{padding: '12px'}}><p>haha</p><small>haha</small></div>,
        lButtons: [
          {value: '未读', className: 'info', args: 'unread', style: {padding: '0 12px'}}
        ],
        rButtons: [
          {value: '收藏', className: 'warn', args: 'fav', style: {padding: '0 12px'}},
          {value: '删除', className: 'cancel', args: 'del', style: {padding: '0 12px'}}
        ]
      }
    ]
    return <Page style={{ backgroundColor: 'white' }} sideLeft={<p>1</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' }]} />
      </Header>
      <Container>
        <InputRange style={{margin: '100px 12px 0 12px'}}/>
        <ListPull list={list} onClick={this.onClick} onShowedLeft={this.onShowedLeft}/>
      </Container>
    </Page>
  }
};
