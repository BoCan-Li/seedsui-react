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
  InputLocation
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  function changeHandler (...params) {
    console.log(...params)
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation
        point={[118.798128, 31.968592]}
        type="choose"
        onChange={changeHandler}
      />
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
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      console.log(2)
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
