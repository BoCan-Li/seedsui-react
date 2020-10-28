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
import data from '../../src/PickerDistrict/china.js'

function Demo () {
  useEffect(() => {
    Bridge.showAlert('aa', {
      success: (e) => {
        console.log(1)
        e.hide();
      },
      fail: (e) => {
        console.log(2)
        e.hide()
      }
    })
  })
  // 获取省市区
  function getData () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    })
  }
  // 获取街道
  function getStreet (districtId) {
    return new Promise((resolve) => {
      Bridge.showLoading();
      setTimeout(() => {
        Bridge.hideLoading();
        resolve([{"parentid":"110101","name":"天坛街道办事处","id":"110101016"},{"parentid":"110101","name":"东直门街道办事处","id":"110101009"},{"parentid":"110101","name":"和平里街道办事处","id":"110101010"},{"parentid":"110101","name":"朝阳门街道办事处","id":"110101007"},{"parentid":"110101","name":"东花市街道办事处","id":"110101013"},{"parentid":"110101","name":"龙潭街道办事处","id":"110101014"},{"parentid":"110101","name":"景山街道办事处","id":"110101002"},{"parentid":"110101","name":"体育馆路街道办事处","id":"110101015"},{"parentid":"110101","name":"安定门街道办事处","id":"110101004"},{"parentid":"110101","name":"建国门街道办事处","id":"110101008"},{"parentid":"110101","name":"东四街道办事处","id":"110101006"},{"parentid":"110101","name":"北新桥街道办事处","id":"110101005"},{"parentid":"110101","name":"交道口街道办事处","id":"110101003"},{"parentid":"110101","name":"崇文门外街道办事处","id":"110101012"},{"parentid":"110101","name":"东华门街道办事处","id":"110101001"},{"parentid":"110101","name":"前门街道办事处","id":"110101011"},{"parentid":"110101","name":"永定门外街道办事处","id":"110101017"}])
      }, 1000);
    })
  }

  const [value, setValue] = useState('');

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
          getData: getData,
          getStreets: getStreet
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
