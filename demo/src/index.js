import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  InputLocation
} from '../../src';
function Demo () {
  const [selected, setSelected] = useState({latitude: '31.968592', longitude: '118.798128', address:'南京南站'});
  useEffect(() => {
    setTimeout(() => {
      setSelected({latitude: '32.113449', longitude: '118.619429', address:'老山'});
    }, 5000);
  }, []) // eslint-disable-line
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation readOnly={true} value={selected.address} selected={selected}/>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
