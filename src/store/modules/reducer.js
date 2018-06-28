import { combineReducers } from 'redux';
import carrouselPage from './carrouselPage'; // 轮播页
import form from './form'; // 表单页

export default combineReducers({
  carrouselPage,
  form
});
