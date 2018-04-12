import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from 'store/index.js';
import NoNetwork from 'components/seedsui/NoNetwork/NoNetwork.jsx';
// Containers
import {
  NotFound,
  AmountApply,
  Order,
  OrderSearch
} from 'containers';
const Routes = () => (
  <Provider store={store}>
    <Router>
      <div className="pages">
      <Switch>
        {/* 额度申请 */}
        <Route exact path="/_react_/amountApply/:type?" component={AmountApply}/>

        {/* 进货单列表和进货单详情 */}
        <Route exact path="/_react_/order/:detail?/:type?/:orderId?/:tenantId?" component={Order}/>
        {/* 进货单搜索 */}
        <Route exact path="/_react_/orderSearch" component={OrderSearch}/>
        
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