import React, { useRef, useState, useEffect, Fragment, useMemo, memo, useCallback } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  InputLocation,
  Photos
} from '../../src'


const useSyncCallback = (callback) => {
  const [proxyState, setProxyState] = useState({ current: false })

  const Func = useCallback(() => {
    setProxyState({ current: true })
  }, [proxyState]) // eslint-disable-line

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false })
  }, [proxyState])

  useEffect(() => {
    proxyState.current && callback()
  })

  return Func
}

const Child = memo((props) => {
  console.log('child1:', props);

  return (
    <div>
      <input type="text" value={props?.value || ''} onChange={props.onChange}/>
    </div>
  )
})

const Child2 = (props) => {
  console.log('child2:', props);
  let memoValue = useMemo(() => {
    console.log('渲染')
    return props?.value || ''
  }, [props.value])

  return (
    <div>
      {props?.value || ''}
      <input type="text" value={memoValue} onChange={props.onChange}/>
    </div>
  )
}

const Child3 = memo((props) => {
  const renderValue = () => {
    console.log('child3:渲染')
    return `child3:${props?.value || ''}`
  }

  return (
    <div>
      <input type="text" value={props?.value || ''} onChange={props.onChange}/>
      {renderValue()}
    </div>
  )
})

function Demo() {
  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <Photos isBrowser onChoose={(e) => {
          alert(e.target.className)
        }}/>
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
