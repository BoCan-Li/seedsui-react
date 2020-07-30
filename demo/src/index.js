import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Context,
  InputDate
} from '../../src';
import BottomError from '../../src/ContainerPull/BottomError';
import zhCN from '../../src/locale/zh_CN';
import enUS from '../../src/locale/en_US';

function Demo () {
  useEffect(() => {
  }, [])
  const [locale, setLocale] = useState(zhCN);
  const [language, setLanguage] = useState('zh_CN');

  function useZh () {
    setLocale(zhCN);
    setLanguage('zh_CN');
  }
  function useEn () {
    setLocale(enUS);
    setLanguage('en_US');
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <input type="button" value="英文" onClick={useEn}/>
      <input type="button" value="中文" onClick={useZh}/>
      <Context
        portal={document.getElementById('demo')}
        language={language}
        // locale={locale}
      >
        <InputDate type="datetime"/>
        <BottomError/>
      </Context>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
