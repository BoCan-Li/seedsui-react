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
  Share,
  Context
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  const [value, setValue] = useState();
  function addHistory () {
    Bridge.uploadImage();
    setValue('bb')
    Bridge.addHistoryBack(() => {
      console.log('一直监听返回');
      Bridge.removeHistoryBack();
    });
    Bridge.addHistoryBack(() => {
      setValue('aa')
      console.log('返回1');
    }, 'dialog=bb');
  }
  function addHistory2 () {
    setValue('cc')
    Bridge.addHistoryBack(() => {
      setValue('bb')
      console.log('返回2');
    }, 'dialog=cc');
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <div onClick={addHistory}>加个路由</div>
      <div onClick={addHistory2}>再加个路由</div>
      <div>{value}</div>
    </Container>
  </Page>
}



Bridge.ready(() => {
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      console.log(1)
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
