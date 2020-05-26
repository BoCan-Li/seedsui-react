import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
	Container,
	InputSelect
} from '../../src';

const list = [
  {
    id: '1',
    name: '111'
  },
  {
    id: '2',
    name: '222'
  },
  {
    id: '3',
    name: '333'
  }
];

function Demo () {
  const [value, setValue] = useState('333');

function onChange (e, value, selected) {
  console.log(e.target)
  console.log(value, selected)
  setValue(value);
}
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
		<InputSelect
    disabled
  list={list}
  value={value}
  onClick={onChange}
  placeholder="请选择"
  className="border-b"
/>
		</Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
