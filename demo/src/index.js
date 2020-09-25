import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  InputDistrict
} from '../../src';

function Demo () {
// 获取街道
function getStreet (districtId) {
  return new Promise((resolve) => {
    Bridge.showLoading();
    setTimeout(() => {
      Bridge.hideLoading();
      resolve([
        {
          "parentid": districtId,
          "name": "街道1",
          "id": "1",
        },
        {
          "parentid": districtId,
          "name": "街道2",
          "id": "2",
        }
      ])
    }, 500);
  })
}

const [value, setValue] = useState('');

function onChange (e, value, selected) {
  console.log(e.target)
  console.log(value, selected)
  setValue(value);
}

function getData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{"name": "北京",
      "id": "110000",
      "children": [{
        "name": "东城区",
        "parentid": "110000",
        "id": "110101",
        "isLeaf": true
      }, {
        "name": "西城区",
        "parentid": "110000",
        "id": "110102",
        "isLeaf": true
      }, {
        "name": "朝阳区",
        "parentid": "110000",
        "id": "110105",
        "isLeaf": true
      }, {
        "name": "丰台区",
        "parentid": "110000",
        "id": "110106",
        "isLeaf": true
      }, {
        "name": "石景山区",
        "parentid": "110000",
        "id": "110107",
        "isLeaf": true
      }, {
        "name": "海淀区",
        "parentid": "110000",
        "id": "110108",
        "isLeaf": true
      }, {
        "name": "门头沟区",
        "parentid": "110000",
        "id": "110109",
        "isLeaf": true
      }, {
        "name": "房山区",
        "parentid": "110000",
        "id": "110111",
        "isLeaf": true
      }, {
        "name": "通州区",
        "parentid": "110000",
        "id": "110112",
        "isLeaf": true
      }, {
        "name": "顺义区",
        "parentid": "110000",
        "id": "110113",
        "isLeaf": true
      }, {
        "name": "昌平区",
        "parentid": "110000",
        "id": "110114",
        "isLeaf": true
      }, {
        "name": "大兴区",
        "parentid": "110000",
        "id": "110115",
        "isLeaf": true
      }, {
        "name": "怀柔区",
        "parentid": "110000",
        "id": "110116",
        "isLeaf": true
      }, {
        "name": "平谷区",
        "parentid": "110000",
        "id": "110117",
        "isLeaf": true
      }, {
        "name": "密云区",
        "parentid": "110000",
        "id": "110118",
        "isLeaf": true
      }, {
        "name": "延庆区",
        "parentid": "110000",
        "id": "110119",
        "isLeaf": true
      }]
    }])
    }, 2000);
  })
}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <InputDistrict
        value={value}
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
        pickerProps={{
          getData: getData,
          getStreet: getStreet
        }}
      />
    </Container>
  </Page>
}


Bridge.ready(() => {
	render(<Demo/>, document.querySelector('#demo'))
  // 加载百度地图js库
  // MapUtil.load({
  //   ak: '3pTjiH1BXLjASHeBmWUuSF83',
  //   success: () => {
  //     render(<Demo/>, document.querySelector('#demo'))
  //   },
  //   fail: () => {
  //     console.log('加载失败')
  //   }
  // })
});
