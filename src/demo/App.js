import React, { Component } from 'react';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Attributes from '../lib/Attributes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0'
    }
  }
  componentDidMount() {
  }
  onClick = () => {
    this.setState({
      show: true
    })
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  changeDate = () => {
    this.setState({
      value: '2018-08-08'
    })
  }
  onHide = () => {
    this.setState({
      show: false
    })
  }
  render() {
    return <PagePull style={{ backgroundColor: 'white' }} lSide={<p>1</p>} rSide={<p>2</p>}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Container>
        <input type="button" value="按钮" onClick={this.changeDate}/>
        <Attributes col={2} list={[
          {
            name: '标题',
            value: '内容',
            copy: '15651871075',
            suffix: <span>后缀</span>
          },
          {
            name: '标题2',
            value: '内容2',
            copy: '15651871075',
            suffix: '后缀'
          }
        ]}/>
      </Container>
    </PagePull>
  }
};
