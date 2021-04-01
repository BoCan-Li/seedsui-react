import React, {useRef, useState, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import {
  Page,
	Header,
	Titlebar,
  Bridge,
	Container,
	Device,
	MapUtil,
  InputDate,
  NumBox,
  InputLocation
} from '../../src'


let interval = null

function Demo () {
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')

  function hh () {
    if (interval) window.clearTimeout(interval)
    interval = setTimeout(() => {
      console.log('hhh')
    }, 2000)
  }
  /*
  const [count, setCount] = useState(10)

  function handleCountDown () {
    // interval = setTimeout(() => {
    //   console.log(count)
    //   if (count <= 0) {
    //     clearTimeout(interval)
    //   } else {
    //     setCount(count - 1)
    //     handleCountDown()
    //   }
    // }, 1000)
    setCount((refCount) => {
      console.log(refCount)
      return count - 1
    })
    console.log(count)
  }
  */
  function handleChange (e, value) {
    setValue(value)
  }
  return <Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
      <input type="button" value="hh" onClick={hh}/>
      {/* {count}
      <div onClick={handleCountDown}>开始</div> */}
      {/* <NumBox max={'10.00'} min={0} value={value} onChange={handleChange}/> */}
      <InputLocation value={value} onChange={(e, val) => setValue(val)} />
      <InputLocation value={value1} onChange={(e, val) => setValue1(val)} />
    </Container>
  </Page>
}

Bridge.ready(() => {
	// render(<Demo/>, document.querySelector('#demo'))
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
