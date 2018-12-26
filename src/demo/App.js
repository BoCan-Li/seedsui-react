import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Bridge from '../lib/Bridge';
import Container from '../lib/Container';
import ImgMark from '../lib/ImgMark';

const result = {
	"imageId": 7842878646211785337,
	"jsonType": "AiSkuCheckResult",
	"message": "",
	"resultCode": 1,
	"skuList": [{
		"skuId": "baiyin_kele_009",
		"x1": 442,
		"x2": 492,
		"y1": 79,
		"y2": 265
	}, {
		"skuId": "baiyin_kele_001",
		"x1": 51,
		"x2": 103,
		"y1": 94,
		"y2": 263
	}, {
		"skuId": "baiyin_qixi_002",
		"x1": 221,
		"x2": 269,
		"y1": 774,
		"y2": 948
	}, {
		"skuId": "baiyin_meinianda_001",
		"x1": 64,
		"x2": 110,
		"y1": 293,
		"y2": 473
	}, {
		"skuId": "baiyin_meinianda_011",
		"x1": 598,
		"x2": 643,
		"y1": 283,
		"y2": 468
	}, {
		"skuId": "baiyin_meinianda_005",
		"x1": 251,
		"x2": 297,
		"y1": 296,
		"y2": 472
	}, {
		"skuId": "baiyin_kele_005",
		"x1": 266,
		"x2": 312,
		"y1": 89,
		"y2": 265
	}, {
		"skuId": "baiyin_meinianda_003",
		"x1": 198,
		"x2": 242,
		"y1": 294,
		"y2": 474
	}, {
		"skuId": "baiyin_kele_006",
		"x1": 311,
		"x2": 355,
		"y1": 84,
		"y2": 265
	}, {
		"skuId": "baiyin_meinianda_011",
		"x1": 646,
		"x2": 688,
		"y1": 287,
		"y2": 466
	}, {
		"skuId": "baiyin_meinianda_003",
		"x1": 155,
		"x2": 196,
		"y1": 295,
		"y2": 473
	}, {
		"skuId": "baiyin_jiadele_001",
		"x1": 84,
		"x2": 129,
		"y1": 572,
		"y2": 720
	}, {
		"skuId": "baiyin_chunguole_005",
		"x1": 431,
		"x2": 475,
		"y1": 575,
		"y2": 721
	}, {
		"skuId": "baiyin_jiadele_004",
		"x1": 219,
		"x2": 262,
		"y1": 569,
		"y2": 720
	}, {
		"skuId": "baiyin_jiadele_002",
		"x1": 131,
		"x2": 174,
		"y1": 573,
		"y2": 721
	}, {
		"skuId": "baiyin_jiadele_003",
		"x1": 176,
		"x2": 218,
		"y1": 572,
		"y2": 720
	}, {
		"skuId": "baiyin_chunshuile_002",
		"x1": 137,
		"x2": 180,
		"y1": 810,
		"y2": 947
	}, {
		"skuId": "baiyin_chunguole_004",
		"x1": 388,
		"x2": 430,
		"y1": 578,
		"y2": 719
	}, {
		"skuId": "baiyin_lidun_005",
		"x1": 587,
		"x2": 627,
		"y1": 808,
		"y2": 948
	}, {
		"skuId": "baiyin_chunguole_001",
		"x1": 263,
		"x2": 303,
		"y1": 578,
		"y2": 717
	}, {
		"skuId": "baiyin_kele_007",
		"x1": 355,
		"x2": 401,
		"y1": 144,
		"y2": 261
	}, {
		"skuId": "baiyin_meinianda_007",
		"x1": 423,
		"x2": 466,
		"y1": 356,
		"y2": 473
	}, {
		"skuId": "baiyin_meinianda_007",
		"x1": 382,
		"x2": 422,
		"y1": 355,
		"y2": 471
	}, {
		"skuId": "baiyin_kele_013",
		"x1": 672,
		"x2": 712,
		"y1": 148,
		"y2": 254
	}, {
		"skuId": "baiyin_meinianda_010",
		"x1": 552,
		"x2": 596,
		"y1": 389,
		"y2": 466
	}, {
		"skuId": "baiyin_chunguole_007",
		"x1": 512,
		"x2": 550,
		"y1": 633,
		"y2": 721
	}, {
		"skuId": "baiyin_chunguole_009",
		"x1": 589,
		"x2": 627,
		"y1": 633,
		"y2": 719
	}, {
		"skuId": "baiyin_lidun_002",
		"x1": 472,
		"x2": 507,
		"y1": 865,
		"y2": 956
	}, {
		"skuId": "baiyin_meinianda_008",
		"x1": 468,
		"x2": 510,
		"y1": 389,
		"y2": 467
	}, {
		"skuId": "baiyin_chunguole_008",
		"x1": 553,
		"x2": 587,
		"y1": 632,
		"y2": 720
	}, {
		"skuId": "baiyin_lidun_004",
		"x1": 544,
		"x2": 585,
		"y1": 810,
		"y2": 949
	}, {
		"skuId": "baiyin_kele_004",
		"x1": 217,
		"x2": 266,
		"y1": 86,
		"y2": 271
	}, {
		"skuId": "baiyin_kele_011",
		"x1": 580,
		"x2": 625,
		"y1": 172,
		"y2": 255
	}, {
		"skuId": "baiyin_kele_008",
		"x1": 403,
		"x2": 440,
		"y1": 175,
		"y2": 259
	}, {
		"skuId": "baiyin_meinianda_009",
		"x1": 510,
		"x2": 551,
		"y1": 391,
		"y2": 465
	}, {
		"skuId": "baiyin_meinianda_014",
		"x1": 324,
		"x2": 380,
		"y1": 289,
		"y2": 471
	}, {
		"skuId": "baiyin_chunguole_003",
		"x1": 348,
		"x2": 388,
		"y1": 576,
		"y2": 721
	}, {
		"skuId": "baiyin_lidun_003",
		"x1": 507,
		"x2": 543,
		"y1": 860,
		"y2": 950
	}, {
		"skuId": "baiyin_lidun_001",
		"x1": 628,
		"x2": 666,
		"y1": 630,
		"y2": 720
	}, {
		"skuId": "baiyin_chunguole_002",
		"x1": 305,
		"x2": 346,
		"y1": 581,
		"y2": 720
	}, {
		"skuId": "baiyin_kele_003",
		"x1": 127,
		"x2": 195,
		"y1": 76,
		"y2": 263
	}, {
		"skuId": "baiyin_kele_012",
		"x1": 628,
		"x2": 669,
		"y1": 171,
		"y2": 255
	}, {
		"skuId": "baiyin_chunshuile_001",
		"x1": 98,
		"x2": 135,
		"y1": 847,
		"y2": 946
	}, {
		"skuId": "baiyin_qixi_001",
		"x1": 182,
		"x2": 217,
		"y1": 837,
		"y2": 943
	}, {
		"skuId": "baiyin_kele_010",
		"x1": 538,
		"x2": 578,
		"y1": 177,
		"y2": 258
	}, {
		"skuId": "baiyin_kele_011",
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"skuId": "kekoukele_kele_002",
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"skuId": "baiyin_qixi_003",
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}],
	"tenantId": "6692513571099135446"
};





const result1 = {
	"imageId": 7842878646211785337,
	"jsonType": "AiSkuCheckResult",
	"message": "",
	"resultCode": 1,
	"skuList": [{
		"skuId": "baiyin_chunguole_004",
		"x1": 388,
		"x2": 430,
		"y1": 578,
		"y2": 719
	}, {
		"skuId": "baiyin_lidun_005",
		"x1": 587,
		"x2": 627,
		"y1": 808,
		"y2": 948
	}, {
		"skuId": "baiyin_chunguole_001",
		"x1": 263,
		"x2": 303,
		"y1": 578,
		"y2": 717
	}, {
		"skuId": "baiyin_kele_007",
		"x1": 355,
		"x2": 401,
		"y1": 144,
		"y2": 261
	}, {
		"skuId": "baiyin_meinianda_007",
		"x1": 423,
		"x2": 466,
		"y1": 356,
		"y2": 473
	}, {
		"skuId": "baiyin_meinianda_007",
		"x1": 382,
		"x2": 422,
		"y1": 355,
		"y2": 471
	}, {
		"skuId": "baiyin_kele_013",
		"x1": 672,
		"x2": 712,
		"y1": 148,
		"y2": 254
	}, {
		"skuId": "baiyin_meinianda_010",
		"x1": 552,
		"x2": 596,
		"y1": 389,
		"y2": 466
	}, {
		"skuId": "baiyin_chunguole_007",
		"x1": 512,
		"x2": 550,
		"y1": 633,
		"y2": 721
	}, {
		"skuId": "baiyin_chunguole_009",
		"x1": 589,
		"x2": 627,
		"y1": 633,
		"y2": 719
	}, {
		"skuId": "baiyin_lidun_002",
		"x1": 472,
		"x2": 507,
		"y1": 865,
		"y2": 956
	}, {
		"skuId": "baiyin_meinianda_008",
		"x1": 468,
		"x2": 510,
		"y1": 389,
		"y2": 467
	}, {
		"skuId": "baiyin_chunguole_008",
		"x1": 553,
		"x2": 587,
		"y1": 632,
		"y2": 720
	}, {
		"skuId": "baiyin_lidun_004",
		"x1": 544,
		"x2": 585,
		"y1": 810,
		"y2": 949
	}, {
		"skuId": "baiyin_kele_004",
		"x1": 217,
		"x2": 266,
		"y1": 86,
		"y2": 271
	}, {
		"skuId": "baiyin_kele_011",
		"x1": 580,
		"x2": 625,
		"y1": 172,
		"y2": 255
	}, {
		"skuId": "baiyin_kele_008",
		"x1": 403,
		"x2": 440,
		"y1": 175,
		"y2": 259
	}, {
		"skuId": "baiyin_meinianda_009",
		"x1": 510,
		"x2": 551,
		"y1": 391,
		"y2": 465
	}, {
		"skuId": "baiyin_meinianda_014",
		"x1": 324,
		"x2": 380,
		"y1": 289,
		"y2": 471
	}, {
		"skuId": "baiyin_chunguole_003",
		"x1": 348,
		"x2": 388,
		"y1": 576,
		"y2": 721
	}, {
		"skuId": "baiyin_lidun_003",
		"x1": 507,
		"x2": 543,
		"y1": 860,
		"y2": 950
	}, {
		"skuId": "baiyin_lidun_001",
		"x1": 628,
		"x2": 666,
		"y1": 630,
		"y2": 720
	}],
	"tenantId": "6692513571099135446"
};



const result2 = {
	"imageId": 7842878646211785337,
	"jsonType": "AiSkuCheckResult",
	"message": "",
	"resultCode": 1,
	"skuList": [{
		"skuId": "baiyin_chunguole_002",
		"x1": 305,
		"x2": 346,
		"y1": 581,
		"y2": 720
	}, {
		"skuId": "baiyin_kele_003",
		"x1": 127,
		"x2": 195,
		"y1": 76,
		"y2": 263
	}, {
		"skuId": "baiyin_kele_012",
		"x1": 628,
		"x2": 669,
		"y1": 171,
		"y2": 255
	}, {
		"skuId": "baiyin_chunshuile_001",
		"x1": 98,
		"x2": 135,
		"y1": 847,
		"y2": 946
	}, {
		"skuId": "baiyin_qixi_001",
		"x1": 182,
		"x2": 217,
		"y1": 837,
		"y2": 943
	}, {
		"skuId": "baiyin_kele_010",
		"x1": 538,
		"x2": 578,
		"y1": 177,
		"y2": 258
	}, {
		"skuId": "baiyin_kele_011",
		"x1": 493,
		"x2": 536,
		"y1": 173,
		"y2": 259
	}, {
		"skuId": "kekoukele_kele_002",
		"x1": 212,
		"x2": 255,
		"y1": 1112,
		"y2": 1205
	}, {
		"skuId": "baiyin_qixi_003",
		"x1": 294,
		"x2": 351,
		"y1": 764,
		"y2": 939
	}],
	"tenantId": "6692513571099135446"
};


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			data: result.skuList,
      show: false,
      value: '5.00'
    }
  }
  componentDidMount() {
    Bridge.debug = true;
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  showPicker = () => {
    this.setState({
      show: true
    })
  }
  hidePicker = (e) => {
    console.log(e);
    this.setState({
      show: false
    })
  }
  onClickSubmit = (e) => {
    console.log(e);
    this.setState({
      value: e.activeText,
      show: false
    })
  }
  onChangeBarcode = () => {
    this.setState({
      value: '1234'
    })
	}
	onClick = () => {
		console.log('1')
	}
	preview = (e) => {
		var url = this.$elImgMark.state.instance.save();
		if (url) {
			Bridge.previewImage({urls: [url], index: 0});
		}
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
        <ImgMark ref={(el) => {this.$elImgMark = el;}} height={300} src="http://172.31.3.96:3001/20180911195747712_05105130_CAMERA_21001006280.jpg" data={this.state.data} onClick={this.preview}/>
				<input type="button" value="全部" onClick={this.onChangeData}/>
				<input type="button" value="切换1" onClick={this.onChangeData1}/>
				<input type="button" value="切换2" onClick={this.onChangeData2}/>
      </Container>
    </Page>
  }
};
