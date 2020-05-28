import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
  Container,
	Attach
} from '../../src';


function Demo () {
  useEffect(() => {
    console.log('asdfasdf/.1.jpg?aaa'.getSuffix())
  })
  const list = [{
    name: '1',
    src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
  },{
    name: '2',
    src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.map4'
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
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <Attach
        list={list}
        onChoose={onChoose}
        onDelete={onDelete}
        onClick={onClick}
      />
		</Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
