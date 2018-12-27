import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Carrousel from '../lib/Carrousel';

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
  onChange = (value) => {
    this.setState({
      value
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
			<Carrousel style={{height: '500px'}} list={[{img: 'http://res.waiqin365.com/d/seedsui/carrousel/default.png'}, {img: 'http://res.waiqin365.com/d/seedsui/bi-gauge/gauge.png'}]}/>
    </Page>
  }
};
