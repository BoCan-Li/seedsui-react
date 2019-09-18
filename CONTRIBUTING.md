## 引用

此库使用[nwb](https://github.com/insin/nwb) 构建.

## 打包

> 打包命令

```
npm run build
```

> 打包完成后: 拷贝src的less和ts到lib中, 因为prepublishOnly配置publish命令时将执行 "npm run build:after", 所以<span style="color:red">可以不用执行此命令</span>

```
npm run build:after
```

## 发布

> 发布前会先执行 "npm run build:after"

```
npm publish
```

## HTML模板

> 常用HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=contain">
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#f7f7f7">
    <meta name=”apple-mobile-web-app-status-bar-style” content=”#f7f7f7>
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <style>
      /* .BMap_cpyCtrl,.anchorBL a{display:none;}
      .BMap_scaleCtrl{left:25px!important;bottom:10px!important;} */
    </style>
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>SeedsUI</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root" class="pages">
      <div class="loading-mask mask active">
        <div class="loading-floating animated">
          <div class="loading-floating-icon">
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
            <div class="loading-floating-blade"></div>
          </div>
          <div class="loading-floating-caption">正在加载...</div>
        </div>
      </div>
    </div>
    <!-- 兼容安卓5.0以下的手机 -->
    <!-- <script src="//res.waiqin365.com/d/seedsui/polyfill.min.js"></script> -->
    <!-- 百度地图 -->
    <!-- <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=IlfRglMOvFxapn5eGrmAj65H"></script>
    <script type="text/javascript" src="https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js"></script> -->
  </body>
</html>
```

## 入口模板

> index.js入口配置

```javascript
// 加载seedsui库
import 'components/seedsui/index.less';
import 'seedsui-react/lib/PrototypeArray.js';
import 'seedsui-react/lib/PrototypeMath.js';
import 'seedsui-react/lib/PrototypeObject.js';
import 'seedsui-react/lib/PrototypeString.js';
import 'seedsui-react/lib/PrototypeDate.js';
import Device from 'seedsui-react/lib/Device';
import FastClick from 'seedsui-react/lib/FastClick';
import ApiAxios from 'seedsui-react/lib/ApiAxios';
import Bridge from 'seedsui-react/lib/Bridge';
// 加载路由
import Routes from './routes.js';
// 加载订货库
import LocalBridge from 'utils/LocalBridge';

window.document.addEventListener('touchstart', function () {
  /* Do Nothing */
}, false)

// 连续点击10次, 显示vconsole
LocalBridge.vconsoleLogger(document.getElementById('vconsoleHandler'));


// 换click事件为tap
if (Device.platform === 'dinghuo' || Device.platform === 'waiqin') {
  var root = document.getElementById('root');
  // ios外勤客户端UIWebview点击慢的问题
  if (root && Device.platform === 'waiqin' && Device.os === 'ios') {
    FastClick.attach(root);
  }
  // 适配差安卓, 解决在app中, 输入法上弹界面错位的问题
  if (root && Device.os === 'andriod' && Device.osVersion < '5.0') {
    root.style.position = 'fixed' // 处理客户端中, 输入法上弹收缩后, 界面显示错位的问题
  }
}

// 修复兼容ios的bug
if (Device.os === 'ios') {
  document.getElementById('root').addEventListener('click', (e) => {
    // console.log(e);
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


// axios设置
const env = process.env.NODE_ENV;
if (env === 'development') {
  // ApiAxios.setBaseURL(`http://172.31.2.31:4040/api`);
  ApiAxios.setBaseURL(`http://localhost:4040/api`);
}

// 动态加载桥接库
Device.dynamicLoadBridge(() => {
  ReactDOM.render(<Routes />, document.getElementById('root'));
});

```