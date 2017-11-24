import { Component } from 'react';
export default class HistoryBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    };
  }
  /*
  *  历史记录操作:start
  */
  // 历史记录操作
  onClickHistory = (value) => {
    if (typeof value === 'object') {
      this.searchExpand(value);
      return;
    }
    this.search(value);
  }
  onClickClear = () => {
    window.localStorage.removeItem(this.historyStoreKey);
    this.setState({
      history: []
    });
  }
  setHistoryStoreKey = (key) => {
    this.historyStoreKey = key;
  }
  setSearchCallback = (callback) => {
    this.searchCallback = callback;
  }
  setSearchExpandCallback = (callback) => {
    this.searchExpandCallback = callback;
  }
  static historyStoreKey = null;
  static searchCallback = null;
  static searchExpandCallback = null;
  // 查询
  search = (value) => {
    this.searchCallback(value);
  }
  // 查询扩展
  searchExpand = (value) => {
    this.searchExpandCallback(value);
  }
  // 读取store，并注入到当前state中
  updateByStore = () => {
    if (window.localStorage.getItem(this.historyStoreKey)) {
      this.setState({
        history: window.localStorage.getItem(this.historyStoreKey).split('&-&')
      });
    }
  }
  // 保存到store中
  saveToStore = () => {
    window.localStorage.setItem(this.historyStoreKey, this.state.history.join('&-&'));
  }
  // 提交值
  submitToStore = (val) => {
    var value = val.trim();
    // 保存查询内容
    if (value.length > 0) {
      // 查询是否有相同的搜索内容
      for (var i in this.state.history) {
        if (this.state.history[i] === value) {
          this.state.history.splice(i, 1);
          break;
        }
      }
      this.state.history.splice(0, 0, value);
    }
    // 超过限制删除尾查
    if (this.state.history.length > 5) {
      this.state.history.pop();
    }
    this.saveToStore();
  }
  /*
  *  历史记录操作:end
  */
}
