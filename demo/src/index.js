import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  MapUtil,
  Photos,
} from '../../src';

function Demo () {
  useEffect(() => {
  }, [])
	const list = [{
		id: '1',
		thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
		src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
	},{
		id: '2',
		thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
		src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
	}];
	
	function onClick (...params) {
		console.log('点击')
		console.log(...params)
	}
	function onChoose (...params) {
		console.log('选择')
		console.log(...params)
	}
	function onDelete (...params) {
		console.log('删除')
		console.log(...params)
	}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<Photos
				list={list}
				onChoose={onChoose}
				onDelete={onDelete}
				onClick={onClick}
			/>
    </Container>
  </Page>
}


Bridge.ready(() => {
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
