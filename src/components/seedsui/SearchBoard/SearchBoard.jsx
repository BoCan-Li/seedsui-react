import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SearchBoard extends Component {
  static propTypes = {
    names: PropTypes.array,
    onClick: PropTypes.func,
    onClear: PropTypes.func,
    expandTitle: PropTypes.string,
    expandTags: PropTypes.array // 格式: {value: 'xx'}
  };

  constructor(props, context) {
    super(props, context);
  }
  onClick = (item) => {
    if (this.props.onClick) this.props.onClick(item);
  }
  render() {
    const {onClear, names, expandTitle, expandTags} = this.props;
    return (
      <div className={`searchboard${(names.length > 0 || expandTitle) ? ' border-b' : ''}`}>
        {/* 搜索历史 */}
        {names.length > 0
        && <div className="searchboard-caption">
          <div className="searchboard-caption-title">搜索历史</div>
          <div className="searchboard-caption-ricon" onClick={onClear}>
            <i className="searchboard-icon-trash"></i>
            <span>清除</span>
          </div>
        </div>}
        {names.map((name, index) => <div className="searchboard-tag" onClick={this.onClick.bind(this, name)} key={index}>{name}</div>)}
        {/* 其它标签 */}
        {expandTitle && <div className="searchboard-caption">
          <div className="searchboard-caption-title">{expandTitle}</div>
        </div>}
        {expandTags && expandTags.map((item, index) => <div className="searchboard-tag" onClick={this.onClick.bind(this, item)} key={index}>{item.value}</div>)}
      </div>
    );
  }
}
