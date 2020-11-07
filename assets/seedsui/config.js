import * as serviceWorker from './../serviceWorker';
// 加载seedsui库
import 'seedsui-react/lib/PrototypeArray.js';
import 'seedsui-react/lib/PrototypeMath.js';
import 'seedsui-react/lib/PrototypeObject.js';
import 'seedsui-react/lib/PrototypeString.js';
import 'seedsui-react/lib/PrototypeDate.js';
import Device from 'seedsui-react/lib/Device';
import ApiAxios from 'seedsui-react/lib/ApiAxios';

// 加载本地库
import Debugger from 'seedsui-react/lib/Debugger';

// 解决ios老内核UIWebview点击慢的问题
import FastClick from 'seedsui-react/lib/FastClick';

// 解决微信分享自动加参数的bug
const link = window.location.href
let shareParam = ''
let shareParamIndex = -1
if (link.indexOf('?from=singlemessage') !== -1) {
  shareParam = '?from=singlemessage'
} else if (link.indexOf('?from=timeline') !== -1) {
  shareParam = '?from=timeline'
} else if (link.indexOf('?from=groupmessage') !== -1) {
  shareParam = '?from=groupmessage'
}
if (shareParam) shareParamIndex = link.indexOf(shareParam)
// 如果#号在分享参数后面, 说明分享参数拼错了位置
if (link.indexOf('#') > shareParamIndex && shareParamIndex > 0) {
  const domain = link.split(shareParam)[0];
  const suffix = link.split('#')[1];
  window.location.replace(`${domain}#${suffix}`)
}

window.document.addEventListener('touchstart', function () {
  /* Do Nothing */
}, false)

// 连续点击10次, 显示vconsole
Debugger.vconsoleLogger(document.getElementById('vconsoleHandler'));


// 换click事件为tap
if (Device.platform === 'dinghuo' || Device.platform === 'waiqin' || Device.platform === 'wq') {
  var root = document.getElementById('root');
  // 适配差安卓, 解决在app中, 输入法上弹界面错位的问题
  if (root && Device.os === 'andriod' && Device.osVersion < '5.0') {
    root.style.position = 'fixed' // 处理客户端中, 输入法上弹收缩后, 界面显示错位的问题
  }
  // ios外勤客户端UIWebview点击慢的问题
  if (root && Device.platform === 'waiqin' && Device.os === 'ios') {
    FastClick.attach(root);
  }
}

// 修复兼容ios的bug
if (Device.os === 'ios') {
  document.getElementById('root').addEventListener('click', (e) => {
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
      // 修复ios中readOnly点击仍有焦点的问题
      if (Device.os === 'ios' && e.target.readOnly) {
        e.target.blur();
      }
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


// axios设置
const env = process.env.NODE_ENV;
if (env === 'development') {
  ApiAxios.setBaseURL(`/api`);
}

// 处理401, 客户端不需要处理
// if (Device.platform !== 'dinghuo' && Device.platform !== 'waiqin' && Device.platform !== 'wq') {
//   ApiAxios.fail = function(error) {
//     if (error && error.response && error.response.status === 401) {
//       URLUtil.logOut(error.response.data.message);
//     }
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();