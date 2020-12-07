import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Photos,
  Debugger
} from '../../src';

const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
}];

function Demo () {
	useEffect(() => {
		// 连续点击10次, 显示vconsole
		Debugger.vconsoleLogger(document.getElementById('vconsoleHandler'));
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
  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
			<Photos
				list={list}
				onChoose={handleChoose}
				onDelete={handleDelete}
				onClick={handleClick}
				beforeChoose={() => false}
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
