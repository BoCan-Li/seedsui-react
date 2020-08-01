import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
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
function Demo () {
  const [point, setPoint] = useState([[118.798128, 31.968592], [118.66609, 31.974512]]);
  // useEffect(() => {
  // }, [])
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
  const [value, setValue] = useState('');

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
        checkbox
        multiple
        list={list}
        value={value}
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
      />
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
