import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
// 中间件
import promiseMiddleware from 'redux-promise-middleware';

// const store = createStore(reducer)
// export default store

const composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware({
    promiseTypeSuffixes: ['', 'SUCCESS', 'FAILURE']
  })
)(createStore);
export default composeStoreWithMiddleware(reducer);
