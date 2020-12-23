import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	InputLocation,
	MapUtil,
  Debugger
} from '../../src';

function Demo () {
	useEffect(() => {
		console.log(Bridge.getAppVersion())
	}, [])
const [value, setValue] = useState('');
function changeHandler (e, value) {
	console.log(value)
	setValue(value);
}
function handlePreview (e, err) {
  if (typeof err === 'object' && err.errMsg.indexOf('preview:fail') !== -1) {
    Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false});
  }
}
function handleHide (type) {
	console.log('关闭' + type)
}
  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
			<InputLocation
				clearReadOnly
				autoLocation
				pre
				value={value}
				placeholder="请点击获取位置信息"
				onChange={changeHandler}
				onPreviewHide={handleHide}
				preview={handlePreview}
			/>
    </Container>
  </Page>
	<div id="vconsoleHandler" style={{position: 'absolute', top: 0, left: '50%', marginLeft: '-50px', width: '100px', height: '30px', zIndex: '999'}}></div>
	</Fragment>
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
