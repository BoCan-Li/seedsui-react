import React, {useState, useRef, createRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  InputText
} from '../../src';

function Demo () {

  const [show, setShow] = useState(false); // 1.全部展开 -1.全部收缩 0.不工作
  function showNumbox () {
    setShow(true);
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      {show && <InputText digits={3} min={0} max={10} defaultValue={2} style={{width: '100px'}} clear/>}
      <input type="button" className="button lg" value="查看选中" onClick={showNumbox}/>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
