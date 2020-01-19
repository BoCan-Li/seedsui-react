import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, InputLocation, Actionsheet, ConfigProvider, Emoji} from '../../src';


class Demo extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   show: false,
    //   locale: zh
    // }
    this.state = {
      theme: 'en_US',
      show: false,
      showEmoji: false,
  value: ''
    }
  }
  componentDidMount () {
  }
  onChange = (e, value) => {
    console.log(e)
    console.log(value)
    this.setState({
      value: value
    })
  }
  toggleEmoji = () => {
    this.setState((prevState) => {
      return {
        showEmoji: !prevState.showEmoji
      }
    })
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
        <ConfigProvider locale={{'hh': '111'}} portal={document.getElementById('demo')} localeLanguage={this.state.theme}>
        <Emoji
  autoFocus
  show={this.state.showEmoji}
  onChange={this.onChange}
  value={this.state.value}
  maskAttribute={{onClick: this.toggleEmoji}}
/>
<input type="button" value="显隐" onClick={this.toggleEmoji}/>
          <InputLocation/>
        {/* <Actionsheet
  show={this.state.show}
  list={[{caption: '菜单1', id: '1'}, {caption: '菜单2', id: '2'}]}
  onClick={this.onClick}
  cancelAttribute={{
    onClick: this.hide
  }}
  maskAttribute={{
    onClick: this.hide
  }}
/> */}
</ConfigProvider>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
