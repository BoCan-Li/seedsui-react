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
}

// 适配iPhoneX和andriod5.0以下的手机
Device.adapterMobile();

// 处理客户端中安卓5.0以下手机输入法上弹隐藏后,界面显示错位的问题
if ((Device.platform === 'dinghuo' || Device.platform === 'waiqin') && Device.os === 'andriod' && Device.osVersion < '5.0') {
  document.getElementById('root').style.position = 'fixed';
}

// 动态加载桥接库
Device.dynamicLoadBridge(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

registerServiceWorker();
