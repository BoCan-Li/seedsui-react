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

var root = document.getElementById('root');
// ios外勤客户端UIWebview点击慢的问题
if (root && Device.platform === 'waiqin' && Device.os === 'ios') {
  FastClick.attach(root);
}

// 动态加载桥接库
Device.dynamicLoadBridge(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

registerServiceWorker();
