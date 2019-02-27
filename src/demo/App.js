import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import Picker from '../lib/Picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerShow: false,
      pickerId: '1',
      pickerList: [{key: '1', value: '111'}, {key: '2', value: '222'}]
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onClickSubmit = (e) => {
    const value = e.activeOptions[0].value;
    console.log(value);
    this.hidePicker();
  }
  hidePicker = () => {
    this.setState({
      pickerShow: false
    });
  }
  showPicker = () => {
    this.setState({
      pickerShow: true
    });
  }
  onClick = () => {
    this.setState({
      pickerId: '2',
      pickerShow: true
    });
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <input type="button" value="显示" onClick={this.onClick}/>
        <Picker
          list={this.state.pickerList}
          valueForKey={this.state.pickerId}
          show={this.state.pickerShow}
          onClickSubmit={this.onClickSubmit}
          onClickCancel={this.hidePicker}
          onClickMask={this.hidePicker}
        />
      </Container>
    </Page>
  }
};
