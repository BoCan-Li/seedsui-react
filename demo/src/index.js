import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Ticket} from '../../src'

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
        <Ticket onClick={this.onClick} style={{margin: '12px 14px'}} legend={
            <div className="text-center">
              <p style={{fontSize: '20px'}}>标题</p>
              <p style={{fontSize: '12px', marginTop: '4px'}}>满30元可用</p>
            </div>
          }
          containerStyle={{padding: '12px'}}>
          <div className="flex flex-top" style={{height: '60px'}}>
            <p className="list-caption nowrap2 flex-1" style={{height: '40px'}}>商品名称 规格</p>
          </div>
          <div className="flex">
            <p className="list-sndcaption font-size-sm flex-1">2017-07-07</p>
          </div>
        </Ticket>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
