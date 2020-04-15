import React, {useState, useEffect, useRef} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Container,
  Bridge,
  InputDistrict,
  InputLocation
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
          "value": "街道1",
          "key": "1",
        },
        {
          "parentid": districtId,
          "value": "街道2",
          "key": "2",
        }
      ])
      // resolve([])
      // resolve('错误')
    }, 500);
  })
}

function Demo () {
  const refComponentInputDistrict = useRef();
  const refComponentInputLocation = useRef();

  const [value, setValue] = useState('广东-揭阳');
  
  function onChange (e, value, options) {
    console.log(value)
    setValue(value);
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
      <InputDistrict
        ref={refComponentInputDistrict}
        id="ID-PickerDistrict"
        value={value}
        // type="district"
        onChange={onChange}
        placeholder="请选择"
        className="border-b"
        value={value}
        pickerProps={{
          getStreet: getStreet
        }}
      />
      <InputLocation
        ref={refComponentInputLocation}
        value={value}
        onChange={onChange}
      />
    </Container>
  </Page>
}
function loadBd(){
  window.BMAP_PROTOCOL = "https";
  window.BMap_loadScriptTime = (new Date).getTime();
  document.write('<script type="text/javascript" src="https://api.map.baidu.com/getscript?v=3.0&ak=3pTjiH1BXLjASHeBmWUuSF83&services=&t=20200311111417"></script>');
}
loadBd();

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
