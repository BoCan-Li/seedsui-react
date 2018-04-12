import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon/Icon.jsx';

export default class Tabbar extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string, // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
    iconBadgesCaption: PropTypes.array,
    iconBadgeClassName: PropTypes.string,
    riconBadgesCaption: PropTypes.array,
    riconBadgeClassName: PropTypes.string,
    list: PropTypes.array, // [{iconClassName: string, riconClassName: string, caption: string, active: bool, id: string}]
    tiled: PropTypes.bool, // 宽度等分, 默认宽度弹性伸缩
    disabled: PropTypes.bool,
    exceptOnClickActive: PropTypes.bool, // 排除点击选中的菜单
    onClick: PropTypes.func,
    activeIndex: PropTypes.number
  }
  static defaultProps = {
    iconBadgesCaption: [],
    riconBadgesCaption: [],
    exceptOnClickActive: true,
    style: {},
    disabled: false,
    className: 'tabbar-line tabbar-line-width70 border-b',
    activeIndex: 0
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    const target = e.target;
    if (this.props.exceptOnClickActive && target.classList.contains('active')) return;
    const index = target.getAttribute('data-index');
    if (this.props.onClick) this.props.onClick(this.props.list[index], Number(index));
  }
  getIconDOM = (item, index, badgeCaption, iconClassName, iconActiveClassName, iconStyle, iconActiveStyle) => {
    const activeIndex = this.props.activeIndex;
    let newIconClassName = 'tab-icon';
    let newIconStyle = {};
    // 选中状态,读取图标的active样式
    if (item.active || activeIndex === index) {
      if (iconActiveClassName) newIconClassName += ` ${iconActiveClassName}`;
      else {if (iconClassName) newIconClassName += ` ${iconClassName}`;}
      if (iconActiveStyle) newIconStyle = iconActiveStyle;
      else {if (iconStyle) newIconStyle = iconStyle;}
    // 非选中状态,读取图标的普通样式
    } else {
      if (iconClassName) newIconClassName += ` ${iconClassName}`;
      if (iconStyle) newIconStyle = iconStyle;
    }
    // badgeCaption
    if (badgeCaption) return <Icon className={`tab-icon ${newIconClassName}`} style={newIconStyle} badgeCaption={badgeCaption} badgeClassName={this.props.iconBadgeClassName}/>
    return <Icon className={`tab-icon ${newIconClassName}`} style={newIconStyle}/>
  }
  getTabsDOM = () => {
    const {list, className, style, activeIndex, iconBadgesCaption, riconBadgesCaption} = this.props;
    var tabHeight = style.height || null;
    var tabStyle = {};
    // 非footer类型的高度设置
    if (tabHeight && !className.hasClass('tabbar-footer')) {
      tabStyle = {
        height: tabHeight
      }
    }
    // 遍历
    return list.map((item, index) => {
      let liconDOM = null;
      if (item.iconClassName) {
        liconDOM = this.getIconDOM(item, index, iconBadgesCaption[index], item.iconClassName, item.iconActiveClassName, item.iconStyle, item.iconActiveStyle);
      }
      let riconDOM = null;
      if (item.riconClassName) {
        riconDOM = this.getIconDOM(item, index, riconBadgesCaption[index], item.riconClassName, item.riconActiveClassName, item.riconStyle, item.riconActiveStyle);
      }
      return (<li id={item.id} data-index={index} className={`tab${(item.active || activeIndex === index) ? ' active' : ''}`} style={Object.assign(tabStyle, item.style || {})} key={index}>
        {liconDOM && liconDOM}
        <label className="tab-label">{item.caption}</label>
        {riconDOM && riconDOM}
      </li>);
    });
  }
  getTabbarStyle = () => {
    const {list, className, style} = this.props;
    var tabbarStyle = {};
    // 矩形tabbar应当有的总宽度
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
    return Object.assign({}, tabbarStyle, style);
  }
  getCol = () => {
    const {list, tiled} = this.props;
    if (tiled) return list.length;
    return null;
  }
  getTabbarClassName = () => {
    const {className, tiled} = this.props;
    return 'tabbar animated' + (className ? ' ' + className : ' tabbar-line-width60') + (tiled ? ' tabbar-tiled' : '');
  }
  render() {
    const {disabled} = this.props;
    // 获取tabbar样式
    const tabbarStyle = this.getTabbarStyle();
    // 获取tabs的DOM
    const tabsDOM = this.getTabsDOM();
    // 获取tabbar的ClassName
    const tabbarClassName = this.getTabbarClassName();
    // 是否固定宽度
    const col = this.getCol();
    return (
      <ul ref={(el) => {this.$el = el}} className={tabbarClassName} data-col={col} disabled={disabled} style={tabbarStyle} onClick={this.onClick}>
        {tabsDOM}
      </ul>
    );
  }
}
