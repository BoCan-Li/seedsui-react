import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Bridge from '../lib/Bridge';
import ImgMark from '../lib/ImgMark';

const result = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
	}, {
		"x1": 221,
		"x2": 269,
		"y1": 774,
		"y2": 948
	}, {
		"x1": 64,
		"x2": 110,
		"y1": 293,
		"y2": 473
	}, {
		"x1": 598,
		"x2": 643,
		"y1": 283,
		"y2": 468
	}, {
		"x1": 251,
		"x2": 297,
		"y1": 296,
		"y2": 472
	}, {
		"x1": 266,
		"x2": 312,
		"y1": 89,
		"y2": 265
	}, {
		"x1": 198,
		"x2": 242,
		"y1": 294,
		"y2": 474
	}, {
		"x1": 311,
		"x2": 355,
		"y1": 84,
		"y2": 265
	}, {
		"x1": 646,
		"x2": 688,
		"y1": 287,
		"y2": 466
	}, {
		"x1": 155,
		"x2": 196,
		"y1": 295,
		"y2": 473
	}, {
		"x1": 84,
		"x2": 129,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 431,
		"x2": 475,
		"y1": 575,
		"y2": 721
	}, {
		"x1": 219,
		"x2": 262,
		"y1": 569,
		"y2": 720
	}, {
		"x1": 131,
		"x2": 174,
		"y1": 573,
		"y2": 721
	}, {
		"x1": 176,
		"x2": 218,
		"y1": 572,
		"y2": 720
	}, {
		"x1": 137,
		"x2": 180,
		"y1": 810,
		"y2": 947
	}, {
		"x1": 388,
		"x2": 430,
		"y1": 578,
		"y2": 719
	}, {
		"x1": 587,
		"x2": 627,
		"y1": 808,
		"y2": 948
	}, {
		"x1": 263,
		"x2": 303,
		"y1": 578,
		"y2": 717
	}, {
		"x1": 355,
		"x2": 401,
		"y1": 144,
		"y2": 261
	}, {
		"x1": 423,
		"x2": 466,
		"y1": 356,
		"y2": 473
	}, {
		"x1": 382,
		"x2": 422,
		"y1": 355,
		"y2": 471
	}, {
		"x1": 672,
		"x2": 712,
		"y1": 148,
		"y2": 254
	}, {
		"x1": 552,
		"x2": 596,
		"y1": 389,
		"y2": 466
	}, {
		"x1": 512,
		"x2": 550,
		"y1": 633,
		"y2": 721
	}, {
		"x1": 589,
		"x2": 627,
		"y1": 633,
		"y2": 719
	}, {
		"x1": 472,
		"x2": 507,
		"y1": 865,
		"y2": 956
	}, {
		"x1": 468,
		"x2": 510,
		"y1": 389,
		"y2": 467
	}, {
		"x1": 553,
		"x2": 587,
		"y1": 632,
		"y2": 720
	}, {
		"x1": 544,
		"x2": 585,
		"y1": 810,
		"y2": 949
	}, {
		"x1": 217,
		"x2": 266,
		"y1": 86,
		"y2": 271
	}, {
		"x1": 580,
		"x2": 625,
		"y1": 172,
		"y2": 255
	}, {
		"x1": 403,
		"x2": 440,
		"y1": 175,
		"y2": 259
	}, {
		"x1": 510,
		"x2": 551,
		"y1": 391,
		"y2": 465
	}, {
		"x1": 324,
		"x2": 380,
		"y1": 289,
		"y2": 471
	}, {
		"x1": 348,
		"x2": 388,
		"y1": 576,
		"y2": 721
	}, {
		"x1": 507,
		"x2": 543,
		"y1": 860,
		"y2": 950
	}, {
		"x1": 628,
		"x2": 666,
		"y1": 630,
		"y2": 720
	}, {
		"x1": 305,
		"x2": 346,
		"y1": 581,
		"y2": 720
	}, {
		"x1": 127,
		"x2": 195,
		"y1": 76,
		"y2": 263
	}, {
		"x1": 628,
		"x2": 669,
		"y1": 171,
		"y2": 255
	}, {
		"x1": 98,
		"x2": 135,
		"y1": 847,
		"y2": 946
	}, {
		"x1": 182,
		"x2": 217,
		"y1": 837,
		"y2": 943
	}, {
		"x1": 538,
		"x2": 578,
		"y1": 177,
		"y2": 258
	}, {
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};

const result1 = {
	"skuList": [{
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
  }]
};

const result2 = {
	"skuList": [{
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}]
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  
  onChangeData = () => {
    this.setState({
      data: result.skuList
    })
  }
  onChangeData1 = () => {
    this.setState({
      data: result1.skuList
    })
  }
  onChangeData2 = () => {
    this.setState({
      data: result2.skuList
    })
  }
  render() {
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
      </Header>
      <Container>
        <ImgMark
					watermark="//res.waiqin365.com/d/common_mobile/images/placeholder/watermark.png"
          height={300}
          src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg" // 示例中,图片跨域请用cross插件解决
          data={this.state.data}
        />
        <input type="button" value="全部" onClick={this.onChangeData}/>
        <input type="button" value="切换1" onClick={this.onChangeData1}/>
        <input type="button" value="切换2" onClick={this.onChangeData2}/>
      </Container>
    </Page>
  }
};
