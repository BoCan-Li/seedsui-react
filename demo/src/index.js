import React, {useState, useRef} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  Emoji,
  InputText
} from '../../src';


function Demo () {
  const refComponent = useRef();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [show2, setShow2] = useState(false);
  const [value2, setValue2] = useState('');

  function onChange (e, value) {
    console.log(1)
    setValue(value);
  }
  function onChange2 (e, value) {
    setValue2(value);
  }

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      {show && <Emoji
        autoFocus
        carrouselProps={{id: 'id1'}}
        onChange={onChange}
        value={value}
        ref={refComponent}
        maskAttribute={{onClick: () => setShow(false)}}
      />}
      {show2 && <Emoji
        carrouselProps={{id: 'id2', loop: true}}
        autoFocus
        onChange={onChange2}
        value={value2}
        ref={refComponent}
        maskAttribute={{onClick: () => setShow2(false)}}
      />}
      <input type="button" value="显示1" onClick={() => setShow(true)}/>
      <p>{value}</p>
      <input type="button" value="显示2" onClick={() => setShow2(true)}/>
      <p>{value2}</p>
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
