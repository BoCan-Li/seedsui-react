import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// 中间件
import thunk from 'redux-thunk';
import client from 'helpers/api.js';
import clientMiddleware from './middleware/clientMiddleware';

const store = createStore(reducer, applyMiddleware(thunk, clientMiddleware(client)));
export default store
