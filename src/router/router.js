import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from '@/containers/Home/Home.jsx'
import About from '@/containers/About/About.jsx'
import RouteChildren from '@/containers/RouteChildren/RouteChildren.jsx'
import Counter from '@/containers/Counter/Counter.jsx'

// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import stores from './../redux/index.js'
const store = createStore(stores)

const BasicExample = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home主页</Link></li>
          <li><Link to="/about/带参数">About带参数</Link></li>
          <li><Link to="/routechildren">Children子路由</Link></li>
          <li><Link to="/counter">Redux</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/about/:id" component={About}/>
        <Route path="/routechildren" component={RouteChildren}/>
        <Route path="/counter" component={Counter}/>
      </div>
    </Router>
  </Provider>
)

export default BasicExample