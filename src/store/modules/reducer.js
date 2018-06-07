import { combineReducers } from 'redux';
import home from './home'; // 首页
import carrouselPage from './carrouselPage'; // 轮播页
import form from './form'; // 表单页

export default combineReducers({
  home,
  carrouselPage,
  form
});
