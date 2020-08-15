import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  MapChoose,
  Context,
  InputLocation,
  Device,
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  useEffect(() => {
    Bridge.debug = true
    let model = '';
    let userAgent = navigator.userAgent;
    console.log(Device.model)
  }, [])
  const [value, setValue] = useState('南京南站');
  const [selected, setSelected] = useState({longitude: 118.798128, latitude: 31.968592, address: '南京南站'});
  // {longitude: 118.798128, latitude: 31.968592, address: '南京南站'}
  function changeHandler (e, value, selected) {
    console.log(e.target);
    console.log(selected)
    setValue(value);
    setSelected(selected);
  }
  function previewHandler (e, err) {
    if (err.errMsg.indexOf('preview:fail') !== -1) {
      Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false});
    }
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation
        type="choose"
        // autoLocation
        // readOnly={false}
        // readOnly={true}
        selected={selected}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={changeHandler}
        preview={previewHandler}
      />
    </Container>
  </Page>
}


Bridge.ready(() => {
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
