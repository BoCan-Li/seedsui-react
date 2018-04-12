// Model
const GET_MENUS = 'home/GET_MENUS';
const GET_MENUS_SUCCESS = 'home/GET_MENUS_SUCCESS';
const GET_MENUS_FAILURE = 'home/GET_MENUS_FAILURE';

const initial = {
  isLoading: false,
  menus: []
};
// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_MENUS:
      return {
        ...state,
        isLoading: true
      };
    case GET_MENUS_SUCCESS:
      const result = action && action.result;
      if (result.code === '1') {
        state.menus = result.data;
      } else {
        state.menus = [];
      }
      return {
        ...state,
        isLoading: false
      };
    case GET_MENUS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

// Action
export function getMenus(params) {
  return {
    types: [GET_MENUS, GET_MENUS_SUCCESS, GET_MENUS_FAILURE],
    promise: client => client.get(`/static/homeMenus.json`, params),
    params
  };
}
