import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
	Bridge,
  Container,
  InputText,
	InputCity
} from '../../src';


function Demo () {
  const [values, setValues] = useState(['', '2'])
  function onChange (e, value, options) {
    let newValues = Object.clone(values)
    newValues[1] = value;
    setValues(newValues)
  }
  function onChange2 (e, value, options) {
    let newValues = Object.clone(values)
    newValues[0] = value;
    setValues(newValues)
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputText value={values[1]} onChange={onChange}/>
      <InputCity value={values[0]} onChange={onChange2}/>
		</Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({ak: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
