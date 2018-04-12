// 获取商品类型服务端请求
const GET_ORDERS = 'order/GET_ORDERS';
const GET_ORDERS_SUCCESS = 'order/GET_ORDERS_SUCCESS';
const GET_ORDERS_FAILURE = 'order/GET_ORDERS_FAILURE';

// tab修改
const CHANGE_TAB = 'order/CHANGE_TAB';

// 初始化数据
const INIT = 'order/INIT';

const initial = {
  hasMore: -2,
  isLoading: true,
  orders: [],
  page: 1,
  rows: 20,
  activeIndex: 0
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

const statusColors = ['red', '#39ABF2', '#8D7BF7', '#FFBA00', '#6FD03A', '#FF7485'];
const convertOrders = (orders) => {
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
      color: statusColors[order.em_order_status],
      statusName: order.em_order_status_name,
      title: '供货商: ' + order.supplier_name,
      type: order.em_order_type,
      orderId: order.order_id,
      orderNo: order.order_no,
      tenantId: order.tenant_id,
      customerId: order.customer_id,
      supplierId: order.supplier_id,
      payStatus: payStatus, // 支付状态
      price: price, // 金额
      customer_name: order.customer_name, // 进货方
      create_time: order.create_time, // 下单时间
      price_visible: order.price_visible, // 订单金额
      payment_status: '1', // 贷款状态,1显示申请贷款按钮;其它情况只显示文字
      picLength: order.details.length,
      detail: convertDetails(order.details)
    };
  });
};

export default function reducer(state = initial, action = {}) {
  switch (action.type) {
    case INIT:
      state = {
        hasMore: -2,
        isLoading: true,
        orders: [],
        page: 1,
        rows: 20,
        activeIndex: 0
      };
      return {
        ...state,
      };
    case GET_ORDERS:
      state.page = action.params.page;
      return {
        ...state,
        hasMore: -2,
        isLoading: true
      };
    case GET_ORDERS_SUCCESS:
      const data = action && action.result && action.result.data;
      if (data) {
        // 设置数据
        let orders = convertOrders(data);
        state.orders = state.page === 1 ? orders : state.orders.slice().concat(orders);
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
        isLoading: false
      };
    case CHANGE_TAB:
      state.activeIndex = action.index
      return {
        ...state,
        page: 1,
        isLoading: true,
      };
    default:
      return state;
  }
}

/**
 * 初始化
 */
export function init() {
  return dispatch => {
    dispatch({
      type: INIT
    });
  };
}

/**
 * 获取进货单列表
 */
export function getOrders(params) {
  return {
    types: [GET_ORDERS, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE],
    promise: client => client.post(`/biz/std_mendian/mine/client/v1/listOrders.action`, params),
    params
  };
}

/**
 * tab切换
 */
export function changeTab(index) {
  return dispatch => {
    dispatch({
      type: CHANGE_TAB,
      index
    });
  };
}
