import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
  ListPull,
  MapUtil
} from '../../src';

const listpull = [
  {
    container: <p style={{height: '50px'}}>内容1</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容2</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容3</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  },
  {
    container: <p style={{height: '50px'}}>内容4</p>,
    lButtons: [
      {caption: '未读', className: 'info', style: {padding: '0 12px'}}
    ],
    rButtons: [
      {caption: '收藏', className: 'warn', style: {padding: '0 12px'}},
      {caption: '删除', className: 'cancel', style: {padding: '0 12px'}}
    ],
  }
]

function Demo () {
  const refComponent = useRef(null);

  const [list, setList] = useState(listpull);
  function onShowedLeft (s) {
    var target = s.target.previousElementSibling.children[0];
    if (target.innerHTML === '未读') {
      target.classList.add('disabled');
      target.innerHTML = '已读';
    } else {
      target.classList.remove('disabled');
      target.innerHTML = '未读';
    }
    s.hide();
  }
  
  function onClickListPull (s, item, index, option) {
    let newList = Object.clone(list)
    newList.splice(index, 1)
    console.log(newList)
    setList(newList)
    s.hide()
  }

  return <Page>
    <Header>
      <Titlebar caption="标题"/>
    </Header>
		<Container>
      <ListPull list={list} onClick={onClickListPull} onShowedLeft={onShowedLeft}/>
		</Container>
  </Page>
}

// 加载百度地图js库
MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
