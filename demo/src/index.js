import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapView
} from '../../src';
function Demo () {
  const [point, setPoint] = useState([[118.798128, 31.968592], [118.66609, 31.974512]]);
  // useEffect(() => {
  // }, [])
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
    setPoint([[118.798128, 31.968592], [118.619429,32.113449]])
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
      <Titlebar caption="hh" rButtons={[{caption: '定位', onClick: onClick}]}/>
    </Header>
		<Container>
      <MapView
        ak='3pTjiH1BXLjASHeBmWUuSF83'
        points={point}
      />
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
