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

function Demo () {
  const [value, setValue] = useState('');
  function changeHandler (e, value, data) {
    console.log(e.target);
    console.log(data)
    setValue(value);
  }
  function previewHandler (e, err) {
    if (err.errMsg.indexOf('preview:fail') !== -1) {
      Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false});
    }
  }
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <InputLocation
        // type="choose"
        autoLocation
        readOnly={false}
        // readOnly={true}
        selected={{longitude: 118.798128, latitude: 31.968592, address: '南京南站'}}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={changeHandler}
        preview={previewHandler}
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
