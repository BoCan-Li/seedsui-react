import React, { useRef, useState, useEffect, Fragment } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Device,
  MapUtil,
  ImgMark,
  NumBox,
  InputNumber
} from '../../src'

function Demo() {
  const [count, setCount] = useState(10)

  useEffect(() => {
    Bridge.onCustomBack = function () {
      alert(1)
      Bridge.closeWindow()
    }
  }, [])

  function handleCountDown() {
    setCount(count - 1)
  }

  function handleChange(e, value) {
    console.log(value)
  }

  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <a href="https://www.baidu.com/">百度</a>
        {count}
        <InputNumber onChange={handleChange} />
        <div onClick={handleCountDown}>开始</div>
      </Container>
    </Page>
  )
}

Bridge.ready(() => {
  render(<Demo />, document.querySelector('#demo'))
  // 加载百度地图js库
  // MapUtil.load({
  //   ak: '3pTjiH1BXLjASHeBmWUuSF83',
  //   success: () => {
  //     render(<Demo/>, document.querySelector('#demo'))
  //   },
  //   fail: () => {
  //     console.log('加载失败')
  //   }
  // })
})
