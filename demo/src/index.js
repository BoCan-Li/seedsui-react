import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, InputSelect} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          key: '1',
          value: '111'
        },
        {
          key: '2',
          value: '222'
        },
        {
          key: '3',
          value: '333'
        }
      ]
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (item) => {
    console.log(item)
    let list = Object.clone(this.state.list);
    for (let [index, li] of list.entries()) {
      if (li && li.key === item.key) delete list[index];
    }
    console.log(list);
    this.setState({
      list: list
    })
  }
  onClear = (...params) => {
    console.log(...params)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <InputSelect
          multiple
          className="button lg bg-white"
          inputAttribute={{className: 'text-center color-primary', style: {padding: '7px 0'}}}
          style={{border$adius: '4px', margin: '10px 12px'}}
          value={`+添加付费项目`}
          list={this.state.list}
          onChange={(e, value, options) => this.onChange(options[0])}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
