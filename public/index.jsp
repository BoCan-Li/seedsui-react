<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#000000">
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>微信开发专用</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root" class="pages">
      <div class="loading-floating animated" style="z-index: 1">
        <div class="loading-floating-wrapper">
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
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    <!-- 兼容安卓5.0以下的手机 -->
    <script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js"></script>
    <script type=text/javascript>
      // 从地址栏获取参数
      function getUrlParameter(argName, argSearch){
        var url = window.location.href
        if (argSearch) url = argSearch
        var params = {}
        // 如果url中包含?说明有参数
        if (url.indexOf('?') !== -1) {
          // 获取所有参数options: 如?a=1&b=2转为['a=1','b=2']
          var options = url.split('?')[1].split('&')
          if (options.length) {
            for(var i = 0; i < options.length; i ++) {
              // 获取单项option: 如'a=1'转为['a', '1']
              var option = options[i].split('=')
              if (option.length === 2) {
                if (argName) {
                  if (argName === option[0]) return option[1]
                } else {
                  params[option[0]] = option[1]
                }
              }
            }
          }
        }
        if (Object.keys(params).length) return params
        return ''
      }
      // 浏览器支持信息、错误信息、url
      var isSupport = navigator.userAgent.toLowerCase().indexOf('applewebkit') > -1;
      var errMsg = "${errMsg}";
      if (getUrlParameter('errMsg')) {
        errMsg = getUrlParameter('errMsg');
        try {
          errMsg = decodeURIComponent(getUrlParameter('errMsg'));
        } catch (e) {
          errMsg = '未知错误';
        }
      }
      // 本地测试时使用
      // errMsg = '';
      var url = "${url}";
      // 如果不支持当前浏览器,则跳转不支持页面
      if (!isSupport) {
        window.location.replace('/h5fw/#/_react_/browserSupport');
      // 如果request中包含错误信息,则直接显示错误信息
      } else if (errMsg) {
        window.location.replace('/h5fw/#/_react_/exception/' + errMsg);
      // 如果request中包含跳转的url,则显示对应的url
      } else if (url) {
        var appId = "${appId}";
        var openId = "${openId}";
        if (!appId) {
          errMsg = 'appId不存在,请联系管理员'
          window.location.replace('/h5fw/#/_react_/exception/' + errMsg);
        } else if (!openId) {
          errMsg = 'openId不存在,请联系管理员'
          window.location.replace('/h5fw/#/_react_/exception/' + errMsg);
        } else {
          // 存储appId和openId
          window.localStorage.setItem('app_openId', openId || '');
          window.localStorage.setItem('app_appId', appId || '');
          // 重定向
          window.redirectUrl = url.split("#")[1];
        }
      }
    </script>
  </body>
</html>
