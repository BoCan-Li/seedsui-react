import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Dragrefresh from '../lib/Dragrefresh';
import Button from '../lib/Button';

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
      <Dragrefresh
        hasMore={404}
        noDataParams={{
          iconParams: {className: 'notice-icon-error'},
          onClick: this.onClick,
          children: <Button className="md primary" style={{width: '100px', margin: '20px auto 0 auto', borderRadius: '4px'}} onClick={this.goLogin}>重新登录</Button>
        }}
      >
      </Dragrefresh>
    </Page>
  }
};
