import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Photos
} from '../../src';
let clickSpace = null;
function Demo () {
  const list = [{
    type: 'video',
    thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
    src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
  },{
    type: 'video',
    thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
    src: 'https://www.w3school.com.cn/i/movie.ogg'
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
