import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timeline extends Component {
  static propTypes = {
    list: PropTypes.array, // [{content: node, contentHTML: string, icon: node(默认Dot), active: bool}]

    lineAttribute: PropTypes.object,
    badgeAttribute: PropTypes.object,
    dotAttribute: PropTypes.object
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      list,
      lineAttribute = {},
      badgeAttribute = {},
      dotAttribute = {},
      ...others
    } = this.props;
    if (!list) return null;
    const listDOM = list.map((item, index) => {
      return (
        <div key={index} className={'timeline-case' + (item.active ? ' active' : '')}>
          <div {...badgeAttribute} className={`timeline-badge${badgeAttribute.className ?  ' ' + badgeAttribute.className : ''}`}>
            {item.icon || <i {...dotAttribute} className={`timeline-dot${dotAttribute.className ?  ' ' + dotAttribute.className : ''}`}></i>}
          </div>
          {item.content}
          {item.contentHTML && <div dangerouslySetInnerHTML={{__html: item.contentHTML}}></div>}
        </div>
      );
    });
    return (
      <div {...others} className={`timeline${others.className ? ' ' + others.className : ''}`}>
        <span {...lineAttribute} className={`timeline-line${lineAttribute.className ?  ' ' + lineAttribute.className : ''}`}></span>
        {listDOM}
      </div>
    );
  }
}
