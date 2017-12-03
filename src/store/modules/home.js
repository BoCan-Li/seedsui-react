// Model
const GET_DATA = 'home/GET_DATA',
GET_DATA_SUCCESS = 'home/GET_DATA_SUCCESS',
GET_DATA_FAILURE = 'home/GET_DATA_FAILURE';

const SET_LOADING = 'home/SET_LOADING'

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
      return {
        ...state,
        isLoading: false
      };
    case GET_DATA_FAILURE:
      console.log('请求失败');
      console.log(action);
      return {
        ...state,
        isLoading: false
      };
    case SET_LOADING: 
      console.log('设置isLoading');
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}

// Action
export function getData() {
  return {
    types: [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE],
    promise: client => client.post(`/biz/std_mendian/shoppingCart/client/v1/queryCount.action`)
  }
}

export function setLoading() {
  return {
    type: SET_LOADING,
    isLoading: false
  }
}
