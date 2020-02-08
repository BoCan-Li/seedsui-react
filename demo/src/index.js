import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, ConfigProvider, InputDate} from '../../src';
import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      locale: zhCN
    }
  }
  componentDidMount () {
  }
  useZh = () => {
    this.setState({
      locale: zhCN
    });
  }
  useEn = () => {
    this.setState({
      locale: enUS
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
        <ConfigProvider portal={document.getElementById('demo')} locale={this.state.locale}>
          <InputDate type="datetime"/>
        </ConfigProvider>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
