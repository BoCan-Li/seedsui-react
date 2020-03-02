import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, ConfigProvider, InputDate, Handsign} from '../../src';
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
    const handsign = this.refs.$handsign.instance;
    handsign.drawImg('http://image.waiqin365.com/8958085892090750662/bbs/202002/1L9GhyjLrdjhUfq6dthtGp8W1FVzLw8bIA-PJu14rTJ-VC2RdWJyWsPTZjz3zFe3X.jpg');
    console.log(handsign)
    setTimeout(() => {
      const str = handsign.save();
      console.log(str)
    }, 1000);
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
        <Handsign ref="$handsign" width={300} height={300}/>
      </Container>
      
    </Page>
  }
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
