import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from 'containers/Home'; // 登录后默认首页
import About from 'containers/About'; // 登录后默认首页

// redux
import { Provider } from 'react-redux'
import store from 'store/index.js'

const Routes = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/_react_" component={Home}/>
        <Route exact path="/_react_/about" component={About}/>
      </div>
    </Router>
  </Provider>
)

export default Routes