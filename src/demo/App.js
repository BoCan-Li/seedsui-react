import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import InputPicker from '../lib/InputPicker';
import InputSelect from '../lib/InputSelect';

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
  onChange = (value, options) => {
    console.log(value);
    console.log(options);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <InputPicker onChange={this.onChange} list={[{key: '1', value: '1个'}, {key: '2', value: '2个'}]} value="2个" valueForKey="1"/>
        <InputSelect multiple valueBindProp onChange={this.onChange} list={[{key: '1', value: '1个'}, {key: '2', value: '2个'}]} value="2个" valueForKey="1"/>
      </Container>
    </Page>
  }
};
