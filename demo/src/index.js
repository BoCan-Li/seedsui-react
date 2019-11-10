import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, InputPre, Bridge} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '12341234'
    }
  }
  componentDidMount () {
    Bridge.debug = true;
  }
  onChange = (value) => {
    // this.setState({
    //   value
    // })
  }
  onClick = (e) => {
    console.log(e.target)
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" backButtonAttribute={{onClick: this.onClick}} rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <InputPre clear placeholder="请输入备注" value={this.state.value} onChange={(e, value) => this.onChange(value)} className="bordered" inputAttribute={{style: {padding: '2px 8px'}}}/>
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
