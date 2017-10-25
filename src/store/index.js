import { combineReducers } from 'redux'
import counter from './modules/counter.js'
import system from './modules/system.js'

export default combineReducers({
  counter,
  system
})
