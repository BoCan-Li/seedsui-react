// Action Type
const SET_ONLINE = 'system/SET_ONLINE';

const initial = {
  online: true
};
// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ONLINE:
      return {
        ...state,
        online: action.online
      };
    default:
      return state;
  }
}

// Action
export function setOnline (online) {
  return {
    type: SET_ONLINE,
    online: online
  }
}
/* export function setOnline(online) {
  return dispatch => {
    dispatch({
      type: SET_ONLINE,
      online
    });
  };
} */
