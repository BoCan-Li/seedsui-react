import React, {useState, useRef, createRef, useEffect, Fragment} from 'react'
import {render} from 'react-dom'
import '../../src/PrototypeObject.js';
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  Swiper,
} from '../../src';

let clickSpace = null;

function Demo () {
  // 初始化轮播
  function initHandler (s) {
    s.slideTo(activeIndex, 0);
  }
  // 轮播切换
  let [activeIndex, setActiveIndex] = useState(1);
  function changeHandler (s = {}) {
    setActiveIndex(s.activeIndex);
  }
  // 点击事件: 防止与放大缩小的双击事件冲突
  function clickHandler (s, e) {
    if (e.target.classList.contains('swiper-button-prev') || e.target.classList.contains('swiper-button-next')) {
      return;
    }
    if (clickSpace) {
      window.clearTimeout(clickSpace)
      clickSpace = null
    }
    clickSpace = setTimeout(() => {
      console.log('触发点击')
    }, 500)
  }
  function zoomHandler () {
    if (clickSpace) {
      window.clearTimeout(clickSpace)
      clickSpace = null
    }
  }
  
  return <Page>
    <Header>
      <Titlebar caption="hh"/>
    </Header>
		<Container>
      <Swiper
        style={{
          width: '100%',
          height: '100%'
        }}
        params={{
          zoom: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            init: initHandler,
            slideChange: changeHandler,
            tap: clickHandler,
            zoomChange: zoomHandler
          }
        }}
      >
        <div className="swiper-slide">
          <div className="swiper-zoom-container">
            <img className="swiper-zoom-target" src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg" style={{width: '100%'}}/>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container">
            <img className="swiper-zoom-target" src="http://image-test.waiqin365.com/6692513571099135446/sku/201809/20180911195747712_05105130_CAMERA_21001006280.jpg" style={{width: '100%'}}/>
          </div>
        </div>
      </Swiper>
    </Container>
  </Page>
}

// 加载百度地图js库
// MapUtil.load({key: '3pTjiH1BXLjASHeBmWUuSF83'})

Bridge.ready(() => {
  render(<Demo/>, document.querySelector('#demo'))
});
