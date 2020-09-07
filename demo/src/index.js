import React, {useState} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
	MenuTree
} from '../../src';

import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

const mockList = [
  {id: '2', name: '测试数据2', parentid: '-1'},
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];

function Demo () {
  const [list, setList] = useState(mockList)
	const [selected, setSelected] = useState([{id: 'I', name: '测试数据1-b-I', parentid: 'b'}])
	function clearData () {
		setList([])
	}
	function addData () {
		setList(mockList)
	}
	function onChange (e, value, selected) {
		console.log(e.target)
		console.log(value, selected)
		setSelected(selected);
	}
	function extendActive (e, value, selected) {
		console.log(e.target)
		console.log(value, selected)
	}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<MenuTree list={list} selected={selected} onChange={onChange} onExtendActive={extendActive}/>
			<input type="button" value="置空" onClick={clearData}/>
			<input type="button" value="显示" onClick={addData}/>
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
