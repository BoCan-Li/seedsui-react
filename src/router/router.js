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
import Home from '@/views/Home/Home.js'

// Store
const store = createStore(stores)

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/_react_" component={Home}></Route>
    </BrowserRouter>
  </Provider>
)

export default Router
