import api from 'helpers/api.js';
// Model
/* const GET_PAY = 'pay/GET_PAY';
const GET_PAY_SUCCESS = 'pay/GET_PAY_SUCCESS';
const GET_PAY_FAILURE = 'pay/GET_PAY_FAILURE'; */
const GET_DATA = 'GET_DATA',
GET_DATA_PENDING = 'GET_DATA_PENDING',
GET_DATA_SUCCESS = 'GET_DATA_SUCCESS',
GET_DATA_FAILURE = 'GET_DATA_FAILURE';

const initial = {
  isLoading: false,
  info: [
    {
      name: '供应商',
      value: '苏果超市龙江店'
    },
    {
      name: '订单金额',
      value: '4020'
    },
    {
      name: '待付金额',
      value: '4020'
    }
  ],
  balance: 5020,
  isOnlinePay: true,
  payType: [
    {
      icon: '30pay',
      name: '商联支付',
      active: true
    },
    {
      icon: 'allinpay',
      name: '通联支付',
      active: false
    },
    {
      icon: 'alipay',
      name: '支付宝',
      active: false
    },
    {
      icon: 'wxpay',
      name: '微信',
      active: false
    }
  ]
};

// Reducer
export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_DATA:
      console.log('开始请求');
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
    default:
      return state;
  }
}

// Action
export function getPay(params, onSuccess, onError) {
  return {
    type: GET_DATA,
    payload: {
      promise: api.get(`/biz/std_mendian/shoppingCart/client/v1/queryCount.action`)
    },
    onSuccess,
    onError
  };
  /* return dispatch => {
    dispatch({
      types: GET_DATA,
      promise: client => api.get(`/biz/std_mendian/shoppingCart/client/v1/queryCount.action`),
      onSuccess,
      onError
    });
  }; */
}
