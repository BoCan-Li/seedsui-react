import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputRange from '../lib/InputRange';
import Bridge from '../lib/Bridge';
import ListPull from '../lib/ListPull';

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
  onClick = (args) => {
    console.log(args)
  }
  render() {
    const list = [
      {
        container: <div><p>haha</p><small>haha</small></div>,
        buttons: [
          {value: '收藏', className: 'warn', onClick: this.onClick},
          {value: '删除', className: 'cancel', onClick: this.onClick}
        ]
      }
    ]
    return <Page style={{ backgroundColor: 'white' }} sideLeft={<p>1</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' }]} />
      </Header>
      <Container>
        <InputRange style={{margin: '100px 12px 0 12px'}}/>
        <ListPull list={list} onClick={this.onClick}/>
      </Container>
    </Page>
  }
};
