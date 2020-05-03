import React, {useState, useRef} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  Emoji
} from '../../src';

const list = [{
  id: '1',
  thumb: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320',
  src: 'https://image-test.waiqin365.com/6069734652819592543/blog/201912/8194157084989375804.png?x-oss-process=style/zk320'
},{
  id: '2',
  thumb: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg',
  src: 'https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg'
}];

function Demo () {
  const refComponent = useRef();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  function onChange (e, value) {
    setValue(value);
  }

  function toggleEmoji () {
    setShow(!show);
  }

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <Emoji
        autoFocus
        show={show}
        onChange={onChange}
        value={value}
        ref={refComponent}
        maskAttribute={{onClick: toggleEmoji}}
      />
      <input type="button" value="显隐" onClick={toggleEmoji}/>
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
