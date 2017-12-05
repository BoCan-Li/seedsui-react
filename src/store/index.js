import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// thunk中间件
import thunk from 'redux-thunk';
// api中间件
import client from 'helpers/api.js';
import clientMiddleware from './middleware/clientMiddleware';
// router中间件
import { syncHistoryWithStore } from './../react-router-redux/';
import { history } from './reducer';
import routerMiddleware from './middleware/routerMiddleware';

const store = createStore(reducer, applyMiddleware(thunk, clientMiddleware(client), routerMiddleware));

// router同步store
syncHistoryWithStore(history, store)

export default store
