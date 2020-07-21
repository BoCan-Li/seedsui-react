import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  InputDate,
  Context,
  MapUtil,
  InputLocation,
  MapView
} from '../../src';

import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

function Demo () {
  const [selected, setSelected] = useState({latitude: '31.968592', longitude: '118.798128', address: '南京南站'});
  function changeSelected () {
    setSelected({
      latitude: '32.113449', longitude: '118.619429', address: '老山'
    });
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     changeSelected();
  //     console.log('修改值')
  //   }, 3000);
  // }, [])
  const [value, setValue] = useState('asdf');
  function onChange (e, value) {
    console.log(e.target);
    setValue(value);
  }
  // return <MapView
  //   // district={{province: {id: "320000", name: "江苏"}, city: {id: "320100", name: "南京市"}}}
  //   // circle={{point: [118.798128, 31.968592], radius: 1000}}
  //   points={[[118.798128, 31.968592], [118.619429,32.113449]]}
    
  // />
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation
        selected={selected}
        readOnly={true}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={onChange}
        onClick={(e) => console.log(e)}
      />
      <InputLocation
        selected={{latitude: '32.113449', longitude: '118.619429', address: '老山'}}
        readOnly={true}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={onChange}
        onClick={(e) => console.log(e)}
      />
    </Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
