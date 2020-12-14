import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Videos,
  Debugger
} from '../../src';

const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://www.w3school.com.cn/i/movie.ogg'
}]

function Demo () {
	let [nums, setNums] = useState(null)
	function handleHide () {
		console.log('绑定')
	}
	useEffect(() => {
		Bridge.addBackPress(handleHide);
		// 连续点击10次, 显示vconsole
		Debugger.vconsoleLogger(document.getElementById('vconsoleHandler'));
		return () => {
			console.log('解除绑定')
		}
	}, []) // eslint-disable-line

	function handleClick (...params) {
		console.log('点击')
		console.log(...params)
	}
	function handleChoose (...params) {
		console.log('选择')
		console.log(...params)
	}
	function handleDelete (...params) {
		console.log('删除')
		console.log(...params)
	}
	function handleHide () {
		console.log('隐藏')
	}
  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
			<Videos
				list={list}
				onChoose={handleChoose}
				onDelete={handleDelete}
				onClick={handleClick}
				onPreviewHide={handleHide}
				
			/>
    </Container>
  </Page>
	<div id="vconsoleHandler" style={{position: 'absolute', top: 0, left: '50%', marginLeft: '-50px', width: '100px', height: '30px', zIndex: '999'}}></div>
	</Fragment>
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
