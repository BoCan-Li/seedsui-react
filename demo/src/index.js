import React, {useState, useRef, createRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Photos
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

  function onClick (...params) {
    console.log('点击')
    console.log(...params)
  }
  function onChoose (e) {
    console.log('选择')
    setTimeout(() => {
      console.log(e.target)
    }, 1000);
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
      <Photos
        list={list}
        onChoose={onChoose}
        onDelete={onDelete}
        onClick={onClick}
      />
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
