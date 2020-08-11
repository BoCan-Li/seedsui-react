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
  InputLocation
} from '../../src';
import locale from '../../src/locale/index.js';
function Demo () {
  useEffect(() => {
    Bridge.debug = true
  }, [])
  const [value, setValue] = useState('');
  function changeHandler (e, value, data) {
    console.log(e.target);
    console.log(data)
    setValue(value);
  }
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <InputLocation
        // type="choose"
        autoLocation
        // readOnly={false}
        readOnly={true}
        selected={{longitude: 118.798128, latitude: 31.968592, address: '南京南站'}}
        value={value}
        placeholder="请点击获取位置信息"
        onChange={changeHandler}
      />
    </Container>
  </Page>
}


Bridge.ready(() => {
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      console.log(1)
      render(<Demo/>, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      console.log(2)
    },
    fail: () => {
      console.log('加载失败')
    }
  })
});
