import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dot from './../Dot';

export default class Timeline extends Component {
  static propTypes = {
    list: PropTypes.array, // [{content: node,icon: node(默认Dot), active: bool, children: node}]
    className: PropTypes.string,
    style: PropTypes.object,

    lineParams: PropTypes.object,

    badgeParams: PropTypes.object,

    dotParams: PropTypes.object
  }
  static defaultProps = {
    lineParams: {},
    badgeParams: {},
    dotParams: {
      className: ''
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      list, className, style,
      lineParams,
      badgeParams,
      dotParams,
      ...others
    } = this.props;
    if (!list) return null;
    const listDOM = list.map((item, index) => {
      return (
        <div key={index} className={'timeline-case' + (item.active ? ' active' : '')}>
          <div {...badgeParams} className={`timeline-badge${badgeParams.className ?  ' ' + badgeParams.className : ''}`}>
            {item.icon || <Dot {...dotParams} className={item.active ? 'active ' + dotParams.className : dotParams.className}/>}
          </div>
          {item.content}
          {item.children}
        </div>
      );
    });
    return (
      <div className={`timeline${className ? ' ' + className : ''}`} style={style} {...others}>
        <span {...lineParams} className={`timeline-line${lineParams.className ?  ' ' + lineParams.className : ''}`}></span>
        {listDOM}
      </div>
    );
  }
}
