import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge
} from '../../src';

function Demo () {
  const refComponent = useRef(null);
  useEffect(() => {
    console.log(refComponent)
	}, [])
	const [list, setList] = useState([
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=a85930ded8bf26f1e67da77638e01c95&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0429%2F56f0698d2becb7433ae694860d3d3df6.jpg',
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=7bcb2c84cae38d7ac9dfe23131d7a49d&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0331%2F84f37ac106d412a608360a65be2654bb.jpg',
	])
	function add () {
		setList([
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=a85930ded8bf26f1e67da77638e01c95&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0429%2F56f0698d2becb7433ae694860d3d3df6.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343333&di=7bcb2c84cae38d7ac9dfe23131d7a49d&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2015%2F0331%2F84f37ac106d412a608360a65be2654bb.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=41db6a0b3c569f25126006a1a45c16ff&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0606%2Fe971b8bb661d8e43c03b73f34df0b365.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=f29b5bccb76c2b5d0318cb2cf92119a3&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180103%2F868eb21b0b8e45e6bec55218252badf9.jpeg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=75d2580e1fc116046d9aafb4d5499a68&imgtype=0&src=http%3A%2F%2Fdesk.fd.zol-img.com.cn%2Fg5%2FM00%2F02%2F0C%2FChMkJ1bK2zKIZrPwAAI5J9v12CIAALJ6gJ3SWgAAjk_383.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343332&di=5b400b3c70d2003646916e4ba7bc4a5c&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ffc1f4134970a304eb048b46ad1c8a786c9175c33.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588862343331&di=4898a2f3c21a794219e2d7790a8ebd9f&imgtype=0&src=http%3A%2F%2Ffile04.16sucai.com%2Fd%2Ffile%2F2015%2F0417%2F309a1058647104845307bb338221485e.jpg'
		])
	}
  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
    <Container>
			<input type="button" value="动态增加图片" onClick={add}/>
			{list.map((src, index) => {
				return <div key={index} style={{height: '800px', overflow: 'hidden'}}><img data-load-src={src} style={{width: '340px'}} data-error-src="//res.waiqin365.com/d/seedsui/carrousel/default.png" src="//res.waiqin365.com/d/seedsui/carrousel/default.png" alt=""/></div>
			})}
    </Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
