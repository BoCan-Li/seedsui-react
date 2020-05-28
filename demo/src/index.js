import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
	Bridge,
  Container,
	InputLocation
} from '../../src';


function Demo () {
  useEffect(() => {
    Bridge.debug = true
  })
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  
  function onChange (e, value) {
    console.log(1)
    setValue(value);
  }
  function onChange2 (e, value) {
    console.log(2)
    setValue2(value);
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation value={value} placeholder="请点击获取位置信息" onChange={onChange}/>
      <InputLocation autoLocation value={value2} placeholder="请点击获取位置信息" onChange={onChange2}/>
		</Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
