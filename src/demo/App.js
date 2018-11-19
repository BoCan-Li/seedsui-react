import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import IndexBar from '../lib/IndexBar';
import cityData from './city.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picList: [{upload: true, id: '43213421', thumb: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', src: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg'}],
      id: '',
      value: '',
      color: "#c72a1d",
      city: '9,88,1152',
      city_name: '中华人民共和国',
      data: cityData,
      dataValuePropertyName: 'name',
      dataKeyPropertyName: 'id',
      dataChildPropertyName: 'child'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
    // jsonp('https://s1.mi.com/open/common/js/address_all_new.js', null, (err, data) => {
    //   console.log(err)
    //   console.log(data)
    // })
    // var script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.defer = 'defer'
    // script.src = 'https://s1.mi.com/open/common/js/address_all_new.js'
    // script.onload = () => {
    //   this.setState({
    //     data: data, // eslint-disable-line
    //     dataChildPropertyName: 'child',
    //     dataKeyPropertyName: 'id',
    //     dataValuePropertyName: 'name'
    //   });
    // }
    // document.body.appendChild(script)
  }
  onWqPhotoChange = (list) => {
    console.log(list)
    this.setState({
      picList: list
    });
  }
  onClickCancel = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickSubmit = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickVideo = (args) => {
    Bridge.previewVideo({src: args.src});
  }
  onChangeColor = () => {
    this.setState({
      color: 'green'
    })
  }
  onChange = (value, option) => {
    this.setState({
      city_name: value,
      city: option.map((item, index) => {
        return item.key
      }).join(',')
    });
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <ul>
          <li data-indexbar-name="A">A</li>
          <li data-indexbar-name="A">阿华</li>
          <li data-indexbar-name="A">阿敏</li>
          <li data-indexbar-name="A">阿全</li>
          <li data-indexbar-name="A">阿达</li>
          <li data-indexbar-name="B">B</li>
          <li data-indexbar-name="B">白起</li>
          <li data-indexbar-name="B">白旭</li>
          <li data-indexbar-name="B">冰冰</li>
          <li data-indexbar-name="C">C</li>
          <li data-indexbar-name="C">曹操</li>
          <li data-indexbar-name="C">曹鸣</li>
          <li data-indexbar-name="C">曹捷</li>
          <li data-indexbar-name="C">陈真</li>
          <li data-indexbar-name="C">陈进</li>
          <li data-indexbar-name="C">陈明</li>
          <li data-indexbar-name="C">陈伟</li>
          <li data-indexbar-name="C">陈文</li>
          <li data-indexbar-name="C">陈晓</li>
          <li data-indexbar-name="C">陈娟</li>
          <li data-indexbar-name="C">成勇</li>
          <li data-indexbar-name="C">成婷</li>
          <li data-indexbar-name="C">成龙</li>
          <li data-indexbar-name="D">D</li>
          <li data-indexbar-name="D">大成子</li>
          <li data-indexbar-name="D">大舅子</li>
          <li data-indexbar-name="D">戴笠</li>
          <li data-indexbar-name="D">戴坤</li>
          <li data-indexbar-name="D">戴成虎</li>
          <li data-indexbar-name="D">邓小平</li>
          <li data-indexbar-name="D">邓稼先</li>
          <li data-indexbar-name="D">邓文迪</li>
          <li data-indexbar-name="D">邓等</li>
          <li data-indexbar-name="D">狄仁杰</li>
          <li data-indexbar-name="D">狄弟</li>
          <li data-indexbar-name="D">董文华</li>
          <li data-indexbar-name="D">董事</li>
          <li data-indexbar-name="F">F</li>
          <li data-indexbar-name="F">樊哙</li>
          <li data-indexbar-name="F">樊心</li>
          <li data-indexbar-name="F">冯晨晨</li>
          <li data-indexbar-name="F">冯敬尧</li>
          <li data-indexbar-name="F">冯成虎</li>
          <li data-indexbar-name="F">冯小平</li>
          <li data-indexbar-name="F">冯稼先</li>
          <li data-indexbar-name="F">冯文迪</li>
          <li data-indexbar-name="F">冯晨</li>
          <li data-indexbar-name="F">福尔杰</li>
          <li data-indexbar-name="F">福尔康</li>
          <li data-indexbar-name="F">福文华</li>
          <li data-indexbar-name="F">方文山</li>
        </ul>
        <IndexBar style={{top: '44px'}}/>
      </Container>
    </Page>
  }
};
