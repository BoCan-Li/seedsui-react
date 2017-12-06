// Reducer
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
const createReducer = history => {
  const initState = {
    location: history.location,
    action: history.action,
  }
  return function reducer(state = initState, action) {
    if (action.type === LOCATION_CHANGE) {
      return {
        location: action.payload.location,
        action: action.payload.action,
      }
    }

    return state
  }
}

// Action
const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'

function updateLocation(method) {
  return (...args) => ({
    type: CALL_HISTORY_METHOD,
    payload: { method, args },
  })
}
const push = updateLocation('push')
const replace = updateLocation('replace')
const go = updateLocation('go')
const goBack = updateLocation('goBack')
const goForward = updateLocation('goForward')

const routerActions = { push, replace, go, goBack, goForward }

// Sync
function syncHistoryWithStore(history, store) {
  // Whenever location changes, dispatch an action to get it in the store
  return history.listen((location, action) => {
    // Tell the store to update by dispatching an action
    store.dispatch({
      type: LOCATION_CHANGE,
      payload: { location, action },
    })
  })
}

// Middleware
function routerMiddleware(history) {
  /* eslint-disable consistent-return */
  return () => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action)
    }

    const { payload: { method, args } } = action
    history[method](...args)
  }
}

export {
  syncHistoryWithStore,
  LOCATION_CHANGE, createReducer,
  CALL_HISTORY_METHOD,
  push, replace, go, goBack, goForward,
  routerActions,
  routerMiddleware,
}
