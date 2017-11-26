import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from 'containers/Home/Home.jsx'
import About from 'containers/About/About.jsx'
import RouteChildren from 'containers/RouteChildren/RouteChildren.jsx'
import Counter from 'containers/Counter/Counter.jsx'
import Pay from 'containers/Pay'

// redux
import { Provider } from 'react-redux'
import store from 'store/index.js'

const BasicExample = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about/:id" component={About}/>
        <Route path="/routechildren" component={RouteChildren}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/pay" component={Pay}/>
      </div>
    </Router>
  </Provider>
)

export default BasicExample