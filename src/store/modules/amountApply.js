// Model
const GET_DETAIL = 'amountApply/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'amountApply/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'amountApply/GET_DETAIL_FAILURE';

const initial = {
  isLoading: false,
  detail: {}
};
// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_DETAIL:
      return {
        ...state,
        isLoading: true
      };
    case GET_DETAIL_SUCCESS:
      const result = action && action.result;
      if (result.code === '1') {
        state.detail = result.data;
      } else {
        state.detail = {};
      }
      return {
        ...state,
        isLoading: false
      };
    case GET_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

// Action
export function getDetail(params) {
  return {
    types: [GET_DETAIL, GET_DETAIL_SUCCESS, GET_DETAIL_FAILURE],
    promise: client => client.get(`/app/dms/client/salesordermanager/getPurchaseById.action`, params),
    params
  };
}
