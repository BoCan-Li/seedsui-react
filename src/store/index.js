import { createStore, applyMiddleware } from 'redux'
// Reducer
import reducer from './reducer.js'
// Middleware: thunk
import thunk from 'redux-thunk';
// Middleware: client
import client from 'helpers/api.js';
import clientMiddleware from './middleware/clientMiddleware';
// Store
const store = createStore(reducer, applyMiddleware(thunk, clientMiddleware(client)));

export default store
