import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
  Bridge,
  Container
} from '../../src';
function Demo () {
  useEffect(() => {
    Bridge.showAlert('hh', {mask: false})
  }, []);
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
    </Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
