import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from 'store/index.js';
import NoNetwork from 'components/seedsui/NoNetwork';

// Containers
import {
  BrowserSupport,
  NotFound,
  Exception,

  Home,
  Box,
  Layout,
  CarrouselPage,
  Form,
  CalendarDemo,
  HandsignDemo
} from 'containers';
const Routes = () => (
  <Provider store={store}>
    <Router>
      <div>
      <Switch>
        {/* 首页 */}
        <Route cache exact path="/home" component={Home}/>
        {/* 盒子模型 */}
        <Route exact path="/box" component={Box}/>
        {/* 布局 */}
        <Route exact path="/layout" component={Layout}/>
        {/* 轮播页 */}
        <Route exact path="/carrouselPage" component={CarrouselPage}/>
        {/* 表单 */}
        <Route exact path="/form" component={Form}/>
        {/* 日历 */}
        <Route exact path="/calendarDemo" component={CalendarDemo}/>
        {/* 手写签名 */}
        <Route exact path="/handsignDemo" component={HandsignDemo}/>

        {/* 错误页面 */}
        <Route exact path="/exception/:msg?" component={Exception}/>

        {/* 重定向 */}
        {/* <Route exact path="/" render={() => (
          (window.redirectUrl && window.location.href.indexOf('main.action') >= 0) ? (
            <Redirect to={window.redirectUrl}/>
          ) : (
            <NotFound/>
          )
        )}/> */}
        {/* 浏览器不支持 */}
        <Route exact path="/browserSupport" component={BrowserSupport}/>
        {/* 错误页面 */}
        <Route exact path="/exception/:msg?" component={Exception}/>
        {/* 404页面 */}
        <Route component={NotFound}/>
      </Switch>
      <NoNetwork/>
      </div>
    </Router>
  </Provider>
)

export default Routes