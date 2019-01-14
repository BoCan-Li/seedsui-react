import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Carrousel from '../lib/Carrousel';
import OnOff from '../lib/OnOff';
import NumBox from '../lib/NumBox';
import InputCity from '../lib/InputCity';

const numberStyle = {
  'position': 'absolute',
  'right': '10px',
  'bottom': '10px',
  'color': 'white',
  'backgroundColor': 'rgba(0,0,0,.4)',
  'width': '50px',
  'height': '24px',
  'borderRadius': '20px',
  'fontSize': '12px',
  'textAlign': 'center',
  'lineHeight': '24px'
}

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
  onChagne = (value) => {
    console.log(value);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Carrousel style={{height: '300px'}} pagination={<div style={numberStyle}>1/2</div>} list={[
        {
          bg: 'http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180912160555102_21346241_CAMERA_21001007288.jpg',
          caption: '呵呵',
          iconParams: {style: {color: 'red'}}
        },
        {
          bg: 'http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180912160555102_21346241_CAMERA_21001007288.jpg'
        }
      ]}/>
      <OnOff onCaption="开" offCaption="关"/>
      <OnOff onCaption="开" offCaption="关" checked/>
      <OnOff/>
      <OnOff checked/>
      <NumBox onChange={this.onChagne} value={1}/>
      <InputCity/>
    </Page>
  }
};
