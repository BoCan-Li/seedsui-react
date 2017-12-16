import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx'

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string, // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
    list: PropTypes.array, // [{liconClassName: 'xx', riconClassName: 'xx', text: 'xx'}]
    linewidth: PropTypes.number,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
  }
  static defaultProps = {
    style: {},
    linewidth: 60,
    disabled: false,
    className: 'tabbar-line'
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    const target = e.target;
    const index = target.getAttribute('data-index');
    this.props.onClick(e, this.props.list[index], index)
  }
  render() {
    const { list, className, style, linewidth, disabled } = this.props;
    var tabbarStyle = {};
    if (className.hasClass('tabbar-rect')) {
      switch (list.length) {
        case 1 :
          tabbarStyle = {width: '30%'};
          break;
        case 2 :
          tabbarStyle = {width: '50%'};
          break;
        case 3 :
          tabbarStyle = {width: '50%'};
          break;
        default :
          tabbarStyle = {};
      }
    }
    tabbarStyle = Object.assign(this.props.style, style);
    // 循环DOM
    const liDOM = list.map((item, index) => {
      return (<li data-index={index} className={'tab' + (item.active ? ' active' : '')} key={index}>
        {item.liconClassName && <Icon className={item.liconClassName}/>}
        <label className="tab-label">{item.text}</label>
        {item.riconClassName && <Icon className={item.riconClassName}/>}
      </li>);
    });
    const tabbarClassName = 'tabbar animated' + (className ? ' ' + className : '') + (className.hasClass('tabbar-line') ? ' tabbar-line-width' + linewidth : '') + (disabled ? ' disabled' : '');
    return (
      <ul className={tabbarClassName} data-col={list.length} style={tabbarStyle} onClick={this.onClick}>
        {liDOM}
      </ul>
    );
  }
}
