import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from 'store/index.js';
import NoNetwork from 'components/seedsui/NoNetwork/NoNetwork.jsx';
import NotFound from 'components/seedsui/NotFound/NotFound.jsx';
// Containers
import {
  Exception,
  Home,
  Box,
  Layout,
  CarrouselPage,
  Form,
  CalendarDemo
} from 'containers';
import { TransitionGroup, CSSTransition } from "react-transition-group";
const Routes = () => (
  <Provider store={store}>
    <Router>
      <div>
      <TransitionGroup>
      <CSSTransition key={window.location} classNames="fade" timeout={300}>
      <Switch>
        {/* 首页 */}
        <Route cache exact path="/_react_/home" component={Home}/>
        {/* 盒子模型 */}
        <Route exact path="/_react_/box" component={Box}/>
        {/* 布局 */}
        <Route exact path="/_react_/layout" component={Layout}/>
        {/* 轮播页 */}
        <Route exact path="/_react_/carrouselPage" component={CarrouselPage}/>
        {/* 表单 */}
        <Route exact path="/_react_/form" component={Form}/>
        {/* 日历 */}
        <Route exact path="/_react_/calendarDemo" component={CalendarDemo}/>

        {/* 错误页面 */}
        <Route exact path="/_react_/exception/:msg?" component={Exception}/>

        {/* 重定向 */}
        <Route exact path="/" render={() => (
          (window.redirectUrl && window.location.href.indexOf('main.action') >= 0) ? (
            <Redirect to={window.redirectUrl}/>
          ) : (
            <NotFound/>
          )
        )}/>
        {/* <Redirect to={{
          pathname: window.redirectUrl
        }}/> */}

        {/* 404页面 */}
        <Route component={NotFound}/>
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <NoNetwork/>
      </div>
    </Router>
  </Provider>
)

export default Routes