// Action Type
const SET_COUNT = 'cunter/SET_COUNT'
// Reducer
const initial = {
  count: 0
}
function counter(state = initial, action) {
  const count = state.count
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.count || count
      }
    default:
      return state
  }
}
export default counter

export function setCount(count) {
  return {
    type: SET_COUNT,
    count: count
  };
}
/* export function setCount(count) {
  return dispatch => {
    dispatch({
      type: SET_COUNT,
      count: count
    });
  };
} */
