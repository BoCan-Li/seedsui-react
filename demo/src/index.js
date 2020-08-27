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
  InputSelect,
} from '../../src';

function Demo () {
  useEffect(() => {
  }, [])
	const [value, setValue] = useState('选项1');
	const [selected, setSelected] = useState([]);
	const [list, setList] = useState([{
		"selected": "1",
		"value": "1",
		"key": "选项1",
		"name": "选项1"
	}, {
		"selected": "0",
		"value": "2",
		"key": "选项2",
		"name": "选项2"
	}, {
		"selected": "0",
		"value": "3",
		"key": "选项3",
		"name": "选项3"
	}, {
		"value": "4",
		"selected": "0",
		"key": "选项4",
		"name": "选项4"
	}, {
		"value": "5",
		"selected": "0",
		"key": "选项5",
		"name": "选项5"
	}, {
		"value": "6",
		"selected": "0",
		"key": "选项6",
		"name": "选项6"
	}, {
		"value": "7",
		"selected": "0",
		"key": "选项7",
		"name": "选项7"
	}]);
	
	function changeHandler (e, value, selected) {
		console.log(selected)
		// setSelected(selected);
		setValue(value);
	}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<InputSelect
				checkbox={list && list.length <= 7} // 少于7个平铺展示
				value={value}
				list={list}
				// selected={selected}
				onChange={changeHandler}
				className="attribute-input-right"
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
