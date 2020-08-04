import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container
} from '../../src';
function Demo () {
  const [value, setValue] = useState('aa');
  function addHistory () {
    setValue('bb')
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

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
