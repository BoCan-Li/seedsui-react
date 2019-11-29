import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Marquee} from '../../src'

const list = [
  {
    key: '1',
    value: '标题标题1'
  },
  {
    key: '2',
    value: '标题标题2'
  }
];

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      fee: {"name":"期间","id":"11","value":"2019-11","list":[{"key":"1","value":"2019-01"},{"key":"2","value":"2019-02"},{"key":"3","value":"2019-03"},{"key":"4","value":"2019-04"},{"key":"5","value":"2019-05"},{"key":"6","value":"2019-06"},{"key":"7","value":"2019-07"},{"key":"8","value":"2019-08"},{"key":"9","value":"2019-09"},{"key":"10","value":"2019-10"},{"key":"11","value":"2019-11"},{"key":"12","value":"2019-12"},{"key":"1","value":"2020-01"},{"key":"2","value":"2020-02"},{"key":"3","value":"2020-03"},{"key":"4","value":"2020-04"},{"key":"5","value":"2020-05"},{"key":"6","value":"2020-06"},{"key":"7","value":"2020-07"},{"key":"8","value":"2020-08"},{"key":"9","value":"2020-09"},{"key":"10","value":"2020-10"},{"key":"11","value":"2020-11"},{"key":"12","value":"2020-12"}]}
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onClick = (e) => {
    console.log(e)
  }
  onClear = (...params) => {
    console.log(...params)
  }
  render() {
    const {fee} = this.state;
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI"/>
      </Header>
      <Container>
        <Marquee
          list={list}
          onClick={this.onClick}
          autoplay={5000}
          step={48}
          contentAttribute={{
            style: {height: '38px', padding: '5px 0'},
            className: 'flex flex-center nowrap2'
          }}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
