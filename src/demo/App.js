import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Carrousel from '../lib/Carrousel';
import NumBox from '../lib/NumBox';
import InputDate from '../lib/InputDate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      value: ''
    }
  }
  componentDidMount() {
    Bridge.debug = true;
    console.log(Math.Calc.toFixed(0.07, 3, true))
  }
  onChange = (value, opt) => {
    this.setState({
      id: Object.type(opt) === 'array' ? opt.map((item) => {return item.id}).join(',') : opt.id,
      value: value
    })
  }
  onClick = (item) => {
    console.log(item);
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        <Carrousel onClick={this.onClick} list={[
          {
            img: 'http://g.hiphotos.baidu.com/image/h%3D300/sign=6f4318466e2762d09f3ea2bf90ed0849/5243fbf2b211931376d158d568380cd790238dc1.jpg'
          },
          {
            img: 'http://h.hiphotos.baidu.com/image/h%3D300/sign=b12ec0dd93510fb367197197e932c893/b999a9014c086e064a76b12f0f087bf40bd1cbfc.jpg'
          }
        ]}/>
        <NumBox style={{width: '300px'}}/>
        <InputDate value={''} min={'2018-11-11'} max={'2018-08-08'} className="border-b" placeholder="请选择" riconClassName="shape-arrow-right sm"/>
      </Container>
    </Page>
  }
};
