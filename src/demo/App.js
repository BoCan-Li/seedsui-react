import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import InputText from '../lib/InputText';
import InputPassword from '../lib/InputPassword';
import cityData from './city.js';
import WxImgUpload from './WxImgUpload';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // picList: [{upload: true, id: '43213421', thumb: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg', src: 'https://static.zcool.cn/git_z/z/common/images/svg/logo.svg'}],
      picList: [],
      id: '',
      value: '',
      color: "#c72a1d",
      city: '9,88,1152',
      city_name: '中华人民共和国',
      data: cityData,
      dataValuePropertyName: 'name',
      dataKeyPropertyName: 'id',
      dataChildPropertyName: 'child',
      $overflowContainer: null
    }
  }
  componentDidMount() {
    Bridge.debug = true;
    this.setState({
      $overflowContainer: this.$el ? this.$el.parentNode : null
    })
    // jsonp('https://s1.mi.com/open/common/js/address_all_new.js', null, (err, data) => {
    //   console.log(err)
    //   console.log(data)
    // })
    // var script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.defer = 'defer'
    // script.src = 'https://s1.mi.com/open/common/js/address_all_new.js'
    // script.onload = () => {
    //   this.setState({
    //     data: data, // eslint-disable-line
    //     dataChildPropertyName: 'child',
    //     dataKeyPropertyName: 'id',
    //     dataValuePropertyName: 'name'
    //   });
    // }
    // document.body.appendChild(script)
  }
  onWqPhotoChange = (list) => {
    console.log(list)
    this.setState({
      picList: list
    });
  }
  onClickCancel = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickSubmit = (value, item, index) => {
    console.log(value, item, index);
  }
  onClickVideo = (args) => {
    Bridge.previewVideo({src: args.src});
  }
  onChangeColor = () => {
    this.setState({
      color: 'green'
    })
  }
  onChange = (value, option) => {
    this.setState({
      city_name: value,
      city: option.map((item, index) => {
        return item.key
      }).join(',')
    });
  }
  initChart = () => {
    // var chart = Highcharts.chart('container', {
    //   title: {
    //     floating:true,
    //     text: '已交<br/>80%'
    //   },
    //   plotOptions: {
    //     pie: {
    //       cursor: 'pointer',
    //       dataLabels: {
    //         enabled: false
    //       }
    //     }
    //   },
    //   series: [{
    //     type: 'pie',
    //     innerSize: '80%',
    //     data: [
    //       {y: 45.0},
    //       {y: 26.8},
    //       {y: 12.8}
    //     ]
    //   }]
    // }, function(c) { // 图表初始化完毕后的会掉函数
    //   // 环形图圆心
    //   var centerY = c.series[0].center[1],
    //     titleHeight = parseInt(c.title.styles.fontSize);
    //   // 动态设置标题位置
    //   c.setTitle({
    //     y:centerY + titleHeight/2 - 10
    //   });
    // });
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{borderColor: 'red'}} backCaption="返回"/>
      </Header>
      <Container>
        {/* <div id="container" style="min-width:200px;height:200px"></div> */}
        <InputText placeholder="haha"/>
        <InputPassword placeholder="hehe"/>
        <WxImgUpload list={this.state.picList} onChange={this.onWqPhotoChange} watermark={{caption: 'aaa', submitName: 'bbb', customerName: 'ccc'}}/>
      </Container>
    </Page>
  }
};
