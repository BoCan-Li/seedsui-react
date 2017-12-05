import { combineReducers } from 'redux'
import home from './modules/home';

import createBrowserHistory from 'history/createBrowserHistory'
import { createReducer } from './../react-router-redux/'

export const history = createBrowserHistory({ basename : '/seedsui' })
export default combineReducers({
  routing: createReducer(history),
  home
})
