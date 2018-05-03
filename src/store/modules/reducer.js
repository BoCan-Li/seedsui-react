import { combineReducers } from 'redux';
import home from './home'; // 首页
import box from './box'; // 盒子模型
import carrouselPage from './carrouselPage'; // 轮播页
import form from './form'; // 表单页

export default combineReducers({
  home,
  box,
  carrouselPage,
  form
});
