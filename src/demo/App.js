import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Timeline from '../lib/Timeline';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: '5.00'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onClick = () => {
    console.log(1)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Timeline lineParams={{
        style: {backgroundColor: 'red', top: '0'
      }}}
      dotParams={{
        style: {backgroundColor: 'red'}
      }} list={[
        {
          content: <p>第一行</p>
        }
      ]}/>
    </Page>
  }
};
