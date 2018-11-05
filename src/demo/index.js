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
// 动态加载桥接库
Device.dynamicLoadBridge();

window.addEventListener('load', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
}, false);

registerServiceWorker();
