import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from 'store/index.js';
import NoNetwork from 'components/seedsui/NoNetwork/NoNetwork.jsx';
import NotFound from 'components/seedsui/NotFound/NotFound.jsx';
// Containers
import {
  Home,
  Box,
  CarrouselPage,
  Form
} from 'containers';
const Routes = () => (
  <Provider store={store}>
    <Router>
      <div className="pages">
      <Switch>
        {/* 首页 */}
        <Route exact path="/_react_/home" component={Home}/>
        {/* 盒子模型 */}
        <Route exact path="/_react_/box" component={Box}/>
        {/* 轮播页 */}
        <Route exact path="/_react_/carrouselPage" component={CarrouselPage}/>
        {/* 表单 */}
        <Route exact path="/_react_/form" component={Form}/>

        {/* 重定向 */}
        <Route exact path="/" render={() => (
          (window.redirectUrl && window.location.href.indexOf('/wxapi/main.action?type=') >= 0) ? (
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
      <NoNetwork/>
      </div>
    </Router>
  </Provider>
)

export default Routes