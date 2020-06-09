import React, {useState, useRef, createRef, useEffect} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  MapUtil,
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  BiDoughnut
} from '../../src';

function Demo () {
  const [times, setTimes] = useState(2);

  // setTimeout(() => {
  //   setTimes(times + 1)
  // }, 1000);
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <div style={{background: 'black'}}>
        <img style={{width: '86px', height: '86px', opacity: '0.5'}} src={`https://img.zcool.cn/community/01a9a65dfad975a8012165189a6476.jpg`}/>
        <BiDoughnut className="white" borderWidth={2} style={{position: 'absolute', top: '30px', left: '30px'}} rotate={360} duration={20000} size={30}>
          a
        </BiDoughnut>
        {/* <div className="loading-pie">
          <div className="loading-pie-left">
            <div className={`loading-pie-left-circle${times >= 4 ? ' pending' : ''}`}></div>
          </div>
          <div className="loading-pie-right">
            <div className="loading-pie-right-circle"/>
          </div>
        </div> */}
        <div className="loading-pie-wait">识别中...</div>
      </div>
      
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
