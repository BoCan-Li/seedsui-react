import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 加载seedsui库
import '../lib/seedsui.less';
import '../lib/PrototypeArray.js';
import '../lib/PrototypeMath.js';
import '../lib/PrototypeObject.js';
import '../lib/PrototypeString.js';
import '../lib/PrototypeDate.js';
import Device from '../lib/Device';
import FastClick from '../lib/FastClick';

// 换click事件为tap
if (Device.platform === 'dinghuo' || Device.platform === 'waiqin') {
  FastClick.attach(document.getElementById('root'));
  // 适配iPhoneX, 让容器保持在安全区域内
  Device.adapterIPhoneX();
  // 适配差安卓, 解决在app中, 输入法上弹界面错位的问题
  Device.adapterBadAndriod();
}


// 动态加载桥接库
Device.dynamicLoadBridge(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

registerServiceWorker();
