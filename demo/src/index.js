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
      <InputLocation readOnly={true} riconAttribute={{className: ''}} value={value} placeholder="请点击获取位置信息" onChange={onChange}/>
    </Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
