import 'components/seedsui/seedsui.less';
import 'components/seedsui/seedsui.js';
import Device from 'components/seedsui/utils/device.js';
import 'core-js/es6/map'; // 兼容es6的Map类
import 'core-js/es6/set'; // 兼容es6的Set类
// import 'raf/polyfill'; // 兼容requestAnimationFrame动画
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes.js'
// 换click事件为tap
import FastClick from 'fastclick';
FastClick.attach(document.body);
// 适配iPhoneX
Device.adapterIphoneX();

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
)
