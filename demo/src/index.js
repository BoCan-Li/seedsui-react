import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Videos
} from '../../src';
function Demo () {
  useEffect(() => {
  }, [])
  const list = [{
    style: {backgroundColor: 'red'},
    id: '1',
    thumb: '',
    src: 'https://player.alicdn.com/video/aliyunmedia.mp4'
  },{
    id: '2',
    thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
    src: 'https://www.w3school.com.cn/i/movie.ogg'
  }];
  
  function onClick (...params) {
    console.log('点击')
    console.log(...params)
  }
  function onChoose (e) {
    console.log('选择')
    console.log(e)
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
      <Videos
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
