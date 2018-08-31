import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DB from './../../utils/db.js';

export default class SearchBoard extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    dbKey: PropTypes.string, // 存储到db中的key
    show: PropTypes.bool,
    showValidTags: PropTypes.bool,
    onClick: PropTypes.func,
    onClear: PropTypes.func,
    expandCaption: PropTypes.string, // 扩展标题
    expandTags: PropTypes.array, // 扩展标签, 格式: {value: 'xx'}
    onClickExpand: PropTypes.func,
    children: PropTypes.node
  }
  static defaultProps = {
    show: true,
    showValidTags: true,
    className: 'border-b',
    dbKey: 'app_search_history'
  }
  constructor(props, context) {
    super(props, context);
    // 初始化标签
    this.state = {
      tags: DB.getStore(this.props.dbKey) || []
    }
  }
  // 清空历史记录
  onClear = () => {
    DB.removeStore(this.props.dbKey);
    this.setState({
      tags: []
    });
    if (this.props.onClear) this.props.onClear();
  }
  // 新增历史记录
  add = (item) => {
    if (!item.value) return;
    var tags = DB.getStore(this.props.dbKey) || [];
    // 删除重复项
    for (var i in tags) {
      if (tags[i].value === item.value) {
        tags.splice(i, 1);
        break;
      }
    }
    // 添加到第一项
    tags.unshift(item);
    DB.setStore(this.props.dbKey, tags);
    this.setState({
      tags: tags
    });
  }
  render() {
    const {tags} = this.state;
    const {style, className, show, expandCaption, expandTags, onClick, onClickExpand, children} = this.props;
    let isHide = false;
    if (this.props.showValidTags && tags.length === 0) {
      isHide = true;
    }
    let DOM = null;
    if (!isHide) {
      DOM = (<div className={`searchboard ${className ? ' ' + className : ''}${show ? '' : ' hide'}`} style={style}>
        {/* 历史标签 */}
        {tags.length > 0
        && <div className="searchboard-caption">
          <div className="searchboard-caption-title">搜索历史</div>
          <div className="searchboard-caption-ricon" onClick={this.onClear}>
            <i className="searchboard-icon-trash"></i>
            <span>清除</span>
          </div>
        </div>}
        {tags.map((item, index) => <div className="searchboard-tag" onClick={() => {if (onClick) onClick(item, index)}} key={index}>{item.value}</div>)}
        {/* 其它标签 */}
        {expandCaption && <div className="searchboard-caption">
          <div className="searchboard-caption-title">{expandCaption}</div>
        </div>}
        {expandTags && expandTags.map((item, index) => <div className="searchboard-tag" onClick={() => {if (onClickExpand) onClickExpand(item, index);}} key={index}>{item.value}</div>)}
        {/* 自定义 */}
        {children}
      </div>);
    }
    return DOM;
  }
}
