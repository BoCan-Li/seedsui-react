import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import stores from './../store/index.js'
// views
import Home from './../views/Home/Home.js'
import About from './../views/About/About.js'
import Counter from './../views/Counter/Counter.js'

// Store
const store = createStore(stores)

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/counter" component={Counter}/>
      </div>
    </BrowserRouter>
  </Provider>
)

export default Router
