import { combineReducers } from 'redux';
import amountApply from './amountApply'; // 额度申请
import order from './order';
import orderSearch from './orderSearch';
import orderDetail from './orderDetail';

export default combineReducers({
  amountApply,
  order,
  orderSearch,
  orderDetail
});
