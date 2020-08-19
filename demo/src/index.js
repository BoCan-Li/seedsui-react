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
  MapChoose,
  Context,
  InputLocation,
  Device,
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  useEffect(() => {
    Bridge.debug = true
    let model = '';
    let userAgent = navigator.userAgent;
    console.log(Device.model)
  }, [])
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  function go1 () {
    setShow1(true)
    Bridge.addHistoryBack(() => {
      setShow1(false)
    }, `componentIndex=1`);
  }
  function go2 () {
    setShow2(true)
    Bridge.addHistoryBack(() => {
      setShow2(false)
    }, `componentIndex=2`);
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <div onClick={go1}>路由1</div>
      <div onClick={go2}>路由2</div>
      {show1 && <div>路由1:显示</div>}
      {show2 && <div>路由2:显示</div>}
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
