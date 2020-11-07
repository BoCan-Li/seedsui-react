import React from 'react';
import ReactDOM from 'react-dom';
// 多页加载样式
// import './../../assets/style/main.less'; // 全局main.less
// import './assets/style/main.less'; // 当页样式
// 单页加载样式
import 'assets/style/main.less';
// 通用配置
import 'assets/seedsui/config.js';
// 国际化
import locale from 'assets/locale';
import Context from 'seedsui-react/lib/Context';
// 加载路由
import Routes from './routes';

// 桥接库
import Bridge from 'seedsui-react/lib/Bridge';

// 动态加载桥接库
Bridge.ready(() => {
  ReactDOM.render(
    <Context locale={locale()}>
      <Routes />
    </Context>,
    document.getElementById('root')
  );
});
