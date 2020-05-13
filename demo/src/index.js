import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
  InputLocation,
  MapUtil
} from '../../src';

function Demo () {
  const refComponent = useRef(null);

  const [value, setValue] = useState('');
  useEffect(() => {
    Bridge.debug = true
  }, [])
  function changeValue (e, val) {
    setValue(val)
  }

  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
		<Container>
      <InputLocation value={value} onChange={changeValue}/>
		</Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
