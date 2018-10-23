import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import RouteComment from '../lib/RouteComment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      list: [
        {
          id: '1',
          src: 'http://res.waiqin365.com/video/v2001.MP4',
          type: 'video'
        }
      ]
      
    }
  }
  componentDidMount() {
  }
  onApprover = (value, obj) => {
    console.log(value, obj)
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
      </Container>
      <RouteComment
        submitValid={false}
          title="审核"
          placeholder="请填写审批意见"
          cancelCaption="再次审核"
          submitCaption="直接打回"
          onClickCancel={this.onApprover}
          onClickSubmit={this.onApprover}
        />
    </Page>
  }
};
