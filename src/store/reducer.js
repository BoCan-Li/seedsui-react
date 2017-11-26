import { combineReducers } from 'redux'
import counter from './modules/counter.js'
import system from './modules/system.js'
import pay from './modules/pay.js'

export default combineReducers({
  counter,
  system,
  pay
})
