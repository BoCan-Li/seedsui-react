import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import InputCity from '../lib/InputCity';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  componentDidMount() {
    console.log(new Date().format('YYYY') + 'Q' + new Date().format('Q'))
  }
  onChange = (value) => {
    this.setState({
      value: value
    });
  }
  render() {
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <InputCity
          valueBindProp
          value={this.state.value}
          onChange={this.onChange}
          placeholder="请选择"
          className="border-b"
        />
      </Container>
    </Page>
  }
};
