// Model
const GET_DATA = 'home/GET_DATA',
GET_DATA_SUCCESS = 'home/GET_DATA_SUCCESS',
GET_DATA_FAIL = 'home/GET_DATA_FAIL';

const initial = {
  isLoading: true,
  data: {code: '1'}
};

// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_DATA:
      console.log('开始请求');
      console.log(action);
      return {
        ...state,
        isLoading: true
      };
    case GET_DATA_SUCCESS:
      console.log('请求成功');
      console.log(action);
      let payload = action && action.payload
      if (typeof payload === 'string') payload = JSON.parse(payload)
      const data = payload
      return {
        ...state,
        data,
        isLoading: false
      };
    case GET_DATA_FAIL:
      console.log('请求失败');
      console.log(action);
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

// Action
export function getData(onSuccess, onError) {
  return dispatch => {
    dispatch({
      type: GET_DATA,
      payload: {
        request: {
          method: 'get',
          url: `/biz/std_mendian/shoppingCart/client/v1/queryCount.action`,
        }
      },
      onSuccess,
      onError
    });
  };
}
