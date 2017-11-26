import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// 中间件
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
// const store = createStore(reducer)
// export default store

const composeStoreWithMiddleware = applyMiddleware(
  thunk,
  promiseMiddleware({
    promiseTypeSuffixes: ['', 'SUCCESS', 'FAILURE']
  })
)(createStore);
export default composeStoreWithMiddleware(reducer);
