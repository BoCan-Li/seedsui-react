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
		setTimeout(() => {
			setSrc('/demo/assets/pdfview.pdf');
			setTimeout(() => {
				setPageElements([
					{
						page: '2',
						element: <div key="2" style={{lineHeight: '16px', backgroundColor: 'green'}}>2</div>
					}
				])
			}, 2000)
		}, 5000);
  }, [])
	const refPDFView = useRef(null);
	const [src, setSrc] = useState('/demo/assets/pdfview2.pdf');
	const [pageElements, setPageElements] = useState([
		{
			page: '1',
			element: <div key="1" style={{lineHeight: '16px', backgroundColor: 'red'}}>1</div>
		},{
			page: '2',
			element: <div key="2" style={{lineHeight: '16px', backgroundColor: 'red'}}>2</div>
		}
	]);
  return <Page>
		<Header>
			<Titlebar caption="SeedsUI"/>
		</Header>
		<Container>
			<PDFView
				ref={refPDFView}
				zoom={false}
				src={src}
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
