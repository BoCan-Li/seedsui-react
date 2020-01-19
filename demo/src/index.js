import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Actionsheet, ConfigProvider} from '../../src';


class Demo extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   show: false,
    //   locale: zh
    // }
    this.state = {
      theme: 'zh_CN',
      show: false
    }
  }
  componentDidMount () {
    Bridge.showToast('hh', {mask: false});
    setTimeout(() => {
      Bridge.showToast('11', {mask: false});
    }, 1000);
  }
  useZh = () => {
    this.setState({
      theme: 'zh_CN'
    });
  }
  useEn = () => {
    this.setState({
      theme: 'en_US'
    });
  }
  onClick = (e, item) => {
    if (item.id === '1') {
      Bridge.showConfirm('1', {
        success: () => {
          Bridge.tel('12341234')
        },
        fail: (e) => {
          console.log(-1)
          e.hide()
        }
      });
    } else {
      Bridge.showConfirm('2', {
        success: () => {
          Bridge.tel('12341234')
        },
        fail: (e) => {
          console.log(-1)
          e.hide()
        }
      });
    }
  }
  hide = (...param) => {
    console.log(...param)
    this.setState({
      show: false
    });
  }
  show = (...param) => {
    console.log(...param)
    this.setState({
      show: true
    });
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{caption: '确定', onClick: this.submit}]}/>
      </Header>
      <Container>
      <input type="button" value="英文" onClick={this.useEn}/>
        <input type="button" value="中文" onClick={this.useZh}/>
        <input type="button" value="显示" onClick={this.show}/>
        <ConfigProvider portal={document.getElementById('demo')} localeLanguage={this.state.theme}>

        <Actionsheet
  show={this.state.show}
  list={[{caption: '菜单1', id: '1'}, {caption: '菜单2', id: '2'}]}
  onClick={this.onClick}
  cancelAttribute={{
    onClick: this.hide
  }}
  maskAttribute={{
    onClick: this.hide
  }}
/>
</ConfigProvider>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
