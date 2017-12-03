import { browserHistory } from 'react-router'
import { createStore } from 'redux'

// action
function locationChange (location = '/') {
  return {
    type    : 'LOCATION_CHANGE',
    payload : location
  }
}

// reducer
const initialState = browserHistory.getCurrentLocation()
function locationReducer (state = initialState, action) {
  return action.type === 'LOCATION_CHANGE'
    ? action.payload
    : state
}

// store
const store = createStore(locationReducer)

const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

//绑定browserHistory，取消绑定执行store.unsubscribeHistory()
store.unsubscribeHistory = browserHistory.listen(updateLocation(store))