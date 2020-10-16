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

function Demo () {
  // 获取街道
  function getStreet (districtId) {
    return new Promise((resolve) => {
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
    })
  }

  const [value, setValue] = useState('北京-东城-街道1');

  function onChange (e, value, selected) {
    console.log(e.target)
    console.log(value, selected)
    setValue(value);
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
          getStreet: getStreet
        }}
      />
    </Container>
  </Page>
}


Bridge.ready(() => {
	// render(<Demo/>, document.querySelector('#demo'))
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
