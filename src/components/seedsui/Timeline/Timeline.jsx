import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Timeline extends Component {
  static propTypes = {
    list: PropTypes.array,
    style: PropTypes.object,
    top: PropTypes.string,
    bottom: PropTypes.string
  }
  static defaultProps = {
    list: [],
    style: {}
  }
  render() {
    const { list, style, top, bottom } = this.props;
    const listDOM = list.map((item, index) => {
      return (
        <div key={index} className={'timeline-case' + (item.active ? ' active' : '')}>
          <div className="timeline-badge">{item.icon}</div>
          {item.content}
        </div>
      );
    });
    return (
      <div className="timeline" style={style}>
        <span className="timeline-line" style={{top: top, bottom: bottom}}></span>
        {listDOM}
      </div>
    );
  }
}
