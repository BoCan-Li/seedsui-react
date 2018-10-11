import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Verify from '../lib/Verify';

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
  onChange = (error, value, data) => {
    console.log(error);
    console.log(value);
    console.log(data);
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
        <Verify sentSecond={5} syncData={this.onChange}/>
      </Container>
    </Page>
  }
};
