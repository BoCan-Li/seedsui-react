import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  Button,
  Carrousel
} from '../../src';

function Demo () {
  const imgList1 = [
    {
      bg: 'http://thumbs.dreamstime.com/b/%E5%A4%A9%E9%99%85%E6%B5%B7%E6%B5%B7%E6%B4%8B%E5%92%8C%E8%93%9D%E5%A4%A9%E8%83%8C%E6%99%AF%E5%AE%89%E9%9D%99-100160983.jpg'
    },
    {
      bg: 'http://photo.tuchong.com/24951/f/32312037.jpg'
    }
  ]
  const imgList2 = [
    {
      bg: 'http://youimg1.c-ctrip.com/target/tg/616/052/178/ceeddf2de3a74df184bcacc9e6b3123c.jpg'
    },
    {
      bg: 'http://img1.cache.netease.com/catchpic/4/45/45F29E5ABA21EBBE1E8B50C2FA6D8EB4.jpg'
    }
  ]
  
  const [list, setList] = useState(imgList1);
  const [activeIndex, setActiveIndex] = useState(0);
  
  function onCarrouselChange (s) {
    console.log(s.activeIndex)
    setActiveIndex(s.activeIndex)
  }
  function onCarrouselClick (s, item) {
    console.log(item);
  }
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <Button onClick={() => setActiveIndex(0)}>第1页</Button>
      {/* <Button onClick={() => setList(imgList2)}>换列表</Button> */}
        <Carrousel
          list={list}
          style={{height: '300px'}}
          pagination
          loop
          activeIndex={activeIndex}
          onChange={onCarrouselChange}
          onClick={onCarrouselClick}
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
