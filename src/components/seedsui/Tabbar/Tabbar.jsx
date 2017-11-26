import React, { Component } from 'react';import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    list: PropTypes.array,
    activeIndex: PropTypes.number,
    type: PropTypes.string, // line | rect | lump | dropdown | footer
    theme: PropTypes.string, // reverse
    linewidth: PropTypes.number,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    linewidth: 60,
    disabled: false,
    type: 'line',
    activeIndex: 0
  }
  onClick = (item, i, callback) => {
    callback(item, i);
  }
  render() {
    const { list, activeIndex, type, theme, linewidth, disabled } = this.props;
    var style = {};
    if (this.type === 'rect') {
      switch (this.list.length) {
        case 1 :
          style = {width: '30%'};
          break;
        case 2 :
          style = {width: '50%'};
          break;
        case 3 :
          style = {width: '50%'};
          break;
        default :
          style = {};
      }
    }
    style = Object.assign(this.props.style, style);
    // 循环DOM
    const liDOM = list.map((item, index) => {
      return (<li className={'tab' + (activeIndex === index ? ' active' : '')} key={index} onClick={this.onClick(item, index, item.onClick)}>
        {(item.icon && type !== 'dropdown') && <i className="'icon '+item.icon"></i>}
        <label className="tab-label">{item.text}</label>
        {(item.icon && type === 'dropdown') && <i className="'icon size12 '+item.icon"></i>}
      </li>);
    });
    return (
      <ul className={'tabbar tabbar-' + type + ' animated' + (theme ? ' ' + theme : '') + (type === 'line' ? ' tabbar-line-width' + linewidth : '')+(disabled ? ' disabled' : '')} data-col={list.length} style={style}>
        {liDOM}
      </ul>
    );
  }
}
