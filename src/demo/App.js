import React, { Component } from 'react';
import PagePull from '../lib/PagePull';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import List from '../lib/List';

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
        <List showAvatar caption="haha"/>
      </Container>
    </PagePull>
  }
};
