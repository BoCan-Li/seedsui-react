import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container
} from '../../src';

function Demo () {
	function show () {
		Bridge.openWindow({
			title: '百度',
			url: 'h5:https://www.baidu.com/',
			target: '_self'
		})
	}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<input type="button" value="打开cordova" onClick={show}></input>
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
