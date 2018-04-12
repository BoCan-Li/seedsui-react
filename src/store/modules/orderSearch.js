// 获取商品类型服务端请求
const GET_ORDERS = 'orderSearch/GET_ORDERS';
const GET_ORDERS_SUCCESS = 'orderSearch/GET_ORDERS_SUCCESS';
const GET_ORDERS_FAILURE = 'orderSearch/GET_ORDERS_FAILURE';

// 初始化数据
const INIT_DATA = 'orderSearch/INIT_DATA';

const initial = {
  priceVisible: true,
  hasMore: -2,
  isLoading: false,
  orders: [],
  page: 1,
  rows: 20,
  orderStatus: [
    {
      code: '',
      value: '全部',
      selected: true
    },
    {
      code: '1',
      value: '待确认',
      color: '#39ABF2',
      selected: false
    },
    {
      code: '2',
      value: '待发货',
      color: '#8D7BF7',
      selected: false
    },
    {
      code: '3',
      value: '待签收',
      color: '#FFBA00',
      selected: false
    },
    {
      code: '4',
      value: '已完成',
      color: '#6FD03A',
      selected: false
    },
    {
      code: '5',
      value: '已取消',
      color: '#FF7485',
      selected: false
    },
    {
      code: '0',
      value: '',
      color: 'white',
      selected: false
    },
  ]
};

const convertDetails = (details) => {
  const imgs = [];
  if (details.length > 1) {
    details.forEach((detail) => {
      imgs.push(detail.small_pic);
    });
    return imgs;
  } else if (details.length === 1) {
    return {
      title: details[0].pd_name,
      subtitle: details[0].spec,
      picUrl: details[0].small_pic
    };
  }
  return null;
};

const getStatus = (statusArr, code) => {
  let judgeCode = code;
  if (!/^[1-5]$/.test(code)) {
    judgeCode = '0';
  }
  return statusArr.filter((status) => {
    return status.code === judgeCode;
  })[0];
};

const convertOrders = (orders, statusArr) => {
  return orders && orders.map((order) => {
    // 计算金额，如果有优惠后金额，显示优惠后金额
    const price = order.price_visible === '1' ? order.order_discount_amount || order.order_amount : null;
    // 支付状态
    let payStatus = '';
    if (order.show_pay_status === '1') {
      switch (order.pay_status.toString()) {
        case '0':
          payStatus = '未支付';
          break;
        case '1':
          payStatus = '已支付';
          break;
        default:
          payStatus = '支付状态异常';
      }
      payStatus = ' (' + payStatus + ')';
    }
    return {
      status: order.em_order_status,
      color: getStatus(statusArr, order.em_order_status).color,
      statusName: order.em_order_status_name,
      title: '供货商: ' + order.supplier_name,
      type: order.em_order_type,
      orderId: order.order_id,
      tenantId: order.tenant_id,
      customerId: order.customer_id,
      supplierId: order.supplier_id,
      items: [
        {
          name: '进货方:',
          value: order.customer_name
        },
        {
          name: '供货商:',
          value: order.supplier_name
        },
        {
          name: '金额:',
          price: true,
          value: price,
          show: order.price_visible === '1',
          ricon: payStatus
        }
      ],
      picLength: order.details.length,
      detail: convertDetails(order.details)
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_ORDERS:
      state.page = action.params.page;
      return {
        ...state,
        hasMore: -2,
        isLoading: state.page === 1 ? true : false
      };
    case GET_ORDERS_SUCCESS:
      const data = action && action.result && action.result.data;
      if (data) {
        // 设置数据
        const orders = convertOrders(data, [...state.orderStatus]);
        state.orders = state.page === 1 ? orders : state.orders.concat(orders);
        // 判断0.无更多数据, 1.头部刷新完成, 2.底部刷新完成, 404.一条数据都没有
        state.hasMore = state.page === 1 ? 1 : 2;
        // 判断是否无更多数据
        if (state.rows > orders.length) state.hasMore = 0;
        // 判断是否暂无数据
        if (state.orders.length === 0) state.hasMore = 404;
      }
      return {
        ...state,
        isLoading: false
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        hasMore: -1,
        isLoading: false,
      };
    case INIT_DATA:
      return {
        ...state,
        page: 1,
        hasMore: -2,
        isLoading: false,
        orders: [],
      };
    default:
      return state;
  }
}

/**
 * 获取进货单详情
 */
export function getOrders(params) {
  return {
    types: [GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/listOrders.action`, params),
    params
  };
}

/**
 * 初始化数据
 */
export function initData() {
  return dispatch => {
    dispatch({
      type: INIT_DATA
    });
  };
}
