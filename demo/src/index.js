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
  const [locale, setLocale] = useState(zhCN);
  function useZh () {
    setLocale(zhCN);
  }
  function useEn () {
    setLocale(enUS);
  }
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
      <input type="button" value="英文" onClick={useEn}/>
      <input type="button" value="中文" onClick={useZh}/>
      <Context locale={locale}>
        <InputDate type="datetime"/>
        <InputLocation
          selected={{latitude: '31.968592', longitude: '118.798128', address: '南京南站'}}
          readOnly={true}
          value={value}
          placeholder="请点击获取位置信息"
          onChange={onChange}
          onClick={(e) => console.log(e)}
        />
      </Context>
    </Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
