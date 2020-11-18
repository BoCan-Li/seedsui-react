import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  InputStar
} from '../../src';
function Demo () {
	const [value, setValue] = useState(0);
	function onChange (e, value) {
		setValue(value);
	}
	function onError (e, error) {
		console.log(error)
	}
  return <Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
			<InputStar
				value={value}
				onChange={onChange}
				onError={onError}
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
