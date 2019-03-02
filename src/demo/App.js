import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Picker from '../lib/Picker';

const mockPickerList = [{
	"key": "7004955043756964827",
	"value": "瓶"
}, {
	"key": "5796844733294559575",
	"value": "箱(=25.0000瓶)"
}];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerShow: false,
      pickerId: '',
      pickerList: []
    }
  }
  componentDidMount() {
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
      pickerId: '5796844733294559575',
      pickerList: mockPickerList,
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
      </Container>
      {/* 更多操作 */}
      <Picker
        list={this.state.pickerList}
        valueForKey={this.state.pickerId}
        show={this.state.pickerShow}
        onClickSubmit={this.onClickSubmit}
        onClickCancel={this.hidePicker}
        onClickMask={this.hidePicker}
      />
    </Page>
  }
};
