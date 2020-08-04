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
  useEffect(() => {
    Bridge.onHistoryBack(() => {
      setValue('aa')
      console.log('返回');
    })
  }, [])
  function addHistory () {
    setValue('bb')
    // window.history.pushState({
    //   href: '?dialog=true'
    // }, document.title, '?dialog=true')
    Bridge.addHistoryParameter('dialog=true');
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <div onClick={addHistory}>加个路由</div>
      <div>{value}</div>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
