import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  MapUtil,
  InputDistrict
} from '../../src';
import country from '../../src/PickerDistrict/country.js';
import china from '../../src/PickerDistrict/china.js';

function Demo () {

  const [value, setValue] = useState('');
  const [selected, setSelected] = useState([
    {id: '86', name: '中国'} // 设置一个选中国家, 默认显示此国家下的省份, 否则将需要先选择国家
  ]);
  // 获取省市区
  function getData (id) {
    console.log('获取省市区')
    return new Promise((resolve) => {
      resolve([
        {
          "parentid": id,
          "name": "城市1",
          "id": "1",
        },
        {
          "parentid": id,
          "name": "城市2",
          "id": "2",
        }
      ])
    })
  }
  // 获取街道
  function getStreet (districtId) {
    console.log('获取街道')
    return new Promise((resolve) => {
      resolve([
        {
          "parentid": districtId,
          "name": "街道1",
          "id": "11",
        },
        {
          "parentid": districtId,
          "name": "街道2",
          "id": "22",
        }
      ])
    })
  }

  // 修改地址
  function onChange (e, value, selectedMap) {
    console.log(e.target)
    console.log(value, selectedMap)
    setValue(value);
    setSelected(selectedMap);
  }
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <InputDistrict
        value={value}
        // type="country"
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
        pickerProps={{
          countries: country,
          getStreets: getStreet,
          getData: getData,
          selected: selected
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
