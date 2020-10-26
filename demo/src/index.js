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
  InputLocation
} from '../../src';
import country from '../../src/PickerDistrict/country.js';
import china from '../../src/PickerDistrict/china.js';

function Demo () {
  
  const [value, setValue] = useState('1');
  useEffect(() => {
    confirm();
    setTimeout(() => {
      setValue('3');
    }, 3000);
  }, [])
  // 修改地址
  function confirm (e) {
    Bridge.showConfirm('弹框', {
      success: (e) => {
        console.log(value)
        e.hide()
      }
    })
  }
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <input type="button" value="弹出" onClick={confirm}/>
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
