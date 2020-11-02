import React, {useRef, useState, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  PDFView
} from '../../src';
function Demo () {
  const pdfsrc = '/demo/assets/pdfview1.pdf';
	const refPDFView = useRef(null);
	const [pageElements, setPageElements] = useState([
		{
			page: '1',
			element: <div style={{lineHeight: '16px', backgroundColor: 'red'}}>1</div>
		},{
			page: '2',
			element: <div style={{lineHeight: '16px', backgroundColor: 'red'}}>2</div>
		}
	]);

	function scrollToPage (page) { // eslint-disable-line
		if (isNaN(page)) return;
		if (refPDFView.current.scrollToPage) {
			refPDFView.current.scrollToPage(page)
		}
	}
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
		{/* <PDFView pictures={["/demo/assets/pdfview.png"]}/> */}
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
