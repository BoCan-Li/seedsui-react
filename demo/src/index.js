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
  Notice
} from '../../src'


let interval = null

function Demo () {
  const [value, setValue] = useState('10')
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
      <InputDate value=""/>
      {/* {count}
      <div onClick={handleCountDown}>开始</div> */}
      <NumBox max={5} value={value} onChange={handleChange}/>
      <Notice caption="11"/>
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
