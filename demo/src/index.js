import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  InputDate
} from '../../src';


const list = [
  {
    key: '1',
    value: '111'
  },
  {
    key: '2',
    value: '222'
  },
  {
    key: '3',
    value: '333'
  }
];

function Demo () {
  const refComponent = useRef(null);
  const refComponent2 = useRef(null);

  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  useEffect(() => {
    console.log(refComponent)
    console.log(refComponent2)
  }, [])

  function onChange (e, value, option) {
    console.log(e.target)
    console.log(value, option)
    setValue(value);
  }
  function onChange2 (e, value, option) {
    console.log(e.target)
    console.log(value, option)
    setValue2(value);
  }
  function onFail (e, msg) {
    console.log(e)
    console.log(msg);
  }

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <InputDate
        ref={refComponent}
        value={value}
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
      />
      <InputDate
        max={new Date().format('YYYY-MM-DD')}
        ref={refComponent2}
        value={value2}
        onChange={onChange2}
        placeholder="请选择"
        fail={onFail}
      />
    </Container>
  </Page>
}
// function loadBd(){
//   window.BMAP_PROTOCOL = "https";
//   window.BMap_loadScriptTime = (new Date).getTime();
//   document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
// }
// loadBd();

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
