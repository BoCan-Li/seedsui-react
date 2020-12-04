import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
	Header,
	Titlebar,
  Bridge,
  Container,
  Debugger
} from '../../src';
function Demo () {
	const [value, setValue] = useState('');
	useEffect(() => {
		Bridge.config();
		// 连续点击10次, 显示vconsole
		Debugger.vconsoleLogger(document.getElementById('vconsoleHandler'));
	}, []) // eslint-disable-line
	function getphoto () {
		Bridge.chooseImage({
			async: true,
			watermark: {
        orderNo: '编号',
        submitName: '提交人',
        customerName: '客户',
        cmLocation: '31.982473, 118.730515',
        isWaterMark: '1', // 是否启用水印
			},
			// watermark: ['第一行', '第二行'],
			count: 2,
			sourceType: ['camera'],
			success: (res) => {
				alert(JSON.stringify(res))
				Bridge.uploadImage({
					ext: {a: '1'},
					async: true,
					uploadDir: 'cuxiao/202011',
					localId: res.localIds[0],
					tenantId: '7320333869003283336',
					success: (res) => {
						Bridge.showAlert('7320333869003283336/' + res.path)
					},
					fail: (res) => {
						alert(JSON.stringify(res))
					}
				})
			}
		});
	}

  return <Fragment>
	<Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
			<input type="button" value="选照片" onClick={getphoto}/>
			{value && value.map((localId) => {
				return <img style={{width: '300px'}} src={localId}/>
			})}
    </Container>
  </Page>
	<div id="vconsoleHandler" style={{position: 'absolute', top: 0, left: '50%', marginLeft: '-50px', width: '100px', height: '30px', zIndex: '999'}}></div>
	</Fragment>
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
