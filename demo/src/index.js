import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  MapUtil,
  PDFView,
} from '../../src';

function Demo () {
  useEffect(() => {
  }, [])
	const pdfsrc = '/demo/assets/pdfview.pdf';
	const refPDFView = useRef(null);
	const pageElements = [
		{
			page: '1',
			element: <div>111</div>
		},{
			page: '2',
			element: <div>222</div>
		}
	]
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<PDFView
				ref={refPDFView}
				zoom={false}
				src={pdfsrc}
				cMapUrl="/demo/assets/cmaps/"
				insertPageElements={pageElements}
				params={{rows: 3, onLoad: () => console.log('加载完成')}}
			/>
    </Container>
  </Page>
}


Bridge.ready(() => {
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
