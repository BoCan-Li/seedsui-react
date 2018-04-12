import { createStore, applyMiddleware } from 'redux'
// Reducer
import reducer from './modules/reducer.js'
// Middleware: thunk
import thunk from 'redux-thunk';
// Middleware: client
import client from 'components/seedsui/utils/axiosApi.js';
import clientMiddleware from './middleware/clientMiddleware';
// Store
const store = createStore(reducer, applyMiddleware(thunk, clientMiddleware(client)));

export default store
