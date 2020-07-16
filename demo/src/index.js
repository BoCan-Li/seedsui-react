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
  Context
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
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <input type="button" value="英文" onClick={useEn}/>
      <input type="button" value="中文" onClick={useZh}/>
      <Context locale={locale}>
        <InputDate type="datetime"/>
      </Context>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
