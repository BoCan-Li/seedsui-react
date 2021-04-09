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
  ImgMark,
  NumBox,
  InputLocation
} from '../../src'


let interval = null

function Demo () {
  const [count, setCount] = useState(10)

  function handleCountDown () {
    setCount(count - 1)
    console.log(count)
  }

  useEffect(() => {
    Bridge.debug = true
    Bridge.getLocation({
      type: 'gcj02',
      success: (data) => {
        console.log(data)
      },
      fail: (res) => {
        console.log('定位失败')
      }
    })
    setTimeout(() => {
      Bridge.getLocation({
        type: 'gcj02',
        success: (data) => {
          console.log('1', data)
        },
        fail: (res) => {
          console.log('定位失败1')
        }
      })
    }, 100);
  }, [])


  return <Page>
		<Header>
			<Titlebar caption="标题"/>
		</Header>
		<Container>
      {count}
      <div onClick={handleCountDown}>开始</div> 
    </Container>
  </Page>
}

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
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
});
