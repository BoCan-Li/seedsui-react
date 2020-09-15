import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
	InputPicker
} from '../../src';

function Demo () {
	const [val, setVal] = useState('1');
	useEffect(() => {
		setTimeout(() => {
			setVal('2');
			console.log('修改值')
		}, 3000);
	}, [])
  const list = [
		{
			id: '1',
			name: '111'
		},
		{
			id: '2',
			name: '222'
		},
		{
			id: '3',
			name: '333'
		}
	];
	const [value, setValue] = useState('');

	function onChange (e, value, selected) {
		console.log(val)
		console.log(e.target)
		console.log(value, selected)
		setValue(value);
	}	
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<InputPicker
				list={list}
				value={value}
				onChange={onChange}
				placeholder="请选择"
				className="border-b"
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
