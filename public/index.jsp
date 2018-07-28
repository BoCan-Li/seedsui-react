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
    <title>在线订货</title>
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
      // jsp重定向url
      var url = "${url}";
      var errMsg = "${errMsg}";
      if (url) {
        var appId = "${appId}";
        var openId = "${openId}";
        if (!appId) {
          errMsg = 'appId不存在,请联系管理员'
          window.redirectUrl = '/_react_/exception/' + errMsg;
        } else if (!openId) {
          errMsg = 'openId不存在,请联系管理员'
          window.redirectUrl = '/_react_/exception/' + errMsg;
        } else {
          // 存储appId和openId
          if (openId !== '${openId}') window.localStorage.setItem('app_openId', openId || '');
          if (appId !== '${appId}') window.localStorage.setItem('app_appId', appId || '');
          // 用于后端告诉前端刚进应用时重定向的页面,例如刚进来有可能是login或者home亦或者me
          window.redirectUrl = url.split("#")[1];
        }
      } else if (errMsg) {
        window.redirectUrl = '/_react_/exception/' + errMsg;
      }
    </script>
  </body>
</html>