import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Device,
	MapUtil,
  ImgMark,
  NumBox,
  MenuTiled
} from '../../src'


const menus = [
  {id: '1', name: '测试数据1', parentid: '-1'},
  {id: '2', name: '测试数据2', parentid: '-1'},
  {id: 'a', name: '测试数据1-a', parentid: '1'},
  {id: 'b', name: '测试数据1-b', parentid: '1'},
  {id: 'I', name: '测试数据1-b-I', parentid: 'b'},
  {id: 'II', name: '测试数据1-b-II', parentid: 'b'}
];

function Demo () {
  const [selected, setSelected] = useState([{id: 'b', name: '测试数据1-b', parentid: '1'}])
  const [count, setCount] = useState(10)

  useEffect(() => {
    console.log(new Date().diff(new Date('2023-04-10')))
  }, [])

  function handleCountDown () {
    setCount(count - 1)
    console.log(count)
  }

  function onClickMenu (e, value, selected, data) {
    console.log(e, value, selected, data);
    setSelected(selected)
  }

  return <Page>
		<Header>
			<Titlebar caption="标题"/>
      <MenuTiled multiple list={menus} selected={selected} onChange={onClickMenu}/>
		</Header>
		<Container>
      {count}
      <div onClick={handleCountDown}>开始</div> 
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
