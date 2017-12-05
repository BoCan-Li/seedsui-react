import {
  syncHistoryWithStore,
  routerMiddleware as createRouterMiddleware,
  push, replace, go, goBack, goForward,
} from './../../react-router-redux/'
import { history } from './../reducer'
export default createRouterMiddleware(history)
// Expose these globally for dev purposes
// window.dispatch = store.dispatch
window.h = history
window.push = push
window.replace = replace
window.go = go
window.goBack = goBack
window.goForward = goForward
