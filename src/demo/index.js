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

// 修复兼容ios的bug
if (Device.os === 'ios' && Device.platform !== 'dinghuo') {
  document.getElementById('root').addEventListener('click', (e) => {
    console.log(e);
    let type = e.target.getAttribute('type');
    if (e.target.tagName === 'TEXTAREA') {
      type = 'textarea';
    }
    if (type) {
      type = type.toLocaleLowerCase();
    } else {
      type = ''
    }
    if (type === 'tel' || type === 'number' || type === 'text' || type === 'password' || type === 'textarea' || type === 'search') {
      // 弹出输入法页面白屏, 获取焦点时auto, 失去焦点时touch(很有可能是在非body元素下有fixed定位的元素导致, 不建议用此方式去解决)
      // document.getElementById('root').style.WebkitOverflowScrolling = 'auto | touch';
      // 修复兼容ios12的bug
      if (Device.os === 'ios' && Device.osVersion > '12') {
        // 兼容输入法把页面顶上去, 不回弹的问题
        if (window.inputToggleTimeout) {
          window.clearTimeout(window.inputToggleTimeout);
        }
        if (!e.target.getAttribute('ios-bug-blur')) {
          e.target.setAttribute('ios-bug-blur', '1');
          e.target.addEventListener('blur', () => {
            window.inputToggleTimeout = window.setTimeout(() => {
              document.getElementById('root').scrollIntoView();
            }, 100);
          }, false);
        }
      }
    }
  }, false);
}

// 动态加载桥接库
Device.dynamicLoadBridge(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

registerServiceWorker();
