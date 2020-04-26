import React, {useState, useEffect, useRef} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  Photos
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
  const refComponentInputDistrict = useRef();
  const refComponentInputLocation = useRef();

  const [value, setValue] = useState('广东-揭阳');
  
  function onChange (e, value, options) {
    console.log(options)
    setValue(value);
  }
  function onChoose() {
    console.log(1)
  }

  function click (e, item) {
    console.log(item);
  }

  useEffect(() => {
    Bridge.debug = true
    console.log(refComponentInputDistrict)
    console.log(refComponentInputLocation)
  }, [])

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <Photos
        uploading={true}
        list={list}
        onChange={onChange}
        onChoose={onChoose}
        onClick={click}
        // 显示ai上传图
        upload={<i
          className="width-full height-full"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundSize: 'cover',
            backgroundColor: 'white',
            backgroundImage: `url(//res.waiqin365.com/d/dinghuo365/aipic.png)`
          }}
          ></i>}
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
