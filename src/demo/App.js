import React, { Component } from 'react';
import IndexBar from '../lib/IndexBar';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';

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
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' }]} />
      </Header>
      <Container>
        <div className="container">
          <ul>
            <li className="sliver" data-indexbar-name="上午">A</li>
            <li>
              <p>阿华</p>
            </li>
            <li>
              <p>阿敏</p>
            </li>
            <li>
              <p>阿全</p>
            </li>
            <li className="noborder">
              <p>阿达</p>
            </li>
            <li className="sliver" data-indexbar-name="B">B</li>
            <li>
              <p>白起</p>
            </li>
            <li>
              <p>白旭</p>
            </li>
            <li className="noborder">
              <p>冰冰</p>
            </li>
            <li className="sliver" data-indexbar-name="C">C</li>
            <li>
              <p>曹操</p>
            </li>
            <li>
              <p>曹鸣</p>
            </li>
            <li>
              <p>曹捷</p>
            </li>
            <li>
              <p>陈真</p>
            </li>
            <li>
              <p>陈进</p>
            </li>
            <li>
              <p>陈明</p>
            </li>
            <li>
              <p>陈伟</p>
            </li>
            <li>
              <p>陈文</p>
            </li>
            <li>
              <p>陈晓</p>
            </li>
            <li>
              <p>陈娟</p>
            </li>
            <li>
              <p>成勇</p>
            </li>
            <li>
              <p>成婷</p>
            </li>
            <li className="noborder">
              <p>成龙</p>
            </li>
            <li className="sliver" data-indexbar-name="下午">D</li>
            <li>
              <p>大成子</p>
            </li>
            <li>
              <p>大舅子</p>
            </li>
            <li>
              <p>戴笠</p>
            </li>
            <li>
              <p>戴坤</p>
            </li>
            <li>
              <p>戴成虎</p>
            </li>
            <li>
              <p>邓小平</p>
            </li>
            <li>
              <p>邓稼先</p>
            </li>
            <li>
              <p>邓文迪</p>
            </li>
            <li>
              <p>邓等</p>
            </li>
            <li>
              <p>狄仁杰</p>
            </li>
            <li>
              <p>狄弟</p>
            </li>
            <li>
              <p>董文华</p>
            </li>
            <li className="noborder">
              <p>董事</p>
            </li>
            <li className="sliver" data-indexbar-name="F">F</li>
            <li>
              <p>樊哙</p>
            </li>
            <li>
              <p>樊心</p>
            </li>
            <li>
              <p>冯晨晨</p>
            </li>
            <li>
              <p>冯敬尧</p>
            </li>
            <li>
              <p>冯成虎</p>
            </li>
            <li>
              <p>冯小平</p>
            </li>
            <li>
              <p>冯稼先</p>
            </li>
            <li>
              <p>冯文迪</p>
            </li>
            <li>
              <p>冯晨</p>
            </li>
            <li>
              <p>福尔杰</p>
            </li>
            <li>
              <p>福尔康</p>
            </li>
            <li>
              <p>福文华</p>
            </li>
            <li>
              <p>方文山</p>
            </li>
          </ul>
          <IndexBar style={{top: '44px'}} indexs={['上午', '下午']}/>
        </div>
      </Container>
    </Page>
  }
};
