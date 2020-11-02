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
  const [activeIndex, setActiveIndex] = useState(3);
  function change (s) {
    console.log(s);
    setActiveIndex(s.activeIndex)
  }
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
      <Button onClick={() => setActiveIndex(0)}>第1页</Button>
      {/* <Button onClick={() => setList(imgList2)}>换列表</Button> */}
      <Carrousel
        className="carrousel-page"
        style={{top: '84px'}}
        onChange={change}
        activeIndex={activeIndex}
        slidesPerView={2}
        loop
      >
        <Page>第一页</Page>
        <Page>第二页</Page>
        <Page>第三页</Page>
        <Page>第四页</Page>
      </Carrousel>
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
