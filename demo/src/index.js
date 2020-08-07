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
  Context,
  InputLocation
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  const [value, setValue] = useState('');
  function onChange (e, value) {
    console.log(e.target);
    setValue(value);
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation pre value={value} placeholder="请点击获取位置信息" onChange={onChange}/>
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
