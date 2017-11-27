import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// 中间件
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import client from 'helpers/api.js';

const composeStoreWithMiddleware = applyMiddleware(
  thunk,
  axiosMiddleware(client)
)(createStore);
export default composeStoreWithMiddleware(reducer);
