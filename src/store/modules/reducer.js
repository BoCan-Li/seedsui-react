import { combineReducers } from 'redux';
import home from './home'; // 首页
import box from './box'; // 盒子模型
import carrouselPage from './carrouselPage'; // 轮播页

export default combineReducers({
  home,
  box,
  carrouselPage
});
