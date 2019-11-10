import React, {Component} from 'react'
import {render} from 'react-dom'

import {Page, Header, Titlebar, Container, Bridge, Player} from '../../src'

class Demo extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
  }
  onClick = (e) => {
    console.log(e.target)
    var src = e.target.getAttribute('data-src');
    Bridge.previewVideo({src: src});
  }
  render() {
    return <Page ref={(el) => {this.$page = el}}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{iconAttribute: {className: 'icon-ok-fill'}, onClick: this.onSubmit}]}/>
      </Header>
      <Container>
        <Player
          data-src='https://www.w3school.com.cn/i/movie.ogg'
          src={'https://www.w3school.com.cn/i/movie.ogg'}
          poster={`https://www.w3school.com.cn/sp/tiy-retina.jpg`}
          onClick={this.onClick}
        />
      </Container>
    </Page>
  }
}

render(<Demo/>, document.querySelector('#demo'))
