import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import OnOff from '../lib/OnOff';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true
    }
  }
  componentDidMount() {
  }
  onClick = (item, isActived, extandStatus, childrenCount) => {
    console.log(item, isActived, extandStatus, childrenCount)
    this.setState({
      value: item.id
    })
  }
  onScrollMenu = (e) => {
    var scrollTop = e.currentTarget.scrollTop;
    console.log(scrollTop)
  }
  onChange = () => {
    this.setState({
      value: !this.state.value
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
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
      </Header>
      <Container>
        <OnOff onClick={this.onChange} checked={this.state.value}/>
      </Container>
    </Page>
  }
};
