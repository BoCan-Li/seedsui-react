import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import NumBoxPopPointer from '../lib/NumBoxPopPointer';
import Notice from '../lib/Notice';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
		Bridge.debug = true;
  }
  onChangeCount = (value, args) => {
    console.log(value)
    console.log(args)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <NumBoxPopPointer
          args={'1'}
          min={1}
          value={'3'}
          unit={'/箱'}
          onChange={this.onChangeCount}
        />
        <Notice caption={<div>hhhh</div>}/>
      </Container>
    </Page>
  }
};
