import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dot from './../Dot';

export default class Timeline extends Component {
  static propTypes = {
    list: PropTypes.array, // [{content: node,icon: node(默认Dot), active: bool, children: node}]
    className: PropTypes.string,
    style: PropTypes.object,
    badgeStyle: PropTypes.object,
    lineClassName: PropTypes.string,
    lineStyle: PropTypes.object
  }
  static defaultProps = {
    list: []
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {list, className, style, badgeStyle, lineClassName, lineStyle} = this.props;
    const listDOM = list.map((item, index) => {
      return (
        <div key={index} className={'timeline-case' + (item.active ? ' active' : '')}>
          <div className="timeline-badge" style={badgeStyle}>{item.icon || <Dot className={item.active ? ' active' : ''}/>}</div>
          {item.content}
          {item.children}
        </div>
      );
    });
    return (
      <div className={`timeline${className ? ' ' + className : ''}`} style={style}>
        <span className={`timeline-line${lineClassName ? ' ' + lineClassName : ''}`} style={lineStyle}></span>
        {listDOM}
      </div>
    );
  }
}
