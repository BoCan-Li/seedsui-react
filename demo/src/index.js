import React, {useState} from 'react'
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
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<input type="button" value="英文" onClick={useEn}/>
			<input type="button" value="中文" onClick={useZh}/>
			<Context portal={document.getElementById('demo')} locale={locale}>
				<InputDate type="datetime"/>
			</Context>
    </Container>
  </Page>
}


Bridge.ready(() => {
	render(<Demo/>, document.querySelector('#demo'))
  // 加载百度地图js库
  // MapUtil.load({
  //   ak: '3pTjiH1BXLjASHeBmWUuSF83',
  //   success: () => {
  //     render(<Demo/>, document.querySelector('#demo'))
  //   },
  //   fail: () => {
  //     console.log('加载失败')
  //   }
  // })
});
