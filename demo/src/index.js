import React, {useState, useRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  Marquee,
  InputDate
} from '../../src';


// 获取街道
function getStreet (districtId) {
  return new Promise((resolve) => {
    Bridge.showLoading();
    setTimeout(() => {
      Bridge.hideLoading();
      resolve([
        {
          "parentid": districtId,
          "name": "街道1",
          "id": "1",
        },
        {
          "parentid": districtId,
          "name": "街道2",
          "id": "2",
        }
      ])
    }, 500);
  })
}

const list1 = [
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

const list2 = [
  {
    id: '111',
    name: '标题1'
  },
  {
    id: '2222',
    name: '标题2'
  },
  {
    id: '333',
    name: '标题3'
  }
];

function Demo () {
  const refComponent = useRef(null);
  const refComponent2 = useRef(null);

  const [list, setList] = useState(list2);
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  useEffect(() => {
    console.log(refComponent)
    console.log(refComponent2)
    // setTimeout(() => {
    //   setList(list2);
    // }, 3000);
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
  function onError (e, msg) {
    console.log(e)
    console.log(msg);
  }

  return <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <div className="flex-1 color-sub" style={{margin: '0 12px', height: '36px', overflow: 'hidden'}}>
        <Marquee
          list={list}
          onClick={onChange}
          ref={refComponent}
          autoplay={2000}
          step={36}
          optionAttribute={{
            style: {height: '36px', overflow: 'hidden'},
            className: 'flex flex-middle'
          }}
        />
      </div>
      <InputDate
        max={new Date().format('YYYY-MM-DD')}
        ref={refComponent2}
        value={value2}
        onChange={onChange2}
        placeholder="请选择"
        onError={onError}
      />
      {/* <PickerCity ref={refComponent2}/> */}
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
