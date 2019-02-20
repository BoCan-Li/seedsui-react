import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import InputNumber from '../lib/InputNumber';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
		Bridge.debug = true;
  }
  changePlanPdPrice = (value, [e, count]) => {
    if (value < 0) {
      e.target.value = 0
      value = 0
    }
    console.log(value)
    console.log(e.target)
    console.log(count)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
          <InputNumber
            className="bordered bg-white"
            style={{marginTop: '4px'}}
            inputClassName="SID-FeeApplyExecDetail-Store-Amount"
            args={['$event', '5']}
            value={'1'}
            onChange={this.changePlanPdPrice}
            inputStyle={{padding: '4px'}}
          />
      </Container>
    </Page>
  }
};
