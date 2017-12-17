import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import store from 'store/index.js'

// Containers
import Home from 'containers/Home'; // 登录后默认首页
import About from 'containers/About'; // 登录后默认首页

const Routes = () => (
  <Provider store={store}>
    <Router basename="/_react_">
      <div>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/about" component={About}/>
      </div>
    </Router>
  </Provider>
)

export default Routes