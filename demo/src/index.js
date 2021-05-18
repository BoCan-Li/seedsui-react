import React, { useRef, useState, useEffect, Fragment } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  InputLocation
} from '../../src'

function Demo() {
  const [value, setValue] = useState('')

  function handleChange (e, value) {
    console.log(value)
    setValue(value);
  }
  function handlePreview (e, err) {
    if (typeof err === 'object' && err.errMsg.indexOf('preview:fail') !== -1) {
      Bridge.showToast(err.errMsg.replace('preview:fail', ''), {mask: false});
    }
  }
  function handleHide (type) {
    console.log('关闭' + type)
  }
  Bridge.debug = true
  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <InputLocation
          type="choose"
          autoLocation
          pre
          value={value}
          placeholder="请点击获取位置信息"
          onChange={handleChange}
          onPreviewHide={handleHide}
          preview={handlePreview}
        />
      </Container>
    </Page>
  )
}

Bridge.ready(() => {
  // render(<Demo />, document.querySelector('#demo'))
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
})
