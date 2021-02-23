import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Context,
	MapUtil,
  InputDate
} from '../../src'

import enUS from '../../src/locale/en_US'

function Demo () {
  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
      <Context locale={enUS}>
			  <InputDate/>
      </Context>
    </Container>
  </Page>
	</Fragment>
}


Bridge.ready(() => {
	// render(<Demo/>, document.querySelector('#demo'))
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
