import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// thunk中间件
import thunk from 'redux-thunk';
// api中间件
import client from 'helpers/api.js';
import clientMiddleware from './middleware/clientMiddleware';
// router中间件
import {
  syncHistoryWithStore,
  routerMiddleware as createRouterMiddleware,
  push, replace, go, goBack, goForward,
} from './../react-router-redux/'
import { history } from './reducer'

const store = createStore(reducer, applyMiddleware(thunk, clientMiddleware(client), createRouterMiddleware(history)));

// router同步store
syncHistoryWithStore(history, store)
window.dispatch = store.dispatch
window.h = history
window.push = push
window.replace = replace
window.go = go
window.goBack = goBack
window.goForward = goForward

export default store
